import { useEffect, useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import { getGalleryItems } from "../services/eventService";
import "../styles/FeaturePages.css";

function Gallery() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setItems(await getGalleryItems());
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load gallery.");
      }
    };

    loadGallery();
  }, []);

  return (
    <div className="feature-shell">
      <Header />
      <SideMenu />
      <RightSideMenu />

      <div className="feature-stage">
        <div className="feature-hero">
          <div className="feature-kicker">MEMORY VAULT</div>
          <h1 className="feature-title">Event Gallery</h1>
          <p className="feature-copy">Photos and videos from previous TechAlpha events, presented in centered liquid-glass cards.</p>
          {error ? <p className="auth-error" style={{ marginTop: "14px" }}>{error}</p> : null}
        </div>

        <div className="feature-grid">
          {items.map((item) => (
            <article key={item.id} className="glass-card gallery-card">
              <span className="mini-badge">{item.mediaType}</span>
              <h3 style={{ marginTop: "18px" }}>{item.title}</h3>
              <p className="feature-copy">{item.eventTitle || "TechAlpha Archive"}</p>
              {item.mediaType === "VIDEO" ? (
                <video src={item.mediaUrl} controls className="gallery-media" />
              ) : (
                <img src={item.mediaUrl} alt={item.title} className="gallery-media" />
              )}
            </article>
          ))}
        </div>

        {!items.length && !error ? (
          <div className="glass-card empty-state" style={{ marginTop: "22px" }}>
            <h3>Gallery is empty</h3>
            <p className="feature-copy">When your admin adds Cloudinary photos or videos, they will appear here.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Gallery;
