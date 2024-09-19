import {Copy, Download, Trash2} from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";
import {Button} from "./ui/button";
import {Bounce, toast} from "react-toastify";
import useFetch from "@/hooks/useFetch";
import {BeatLoader} from "react-spinners";
import {deleteUrl} from "@/db/apiUrls";

const LinkCard = ({urlData, fetchUrls}) => {
  const {loading: loadingDelete, fn: fnDelete} = useFetch(
    deleteUrl,
    urlData?.id
  );

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
      //   `https://linkchop.in/${urlData?.short_url}`
    );
  };

  const deleteButton = () => {
    fnDelete().then(() => fetchUrls());
  };
  const downloadQr = () => {
    const imageUrl = urlData?.qr;
    const fileName = urlData?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="link-card-container flex flex-col md:flex-row gap-5 border p-5 rounded-lg bg-gray-900">
      <img
        className="h-32 ring-blue-500 object-contain sm:self-start justify-center"
        src={urlData?.qr}
        alt="qr-code"
      />

      {/* ...... different urls ..... */}
      <Link className="urls flex flex-col flex-1" to={`/link/${urlData?.id}`}>
        <span className="text-3xl font-extrabold  hover:underline cursor-pointer">
          {urlData?.title}
        </span>
        <span className="text-2xl text-blue-500 font-bold  hover:underline cursor-pointer">
           {`${import.meta.env.VITE_URL}${link}`}
{/*           {urlData?.custom_url ? urlData?.custom_url : urlData?.short_url}} */}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {urlData?.original_url}
        </span>
        <span className="flex items-end text-sm font-extralight flex-1">
          {new Date(urlData?.created_at).toLocaleString()}
        </span>
      </Link>

      {/*  .... Buttons copy ,delete ,download  .... */}
      <div className="btns flex flex-2 justify-end">
        <Button className="copy-btn" variant="ghost" onClick={copyToClipboard}>
          <Copy /> {/* copy icons from lucis-icons */}
        </Button>
        <Button className="download-btn" variant="ghost" onClick={downloadQr}>
          <Download /> {/* download icons from lucis-icons */}
        </Button>
        <Button className="delete-btn" variant="ghost" onClick={deleteButton}>
          {loadingDelete ? <BeatLoader color="white" size={5} /> : <Trash2 />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
