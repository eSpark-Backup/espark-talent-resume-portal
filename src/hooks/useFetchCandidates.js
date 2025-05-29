import supabase from '@/app/services/supabaseClient';
import moment from 'moment';
import 'moment-timezone';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

function useFetchCandidates(authed, setAllCheck) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]);
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

  // Store raw search input internally
  const [searchRaw, setSearchRaw] = useState('');
  const [debouncedSearch] = useDebounce(searchRaw.toLowerCase(), 500);

  // Set lowercase input to search
  const setSearch = (value) => setSearchRaw(value.toLowerCase());

  useEffect(() => {
    const fetchAllCandidates = async () => {
      try {
        setLoading(true);

        let query = supabase
          .from('Applicants')
          .select('*')
          .order('created_at', { ascending: false });

        for (const key in filter) {
          if (filter[key]) {
            query = query.eq(key, filter[key]?.value);
          }
        }

        if (debouncedSearch) {
          query = query.or(
            `name.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%,phone_num.ilike.%${debouncedSearch}%`
          );
        }

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

        const { data, error } = await query;

        if (error) {
          setError('Error fetching applicants');
          setLoading(false);
          setAllCheck(false);
        } else {
          setCandidates(data);
          setLoading(false);
          setAllCheck(false);
        }
      } catch (error) {
        setError('Error fetching applicants');
        setLoading(false);
        setAllCheck(false);
      }
    };

    if (authed) {
      fetchAllCandidates();
    }
    console.log(filter, 'filter;');
  }, [filter, debouncedSearch, authed, endDate]);

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
