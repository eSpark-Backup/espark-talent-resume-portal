import supabase from "@/app/services/supabaseClient";
import { useEffect, useState } from "react";


function useFetchCandidates() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        const fetchAllCandidates = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase.from('Applicants')


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
    }, []);

    return { candidates, loading, error };
}

export default useFetchCandidates;