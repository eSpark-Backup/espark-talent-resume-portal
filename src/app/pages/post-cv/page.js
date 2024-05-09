"use client";

import React, { useState } from "react";
import { Dropdown, Input, ImgUploader } from "../../components";
import { inputsData } from "@/constant";
import supabase from "@/app/services/supabaseClient";
import { toast } from "react-toastify";
import CustomInput from "@/common/CustomInput";
import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { TagsInput } from "react-tag-input-component";

const PostCV = () => {
  const [loading] = useState(false);
  const [form, setForm] = useState({
    tags: []
  });

  const [tags, setTags] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', form.resume);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });

      const { fileKey } = await response.json();

      const { value } = form.designation
      const { data, error } = await supabase
        .from('Applicants')
        .insert({
          ...form,
          resume: fileKey || null,
          designation: value
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
          resume: null
        }
      ))
    }


  };

  const theme = useTheme();

  return (
    <>
      <div className="container">
        <div className="card">
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
              <Box sx={{
                [theme.breakpoints.up('xs')]: {
                  width: "100%"
                },
                [theme.breakpoints.up('md')]: {
                  width: "30%"
                }
              }}>

                {item?.type !== "select" && item?.type !== "tags" ?
                  <CustomInput label={item?.label} type={item?.type} name={item?.name} placeholder={item?.placeholder} />
                  :
                  item?.type !== "tags" ?
                    <Dropdown name={item?.name} label={item?.label} placeholder={item?.placeholder} options={item?.options} onChange={(name, value) => { console.log(name, value) }} />
                    :
                    <Box>
                      <Typography sx={{ color: "black" }}>Skills, Technologies and Expertise</Typography>
                      <TagsInput
                        value={tags}
                        onChange={setTags}
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button>Submit</button>
          </Box>
        </div>
      </div >
    </>
  );
};

export default PostCV;
