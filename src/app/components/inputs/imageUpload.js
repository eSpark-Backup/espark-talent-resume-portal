import { Typography } from "@mui/material";

const ImgUploader = ({ label, name, onChange, disabled, filename, form, table }) => {
  const handleFileChange = (e, name) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange(name, file);
    }
  };
  return (
    <div className="input-parent">
      {label && (
        <Typography mb={1} textAlign="left" sx={{ color: "black" }}>
          {label}
        </Typography>
      )}
      <label htmlFor="imageInput">
        <input
          disabled={disabled}
          accept="application/pdf"
          id="imageInput"
          type="file"
          onChange={(e) => handleFileChange(e, name)}
          className="hidden-input"
          name={name}
        />
        <div className={form ? `image-selector ${disabled ? 'disabled' : ''}` : ''}>
          <p className={form || table ? "upload-btn" : "upload-btn2"}>Upload</p>
          {form && <p className="filename">{filename ? filename : "Choose Your File"}</p>}
        </div>
      </label>
    </div>
  );
};

export default ImgUploader;
