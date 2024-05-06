"use client";

import React, { useState } from "react";
import { Dropdown, Input, ImgUploader } from "../../components";
import { designationOptions } from "@/constant";
import supabase from "@/app/services/supabaseClient";
import { toast } from "react-toastify";

const PostCV = () => {
  const [loading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_num: "",
    designation: "",
    resume: "",
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
    const { value } = form.designation
    const { data, error } = await supabase
      .from('Applicants')
      .insert({
        ...form,
        designation: value
      })

    if (error) {
      console.log(error?.message)
      toast.error("Something went wrong. Please try again")
    }

    if (data) {
      localStorage.removeItem("job-data")
      toast.success("Job posted successfully")
      navigate("/")
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <form className="form" onSubmit={handleSubmit}>
            <Input
              name="full_name"
              label="Full Name"
              placeholder="Enter Your Full Name"
              type="text"
              value={form.full_name}
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
              name="phone_num"
              label="Phone No"
              placeholder="Enter Your Phone No"
              type="number"
              value={form.phone_num}
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
            <ImgUploader onFileChange={(value) => handleChange("resume", value)} />
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
