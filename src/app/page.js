"use client"
import { ConfirmationModal, Dropdown, Loader, LoginModal } from '@/app/components'
import { utils, writeFileXLSX } from "xlsx";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
  availibilityOptions,
  citiesWithLabelValue,
  educationOption,
  jobTypeOptions,
  expOptions,
  field,
  positionBysubfields,
  prefOptions,
  subField,
} from '@/constant'
import useFetchCandidates from '@/hooks/useFetchCandidates'
import { DateMonthYear } from '@/utility/DataConverter'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import SearchInput from '@/common/SearchInput';
import { Checkbox, Typography } from '@mui/material';
import CustomModal from '@/common/Modal';
import supabase from '@/app/services/supabaseClient';
import { isValidURL } from '@/utility/URLValidator';

const Home = () => {
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const [allCheck, setAllCheck] = useState(false)
  const { candidates, loading, error, filter, setFilter, search, setSearch, setLoading } = useFetchCandidates()
  const [revampResume, setRevampResume] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [row, setRow] = useState(null)
  const [modalLoader, setModalLoader] = useState(false)
  const [frozenColumn, setFrozenColumn] = useState(null);
  const [isAnyChecked, setIsAnyChecked] = useState(false)

  const freezeColumn = (index) => {
    if (frozenColumn === index) {
      setFrozenColumn(null);
    }
    else {
      setFrozenColumn(index);
    }
  };

  const getColumnClass = (index) => (frozenColumn === index ? 'fixed-column' : '');

  const headers = [
    'Name', 'Date', 'Email', 'Phone Number', 'CNIC', 'City', 'Education',
    'Github Profile', 'LinkedIn Profile', 'Availability', 'Experience',
    'Preferences', 'Salary Expectation', 'Job Type', 'Projects',
    'Field', 'Position', 'CV', 'Revamp CV', 'Download Revamp CV', 'Actions'
  ];

  const handleCheck = (obj) => {
    const temp = data.map(item => {
      if (item.id === obj.id) {
        return { ...item, checked: !item.checked }
      }
      return { ...item }
    })
    setData(temp)
  }

  const handleAllCheck = () => {
    if (allCheck) {
      setAllCheck(false)
      setData(candidates.map(item => ({ ...item, checked: false })))
    } else {
      setAllCheck(true)
      setData(candidates.map(item => ({ ...item, checked: true })))
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    setLoading(true)
    setData(candidates.map(item => ({ ...item, checked: false })))
    setLoading(false)
  }, [error, candidates])

  const xportAll = useCallback(async () => {
    const columnIndexToRemove = 0;
    const selectedData = data.filter(item => item.checked)
    if (selectedData.length <= 0) {
      setIsAnyChecked(false)
      return
    }
    setIsAnyChecked(true)
    const finalArr = selectedData.map(item => {
      const { checked, id, name, ...rest } = item;
      return { id, name, ...rest, resume: process.env.PORTAL_LIVE_URL };
    });
    const formattedData = finalArr.map((row) => {
      const newRow = { ...row };
      delete newRow[Object.keys(newRow)[columnIndexToRemove]];
      newRow.created_at = DateMonthYear(newRow?.created_at);
      if (newRow.subField) {
        newRow.field = `${newRow.field} / ${newRow.subField}`
        delete newRow.subField
      } else {
        delete newRow.subField
      }
      delete newRow.cv
      delete newRow.revamp_cv
      delete newRow.tags 
      newRow.resume = {
        f: `HYPERLINK("${newRow?.resume}", "Click Here")`,
        t: 'n',
        v: newRow?.resume
      }
      return newRow;
    });
    const ws = utils.json_to_sheet(formattedData);
    console.log(formattedData, "formattedData");
    const headers = [
      "Name",
      "Date",
      "Email",
      "CNIC",
      "LinkedIn URL",
      "Exp Sallary",
      "Experience",
      "Availability",
      "Preference",
      "Education",
      "Github URL",
      "City",
      "Department",
      "Position",
      "Phone No",
      "Job Type",
      "Projects",
      "Resume"
    ];
    headers.forEach((header, index) => {
      ws[String.fromCharCode(65 + index) + 1] = { v: header, t: "s" };
    });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "data.xlsx");
  });

  const xportSelected = useCallback(async (object) => {
    const obj = {
      id: object.id,
      name: object.name,
      ...object,
      resume: process.env.PORTAL_LIVE_URL
    }
    delete obj.checked;
    const arr = [obj]
    const columnIndexToRemove = 0;
    const formattedData = arr.map((row) => {
      const newRow = { ...row };
      delete newRow[Object.keys(newRow)[columnIndexToRemove]];
      newRow.created_at = DateMonthYear(newRow?.created_at);
      if (newRow.subField) {
        newRow.field = `${newRow.field} / ${newRow.subField}`
        delete newRow.subField
      } else {
        delete newRow.subField
      }
      delete newRow.cv
      delete newRow.revamp_cv
      delete newRow.tags
      newRow.resume = {
        f: `HYPERLINK("${newRow?.resume}", "Click Here")`,
        t: 'n',
        v: newRow?.resume
      }
      return newRow;
    });
    const ws = utils.json_to_sheet(formattedData);
    const headers = [
      "Name",
      "Date",
      "Email",
      "CNIC",
      "LinkedIn URL",
      "Exp Sallary",
      "Experience",
      "Availability",
      "Preference",
      "Education",
      "Github URL",
      "City",
      "Department",
      "Position",
      "Phone No",
      "Job Type",
      "Projects",
      "Resume"
    ];
    headers.forEach((header, index) => {
      ws[String.fromCharCode(65 + index) + 1] = { v: header, t: "s" };
    });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `${obj?.name}.xlsx`);
  });

  const handleFilter = (name, value) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [positionOptions, setPositionOptions] = useState(null);
  useEffect(() => {
    if (filter.field?.value === "Software Engineering") {
      const subFieldsArr = subField[filter.field?.value];
      const positionArr = subFieldsArr.map(({ value }) => {
        return positionBysubfields[value]
      });
      setPositionOptions(Object.values(positionArr).flat());
    } else {
      setPositionOptions(subField[filter.field?.value]);
    }
  }, [filter]);


  const handleGenerateResumeLink = async (resumeKey) => {
    try {
      const data = await fetch(`/api?resume=${resumeKey}`);
      const { url } = await data.json();

      if (!url) {
        toast.error("Error generating resume link");
      }

      window.open(url, "_blank");

    } catch (error) {
      console.error(error);
      toast.error("Error generating resume link");
    }
  }



  const handleChange = async (name, value) => {
    setModalLoader(true)
    const formData = new FormData();
    formData.append("file", value);

    const response = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    const { fileKey } = await response.json();
    const id = row?.id

    // update Supabase with the new file key
    const { data, error } = await supabase
      .from("Applicants")
      .update({
        revamp_cv: fileKey,
      })
      .match({ id });

    if (error) {
      console.error(error);
      setShowModal(false);
      setModalLoader(false)
      return;
    }

    // update the UI
    const updatedData = data[0];
    setData((prev) =>
      prev.map((item) => {
        if (item.id === updatedData?.id) {
          return updatedData;
        }
        return item;
      })
    );

    toast.success("File uploaded successfully");
    setShowModal(false);
    setModalLoader(false)

  }

  const checkAuth = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }

  const logout = () => {
    localStorage.removeItem("auth")
    checkAuth();
    setFilter({
      city: "",
      experience: "",
      availability: "",
      prefrences: "",
      education: "",
      field: "",
      position: "",
      job_type: ""
    })
    setOpen(false);
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    const anyChecked = data?.filter((item) => item?.checked)
    if (anyChecked.length <= 0) {
      setIsAnyChecked(false)
    }
    else {
      setIsAnyChecked(true)
    }
    console.log(anyChecked)
  }, [data])

  if (!authed) {
    return (
      <div className='login'>
        <LoginModal open={true} setAuthed={setAuthed} />
      </div>
    )
  }
  return (
    <div className='home-main'>
      <div className="jobs-container">
        <div className='jobs-header'>
          <Typography 
          sx={{
            fontSize: "32px",
            fontWeight: 600,
            mb: {md:"0px", sm:"20px", xs:"20px"}
          }}
          >Candidates List</Typography>
          <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
            <SearchInput placeholder="search by name, email, phone" setSearch={setSearch} search={search} />
            <button style={{ marginTop: "10px" }} onClick={() => setOpen(true)}>Logout</button>
          </div>
        </div>
        <div className='dropdowns-parent'>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Location"}
              label={"Location"}
              options={citiesWithLabelValue}
              value={filter.city}
              name={"city"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Experience"}
              label={"Experience"}
              options={expOptions}
              value={filter.experience}
              name={"experience"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Availability"}
              label={"Availability"}
              options={availibilityOptions}
              value={filter.availability}
              name={"availability"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Preference"}
              label={"Preference"}
              options={prefOptions}
              value={filter.prefrences}
              name={"prefrences"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Education"}
              label={"Education"}
              options={educationOption}
              value={filter.education}
              name={"education"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown 
              placeholder={"Select Job Type"}
              label={"Job Type"}
              options={jobTypeOptions}
              value={filter.job_type}
              name={"job_type"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Field"}
              label={"Field"}
              options={field}
              value={filter.field}
              name={"field"}
              onChange={handleFilter}
            />
          </div>
          {filter.field && filter.field !== "" && <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Position"}
              label={"Position"}
              options={positionOptions}
              value={filter.position}
              name={"position"}
              onChange={handleFilter}
            />
          </div>}
        </div>
        {loading ? <div className='load-conatiner'>
          <Loader />
        </div> : <div className="table-parent">
          {data && data.length > 0 ? <table>
            <thead>
              {headers.map((header, index) => (
                <th
                  key={index}
                  onClick={() => freezeColumn(index)}
                  className={`cursor-pointer ${frozenColumn === index ? 'fixed-column' : ''}`}
                >
                  <div className='table-headings-box'>
                    {header === "Actions" ?
                      <div className='action-cell' style={{marginLeft:"7px"}}>
                        <button onClick={xportAll} style={isAnyChecked?{cursor:"pointer"}:{cursor:"not-allowed"}}>Download Selected</button>
                        <Checkbox checked={allCheck} onChange={handleAllCheck} />
                      </div>
                      : header}
                    <ArrowRightIcon sx={{
                      transform: `${frozenColumn === index ? 'rotate(90deg)' : 'rotate(0deg)'}`,
                      visibility: { md: 'visible', sm: 'hidden', xs: 'visible' },
                      fontSize: '17px',
                      color: '#000'
                    }} />
                  </div>
                </th>
              ))}
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td className={getColumnClass(0)}>{item?.name}</td>
                  <td className={getColumnClass(1)}>{DateMonthYear(item?.created_at)}</td>
                  <td className={getColumnClass(2)}>{item?.email}</td>
                  <td className={getColumnClass(3)}>{item?.phone_num}</td>
                  <td className={getColumnClass(4)}>{item?.cnic}</td>
                  <td className={getColumnClass(5)}>{item?.city}</td>
                  <td className={getColumnClass(6)}>{item?.education}</td>
                  <td className={getColumnClass(7)}>
                    <a href={item?.github_profile} target="_blank">
                      {item?.github_profile}
                    </a>
                  </td>
                  <td className={getColumnClass(8)}>
                    <a href={item?.linkedin_profile} target="_blank">
                      {item?.linkedin_profile}
                    </a>
                  </td>
                  <td className={getColumnClass(9)}>{item?.availability}</td>
                  <td className={getColumnClass(10)}>{item?.experience}</td>
                  <td className={getColumnClass(11)}>{item?.prefrences}</td>
                  <td className={getColumnClass(12)}>{item?.salary_expection}</td>
                  <td className={getColumnClass(13)}>{item?.job_type}</td>
                  <td className={getColumnClass(14)}>{item?.projects}</td>
                  <td className={getColumnClass(15)}>
                    {item?.field}
                    {item?.subField && `/ ${item?.subField}`}
                  </td>
                  <td className={getColumnClass(16)}>{item?.position}</td>
                  <td className={getColumnClass(17)}>{
                    !isValidURL(item?.cv) ?
                      <button className='td-button' onClick={() => handleGenerateResumeLink(item?.cv)}>Download</button>
                      : <a href={item?.cv} target="_blank">
                        <button className='td-button'>Download</button>
                      </a>
                    // item?.cv
                  }
                  </td>
                  <td className={getColumnClass(18)} onClick={() => setRow(item)}>{
                    item?.revamp_cv
                      ?
                      <button className='td-button' onClick={() => setShowModal(true)}>Edit Revamp Resume</button>
                      :
                      <button className='td-button' onClick={() => setShowModal(true)}>Upload</button>
                  }
                  </td>
                  <td className={getColumnClass(19)}>{
                    (!isValidURL(item?.revamp_cv) && !(item?.revamp_cv === null)) ?
                      <button className='td-button' onClick={() => handleGenerateResumeLink(item?.revamp_cv)}>Download</button>
                      : <span>No Resume Uploaded</span>
                  }
                  </td>
                  <td className={`action-cell ${getColumnClass(20)}`}>
                    <button onClick={() => xportSelected(item)}>Download</button>
                    <Checkbox checked={item?.checked} onChange={() => handleCheck(item)} />
                  </td>
                </tr>
              ))}

            </tbody>
          </table> :
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>No Applicants Found</h1>}
        </div>}
      </div>
      <CustomModal name={"revamp_resume"} filename={revampResume} onChange={handleChange} modalLoader={modalLoader} description={"Are you sure you want to proceed?"} modalOpen={showModal} onClose={() => setShowModal(false)} />
      <ConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        title="Log Out"
        description="Are you sure you want to logout?"
        confirmText="Confirm"
        canceltext="Cancel"
        confirmAction={logout}
        cancelAction={() => setOpen(false)}
      />
    </div>
  )
}

export default Home