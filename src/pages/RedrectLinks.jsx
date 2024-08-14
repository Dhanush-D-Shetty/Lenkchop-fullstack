import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedrectLinks = () => {
  const { id } = useParams();
  const { data, loading, fn } = useFetch(getLongUrl, id); // ... getting url from the databse

  const { loading: loadingStats, error, fn: fnstats, } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url
  });   // ... getting data about clicks on the url ...

  useEffect(() => {
    // to get the url  on loading the component
      fn();
  }, [])

  useEffect(() => {
    //    if loading is stopped and we got the data,
    // then call the fn for loading data related to clicks
    if (!loading && data) {
      fnstats();
    }
  }, [loading])


  if (loading || loadingStats) {
    return <>
      <BarLoader width={"100%"} color="white" />
      <br />
      <h1 className="text-6xl  text-gray-400">  Redirecting   ...... </h1>
    </>
  }

};

export default RedrectLinks;
