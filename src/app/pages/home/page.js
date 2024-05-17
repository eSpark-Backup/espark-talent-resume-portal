"use client"
import { ConfirmationModal, Dropdown, ImgUploader, LoginModal } from '@/app/components'
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
  stackOptions,
  subField,
  tableData,
  techOptions,
} from '@/constant'
import useFetchCandidates from '@/hooks/useFetchCandidates'
import { DateMonthYear } from '@/utility/DataConverter'
import React, { useCallback, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { toast } from "react-toastify";
import Link from 'next/link';
import SearchInput from '@/common/SearchInput';
import { Checkbox } from '@mui/material';
import CustomModal from '@/common/Modal';

const Home = () => {
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const [allCheck, setAllCheck] = useState(false)
  const { candidates, loading, error, filter, setFilter, search, setSearch } = useFetchCandidates()
  const [revampResume, setRevampResume] = useState("")
  const [showModal, setShowModal] = useState(false)

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
      return rest;
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
      newRow.cv = {
        f: `HYPERLINK("${`http://localhost:3000/api?resume=${newRow?.cv}`}", "Download")`,
        t: 'n',
        v: `http://localhost:3000/api?resume=${newRow?.cv}`
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
      "Resume",
      "Phone No",
      "Tags",
      "Job Type",
      "Projects",
    ];
    headers.forEach((header, index) => {
      ws[String.fromCharCode(65 + index) + 1] = { v: header, t: "s" };
    });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "data.xlsx");
  });

  const xportSelected = useCallback(async (obj) => {
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
      newRow.cv = {
        f: `HYPERLINK("${`http://localhost:3000/api?resume=${newRow?.cv}`}", "Download")`,
        t: 'n',
        v: `http://localhost:3000/api?resume=${newRow?.cv}`
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
      "Resume",
      "Phone No",
      "Tags",
      "Job Type",
      "Projects",
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

  const handleChange = (name, value) => {
    console.log(name, value)
  }

  const checkAuth = () => {
    const auth = localStorage.getItem("auth");
    if(auth) {
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
            <Link href={"/pages/post-cv"} style={{ marginTop: "10px" }}>
              <button>Post CV</button>
            </Link>
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
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#0f0f0f"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div> : <div className="table-parent">
          {data && data.length > 0 ? <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Cnic</th>
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
                <th>Revamp Resume</th>
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
                  <td>{
                    item?.revamp_Resume
                      ?
                      <button onClick={() => setShowModal(true)}>Edit Revamp Resume</button>
                      :
                      <ImgUploader
                        onChange={handleChange}
                        name={"revamp_resume"}
                        filename={revampResume}
                        table={true}
                      />
                  }
                  </td>
                  <td className='action-cell'>
                    <button onClick={() => xportSelected(item)}>Download</button>
                    {/* <input style={{backgroundColor:"red !important"}} checked={item?.checked} onChange={() => handleCheck(item)} type='checkbox' /> */}
                    <Checkbox checked={item?.checked} onChange={() => handleCheck(item)} />
                  </td>
                </tr>
              ))}

            </tbody>
          </table> :
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>No Applicants Found</h1>}
        </div>}
      </div>
      <CustomModal name={"revamp_resume"} filename={revampResume} onChange={handleChange} description={"Are you sure you want to update the resume?"} modalOpen={showModal} onClose={() => setShowModal(false)} />
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