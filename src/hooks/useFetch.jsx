import { useState } from "react";

//  cb= api calling function (login)  , options= form-data //data 
const useFetch = (cb, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await cb(options, ...args);
            setData(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, fn };
}
export default useFetch;