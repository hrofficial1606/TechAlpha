import { useRef, useState } from "react";
import { uploadAdminMedia } from "../services/eventService";

function CloudinaryUploadField({
  label,
  value,
  onUploaded,
  folder,
  resourceType = "image",
  accept = "image/*",
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async event => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const response = await uploadAdminMedia({ file, folder, resourceType });
      onUploaded(response.url);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to upload file.");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="admin-upload-card">
      <div className="admin-upload-copy">
        <strong>{label}</strong>
        <span>{value ? "Uploaded URL is ready." : "Choose a file to upload to Cloudinary."}</span>
      </div>

      <label className="admin-upload-button">
        {uploading ? "Uploading..." : "Upload File"}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
          hidden
        />
      </label>

      {value ? <p className="admin-upload-url">{value}</p> : null}
      {error ? <p className="admin-feedback-error">{error}</p> : null}
    </div>
  );
}

export default CloudinaryUploadField;
