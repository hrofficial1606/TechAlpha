import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import CloudinaryUploadField from "./CloudinaryUploadField";
import {
  getAdminHackathonContent,
  saveAdminHackathonContent,
} from "../services/eventService";

function linesToArray(value) {
  return value
    .split("\n")
    .map(item => item.trim())
    .filter(Boolean);
}

function rowsToObjects(value, keys) {
  return value
    .split("\n")
    .map(row => row.trim())
    .filter(Boolean)
    .map(row => {
      const values = row.split("|").map(part => part.trim());
      return keys.reduce((result, key, index) => {
        result[key] = values[index] || "";
        return result;
      }, {});
    });
}

function objectsToRows(items, keys) {
  return (items || []).map(item => keys.map(key => item[key] || "").join(" | ")).join("\n");
}

function arrayToLines(items) {
  return (items || []).join("\n");
}

function EditHackathonContent() {
  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    aboutTitle: "",
    aboutParagraphs: "",
    prizesTitle: "",
    prizesSubtitle: "",
    prizesTotal: "",
    prizeCards: "",
    contactTitle: "",
    contactItems: "",
    venueTitle: "",
    venueName: "",
    venueLink: "",
    timelineTitle: "",
    day1Label: "",
    day2Label: "",
    day1Events: "",
    day2Events: "",
    sponsorsTitle: "",
    sponsorImageUrl: "",
    sponsorName: "",
    sponsorParagraphs: "",
    collaborationTitle: "",
    collaborationImageUrl: "",
    collaborationName: "",
    collaborationSubtitle: "",
    collaborationParagraphs: "",
    hackathonSectionTitle: "",
    hackathonImageUrl: "",
    hackathonCardTitle: "",
    hackathonCardSubtitle: "",
    hackathonHighlights: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getAdminHackathonContent();
        setForm({
          heroTitle: data.heroTitle || "",
          heroSubtitle: data.heroSubtitle || "",
          aboutTitle: data.aboutTitle || "",
          aboutParagraphs: arrayToLines(data.aboutParagraphs),
          prizesTitle: data.prizesTitle || "",
          prizesSubtitle: data.prizesSubtitle || "",
          prizesTotal: data.prizesTotal || "",
          prizeCards: objectsToRows(data.prizeCards, ["title", "amount", "emoji", "tba", "border"]),
          contactTitle: data.contactTitle || "",
          contactItems: objectsToRows(data.contactItems, ["label", "value"]),
          venueTitle: data.venueTitle || "",
          venueName: data.venueName || "",
          venueLink: data.venueLink || "",
          timelineTitle: data.timelineTitle || "",
          day1Label: data.day1Label || "",
          day2Label: data.day2Label || "",
          day1Events: objectsToRows(data.day1Events, ["time", "activity", "points"]),
          day2Events: objectsToRows(data.day2Events, ["time", "activity", "points"]),
          sponsorsTitle: data.sponsorsTitle || "",
          sponsorImageUrl: data.sponsorImageUrl || "",
          sponsorName: data.sponsorName || "",
          sponsorParagraphs: arrayToLines(data.sponsorParagraphs),
          collaborationTitle: data.collaborationTitle || "",
          collaborationImageUrl: data.collaborationImageUrl || "",
          collaborationName: data.collaborationName || "",
          collaborationSubtitle: data.collaborationSubtitle || "",
          collaborationParagraphs: arrayToLines(data.collaborationParagraphs),
          hackathonSectionTitle: data.hackathonSectionTitle || "",
          hackathonImageUrl: data.hackathonImageUrl || "",
          hackathonCardTitle: data.hackathonCardTitle || "",
          hackathonCardSubtitle: data.hackathonCardSubtitle || "",
          hackathonHighlights: arrayToLines(data.hackathonHighlights),
        });
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load hackathon content.");
      }
    };

    loadContent();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await saveAdminHackathonContent({
        heroTitle: form.heroTitle,
        heroSubtitle: form.heroSubtitle,
        aboutTitle: form.aboutTitle,
        aboutParagraphs: linesToArray(form.aboutParagraphs),
        prizesTitle: form.prizesTitle,
        prizesSubtitle: form.prizesSubtitle,
        prizesTotal: form.prizesTotal,
        prizeCards: rowsToObjects(form.prizeCards, ["title", "amount", "emoji", "tba", "border"]),
        contactTitle: form.contactTitle,
        contactItems: rowsToObjects(form.contactItems, ["label", "value"]),
        venueTitle: form.venueTitle,
        venueName: form.venueName,
        venueLink: form.venueLink,
        timelineTitle: form.timelineTitle,
        day1Label: form.day1Label,
        day2Label: form.day2Label,
        day1Events: rowsToObjects(form.day1Events, ["time", "activity", "points"]),
        day2Events: rowsToObjects(form.day2Events, ["time", "activity", "points"]),
        sponsorsTitle: form.sponsorsTitle,
        sponsorImageUrl: form.sponsorImageUrl,
        sponsorName: form.sponsorName,
        sponsorParagraphs: linesToArray(form.sponsorParagraphs),
        collaborationTitle: form.collaborationTitle,
        collaborationImageUrl: form.collaborationImageUrl,
        collaborationName: form.collaborationName,
        collaborationSubtitle: form.collaborationSubtitle,
        collaborationParagraphs: linesToArray(form.collaborationParagraphs),
        hackathonSectionTitle: form.hackathonSectionTitle,
        hackathonImageUrl: form.hackathonImageUrl,
        hackathonCardTitle: form.hackathonCardTitle,
        hackathonCardSubtitle: form.hackathonCardSubtitle,
        hackathonHighlights: linesToArray(form.hackathonHighlights),
      });

      setMessage("Hackathon page content saved.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save hackathon content.");
    }
  };

  return (
    <AdminLayout
      title="Hackathon Page Editor"
      subtitle="Update hackathon sections from admin. Any blank field will keep the public fallback content."
    >
      <section className="admin-grid admin-two-col">
        <div className="admin-form-card glass-admin" style={{ gridColumn: "1 / -1" }}>
          <h3>Hackathon Content</h3>
          <p className="admin-help">
            Use one line per paragraph or highlight. For structured rows, use `label | value` or
            `time | activity | points`.
          </p>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-two-col">
              <input name="heroTitle" placeholder="Hero title" value={form.heroTitle} onChange={handleChange} />
              <textarea name="heroSubtitle" placeholder="Hero subtitle" value={form.heroSubtitle} onChange={handleChange} rows={2} />
            </div>

            <div className="admin-two-col">
              <input name="aboutTitle" placeholder="About title" value={form.aboutTitle} onChange={handleChange} />
              <textarea name="aboutParagraphs" placeholder="About paragraphs, one per line" value={form.aboutParagraphs} onChange={handleChange} rows={5} />
            </div>

            <div className="admin-two-col">
              <input name="prizesTitle" placeholder="Prizes title" value={form.prizesTitle} onChange={handleChange} />
              <input name="prizesSubtitle" placeholder="Prizes subtitle" value={form.prizesSubtitle} onChange={handleChange} />
            </div>
            <div className="admin-two-col">
              <input name="prizesTotal" placeholder="Prize total" value={form.prizesTotal} onChange={handleChange} />
              <textarea name="prizeCards" placeholder="Prize cards: title | amount | emoji | extra text | border" value={form.prizeCards} onChange={handleChange} rows={4} />
            </div>

            <div className="admin-two-col">
              <input name="contactTitle" placeholder="Contact title" value={form.contactTitle} onChange={handleChange} />
              <textarea name="contactItems" placeholder="Contact items: label | value" value={form.contactItems} onChange={handleChange} rows={4} />
            </div>

            <div className="admin-two-col">
              <input name="venueTitle" placeholder="Venue title" value={form.venueTitle} onChange={handleChange} />
              <input name="venueName" placeholder="Venue name" value={form.venueName} onChange={handleChange} />
            </div>
            <input name="venueLink" placeholder="Venue map link" value={form.venueLink} onChange={handleChange} />

            <div className="admin-two-col">
              <input name="timelineTitle" placeholder="Timeline title" value={form.timelineTitle} onChange={handleChange} />
              <div className="admin-two-col">
                <input name="day1Label" placeholder="Day 1 label" value={form.day1Label} onChange={handleChange} />
                <input name="day2Label" placeholder="Day 2 label" value={form.day2Label} onChange={handleChange} />
              </div>
            </div>
            <div className="admin-two-col">
              <textarea name="day1Events" placeholder="Day 1 rows: time | activity | points" value={form.day1Events} onChange={handleChange} rows={6} />
              <textarea name="day2Events" placeholder="Day 2 rows: time | activity | points" value={form.day2Events} onChange={handleChange} rows={6} />
            </div>

            <div className="admin-two-col">
              <input name="sponsorsTitle" placeholder="Sponsors title" value={form.sponsorsTitle} onChange={handleChange} />
              <input name="sponsorImageUrl" placeholder="Sponsor image URL" value={form.sponsorImageUrl} onChange={handleChange} />
            </div>
            <CloudinaryUploadField
              label="Sponsor Image"
              value={form.sponsorImageUrl}
              folder="techalfa/hackathon"
              onUploaded={url => setForm(current => ({ ...current, sponsorImageUrl: url }))}
            />
            <div className="admin-two-col">
              <input name="sponsorName" placeholder="Sponsor name" value={form.sponsorName} onChange={handleChange} />
              <textarea name="sponsorParagraphs" placeholder="Sponsor paragraphs, one per line" value={form.sponsorParagraphs} onChange={handleChange} rows={4} />
            </div>

            <div className="admin-two-col">
              <input name="collaborationTitle" placeholder="Collaboration title" value={form.collaborationTitle} onChange={handleChange} />
              <input name="collaborationImageUrl" placeholder="Collaboration image URL" value={form.collaborationImageUrl} onChange={handleChange} />
            </div>
            <CloudinaryUploadField
              label="Collaboration Image"
              value={form.collaborationImageUrl}
              folder="techalfa/hackathon"
              onUploaded={url => setForm(current => ({ ...current, collaborationImageUrl: url }))}
            />
            <div className="admin-two-col">
              <input name="collaborationName" placeholder="Collaboration name" value={form.collaborationName} onChange={handleChange} />
              <input name="collaborationSubtitle" placeholder="Collaboration subtitle" value={form.collaborationSubtitle} onChange={handleChange} />
            </div>
            <textarea name="collaborationParagraphs" placeholder="Collaboration paragraphs, one per line" value={form.collaborationParagraphs} onChange={handleChange} rows={4} />

            <div className="admin-two-col">
              <input name="hackathonSectionTitle" placeholder="Hackathon section title" value={form.hackathonSectionTitle} onChange={handleChange} />
              <input name="hackathonImageUrl" placeholder="Hackathon image URL" value={form.hackathonImageUrl} onChange={handleChange} />
            </div>
            <CloudinaryUploadField
              label="Hackathon Image"
              value={form.hackathonImageUrl}
              folder="techalfa/hackathon"
              onUploaded={url => setForm(current => ({ ...current, hackathonImageUrl: url }))}
            />
            <div className="admin-two-col">
              <input name="hackathonCardTitle" placeholder="Hackathon card title" value={form.hackathonCardTitle} onChange={handleChange} />
              <input name="hackathonCardSubtitle" placeholder="Hackathon card subtitle" value={form.hackathonCardSubtitle} onChange={handleChange} />
            </div>
            <textarea name="hackathonHighlights" placeholder="Hackathon highlights, one per line" value={form.hackathonHighlights} onChange={handleChange} rows={5} />

            {message ? <p className="admin-feedback-success">{message}</p> : null}
            {error ? <p className="admin-feedback-error">{error}</p> : null}

            <button className="admin-button" type="submit">Save Hackathon Content</button>
          </form>
        </div>
      </section>
    </AdminLayout>
  );
}

export default EditHackathonContent;
