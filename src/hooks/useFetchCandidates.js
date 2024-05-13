import supabase from "@/app/services/supabaseClient";
import { useEffect, useState } from "react";


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
    });

    useEffect(() => {
        const fetchAllCandidates = async () => {
            try {
                setLoading(true);

                let query = supabase.from('Applicants').select('*');

                for (const key in filter) {
                    if (filter[key]) {
                        query = query.eq(key, filter[key]?.value);
                    }
                }


                const { data, error } = await query



                if (error) {
                    setError('Error fetching applicants');
                } else {
                    setCandidates(data)

                }
            } catch (error) {
                setError('Error fetching applicants');
            } finally {
                setLoading(false);
            }
        };

        fetchAllCandidates();
    }, [filter]);

    return { candidates, loading, error, filter, setFilter };
}

export default useFetchCandidates;