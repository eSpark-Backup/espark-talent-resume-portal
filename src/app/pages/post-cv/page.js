"use client";

import React, { useState } from "react";
import { Dropdown, ImgUploader } from "../../components";
import { inputsData, inputsData2 } from "@/constant";
import supabase from "@/app/services/supabaseClient";
import { toast } from "react-toastify";
import CustomInput from "@/common/CustomInput";
import { Box, Stack, Typography, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TagsInput } from "react-tag-input-component";
import TextArea from "@/common/TextArea";
import InfoIcon from '@mui/icons-material/Info';

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
    job_type: "",
    projects: "",
    city: "",
    field: "",
    subField: "",
    position: "",
    tags: [],
    cv: "",
  });

  const handleChange = (name, value) => {
    switch (name) {
      case "field":
        setForm((prev) => ({
          ...prev,
          subField: "",
          position: "",
          [name]: value,
          
        }));
        break;
      case "subField":
        setForm((prev) => ({
          ...prev,
          position: "",
          [name]: value,
        }));
        break;
      case "position":
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;
      default:
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(form, "form");
    const newPhone_num = form.phone_num.replace(/\s|-/g, "");

    if (newPhone_num.length !== 13 || !newPhone_num.startsWith("+923")) {
      toast.error("Invalid Phone Number");
      return;
    }
    if (
      form?.experience === "" ||
      form?.availability === "" ||
      form?.prefrences === "" ||
      form?.tags.length <= 0 ||
      form?.education === "" ||
      form?.city === "" ||
      form?.cv === ""
    ) {
      toast?.error("All Fields Are Required");
      return;
    }
    if ((form?.cnic?.length || 0) !== 13) {
      toast?.error("Invalid CNIC Number");
      return;
    }

    if (form?.salary_expection <= 0) {
      toast?.error("Invalid Salary");
      return;
    }

    if (!form?.linkedin_profile.includes("linkedin")) {
      toast?.error("Invalid Linked Profile URL");
      return;
    }
    if (!form?.github_profile.includes("github")) {
      toast?.error("Invalid Github Profile URL");
      return;
    }

    if (form.cv instanceof File) {
      const formData = new FormData();
      formData.append("file", form.cv);

      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      const { fileKey } = await response.json();

      setForm((prev) => ({
        ...prev,
        cv: fileKey,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        cv: form.cv,
      }));
    }

    try {
      const { data, error } = await supabase.from("Applicants").insert({
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
        phone_num: newPhone_num,
        prefrences: form.prefrences?.value,
        salary_expection: form.salary_expection,
        tags: form.tags,
        subField: form.position?.value ? form.subField?.value : null,
        position: !form.position?.value
          ? form.subField?.value
          : form.position?.value,
        job_type: form.job_type?.value,
        projects: form.projects,
      });

      if (error) {
        console.log(error?.message);
        toast.error("Something went wrong. Please try again");
      }

      if (data) {
        toast.success("Application posted successfully");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
      setForm((prev) => ({
        ...prev,
        cv: null,
      }));
    }
  };

  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

  return (
    <>
      <div className="container">
        <form className="card" onSubmit={HandleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",

              [theme.breakpoints.up("xs")]: {
                flexDirection: "column",
                padding: "20px 10px",
                rowGap: "10px",
              },

              [theme.breakpoints.up("md")]: {
                flexDirection: "row",
                padding: "30px",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography mb={1}
                fontSize={25}
                textAlign="left" sx={{ color: "black" }}>
                Personal Info
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  rowGap: "6px"
                }}
              >
                {inputsData?.map((item, index) => (
                  <Box
                    sx={{
                      [theme.breakpoints.up("xs")]: {
                        width: "100%",
                      },

                      [theme.breakpoints.up("md")]: {
                        width:
                          item?.name === "city" ||
                            item?.name === "job_type" ||
                            item.name === "projects"
                            ? "100%"
                            : "30%",
                      },
                    }}
                  >
                    {item?.type !== "select" &&
                      item?.type !== "tags" &&
                      item?.type !== "textarea" ? (
                      <CustomInput
                        required
                        label={item?.label}
                        type={item?.type}
                        name={item?.name}
                        placeholder={item?.placeholder}
                        tooltip={item?.tooltip}
                        onChange={handleChange}
                        maxLength={item?.maxLength && item?.maxLength}
                      />
                    ) : item?.type !== "tags" && item?.type !== "textarea" ? (
                      <Dropdown
                        showTooltip={true}
                        name={item?.name}
                        label={item?.label}
                        placeholder={item?.placeholder}
                        tooltip={item?.tooltip}
                        options={
                          item?.name === "subField"
                            ? item?.options[form?.field?.value]
                            : item?.name === "position"
                              ? item?.options[form?.subField?.value]
                              : item?.options
                        }
                        onChange={handleChange}
                        className={
                          item?.name === "subField" && !form.field
                            ? "hide"
                            : item?.name === "position" && !form.subField
                              ? "hide"
                              : item?.name === "position" &&
                                form.subField &&
                                form?.field?.value !== "Software Engineering"
                                ? "hide"
                                : ""
                        }
                      />
                    ) : item?.type === "textarea" ? (
                      <TextArea
                        name={item?.name}
                        placeholder={item?.placeholder}
                        label={item?.label}
                        title={item?.tooltip}
                        tooltip={item?.tooltip}
                        onChange={handleChange}
                      />
                    ) : (
                      <Stack gap={1}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >

                          <Typography sx={{ color: "black" }}>
                            Skills, Technologies and Expertise
                          </Typography>

                          <Tooltip placement="top-start" title={
                            item?.tooltip
                          } >
                            <InfoIcon
                              style={{
                                marginLeft: "5px",
                                color: "rgb(97, 192, 224)",
                                fontSize: "13px",
                                marginBottom: "12px",
                              }}
                            />
                          </Tooltip>
                        </Box>
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
                      </Stack>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              {
                <>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="10px"
                  >
                    <Stack direction={"row"}>
                      <Typography
                        fontSize={25}
                        mb={1} textAlign="left" sx={{ color: "black" }}>
                        Resume
                      </Typography>
                      <Tooltip placement="top-start" title={"Please choose a file to upload your resume, or you can share a link to your resume with us. Accepted formats are PDF, DOC, and DOCX."}>
                        <InfoIcon
                          style={{
                            marginLeft: "5px",
                            color: "rgb(97, 192, 224)",
                            fontSize: "13px",
                            marginBottom: "12px",
                          }}
                        />
                      </Tooltip>
                    </Stack>
                    {form.cv !== "" && (
                      <img
                        width={25}
                        src={
                          (
                            typeof form.cv === "string"
                              ? form.cv.match(new RegExp(expression))
                              : form.cv !== ""
                          )
                            ? "/tick.png"
                            : "/cross.png"
                        }
                        alt="icon"
                      />
                    )}
                  </Stack>
                  <Stack
                    sx={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "5px",
                      div: { width: "50%", div: { width: "100%" } },
                    }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="10px"
                  >
                    <ImgUploader
                      disabled={typeof form.cv === "string" && form.cv !== ""}
                      onChange={handleChange}
                      name={"cv"}
                      filename={form.cv?.name}
                      form={true}
                    />
                    <Typography
                      style={{ color: "black" }}
                      mt={2} variant="subtitle2">
                      OR
                    </Typography>
                    <CustomInput
                      onChange={handleChange}
                      type={"url"}
                      placeholder={"Resume Link"}
                      name={"cv"}
                    />
                  </Stack>
                </>
              }
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography fontSize={25} mb={1} textAlign="left" sx={{ color: "black" }}>
                Apply For
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {inputsData2?.map((item, index) => (
                  <Box
                    sx={{
                      [theme.breakpoints.up("xs")]: {
                        width: "100%",
                      },

                      [theme.breakpoints.up("md")]: {
                        width:
                          item?.name === "city" ||
                            item?.name === "job_type" ||
                            item.name === "projects"
                            ? "100%"
                            : "30%",
                      },
                    }}
                  >
                    <Dropdown
                      name={item?.name}
                      label={item?.label}
                      value={form[item?.name]}
                      placeholder={item?.placeholder}
                      tooltip={item?.tooltip}
                      options={
                        item?.name === "subField"
                          ? item?.options[form?.field?.value]
                          : item?.name === "position"
                            ? item?.options[form?.subField?.value]
                            : item?.options
                      }
                      onChange={handleChange}
                      className={
                        item?.name === "subField" && !form.field
                          ? "hide"
                          : item?.name === "position" && !form.subField
                            ? "hide"
                            : item?.name === "position" &&
                              form.subField &&
                              form?.field?.value !== "Software Engineering"
                              ? "hide"
                              : ""
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button disabled={loading} type="submit">
              {loading ? "loading..." : "Submit"}
            </button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default PostCV;
