import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import * as Yup from "yup";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QRCode } from 'react-qrcode-logo';
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { urlState } from "@/context";

const CreateLink = () => {
    const navigate = useNavigate();
    const [seachParams, setSearchParams] = useSearchParams();
    const longLink = seachParams.get("createNew");
    const [formData, setFormData] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });
    const [errors, setErrors] = useState([]);
    const ref = useRef();
    const { user } = urlState();   // currnet user data
    const { data, loading, error, fn: fnCreateUrl } = useFetch(createUrl, { ...formData, user_id: user.id }); // custom-hook


    const schema = Yup.object().shape({
        title: Yup.string().required("title is required"),
        longUrl: Yup.string().url("must be a valid url").required("An Password is like a VIP pass—don't forget yours!"),
        customUrl: Yup.string()
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formData, { abortEarly: false });
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((reslove) => canvas.toBlob(reslove));
            await fnCreateUrl(blob);
        } catch (e) {
            const newError = {};
            e?.inner?.forEach((singleErr) => {
                // console.log("singleErr.path =" ,singleErr.path,"\n singleErr.message =" ,singleErr.message);
                newError[singleErr.path] = singleErr.message;
            });
            setErrors(newError);
        }
    }

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [data, error])


    return (

        <Dialog defaultOpen={longLink} onOpenChange={(res) => { if (!res) setSearchParams({}) }}>
            <DialogTrigger>
                <Button variant="destructive">Create New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                </DialogHeader>

                {/*  -------------- Qr Code  ----- */}
                {formData?.longUrl && <QRCode value={formData?.longUrl} size={250} ref={ref} />}

                {/* ------------ input field ------ */}
                <Input type="text" id="title" onChange={handleChange} value={formData.title} placeholder="Title" />
                {errors.title && <Error message={errors.title} />}

                <Input type="text" id="longUrl" onChange={handleChange} value={formData.longUrl} placeholder="Loooong url" />
                {errors.longUrl && <Error message={errors.longUrl} />}

                <div className="flex gap-2 items-center"  >
                    <Card className="p-2">LinkChop.in</Card> /
                    <Input id="customUrl" type="text" value={formData.customUrl} onChange={handleChange} placeholder="custom link (optional)" />
                </div>
                {error && <Error message={error.message} />}

                <DialogFooter className="sm:justify-end">
                    <Button disabled={loading} type="submit" onClick={createNewLink} variant="destructive">
                        {loading ? <BeatLoader size="10" color="white" /> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default CreateLink;
