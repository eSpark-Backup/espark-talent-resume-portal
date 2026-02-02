'use client';
import {
  ConfirmationModal,
  Dropdown,
  Loader,
  LoginModal,
} from '@/app/components';
import { utils, writeFileXLSX } from 'xlsx';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
  availibilityOptions,
  citiesWithLabelValue,
  educationOption,
  jobTypeOptions,
  expOptions,
  field,
  prefOptions,
  COUNTRIES_OPTIONS,
  ADMIN_EMAIL,
  genderOptions,
} from '@/constant';
import useFetchCandidates from '@/hooks/useFetchCandidates';
import { DateMonthYear } from '@/utility/DataConverter';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SearchInput from '@/common/SearchInput';
import {
  Checkbox,
  Tooltip,
  Typography,
  Box,
  Stack,
  InputLabel,
  TextField,
} from '@mui/material';
import CustomModal from '@/common/Modal';
import supabase from '@/app/services/supabaseClient';
import { isValidURL } from '@/utility/URLValidator';
import DatePicker from 'react-datepicker';
import { CustomInputForDatePicker } from '@/app/components/inputs/datePicker';
import PositionInput from './components/inputs/positionInput';

const Home = () => {
  // State to track if the user is authenticated
  const [authed, setAuthed] = useState(false);

  // State to control whether a modal or drawer is open
  const [open, setOpen] = useState(false);

  // State to control visibility of the delete confirmation modal
  const [DeleteModal, setDeleteModal] = useState(false);

  // State to hold the fetched candidate data array
  const [data, setData] = useState([]);

  // State to track if the "select all" checkbox is checked
  const [allCheck, setAllCheck] = useState(false);

  // Custom hook to fetch candidates with various states and filters
  const {
    candidates, // List of candidates fetched
    setCandidates, // Function to update candidates list
    loading, // Loading state during fetch
    error, // Error state if fetch fails
    filter, // Filter value for candidates
    setFilter, // Function to update filter
    search, // Search query string
    setSearch, // Function to update search query
    setLoading, // Function to update loading state
    startDate, // Filter start date
    setStartDate, // Function to update start date
    endDate, // Filter end date
    setEndDate, // Function to update end date
  } = useFetchCandidates(authed, setAllCheck);

  // State to hold the resume content or path to be revamped/edited
  const [revampResume, setRevampResume] = useState('');

  // State to control visibility of a modal (e.g., for editing or details)
  const [showModal, setShowModal] = useState(false);

  // State to hold the data of the currently selected row
  const [row, setRow] = useState(null);

  // Loader state for showing loading spinner inside a modal
  const [modalLoader, setModalLoader] = useState(false);

  // State to hold which column should remain frozen (sticky) in a table
  const [frozenColumn, setFrozenColumn] = useState(null);

  // State to check if any checkbox in the list is checked
  const [isAnyChecked, setIsAnyChecked] = useState(false);

  // Retrieve authentication info from localStorage safely
  const AuthInfo =
    typeof window !== 'undefined' &&
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('supabase.auth.token'));

  // State to check if the authenticated user is an admin
  const [isAdmin, setIsAdmin] = useState(false);

  // State to hold the ID of the candidate selected for deletion
  const [deleteId, setDeleteId] = useState(null);

  // Loader state while performing the delete operation
  const [deleteLoader, setDeleteLoader] = useState(false);

  // Function to open delete modal and set the candidate ID to be deleted
  const handleDelete = async (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };
  // Function to handle deleting candidates from the database using Supabase
  const handleSupabaseDelete = async () => {
    // If a single candidate ID is set for deletion
    if (deleteId) {
      setDeleteLoader(true); // Show loader during deletion

      // Call Supabase to delete the candidate with the matching id
      const { data, error } = await supabase
        .from('Applicants')
        .delete()
        .eq('id', deleteId);

      if (error) {
        console.error(error); // Log error to console
        setDeleteLoader(false); // Hide loader
        toast.error('Error while deleting candidate'); // Show error toast notification
        return; // Exit early on error
      }

      if (data) {
        const updatedData = data[0]; // Supabase returns deleted data array, take the first item

        // Remove the deleted candidate from the local state to update UI
        setCandidates((prev) =>
          prev.filter((item) => item.id !== updatedData?.id)
        );

        toast.success('Candidate Deleted Successfully'); // Show success message
        setDeleteModal(false); // Close the delete confirmation modal
        setDeleteLoader(false); // Hide loader
      }
    } else {
      // If no specific deleteId, delete multiple candidates that are checked

      setDeleteLoader(true); // Show loader

      // Filter candidates that are selected (checked)
      const selectedData = data.filter((item) => item.checked);

      // Extract IDs of all checked candidates
      const ids = selectedData.map((item) => item.id);

      // Call Supabase to delete all candidates whose id is in the selected IDs list
      const { data: NewData, error } = await supabase
        .from('Applicants')
        .delete()
        .in('id', ids);

      if (error) {
        console.error(error); // Log any error
        toast.error('Error while deleting candidates'); // Show error toast
        setDeleteLoader(false); // Hide loader
        return; // Exit early on error
      }

      if (NewData) {
        // Remove all deleted candidates from local state
        setCandidates((prev) => prev.filter((item) => !ids.includes(item.id)));

        setDeleteModal(false); // Close delete modal
        setAllCheck(false); // Uncheck "select all" checkbox
        toast.success('Candidates Deleted Successfully'); // Show success message
        setDeleteLoader(false); // Hide loader
      }
    }
  };

  // useEffect to check if the authenticated user is an admin by comparing email with predefined ADMIN_EMAIL
  useEffect(() => {
    if (AuthInfo?.currentSession?.user?.email === ADMIN_EMAIL) {
      setIsAdmin(true); // User is admin
    } else {
      setIsAdmin(false); // User is not admin
    }
  }, [AuthInfo]); // Re-run whenever AuthInfo changes
  // Handler for when the date range picker changes its value
  // Receives an array of two dates [start, end]
  const handleRangePicker = (dates) => {
    const [start, end] = dates;
    setStartDate(start); // Update the start date filter state
    setEndDate(end); // Update the end date filter state
  };

  // Toggles freezing (locking) a specific column by its index
  const freezeColumn = (index) => {
    if (frozenColumn === index) {
      setFrozenColumn(null); // Unfreeze if already frozen
    } else {
      setFrozenColumn(index); // Freeze the clicked column
    }
  };

  // Returns a CSS class name if the column index matches the frozen column
  const getColumnClass = (index) =>
    frozenColumn === index ? 'fixed-column' : '';

  // Table headers for the candidate data columns
  const headers = [
    'Name',
    'Date',
    'Email',
    'Phone Number',
    'Gender',
    'Country',
    'City',
    'Education',
    'Major',
    'Github Profile',
    'LinkedIn Profile',
    'Availability',
    'Experience',
    'Preferences',
    'Salary Expectation',
    'Job Type',
    'Projects',
    'Tags',
    'Field',
    'Position',
    'CV',
    'Revamp CV',
    'Download Revamp CV',
    'Download Selected',
  ];

  // Add 'Actions' column header if the user is admin
  if (isAdmin) {
    headers.push('Actions');
  }

  // Handles toggling the checked state of a single candidate item in the data list
  const handleCheck = (obj) => {
    const temp = data.map((item) => {
      if (item.id === obj.id) {
        // Toggle checked property for the matching candidate
        return { ...item, checked: !item.checked };
      }
      return { ...item };
    });
    setData(temp); // Update data state with toggled checked state
  };

  // Handles toggling the "select all" checkbox and applies the checked state to all candidates
  const handleAllCheck = () => {
    if (allCheck) {
      setAllCheck(false); // Uncheck "select all"
      setData(candidates.map((item) => ({ ...item, checked: false }))); // Uncheck all candidates
    } else {
      setAllCheck(true); // Check "select all"
      setData(candidates.map((item) => ({ ...item, checked: true }))); // Check all candidates
    }
  };

  // Effect hook to update data and loading state whenever there is an error, candidates update, or position filter changes
  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast if there is an error fetching candidates
    }
    setLoading(true); // Set loading state true while updating data

    // Initialize data with candidates, adding a 'checked' property set to false for each
    setData(candidates.map((item) => ({ ...item, checked: false })));

    setLoading(false); // Set loading false after updating data
  }, [error, candidates, filter.position]);
  // Export all selected candidates to an Excel file
  const xportAll = useCallback(async () => {
    const columnIndexToRemove = 0; // Index of the column to remove (e.g., first column key)

    // Filter out candidates that are checked (selected)
    const selectedData = data.filter((item) => item.checked);

    // If no candidates selected, update state and exit
    if (selectedData.length <= 0) {
      setIsAnyChecked(false);
      return;
    }

    setIsAnyChecked(true); // Indicate at least one candidate is selected

    // Map selected data to remove unwanted keys and add resume URL
    const finalArr = selectedData.map((item) => {
      const { checked, id, name, ...rest } = item;
      return { id, name, ...rest, resume: process.env.PORTAL_LIVE_URL };
    });

    // Format each row for Excel export
    const formattedData = finalArr.map((row) => {
      const newRow = { ...row };

      // Remove the property of the first column key by index
      delete newRow[Object.keys(newRow)[columnIndexToRemove]];

      // Format the created_at date using a helper function
      newRow.created_at = DateMonthYear(newRow?.created_at);

      // If subField exists, merge it with field and then remove subField
      if (newRow.subField) {
        newRow.field = `${newRow.field} / ${newRow.subField}`;
        delete newRow.subField;
      } else {
        delete newRow.subField;
      }

      // Remove unwanted keys that should not appear in export
      delete newRow.cv;
      delete newRow.revamp_cv;
      delete newRow.tags;

      // Format the resume field as a clickable hyperlink in Excel
      newRow.resume = {
        f: `HYPERLINK("${newRow?.resume}", "Click Here")`,
        t: 'n',
        v: newRow?.resume,
      };

      return newRow;
    });

    // Create a worksheet from JSON data
    const ws = utils.json_to_sheet(formattedData);

    // Define headers for the Excel sheet columns
    const headers = [
      'Name',
      'Date',
      'Email',
      'LinkedIn URL',
      'Exp Sallary',
      'Experience',
      'Availability',
      'Preference',
      'Education',
      'Github URL',
      'City',
      'Department',
      'Position',
      'Phone No',
      'Job Type',
      'Projects',
      'Country',
      'Gender',
      'Major',
      'Resume',
    ];

    // Manually assign headers to the first row of worksheet
    headers.forEach((header, index) => {
      ws[String.fromCharCode(65 + index) + 1] = { v: header, t: 's' };
    });

    // Create a new workbook and append the worksheet
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');

    // Save the workbook to a file named 'data.xlsx'
    writeFileXLSX(wb, 'data.xlsx');
  });

  // Export a single selected candidate to an Excel file
  const xportSelected = useCallback(async (object) => {
    // Create a shallow copy of the candidate object and add resume URL
    const obj = {
      id: object.id,
      name: object.name,
      ...object,
      resume: process.env.PORTAL_LIVE_URL,
    };

    // Remove checked property which is irrelevant for export
    delete obj.checked;

    // Wrap object in an array to use same logic as bulk export
    const arr = [obj];
    const columnIndexToRemove = 0;

    // Format data similarly as in bulk export
    const formattedData = arr.map((row) => {
      const newRow = { ...row };

      // Remove first key column
      delete newRow[Object.keys(newRow)[columnIndexToRemove]];

      // Format created_at date
      newRow.created_at = DateMonthYear(newRow?.created_at);

      // Handle subField merging/removal
      if (newRow.subField) {
        newRow.field = `${newRow.field} / ${newRow.subField}`;
        delete newRow.subField;
      } else {
        delete newRow.subField;
      }

      // Remove unwanted keys
      delete newRow.cv;
      delete newRow.revamp_cv;
      delete newRow.tags;

      // Format resume hyperlink
      newRow.resume = {
        f: `HYPERLINK("${newRow?.resume}", "Click Here")`,
        t: 'n',
        v: newRow?.resume,
      };

      return newRow;
    });

    // Create worksheet from formatted data
    const ws = utils.json_to_sheet(formattedData);

    // Define headers for columns (same as bulk export)
    const headers = [
      'Name',
      'Date',
      'Email',
      'LinkedIn URL',
      'Exp Sallary',
      'Experience',
      'Availability',
      'Preference',
      'Education',
      'Github URL',
      'City',
      'Department',
      'Position',
      'Phone No',
      'Job Type',
      'Projects',
      'Country',
      'Gender',
      'Major',
      'Resume',
    ];

    // Set headers in worksheet first row
    headers.forEach((header, index) => {
      ws[String.fromCharCode(65 + index) + 1] = { v: header, t: 's' };
    });

    // Create new workbook, append worksheet, and save file named after candidate's name
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, `${obj?.name}.xlsx`);
  });
  // Handles updating filters based on filter name and value
  const handleFilter = (name, value) => {
    // Create a newValue object with label and value properties
    let newValue = { label: value, value: value };

    // Special case for 'position' filter: empty strings should reset the filter
    if (name == 'position') {
      if (newValue.label == '' && newValue.value == '') {
        newValue = '';
      }
      // Update only the position filter while keeping other filters intact
      setFilter((prev) => ({
        ...prev,
        [name]: newValue,
      }));
      return;
    }

    // Special case for 'field' filter: reset position when field changes
    if (name == 'field') {
      setFilter((prev) => ({
        ...prev,
        [name]: value,
        position: '',
      }));
      return;
    }

    // Default case: update the filter value for the given name
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generates a downloadable/openable resume link from a given resume key
  const handleGenerateResumeLink = async (resumeKey) => {
    try {
      // Request signed URL for the resume file from the backend API
      const data = await fetch(`/api?resume=${resumeKey}`);
      const { url } = await data.json();

      // Verify URL is valid by attempting to fetch it
      const res = await fetch(url);
      if (!res?.ok && res?.status === 403) {
        toast.error(
          "We're sorry, your requested resource could not be processed at this time"
        );
        return;
      }

      if (!url) {
        toast.error('Error generating resume link');
        return;
      }

      // Open the resume link in a new browser tab
      window.open(url, '_blank');
    } catch (error) {
      console.error(error);
      toast.error('Error generating resume link');
    }
  };

  // Handles file upload for updating the revamp CV for a candidate
  const handleChange = async (name, value) => {
    setModalLoader(true); // Show loader during upload process

    // Create a FormData object to hold the file data
    const formData = new FormData();
    formData.append('file', value);

    // Send POST request to backend API for file upload
    const response = await fetch('/api', {
      method: 'POST',
      body: formData,
    });

    // Get file key returned by API after successful upload
    const { fileKey } = await response.json();
    const id = row?.id;

    // Update the revamp_cv field in the Supabase database for the candidate
    const { data, error } = await supabase
      .from('Applicants')
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

    // Update the candidate list UI with the updated candidate data
    const updatedData = data[0];
    setCandidates((prev) =>
      prev.map((item) => {
        if (item.id === updatedData?.id) {
          return updatedData;
        }
        return item;
      })
    );

    toast.success('File uploaded successfully');
    setShowModal(false); // Close the modal after upload
    setModalLoader(false); // Hide loader
  };

  // Check if user is authenticated based on localStorage value
  const checkAuth = () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  };

  // Logout user: clear auth token, reset filters and UI states
  const logout = () => {
    localStorage.removeItem('auth');
    checkAuth(); // Recheck auth after removing token

    // Reset all filters to empty/default values
    setFilter({
      city: '',
      experience: '',
      availability: '',
      prefrences: '',
      education: '',
      field: '',
      position: '',
      job_type: '',
      gender: '',
      country: '',
    });

    setSearch(''); // Clear search input
    setStartDate(null); // Clear start date filter
    setEndDate(null); // Clear end date filter
    setOpen(false); // Close any open modals or dropdowns
  };

  // On component mount, check user authentication status
  useEffect(() => {
    checkAuth();
  }, []);

  // Whenever 'data' updates, check if any candidate is selected (checked)
  useEffect(() => {
    const anyChecked = data?.filter((item) => item?.checked);
    setIsAnyChecked(anyChecked.length > 0);
  }, [data]);

  // If not authenticated, show login modal only
  if (!authed) {
    return (
      <div className="login">
        <LoginModal open={true} setAuthed={setAuthed} />
      </div>
    );
  }

  // Capitalizes the first letter of each word in a string, preserving spaces and hyphens
  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(/(\s|-)/)
      .map((word) =>
        word.match(/[\s-]/)
          ? word
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  };

  return (
    <div className="home-main">
      <div className="jobs-container">
        <Box
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          className="jobs-header"
        >
          <Typography
            sx={{
              fontSize: '32px',
              fontWeight: 600,
              mb: { md: '0px', sm: '20px', xs: '20px' },
            }}
          >
            Candidates List
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              alignItems: 'flex-end',
              flexDirection: { xs: 'column', md: 'row' },
              width: { xs: '100%', md: 'max-content' },
            }}
          >
            <Stack
              sx={{ width: '100%' }}
              alignItems="flex-end"
              direction={{ xs: 'column', sm: 'row' }}
              gap="15px"
            >
              <Box
                sx={{
                  width: '100%',
                  '.react-datepicker-wrapper': {
                    width: { xs: '100%', sm: 'max-content' },
                  },
                  '.react-datepicker__close-icon': {
                    display: endDate ? 'table-cell' : 'none !important',
                  },
                }}
              >
                <InputLabel
                  htmlFor="date-range"
                  sx={{
                    color: 'inherit',
                    '&.Mui-focused': {
                      color: 'inherit',
                    },
                  }}
                >
                  Search by date
                </InputLabel>
                <DatePicker
                  id="date-range"
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
              placeholder={'Select Country'}
              label={'Country'}
              options={COUNTRIES_OPTIONS}
              value={filter.country}
              name={'country'}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={'Select City'}
              label={'City'}
              options={citiesWithLabelValue}
              value={filter.city}
              name={'city'}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={'Select Experience'}
              label={'Experience'}
              options={expOptions}
              value={filter.experience}
              name={'experience'}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={'Select Availability'}
              label={'Availability'}
              options={availibilityOptions}
              value={filter.availability}
              name={'availability'}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={'Select Preference'}
              label={'Preference'}
              options={prefOptions}
              value={filter.prefrences}
              name={'prefrences'}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={'Select Education'}
              label={'Education'}
              options={educationOption}
              value={filter.education}
              name={'education'}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={'Select Job Type'}
              label={'Job Type'}
              options={jobTypeOptions}
              value={filter.job_type}
              name={'job_type'}
              onChange={handleFilter}
            />
          </div>
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={'Select Field'}
              label={'Field'}
              options={field}
              value={filter.field}
              name={'field'}
              onChange={handleFilter}
            />
          </div>
          {filter.field && filter.field !== '' && (
            <div className="filter-dropdowns">
              <PositionInput
                name="position"
                label="Position"
                placeholder="Add Position (you are intrested in)"
                value={filter.position.value}
                onChange={handleFilter}
              />
            </div>
          )}
          <div className="filter-dropdowns">
            <Dropdown
              placeholder={'Select Gender'}
              label={'Gender'}
              options={genderOptions}
              value={filter.gender}
              name={'gender'}
              onChange={handleFilter}
            />
          </div>
        </div>
        {loading ? (
          <div className="load-conatiner">
            <span className="loader"></span>
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
                        header === 'Download Selected' || header === 'Actions'
                          ? null
                          : () => freezeColumn(index)
                      }
                      className={`cursor-pointer ${
                        frozenColumn === index ? 'fixed-column' : ''
                      }`}
                    >
                      <div className="table-headings-box">
                        {header === 'Download Selected' ? (
                          <div
                            className="action-cell"
                            style={{ marginLeft: '7px' }}
                          >
                            <button
                              onClick={xportAll}
                              style={
                                isAnyChecked
                                  ? { cursor: 'pointer' }
                                  : { cursor: 'not-allowed' }
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
                        ) : header === 'Actions' ? (
                          <div className="action-cell del-cell">
                            <button
                              onClick={
                                isAnyChecked ? () => handleDelete() : null
                              }
                              style={
                                isAnyChecked
                                  ? { cursor: 'pointer' }
                                  : { cursor: 'not-allowed' }
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
                        {header === 'Download Selected' ||
                        header === 'Actions' ? null : (
                          <ArrowRightIcon
                            sx={{
                              transform: `${
                                frozenColumn === index
                                  ? 'rotate(90deg)'
                                  : 'rotate(0deg)'
                              }`,
                              visibility: {
                                md: 'visible',
                                sm: 'hidden',
                                xs: 'visible',
                              },
                              fontSize: '17px',
                              color: '#000',
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
                          ? '-'
                          : capitalizeWords(item?.gender)}
                      </td>
                      <td className={getColumnClass(5)}>
                        {capitalizeWords(item?.country)}
                      </td>
                      <td className={getColumnClass(6)}>
                        {item?.city === null
                          ? '-'
                          : capitalizeWords(item?.city)}
                      </td>
                      <td className={getColumnClass(7)}>{item?.education}</td>
                      <td className={getColumnClass(8)}>
                        {item?.major === null
                          ? '-'
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
                      <td className={getColumnClass(12)}>{item?.experience}</td>
                      <td className={getColumnClass(13)}>
                        {capitalizeWords(item?.prefrences)}
                      </td>
                      <td className={getColumnClass(14)}>
                        {item?.salary_expection}
                      </td>
                      <td className={getColumnClass(15)}>
                        {capitalizeWords(item?.job_type)}
                      </td>
                      <td className={getColumnClass(16)}>
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
                        {/* {item?.subField && `/ ${item?.subField}`} */}
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
                              style={{ backgroundColor: 'white' }}
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
                                display: 'flex',
                                justifyContent: 'center',
                                columnGap: '10px',
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
              <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                No Applicants Found
              </h1>
            ) : (
              <div className="load-conatiner">
                <span className="loader"></span>
              </div>
            )}
          </div>
        )}
        {data && data.length > 0 && (
          <p
            style={{
              textAlign: 'right',
              marginTop: '10px',
              fontWeight: 900,
            }}
          >
            Total Applicants: {data.length}
          </p>
        )}
      </div>
      <CustomModal
        name={'revamp_resume'}
        filename={revampResume}
        onChange={handleChange}
        modalLoader={modalLoader}
        description={'Are you sure you want to proceed?'}
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
