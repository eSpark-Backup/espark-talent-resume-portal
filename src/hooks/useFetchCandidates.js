import supabase from "@/app/services/supabaseClient";
import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";


function useFetchCandidates(authed) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [candidates, setCandidates] = useState([])
    const [filter, setFilter] = useState({
        city: "",
        experience: "",
        availability: "",
        prefrences: "",
        education: "",
        field: "",
        position: "",
        job_type: "",
        country: ""
    });
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {
        const fetchAllCandidates = async () => {
            try {
                setLoading(true);

                let query = supabase.from('Applicants').select('*').order("created_at", { ascending: false });

                for (const key in filter) {
                    if (filter[key]) {
                        query = query.eq(key, filter[key]?.value)
                    }
                }

                if (search) {
                    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone_num.ilike.%${search}%`)
                }

                if (startDate && endDate) {
                    // Parse and format the date strings while preserving the time zone
                    const formatDate = (date) => moment.tz(date, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)", "Asia/Karachi").format("YYYY-MM-DD");

                    const localIsoStringStartDate = formatDate(startDate);
                    const localIsoStringEndDate = formatDate(endDate);

                    // Ensure the time part is set to the start and end of the day
                    const startDateTime = moment(localIsoStringStartDate).startOf('day').toISOString();
                    const endDateTime = moment(localIsoStringEndDate).endOf('day').toISOString();

                    query = query
                        .gte("created_at", startDateTime)
                        .lte("created_at", endDateTime);
                }

                const { data, error } = await query

            if (error) {
                setError('Error fetching applicants');
            } else {
                setCandidates(data)

            }
        } catch (error) {
            setError('Error fetching applicants');
        }
    };

    if (authed) {
        fetchAllCandidates();
    }
}, [filter, debouncedSearch, authed, endDate]);

return { candidates, loading, error, filter, setFilter, search, setSearch, setLoading, startDate, setStartDate, endDate, setEndDate };
}

export default useFetchCandidates;