import DeviceStats from "@/components/DeviceStats";
import Location from "@/components/Location";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bounce, toast } from "react-toastify";

import { urlState } from "@/context";
import { getClicksforUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const Links = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = urlState(); //  current user data from the context-api
  const {
    data: url,
    loading,
    error,
    fn: fnUrls,
  } = useFetch(getUrl, { id, user_id: user?.id }); // urls data from the table
  //.. data of  numbetr of Clicks and related info  from the table for the respective user   ( urls will be an array )
  const {
    data: stats,
    loading: loadingStats,
    fn: fnStats,
  } = useFetch(getClicksforUrl, id); // clicks data from the table for the respective user
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fnUrls();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  //  .... toast
  const notify = () =>
    toast.success("Clipboard express: your link's there!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const copyToClipboard = () => {
    notify(); //...toast
    return navigator.clipboard.writeText(
      `${import.meta.env.VITE_URL}${url.short_url}`
      // `https://linkchop.in/${url.short_url}`
    );
  };

  const deleteButton = () => {
    fnDelete();
  };
  const downloadQr = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width="100%" color="white" />
      )}
      <div className="flex flex-col sm:flex-row gap-8 justify-between mb-3">
        <div className=" flex flex-col gap-8 rounded-lg  items-start  sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-poniter">
            {url?.title}
          </span>
          <a
            href={`${import.meta.env.VITE_URL}${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl gap-1  font-bold  text-blue-400 cursor-pointer hover:underline">
            {`${import.meta.env.VITE_URL}${link}`}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 cursor-pointer hover:underline">
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex  items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          {/*  .... Buttons copy ,delete ,download  .... */}
          <div className="btns flex flex-2">
            <Button
              className="copy-btn"
              variant="ghost"
              onClick={copyToClipboard}>
              <Copy /> {/* copy icons from lucis-icons */}
            </Button>
            <Button
              className="download-btn"
              variant="ghost"
              onClick={downloadQr}>
              <Download /> {/* download icons from lucis-icons */}
            </Button>
            <Button
              className="delete-btn"
              variant="ghost"
              onClick={deleteButton}>
              {loadingDelete ? (
                <BeatLoader color="white" size={5} />
              ) : (
                <Trash2 />
              )}
            </Button>
          </div>

          <img
            src={url?.qr}
            alt=""
            className="w-full self-center sm:self-start object-contain p-1 ring ring-blue-500"
          />
        </div>
        <div className="sm:w-3/5">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-extra-bold">Stats : </CardTitle>
            </CardHeader>
            {stats && stats?.length ? (
              <CardContent className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Total Clicks</CardTitle>
                    <CardContent className="text-center">
                      <p className='text-3xl font-bold'>{stats?.length}</p>
                    </CardContent>
                  </CardHeader>
                </Card>
                <CardTitle className="">Location Data:</CardTitle>
                <Location stats={stats} />
                <CardTitle className="">Device info :</CardTitle>
                <DeviceStats stats={stats} />
              </CardContent>
            ) : (
              <CardContent>
                {loadingStats === false ? "No Statics yet" : "Loading Stats..."}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Links;
