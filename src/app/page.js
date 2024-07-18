"use client";
import {
  ConfirmationModal,
  Dropdown,
  Loader,
  LoginModal,
} from "@/app/components";
import { utils, writeFileXLSX } from "xlsx";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
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
  COUNTRIES_OPTIONS,
  ADMIN_EMAIL,
  genderOptions,
} from "@/constant";
import useFetchCandidates from "@/hooks/useFetchCandidates";
import { DateMonthYear } from "@/utility/DataConverter";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchInput from "@/common/SearchInput";
import {
  Checkbox,
  Tooltip,
  Typography,
  Box,
  Stack,
  InputLabel,
} from "@mui/material";
import CustomModal from "@/common/Modal";
import supabase from "@/app/services/supabaseClient";
import { isValidURL } from "@/utility/URLValidator";
import DatePicker from "react-datepicker";
import { CustomInputForDatePicker } from "@/app/components/inputs/datePicker";

const Home = () => {
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const {
    candidates,
    setCandidates,
    loading,
    error,
    filter,
    setFilter,
    search,
    setSearch,
    setLoading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useFetchCandidates(authed);
  const [revampResume, setRevampResume] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(null);
  const [modalLoader, setModalLoader] = useState(false);
  const [frozenColumn, setFrozenColumn] = useState(null);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const AuthInfo =
    typeof window !== "undefined" &&
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("supabase.auth.token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const handleDelete = async (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleSupabaseDelete = async () => {
    if (deleteId) {
      setDeleteLoader(true);
      const { data, error } = await supabase
        .from("Applicants")
        .delete()
        .eq("id", deleteId);
      if (error) {
        console.error(error);
        setDeleteLoader(false);
        toast.error("Error while deleting candidate");
        return;
      }
      if (data) {
        const updatedData = data[0];
        setCandidates((prev) => prev.filter((item) => item.id !== updatedData?.id));
        toast.success("Candidate Deleted Successfully");
        setDeleteModal(false);
        setDeleteLoader(false);
      }
    } else {
      setDeleteLoader(true);
      const selectedData = data.filter((item) => item.checked);
      const ids = selectedData.map((item) => item.id);
      const { data: NewData, error } = await supabase
        .from("Applicants")
        .delete()
        .in("id", ids);
      if (error) {
        console.error(error);
        toast.error("Error while deleting candidates");
        setDeleteLoader(false);
        return;
      }
     if (NewData) {
      setCandidates((prev) => prev.filter((item) => !ids.includes(item.id)));
      setDeleteModal(false);
      setAllCheck(false)
      toast.success("Candidates Deleted Successfully");
      setDeleteLoader(false);
     }
    }
  };

  useEffect(() => {
    if (AuthInfo?.currentSession?.user?.email === ADMIN_EMAIL) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [AuthInfo]);

  const handleRangePicker = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const freezeColumn = (index) => {
    if (frozenColumn === index) {
      setFrozenColumn(null);
    } else {
      setFrozenColumn(index);
    }
  };

  const getColumnClass = (index) =>
    frozenColumn === index ? "fixed-column" : "";

  const headers = [
    "Name",
    "Date",
    "Email",
    "Phone Number",
    "Gender",
    "Country",
    "City",
    "Education",
    "Major",
    "Github Profile",
    "LinkedIn Profile",
    "Availability",
    "Experience",
    "Preferences",
    "Salary Expectation",
    "Job Type",
    "Projects",
    "Tags",
    "Field",
    "Position",
    "CV",
    "Revamp CV",
    "Download Revamp CV",
    "Download Selected",
  ];

  if (isAdmin) {
    headers.push("Actions");
  }

  const handleCheck = (obj) => {
    const temp = data.map((item) => {
      if (item.id === obj.id) {
        return { ...item, checked: !item.checked };
      }
      return { ...item };
    });
    setData(temp);
  };

  const handleAllCheck = () => {
    if (allCheck) {
      setAllCheck(false);
      setData(candidates.map((item) => ({ ...item, checked: false })));
    } else {
      setAllCheck(true);
      setData(candidates.map((item) => ({ ...item, checked: true })));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    setLoading(true);
    setData(candidates.map((item) => ({ ...item, checked: false })));
    setLoading(false);
  }, [error, candidates]);

  const xportAll = useCallback(async () => {
    const columnIndexToRemove = 0;
    const selectedData = data.filter((item) => item.checked);
    if (selectedData.length <= 0) {
      setIsAnyChecked(false);
      return;
    }
    setIsAnyChecked(true);
    const finalArr = selectedData.map((item) => {
      const { checked, id, name, ...rest } = item;
      return { id, name, ...rest, resume: process.env.PORTAL_LIVE_URL };
    });
    const formattedData = finalArr.map((row) => {
      const newRow = { ...row };
      delete newRow[Object.keys(newRow)[columnIndexToRemove]];
      newRow.created_at = DateMonthYear(newRow?.created_at);
      if (newRow.subField) {
        newRow.field = `${newRow.field} / ${newRow.subField}`;
        delete newRow.subField;
      } else {
        delete newRow.subField;
      }
      delete newRow.cv;
      delete newRow.revamp_cv;
      delete newRow.tags;
      newRow.resume = {
        f: `HYPERLINK("${newRow?.resume}", "Click Here")`,
        t: "n",
        v: newRow?.resume,
      };
      return newRow;
    });
    const ws = utils.json_to_sheet(formattedData);
    const headers = [
      "Name",
      "Date",
      "Email",
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
      "Country",
      "Gender",
      "Major",
      "Resume",
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
      resume: process.env.PORTAL_LIVE_URL,
    };
    delete obj.checked;
    const arr = [obj];
    const columnIndexToRemove = 0;
    const formattedData = arr.map((row) => {
      const newRow = { ...row };
      delete newRow[Object.keys(newRow)[columnIndexToRemove]];
      newRow.created_at = DateMonthYear(newRow?.created_at);
      if (newRow.subField) {
        newRow.field = `${newRow.field} / ${newRow.subField}`;
        delete newRow.subField;
      } else {
        delete newRow.subField;
      }
      delete newRow.cv;
      delete newRow.revamp_cv;
      delete newRow.tags;
      newRow.resume = {
        f: `HYPERLINK("${newRow?.resume}", "Click Here")`,
        t: "n",
        v: newRow?.resume,
      };
      return newRow;
    });
    const ws = utils.json_to_sheet(formattedData);
    const headers = [
      "Name",
      "Date",
      "Email",
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
      "Country",
      "Gender",
      "Major",
      "Resume",
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
        return positionBysubfields[value];
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
      const res = await fetch(url);
      if (!res?.ok && res?.status === 403) {
        toast.error(
          "We're sorry, your requested resource could not be processed at this time"
        );
        return;
      }

      if (!url) {
        toast.error("Error generating resume link");
        return;
      }

      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
      toast.error("Error generating resume link");
    }
  };

  const handleChange = async (name, value) => {
    setModalLoader(true);
    const formData = new FormData();
    formData.append("file", value);

    const response = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    const { fileKey } = await response.json();
    const id = row?.id;

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
      setModalLoader(false);
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
    setModalLoader(false);
  };

  const checkAuth = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    checkAuth();
    setFilter({
      city: "",
      experience: "",
      availability: "",
      prefrences: "",
      education: "",
      field: "",
      position: "",
      job_type: "",
      gender: ""
    });
    setSearch("");
    setStartDate("");
    setEndDate("")
    setOpen(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const anyChecked = data?.filter((item) => item?.checked);
    if (anyChecked.length <= 0) {
      setIsAnyChecked(false);
    } else {
      setIsAnyChecked(true);
    }
  }, [data]);

  if (!authed) {
    return (
      <div className="login">
        <LoginModal open={true} setAuthed={setAuthed} />
      </div>
    );
  }

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(/(\s|-)/)
      .map((word) => (word.match(/[\s-]/) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join("");
  };
  
  return (
    <div className="home-main">
      <div className="jobs-container">
        <Box
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          className="jobs-header"
        >
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: 600,
              mb: { md: "0px", sm: "20px", xs: "20px" },
            }}
          >
            Candidates List
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "flex-end",
              flexDirection: { xs: "column", md: "row" },
              width: { xs: "100%", md: "max-content" },
            }}
          >
            <Stack
              sx={{ width: "100%" }}
              alignItems="flex-end"
              direction={{ xs: "column", sm: "row" }}
              gap="15px"
            >
              <Box
                sx={{
                  width: "100%",
                  ".react-datepicker-wrapper": {
                    width: { xs: "100%", sm: "max-content" },
                  },
                  ".react-datepicker__close-icon": {
                    display: endDate ? "table-cell" : "none !important",
                  },
                }}
              >
                <InputLabel
                  htmlFor="search"
                  sx={{
                    color: "inherit",
                    "&.Mui-focused": {
                      color: "inherit",
                    },
                  }}
                >
                  Search by date
                </InputLabel>
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  monthsShown={2}
                  selectsRange
                  dateFormat="MM/dd/yyyy"
                  selected={startDate}
                  onChange={handleRangePicker}
                  isClearable
                  customInput={<CustomInputForDatePicker />}
                />
              </Box>
              <SearchInput
                placeholder="search by name, email, phone"
                setSearch={setSearch}
                search={search}
              />
            </Stack>
            <button className="logout-btn" onClick={() => setOpen(true)}>
              Logout
            </button>
          </Box>
        </Box>
        <div className="dropdowns-parent">
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Country"}
              label={"Country"}
              options={COUNTRIES_OPTIONS}
              value={filter.country}
              name={"country"}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select City"}
              label={"City"}
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
          {filter.field && filter.field !== "" && (
            <div className="filter-dropdowns">
              <Dropdown
                placeholder={"Select Position"}
                label={"Position"}
                options={positionOptions}
                value={filter.position}
                name={"position"}
                onChange={handleFilter}
              />
            </div>
          )}
           <div className="filter-dropdowns">
            <Dropdown
              placeholder={"Select Gender"}
              label={"Gender"}
              options={genderOptions}
              value={filter.gender}
              name={"gender"}
              onChange={handleFilter}
            />
          </div>
        </div>
        {loading ? (
          <div className="load-conatiner">
            <span class="loader"></span>
          </div>
        ) : (
          <div className="table-parent">
            {data && data.length > 0 && !loading ? (
              <table>
                <thead>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      onClick={
                        header === "Download Selected" || header === "Actions"
                          ? null
                          : () => freezeColumn(index)
                      }
                      className={`cursor-pointer ${frozenColumn === index ? "fixed-column" : ""
                        }`}
                    >
                      <div className="table-headings-box">
                        {header === "Download Selected" ? (
                          <div
                            className="action-cell"
                            style={{ marginLeft: "7px" }}
                          >
                            <button
                              onClick={xportAll}
                              style={
                                isAnyChecked
                                  ? { cursor: "pointer" }
                                  : { cursor: "not-allowed" }
                              }
                            >
                              Download Selected
                            </button>
                            {!isAdmin && (
                              <Checkbox
                                checked={allCheck}
                                onChange={handleAllCheck}
                              />
                            )}
                          </div>
                        ) : header === "Actions" ? (
                          <div className="action-cell del-cell">
                            <button
                              onClick={
                                isAnyChecked ? () => handleDelete() : null
                              }
                              style={
                                isAnyChecked
                                  ? { cursor: "pointer" }
                                  : { cursor: "not-allowed" }
                              }
                            >
                              Delete Selected
                            </button>
                            <div className="del-check">
                              <Checkbox
                                checked={allCheck}
                                onChange={handleAllCheck}
                              />
                            </div>
                          </div>
                        ) : (
                          header
                        )}
                        {header === "Download Selected" ||
                          header === "Actions" ? null : (
                          <ArrowRightIcon
                            sx={{
                              transform: `${frozenColumn === index
                                  ? "rotate(90deg)"
                                  : "rotate(0deg)"
                                }`,
                              visibility: {
                                md: "visible",
                                sm: "hidden",
                                xs: "visible",
                              },
                              fontSize: "17px",
                              color: "#000",
                            }}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr key={index}>
                      <td className={getColumnClass(0)}>{item?.name}</td>
                      <td className={getColumnClass(1)}>
                        {DateMonthYear(item?.created_at)}
                      </td>
                      <td className={getColumnClass(2)}>{item?.email}</td>
                      <td className={getColumnClass(3)}>{item?.phone_num}</td>
                      {/* <td className={getColumnClass(4)}>{item?.cnic}</td> */}
                      <td className={getColumnClass(4)}>
                      {item?.gender === null
                          ? "-"
                          : capitalizeWords(item?.gender)}
                      </td>
                      <td className={getColumnClass(5)}>
                        {capitalizeWords(item?.country)}
                      </td>
                      <td className={getColumnClass(6)}>
                        {item?.city === null
                          ? "-"
                          : capitalizeWords(item?.city)}
                      </td>
                      <td className={getColumnClass(7)}>{item?.education}</td>
                      <td className={getColumnClass(8)}>
                      {item?.major === null
                          ? "-"
                          : capitalizeWords(item?.major)}
                      </td>
                      <td className={getColumnClass(9)}>
                        <a href={item?.github_profile} target="_blank">
                          {item?.github_profile}
                        </a>
                      </td>
                      <td className={getColumnClass(10)}>
                        <a href={item?.linkedin_profile} target="_blank">
                          {item?.linkedin_profile}
                        </a>
                      </td>
                      <td className={getColumnClass(11)}>
                        {item?.availability}
                      </td>
                      <td className={getColumnClass(11)}>{item?.experience}</td>
                      <td className={getColumnClass(12)}>{capitalizeWords(item?.prefrences)}</td>
                      <td className={getColumnClass(13)}>
                        {item?.salary_expection}
                      </td>
                      <td className={getColumnClass(14)}>{capitalizeWords(item?.job_type)}</td>
                      <td className={getColumnClass(15)}>
                        {item?.projects?.length > 50 ? (
                          <Tooltip placement="top-start" title={item?.projects}>
                            {item?.projects.slice(0, 50)}...
                          </Tooltip>
                        ) : (
                          item?.projects
                        )}
                      </td>
                      <td className={getColumnClass(17)}>
                        {item?.tags?.length > 50 ? (
                          <Tooltip placement="top-start" title={item?.tags}>
                            {item?.tags.slice(0, 50)}...
                          </Tooltip>
                        ) : (
                          item?.tags
                        )}
                      </td>
                      <td className={getColumnClass(18)}>
                        {item?.field}
                        {item?.subField && `/ ${item?.subField}`}
                      </td>
                      <td className={getColumnClass(19)}>{item?.position}</td>
                      <td className={getColumnClass(20)}>
                        {
                          !isValidURL(item?.cv) ? (
                            <button
                              className="td-button"
                              onClick={() => handleGenerateResumeLink(item?.cv)}
                            >
                              Download
                            </button>
                          ) : (
                            <a
                              href={item?.cv}
                              target="_blank"
                              style={{ backgroundColor: "white" }}
                            >
                              <button className="td-button">Link</button>
                            </a>
                          )
                          // item?.cv
                        }
                      </td>
                      <td
                        className={getColumnClass(21)}
                        onClick={() => setRow(item)}
                      >
                        {item?.revamp_cv ? (
                          <button
                            className="td-button"
                            onClick={() => setShowModal(true)}
                          >
                            Edit Revamp Resume
                          </button>
                        ) : (
                          <button
                            className="td-button"
                            onClick={() => setShowModal(true)}
                          >
                            Upload
                          </button>
                        )}
                      </td>
                      <td className={getColumnClass(22)}>
                        {!isValidURL(item?.revamp_cv) &&
                          !(item?.revamp_cv === null) ? (
                          <button
                            className="td-button"
                            onClick={() =>
                              handleGenerateResumeLink(item?.revamp_cv)
                            }
                          >
                            Download
                          </button>
                        ) : (
                          <span>No Resume Uploaded</span>
                        )}
                      </td>
                      <td className={`action-cell ${getColumnClass(23)}`}>
                        <button onClick={() => xportSelected(item)}>
                          Download
                        </button>
                        {!isAdmin && (
                          <Checkbox
                            checked={item?.checked}
                            onChange={() => handleCheck(item)}
                          />
                        )}
                      </td>
                      {isAdmin && (
                        <td className={getColumnClass(24)}>
                          {
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                columnGap: "10px",
                              }}
                            >
                              <button
                                onClick={() => handleDelete(item?.id)}
                                className="td-button del-button"
                              >
                                Delete
                              </button>
                              <Checkbox
                                checked={item?.checked}
                                onChange={() => handleCheck(item)}
                              />
                            </div>
                          }
                        </td>
                      )}

                    </tr>
                  ))}
                </tbody>
              </table>
            ) : data.length == 0 ? (
              <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                No Applicants Found
              </h1>
            )
            : (
              <div className="load-conatiner">
              <span class="loader"></span>
              </div>
            )
          }
          </div>
        )}
        {data && data.length > 0 && (
          <p
            style={{
              textAlign: "right",
              marginTop: "10px",
              fontWeight: 900,
            }}
          >
            Total Applicants: {data.length}
          </p>
        )}
      </div>
      <CustomModal
        name={"revamp_resume"}
        filename={revampResume}
        onChange={handleChange}
        modalLoader={modalLoader}
        description={"Are you sure you want to proceed?"}
        modalOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <ConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Confirm"
        canceltext="Cancel"
        confirmAction={logout}
        cancelAction={() => setOpen(false)}
      />
      <ConfirmationModal
        open={DeleteModal}
        handleClose={() => setDeleteModal(false)}
        title="Delete"
        description="Are you sure you want to delete"
        confirmText="Delete"
        canceltext="Cancel"
        confirmAction={() => handleSupabaseDelete()}
        cancelAction={() => setDeleteModal(false)}
        loading={deleteLoader}
      />
    </div>
  );
};

export default Home;
