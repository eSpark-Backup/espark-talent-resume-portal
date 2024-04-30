const ImgUploader = ({onFileChange}) => {

    const handleFileChange = (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        onFileChange(file);
      }
    };
  
    return (
      <div className="input-parent">
        <label htmlFor="file" className="labelFile">
          <p>Drop Your CV Here</p>
        </label>
        <input accept="application/pdf" className="input-img" name="comp_logo" id="file" type="file" onChange={handleFileChange} />
      </div>
    );
  };
  
  export default ImgUploader;
  