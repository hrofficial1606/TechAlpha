import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import CloudinaryUploadField from "./CloudinaryUploadField";
import { createEvent, deleteEvent, downloadEventRegistrationsPdf, getEvents } from "../services/eventService";

function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    venue: "",
    imageUrl: "",
    brochureUrl: "",
    price: "",
    oldPrice: "",
    startsAt: "",
    endsAt: "",
    highlightText: "",
    certificateEnabled: true,
  });
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [downloadingEventId, setDownloadingEventId] = useState(null);

  const loadEvents = async () => {
    const items = await getEvents();
    setEvents(items);
  };

  useEffect(() => {
    loadEvents().catch(requestError => {
      setError(requestError.response?.data?.message || "Unable to load events.");
    });
  }, []);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm(currentForm => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async event => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await createEvent({
        ...form,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      });
      setForm({
        title: "",
        category: "",
        description: "",
        venue: "",
        imageUrl: "",
        brochureUrl: "",
        price: "",
        oldPrice: "",
        startsAt: "",
        endsAt: "",
        highlightText: "",
        certificateEnabled: true,
      });
      setMessage("Event created and notifications sent to users.");
      await loadEvents();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create event.");
    }
  };

  const handleDeleteEvent = async eventId => {
    const confirmed = window.confirm("Delete this event and its related registrations and gallery links?");
    if (!confirmed) {
      return;
    }

    setDeletingEventId(eventId);
    setError("");
    setMessage("");

    try {
      await deleteEvent(eventId);
      setMessage("Event deleted successfully.");
      await loadEvents();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete event.");
    } finally {
      setDeletingEventId(null);
    }
  };

  const handleDownloadPdf = async eventItem => {
    setDownloadingEventId(eventItem.id);
    setError("");
    setMessage("");

    try {
      const blob = await downloadEventRegistrationsPdf(eventItem.id);
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${eventItem.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "event"}-registrations.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
      setMessage("Registration PDF downloaded.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to download registrations PDF.");
    } finally {
      setDownloadingEventId(null);
    }
  };

  return (
    <AdminLayout
      title="Event Manager"
      subtitle="Publish new events with pricing, schedule, venue, and certificate settings."
    >
      <section className="admin-grid admin-two-col">
        <div className="admin-form-card glass-admin">
          <h3>Create New Event</h3>
          <p className="admin-help">This will publish the event immediately and trigger user notifications.</p>

          <form className="admin-form" onSubmit={submit}>
            <div className="admin-two-col">
              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
              <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
            </div>

            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={5} required />

            <div className="admin-two-col">
              <input name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} required />
              <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
            </div>

            <CloudinaryUploadField
              label="Event Image"
              value={form.imageUrl}
              folder="techalfa/events"
              onUploaded={url => setForm(currentForm => ({ ...currentForm, imageUrl: url }))}
            />

            <div className="admin-two-col">
              <input name="brochureUrl" placeholder="Brochure URL" value={form.brochureUrl} onChange={handleChange} />
              <input name="highlightText" placeholder="Highlight text" value={form.highlightText} onChange={handleChange} />
            </div>

            <div className="admin-two-col">
              <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
              <input name="oldPrice" type="number" step="0.01" placeholder="Old Price" value={form.oldPrice} onChange={handleChange} />
            </div>

            <div className="admin-two-col">
              <input name="startsAt" type="datetime-local" value={form.startsAt} onChange={handleChange} required />
              <input name="endsAt" type="datetime-local" value={form.endsAt} onChange={handleChange} />
            </div>

            <label className="admin-checkbox">
              <input name="certificateEnabled" type="checkbox" checked={form.certificateEnabled} onChange={handleChange} />
              Enable certificates for this event
            </label>

            {message ? <p className="admin-feedback-success">{message}</p> : null}
            {error ? <p className="admin-feedback-error">{error}</p> : null}

            <button className="admin-button" type="submit">Publish Event</button>
          </form>
        </div>

        <div className="admin-list-card glass-admin">
          <h3>Current Events</h3>
          <p className="admin-help">Delete old or incorrect events directly from here.</p>
          <div className="admin-list">
            {events.length ? events.map(item => (
              <div key={item.id} className="admin-list-item">
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.category} • {item.venue}</span>
                </div>
                <div className="admin-list-actions">
                  <button
                    className="admin-secondary-button"
                    type="button"
                    onClick={() => handleDownloadPdf(item)}
                    disabled={downloadingEventId === item.id}
                  >
                    {downloadingEventId === item.id ? "Preparing..." : "Download PDF"}
                  </button>
                  <button
                    className="admin-danger-button"
                    type="button"
                    onClick={() => handleDeleteEvent(item.id)}
                    disabled={deletingEventId === item.id}
                  >
                    {deletingEventId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            )) : (
              <div className="admin-list-item">
                <div>
                  <strong>No events yet</strong>
                  <span>Create your first event to see it here.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default CreateEvent;
