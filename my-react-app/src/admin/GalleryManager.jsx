import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import CloudinaryUploadField from "./CloudinaryUploadField";
import { addGalleryItem, deleteGalleryItem, getEvents, getGalleryItems } from "../services/eventService";

function GalleryManager() {
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({
    eventId: "",
    title: "",
    mediaType: "PHOTO",
    mediaUrl: "",
    thumbnailUrl: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deletingGalleryId, setDeletingGalleryId] = useState(null);

  const loadData = async () => {
    const [loadedEvents, loadedGallery] = await Promise.all([getEvents(), getGalleryItems()]);
    setEvents(loadedEvents);
    setGallery(loadedGallery);
  };

  useEffect(() => {
    loadData().catch(requestError => {
      setError(requestError.response?.data?.message || "Unable to load gallery manager.");
    });
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(currentForm => ({ ...currentForm, [name]: value }));
  };

  const submit = async event => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await addGalleryItem({
        ...form,
        eventId: form.eventId ? Number(form.eventId) : null,
      });
      setMessage("Gallery item added.");
      setForm({ eventId: "", title: "", mediaType: "PHOTO", mediaUrl: "", thumbnailUrl: "" });
      await loadData();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to add gallery item.");
    }
  };

  const handleDeleteGallery = async galleryItemId => {
    const confirmed = window.confirm("Delete this gallery item?");
    if (!confirmed) {
      return;
    }

    setDeletingGalleryId(galleryItemId);
    setError("");
    setMessage("");

    try {
      await deleteGalleryItem(galleryItemId);
      setMessage("Gallery item deleted.");
      await loadData();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete gallery item.");
    } finally {
      setDeletingGalleryId(null);
    }
  };

  return (
    <AdminLayout
      title="Gallery Manager"
      subtitle="Curate photos and videos for the public archive and link them to events when needed."
    >
      <section className="admin-grid admin-two-col">
        <div className="admin-form-card glass-admin">
          <h3>Add Gallery Item</h3>
          <form className="admin-form" onSubmit={submit}>
            <select name="eventId" value={form.eventId} onChange={handleChange}>
              <option value="">No linked event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>

            <input name="title" placeholder="Media title" value={form.title} onChange={handleChange} required />

            <div className="admin-two-col">
              <select name="mediaType" value={form.mediaType} onChange={handleChange}>
                <option value="PHOTO">Photo</option>
                <option value="VIDEO">Video</option>
              </select>
              <input name="thumbnailUrl" placeholder="Thumbnail URL (optional)" value={form.thumbnailUrl} onChange={handleChange} />
            </div>

            <input name="mediaUrl" placeholder="Media URL" value={form.mediaUrl} onChange={handleChange} required />

            <CloudinaryUploadField
              label={form.mediaType === "VIDEO" ? "Gallery Video" : "Gallery Image"}
              value={form.mediaUrl}
              folder="techalfa/gallery"
              resourceType={form.mediaType === "VIDEO" ? "video" : "image"}
              accept={form.mediaType === "VIDEO" ? "video/*" : "image/*"}
              onUploaded={url => setForm(currentForm => ({ ...currentForm, mediaUrl: url }))}
            />

            <CloudinaryUploadField
              label="Thumbnail Image"
              value={form.thumbnailUrl}
              folder="techalfa/gallery-thumbnails"
              onUploaded={url => setForm(currentForm => ({ ...currentForm, thumbnailUrl: url }))}
            />

            {message ? <p className="admin-feedback-success">{message}</p> : null}
            {error ? <p className="admin-feedback-error">{error}</p> : null}

            <button className="admin-button" type="submit">Add To Gallery</button>
          </form>
        </div>

        <div className="admin-list-card glass-admin">
          <h3>Current Gallery</h3>
          <div className="admin-list">
            {gallery.length ? gallery.map(item => (
              <div key={item.id} className="admin-list-item">
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.mediaType} • {item.eventTitle || "Archive"}</span>
                </div>
                <button
                  className="admin-danger-button"
                  type="button"
                  onClick={() => handleDeleteGallery(item.id)}
                  disabled={deletingGalleryId === item.id}
                >
                  {deletingGalleryId === item.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            )) : (
              <div className="admin-list-item">
                <div>
                  <strong>No gallery items yet</strong>
                  <span>Upload photos or videos to build the event archive.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default GalleryManager;
