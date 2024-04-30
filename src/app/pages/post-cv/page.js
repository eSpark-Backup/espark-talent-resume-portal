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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form, "handle submit");
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
