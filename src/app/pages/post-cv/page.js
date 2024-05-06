"use client";

import React, { useState } from "react";
import { Dropdown, Input, ImgUploader } from "../../components";
import { designationOptions } from "@/constant";

const PostCV = () => {
  const [loading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    designation: "",
    cv: "",
  });

  const handleChange = (name, value) => {
    setForm(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append('file', form.cv);
      
      try {
        const response = await fetch('/api', {
          method: 'POST',
          body: formData,
        });
        
        console.log('Response:', response);
        setForm(prev => (
          {
            ...prev,
            cv: null
          }
        ))
        ////supa base integration
      } catch (error) {
        console.error('Error uploading file:', error);
        setForm(prev => (
          {
            ...prev,
            cv: null
          }
        ))
      }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <form className="form" onSubmit={handleSubmit}>
            <Input
              name="fullName"
              label="Full Name"
              placeholder="Enter Your Full Name"
              type="text"
              value={form.fullName}
              onChange={handleChange}
            />
            <Input
              name="email"
              label="Email"
              placeholder="Enter Your Email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              name="phoneNo"
              label="Phone No"
              placeholder="Enter Your Phone No"
              type="number"
              value={form.phoneNo}
              onChange={handleChange}
            />
            <Dropdown
              name="designation"
              label="Select Designation"
              placeholder="Select Your Designation"
              options={designationOptions}
              value={form.designation}
              onChange={handleChange}
            />
            <ImgUploader onFileChange={(value) => handleChange("cv", value)} />
            <button disabled={loading} className="btn" type="submit">
              {loading ? "Loading" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostCV;
