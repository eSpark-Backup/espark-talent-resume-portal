"use client";

import React, { useState } from "react";
import { Dropdown, Input, ImgUploader } from "../../components";
import { Fields_ENUMS, cities, inputsData } from "@/constant";
import supabase from "@/app/services/supabaseClient";
import { toast } from "react-toastify";
import CustomInput from "@/common/CustomInput";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { TagsInput } from "react-tag-input-component";

const PostCV = () => {
  const theme = useTheme();
  const [loading] = useState(false);
  const [prefrence, setPrefrence] = useState("")
  const [form, setForm] = useState({
    tags: []
  });
  const [tags, setTags] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedSubfield, setSelectedSubfield] = useState(null);
  const [selectedState, setSelectedState] = useState(null);


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

  const handleDropdowns = (name, value) => {
    switch (name) {
      case 'field':
        setSelectedField(value);
        setSelectedSubfield(null);
        setSelectedState(null);
        break;
      case 'SUB_FIELD':
        setSelectedSubfield(value);
        setSelectedState(null);
        break;
      case 'POSITION':
        setSelectedState(value);
        break;
      default:
        break;
    }
  };



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
                  <CustomInput label={item?.label} type={item?.type} name={item?.name} placeholder={item?.placeholder} onChange={(name, value) => console.log(e)} />
                  :
                  item?.type !== "tags" ?
                    <Dropdown name={item?.name} label={item?.label} placeholder={item?.placeholder} options={
                      item?.name === Fields_ENUMS.SUB_FIELD ? item?.options[selectedField?.value] :
                        item?.name === Fields_ENUMS.POSITION ? item?.options[selectedSubfield?.value] : item?.options
                    }
                      onChange={(name, value) => handleDropdowns(name, value)}
                      className={
                        item?.name === Fields_ENUMS.SUB_FIELD && !selectedField ? "hide" :
                          item?.name === Fields_ENUMS.POSITION && !selectedSubfield ? "hide" : ""
                      }
                    />
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
            <Box sx={{ width: "100%" }}>
              {prefrence === "" ?
                <Box>
                  <Typography sx={{ color: "black" }}>Resume</Typography>
                  <Stack direction={"row"} gap={1}>
                    <Typography sx={{ color: "rgb(0, 69, 166)", cursor: "pointer" }} onClick={() => setPrefrence("file")}>Attach Resume</Typography>
                    <Typography sx={{ color: "black" }}>or</Typography>
                    <Typography sx={{ color: "rgb(0, 69, 166)", cursor: "pointer" }} onClick={() => setPrefrence("link")}>Paste Resume</Typography>
                  </Stack>
                </Box>
                :
                prefrence === "file"
                  ?
                  <CustomInput type={"file"} placeholder={"Resume"} label={"Resume"} name={"cv"} />
                  :
                  <CustomInput type={"url"} placeholder={"Resume Link"} label={"Resume"} name={"cv"} />
              }
            </Box>
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
