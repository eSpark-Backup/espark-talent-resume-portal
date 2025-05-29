// Import Supabase client for database operations
import supabase from '@/app/services/supabaseClient';
// Import moment and moment-timezone for date formatting
import moment from 'moment';
import 'moment-timezone';
// React hooks
import { useEffect, useState } from 'react';
// Debounce hook to limit API calls when typing
import { useDebounce } from 'use-debounce';

// Custom hook to fetch candidates from Supabase
function useFetchCandidates(authed, setAllCheck) {
  // State for date range filtering
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // State for loading and error status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // State to store fetched candidates
  const [candidates, setCandidates] = useState([]);
  // State for various filters (select fields)
  const [filter, setFilter] = useState({
    city: '',
    experience: '',
    availability: '',
    prefrences: '',
    education: '',
    field: '',
    position: '',
    job_type: '',
    country: '',
    gender: '',
  });

  // State to handle user input for search
  const [searchRaw, setSearchRaw] = useState('');
  // Debounced search to avoid making queries on every keystroke
  const [debouncedSearch] = useDebounce(searchRaw.toLowerCase(), 500);

  // Wrapper for search setter to ensure input is always lowercase
  const setSearch = (value) => setSearchRaw(value.toLowerCase());

  // Effect runs when filters, search input, or auth state changes
  useEffect(() => {
    // Async function to fetch candidates from Supabase
    const fetchAllCandidates = async () => {
      try {
        setLoading(true); // Set loading state

        // Start building query to fetch applicants
        let query = supabase
          .from('Applicants')
          .select('*')
          .order('created_at', { ascending: false });

        // Apply filters if set
        for (const key in filter) {
          if (filter[key]?.value) {
            query = query.ilike(key, `%${filter[key].value}%`);
          }
        }

        // Apply search if a value is entered
        if (debouncedSearch) {
          query = query.or(
            `name.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%,phone_num.ilike.%${debouncedSearch}%`
          );
        }

        // Apply date range filtering if both dates are present
        if (startDate && endDate) {
          const formatDate = (date) =>
            moment
              .tz(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)', 'Asia/Karachi')
              .format('YYYY-MM-DD');

          const localIsoStringStartDate = formatDate(startDate);
          const localIsoStringEndDate = formatDate(endDate);

          const startDateTime = moment(localIsoStringStartDate)
            .startOf('day')
            .toISOString();
          const endDateTime = moment(localIsoStringEndDate)
            .endOf('day')
            .toISOString();

          query = query
            .gte('created_at', startDateTime)
            .lte('created_at', endDateTime);
        }

        // Execute query and handle response
        const { data, error } = await query;

        if (error) {
          // Handle Supabase error
          setError('Error fetching applicants');
          setLoading(false);
          setAllCheck(false);
        } else {
          // Update state with fetched candidates
          setCandidates(data);
          setLoading(false);
          setAllCheck(false);
        }
      } catch (error) {
        // Catch network or unexpected errors
        setError('Error fetching applicants');
        setLoading(false);
        setAllCheck(false);
      }
    };

    // Fetch data only if user is authenticated
    if (authed) {
      fetchAllCandidates();
    }

  }, [filter, debouncedSearch, authed, endDate]);

  // Return state and functions for external usage
  return {
    candidates,
    setCandidates,
    loading,
    error,
    filter,
    setFilter,
    search: searchRaw,
    setSearch,
    setLoading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
}

export default useFetchCandidates;
