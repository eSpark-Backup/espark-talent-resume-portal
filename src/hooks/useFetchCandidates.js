import supabase from "@/app/services/supabaseClient";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";


function useFetchCandidates() {
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
        job_type: ""
    });
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {
        const fetchAllCandidates = async () => {
            try {
                setLoading(true);

                let query = supabase.from('Applicants').select('*');

                for (const key in filter) {
                    if (filter[key]) {
                        query = query.eq(key, filter[key]?.value)
                    }
                }

                if (search) {
                    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone_num.ilike.%${search}%`)
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

        fetchAllCandidates();
    }, [filter, debouncedSearch]);

    return { candidates, loading, error, filter, setFilter, search, setSearch, setLoading };
}

export default useFetchCandidates;