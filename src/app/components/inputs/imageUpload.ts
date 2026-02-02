import { Typography } from "@mui/material";

const ImgUploader = ({ label, name, onChange, disabled, filename, form, modalLoader }) => {
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
      <div>
        <label htmlFor="imageInput">
          <input
            disabled={modalLoader}
            accept="application/pdf"
            id="imageInput"
            type="file"
            onChange={(e) => handleFileChange(e, name)}
            className="hidden-input"
            name={name}
          />
          <div className={form ? `image-selector ${modalLoader ? 'disabled' : ''}` : ''}>
            <p className={"upload-btn2"}>
              {/* {
                !modalLoader ? 
                "Upload" :
                  <img src="/w-loader.svg" alt="upload"
                    style={{
                      width: "25px",
                      height: "25px",
                    }}
                  />
              } */}
              Upload




            </p>
            {form && <p className="filename">{filename ? filename : "Choose Your File"}</p>}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImgUploader;
