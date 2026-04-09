import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import CloudinaryUploadField from "./CloudinaryUploadField";
import { addGalleryItem, deleteGalleryItem, getEvents, getGalleryItems, uploadAdminMedia } from "../services/eventService";

function createGalleryTitle(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim() || "Gallery Photo";
}

function GalleryManager() {
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [bulkUpload, setBulkUpload] = useState({
    eventId: "",
    files: [],
  });
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
  const [bulkUploading, setBulkUploading] = useState(false);

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

  const handleBulkChange = event => {
    const { name, value, files } = event.target;

    if (name === "files") {
      setBulkUpload(current => ({
        ...current,
        files: Array.from(files || []).slice(0, 20),
      }));
      return;
    }

    setBulkUpload(current => ({ ...current, [name]: value }));
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

  const submitBulkUpload = async event => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!bulkUpload.files.length) {
      setError("Choose at least one image to upload.");
      return;
    }

    setBulkUploading(true);

    try {
      for (const file of bulkUpload.files) {
        const uploadResponse = await uploadAdminMedia({
          file,
          folder: "techalfa/gallery",
          resourceType: "image",
        });

        await addGalleryItem({
          eventId: bulkUpload.eventId ? Number(bulkUpload.eventId) : null,
          title: createGalleryTitle(file.name),
          mediaType: "PHOTO",
          mediaUrl: uploadResponse.url,
          thumbnailUrl: "",
        });
      }

      setMessage(`${bulkUpload.files.length} photo${bulkUpload.files.length > 1 ? "s" : ""} added to gallery.`);
      setBulkUpload({
        eventId: "",
        files: [],
      });
      await loadData();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to bulk upload gallery photos.");
    } finally {
      setBulkUploading(false);
    }
  };

  return (
    <AdminLayout
      title="Gallery Manager"
      subtitle="Curate photos and videos for the public archive and link them to events when needed."
    >
      <section className="admin-grid admin-two-col">
        <div className="admin-form-card glass-admin">
          <h3>Bulk Photo Upload</h3>
          <p className="admin-help">
            Select up to 20 photos at once. Each image will be uploaded and added to the gallery automatically.
          </p>

          <form className="admin-form" onSubmit={submitBulkUpload}>
            <select name="eventId" value={bulkUpload.eventId} onChange={handleBulkChange}>
              <option value="">No linked event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>

            <div className="admin-upload-card">
              <div className="admin-upload-copy">
                <strong>Gallery Photos</strong>
                <span>
                  {bulkUpload.files.length
                    ? `${bulkUpload.files.length} file${bulkUpload.files.length > 1 ? "s" : ""} selected.`
                    : "Choose up to 20 images to upload together."}
                </span>
              </div>

              <label className="admin-upload-button">
                {bulkUploading ? "Uploading..." : "Select Photos"}
                <input
                  type="file"
                  name="files"
                  accept="image/*"
                  multiple
                  onChange={handleBulkChange}
                  disabled={bulkUploading}
                  hidden
                />
              </label>

              {bulkUpload.files.length ? (
                <div className="admin-upload-file-list">
                  {bulkUpload.files.map(file => (
                    <span key={`${file.name}-${file.lastModified}`} className="admin-upload-file-pill">
                      {file.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {message ? <p className="admin-feedback-success">{message}</p> : null}
            {error ? <p className="admin-feedback-error">{error}</p> : null}

            <button className="admin-button" type="submit" disabled={bulkUploading}>
              {bulkUploading ? "Uploading Photos..." : "Upload Selected Photos"}
            </button>
          </form>
        </div>

        <div className="admin-form-card glass-admin">
          <h3>Add Gallery Item</h3>
          <p className="admin-help">
            Use this when you need a single custom photo or video entry with a manual title or thumbnail.
          </p>
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
