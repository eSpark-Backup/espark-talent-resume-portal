"use client";

import React, { useState } from "react";
import { Dropdown } from "../../components";
import { inputsData } from "@/constant";
import supabase from "@/app/services/supabaseClient";
import { toast } from "react-toastify";
import CustomInput from "@/common/CustomInput";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { TagsInput } from "react-tag-input-component";

const PostCV = () => {
  const theme = useTheme();
  const [loading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_num: "",
    cnic: "",
    linkedin_profile: "",
    salary_expection: "",
    experience: "",
    availability: "",
    prefrences: "",
    education: "",
    github_profile: "",
    city: "",
    field: "",
    subField: "",
    position: "",
    tags: [],
    cv: ""
  });




  const handleChange = (name, value) => {
    switch (name) {
      case 'field':
        setForm(prev => ({
          ...prev,
          [name]: value,
          subField: "",
          position: ""
        }))
        break;
      case 'subField':
        setForm(prev => ({
          ...prev,
          [name]: value,
          position: ""
        }))
        break;
      case 'position':
        setForm(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      default:
        setForm(prev => ({
          ...prev,
          [name]: value
        }))
        break;
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (form?.experience === "" || form?.availability === "" || form?.prefrences === "" || form?.tags.length <= 0 || form?.education === "" || form?.city === "" || form?.cv === "") {
      toast?.error("All Fields Are Required")
      return
    }
    if ((form?.cnic?.length || 0) !== 13) {
      
      toast?.error("Invalid CNIC Number");
      return;
    }
    if ((form?.phone_num?.length || 0) !== 11) {
      console.log(form?.phone_num?.length)
      toast?.error("Invalid Contact Number");
      return;
    }

    if (form?.salary_expection <= 0) {
      toast?.error("Invalid Salary");
      return;
    }

    if (form.cv instanceof File) {
      const formData = new FormData();
      formData.append('file', form.cv);



      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });

      const { fileKey } = await response.json();

      setForm(prev => (
        {
          ...prev,
          cv: fileKey
        }
      ))
    }

    else {
      setForm(prev => (
        {
          ...prev,
          cv: form.cv
        }
      ))
    }


    try {
      const { data, error } = await supabase
        .from('Applicants')
        .insert({
          ...form,
          availability: form.availability?.value,
          city: form.city?.value,
          cnic: form.cnic,
          education: form.education?.value,
          email: form.email,
          experience: form.experience?.value,
          field: form.field?.value,
          github_profile: form.github_profile,
          linkedin_profile: form.linkedin_profile,
          name: form.name,
          phone_num: form.phone_num,
          prefrences: form.prefrences?.value,
          salary_expection: form.salary_expection,
          tags: form.tags,
          subField: form.position?.value ? form.subField?.value : null,
          position: !form.position?.value ? form.subField?.value : form.position?.value,
        })

      if (error) {
        console.log(error?.message)
        toast.error("Something went wrong. Please try again")
      }

      if (data) {
        toast.success("Application posted successfully")
      }


    } catch (error) {
      toast.error('Something went wrong. Please try again')
      setForm(prev => (
        {
          ...prev,
          cv: null
        }
      ))
    }
  }

  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

  return (
    <>
      <div className="container">
        <form className="card" onSubmit={HandleSubmit}>
          <Box sx={{
            display: "flex", justifyContent: "space-between", flexWrap: "wrap",

            [theme.breakpoints.up('xs')]: {
              flexDirection: 'column',
              padding: "20px 10px",
              rowGap: "10px"
            },

            [theme.breakpoints.up('md')]: {
              flexDirection: 'row',
              padding: "30px"
            }

          }} >
            {inputsData?.map((item, index) => (
              <Box
                sx={{
                  [theme.breakpoints.up('xs')]: {
                    width: "100%"
                  },

                  [theme.breakpoints.up('md')]: {
                    width: item?.name === "city" ? "100%" : "30%"
                  }
                }}>

                {item?.type !== "select" && item?.type !== "tags" ?
                  <CustomInput label={item?.label} type={item?.type} name={item?.name} placeholder={item?.placeholder} onChange={handleChange} maxLength={item?.maxLength && item?.maxLength} />
                  :
                  item?.type !== "tags" ?
                    <Dropdown name={item?.name} label={item?.label} placeholder={item?.placeholder} options={
                      item?.name === "subField" ? item?.options[form?.field?.value] :
                        item?.name === "position" ? item?.options[form?.subField?.value] : item?.options
                    }
                      onChange={handleChange}
                      className={
                        item?.name === "subField" && !form.field ? "hide" :
                          item?.name === "position" && !form.subField ? "hide" :
                            item?.name === "position" && form.subField && form?.field?.value !== "Software Engineering" ? "hide" : ""
                      }
                    />
                    :
                    <Box>
                      <Typography sx={{ color: "black" }}>Skills, Technologies and Expertise</Typography>
                      <TagsInput
                        value={form.tags}
                        onChange={(e) => handleChange("tags", e)}
                        name="skills"
                        placeHolder="Start with #"
                        beforeAddValidate={(tag) => {
                          if (tag.trim().startsWith("#")) {
                            return true;
                          } else {
                            return false;
                          }
                        }}
                      />
                    </Box>
                }
              </Box>
            ))}
            <Box sx={{ width: "100%" }}>
              {<>
                <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px"><Typography mb={1} textAlign="left" sx={{ color: "black" }}>Resume</Typography>{form.cv !== "" && <img width={25} src={(typeof form.cv === "string" ? form.cv.match(new RegExp(expression)) : form.cv !== "") ? "/tick.png" : "/cross.png"} alt="icon"/>}</Stack>
                <Stack sx={{ border: "1px solid #ccc", padding: "10px", div:{width: "50%", div: {width: "100%"}}}} direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                  <CustomInput disabled={typeof form.cv === "string" && form.cv !== ""} onChange={handleChange} type={"file"} placeholder={"Resume"} name={"cv"} />
                  <Typography mt={4} variant="subtitle2">OR</Typography>
                  <CustomInput onChange={handleChange} type={"url"} placeholder={"Resume Link"} name={"cv"} />
                </Stack>
              </>
              }
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button disabled={loading} type="submit">{loading ? "loading..." : "Submit"}</button>
          </Box>
        </form>
      </div >
    </>
  );
};

export default PostCV;
