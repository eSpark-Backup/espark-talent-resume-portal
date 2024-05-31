"use client"
import { ConfirmationModal, Dropdown, Loader, LoginModal } from '@/app/components'
import { utils, writeFileXLSX } from "xlsx";
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
import { Checkbox } from '@mui/material';
import CustomModal from '@/common/Modal';
import supabase from '@/app/services/supabaseClient';
import { isValidURL } from '@/utility/URLValidator';

const Home = () => {
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const [allCheck, setAllCheck] = useState(false)
  const { candidates, loading, error, filter, setFilter, search, setSearch } = useFetchCandidates()
  const [revampResume, setRevampResume] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [row, setRow] = useState(null)
  const [modalLoader, setModalLoader] = useState(false)

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
    setData(candidates.map(item => ({ ...item, checked: false })))
  }, [error, candidates])

  const xportAll = useCallback(async () => {
    const columnIndexToRemove = 0;
    const selectedData = data.filter(item => item.checked)
    const finalArr = selectedData.map(item => {
      const { checked, ...rest } = item;
      return {...rest, resume: process.env.PORTAL_LIVE_URL};
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
      newRow.resume = {
        f: `HYPERLINK("${newRow?.resume}", "Click Here")`,
        t: 'n',
        v: newRow?.resume
      }
      return newRow;
    });
    const ws = utils.json_to_sheet(formattedData);
    const headers = [
      "Date",
      "Name",
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
      "Tags",
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
      newRow.resume = {
        f: `HYPERLINK("${newRow?.resume}", "Click Here")`,
        t: 'n',
        v: newRow?.resume
      }
      return newRow;
    });
    const ws = utils.json_to_sheet(formattedData);
    const headers = [
      "Date",
      "Name",
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
      "Tags",
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
      const data = await fetch(`http://localhost:3000/api?resume=${resumeKey}`);
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
    setOpen(false);
  }

  useEffect(() => {
    checkAuth()
  }, [])

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
          <h1>Candidates List</h1>
          <div style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
            <SearchInput setSearch={setSearch} search={search} />
            <button style={{ marginTop: "10px" }} onClick={() => setOpen(true)}>Logout</button>
          </div>
        </div>
        <div className='dropdowns-parent'>
          <div className="filter-dropdowns">
            <Dropdown
              label={"Location"}
              options={citiesWithLabelValue}
              value={filter.city}
              name={"city"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              label={"Experience"}
              options={expOptions}
              value={filter.experience}
              name={"experience"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              label={"Availability"}
              options={availibilityOptions}
              value={filter.availability}
              name={"availability"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              label={"Preference"}
              options={prefOptions}
              value={filter.prefrences}
              name={"prefrences"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              label={"Education"}
              options={educationOption}
              value={filter.education}
              name={"education"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              label={"Job Type"}
              options={jobTypeOptions}
              value={filter.job_type}
              name={"job_type"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              label={"Field"}
              options={field}
              value={filter.field}
              name={"field"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              label={"Position"}
              options={positionOptions}
              value={filter.position}
              name={"position"}
              onChange={handleFilter}
            />
          </div>
        </div>
        {loading ? <div className='load-conatiner'>
          <Loader />
        </div> : <div className="table-parent">
          {data && data.length > 0 ? <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>CNIC</th>
                <th>Location</th>
                <th>Education</th>
                <th>Github</th>
                <th>Linked In</th>
                <th>Availability</th>
                <th>Experience</th>
                <th>Prefrence</th>
                <th>Exp Sallary</th>
                <th>Job type</th>
                <th>Description</th>
                <th>Field</th>
                <th>Position</th>
                <th>Download Resume</th>
                <th>Upload Rewamp Resume</th>
                <th>Download Rewamp Resume</th>

                <th className='action-cell'>
                  <button onClick={xportAll}>Download Selected</button>
                  {/* <input checked={allCheck} onChange={handleAllCheck} type='checkbox' /> */}
                  <Checkbox onChange={handleAllCheck} />
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{DateMonthYear(item?.created_at)}</td>
                  <td>{item?.email}</td>
                  <td>{item?.phone_num}</td>
                  <td>{item?.cnic}</td>
                  <td>{item?.city}</td>
                  <td>{item?.education}</td>
                  <td>
                    <a href={item?.github_profile} target="_blank">
                      {item?.github_profile}
                    </a>
                  </td>
                  <td>
                    <a href={item?.linkedin_profile} target="_blank">
                      {item?.linkedin_profile}
                    </a>
                  </td>
                  <td>{item?.availability}</td>
                  <td>{item?.experience}</td>
                  <td>{item?.prefrences}</td>
                  <td>{item?.salary_expection}</td>
                  <td>{item?.job_type}</td>
                  <td>{item?.projects}</td>
                  <td>
                    {item?.field}
                    {item?.subField && `/ ${item?.subField}`}
                  </td>
                  <td>{item?.position}</td>
                  <td >{
                    !isValidURL(item?.cv) ?
                      <button className='td-button' onClick={() => handleGenerateResumeLink(item?.cv)}>Download</button>
                      : <a href={item?.cv} target="_blank">
                        <button className='td-button'>Download</button>
                      </a>
                    // item?.cv
                  }
                  </td>
                  <td onClick={() => setRow(item)}>{
                    item?.revamp_cv
                      ?
                      <button className='td-button' onClick={() => setShowModal(true)}>Edit Revamp Resume</button>
                      :
                      <button className='td-button' onClick={() => setShowModal(true)}>Upload</button>
                  }
                  </td>
                  <td >{
                    (!isValidURL(item?.revamp_cv) && !(item?.revamp_cv === null)) ?
                      <button className='td-button' onClick={() => handleGenerateResumeLink(item?.revamp_cv)}>Download</button>
                      : <span>No Resume Uploaded</span>
                  }
                  </td>
                  <td className='action-cell'>
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