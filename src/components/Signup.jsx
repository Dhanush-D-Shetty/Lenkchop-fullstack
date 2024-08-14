
import React, { useEffect, useState } from "react";
import Error from "./Error";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScaleLoader } from "react-spinners";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { signUp } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urlState } from "@/context";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", profile_pic: null });
  const [errors, setErrors] = useState([]);
  const { data, loading, error, fn: fnSignUp } = useFetch(signUp, formData); // custom-hook

  const navigate = useNavigate();
  const [seachParams] = useSearchParams();
  const longLink = seachParams.get("createNew");
  //  console.log("search param = ",longLink);

  const { fetchUser } = urlState(); //  ...context api

  //  ..... getting the data from the form....
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  //......... frontend validation using Yup library
  const handleSignUp = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Please provide your Name."),
        email: Yup.string()
          .email("Invalid Email")
          .required("No email, no magic! Give us your address to proceed."),
        password: Yup.string()
          .min(6, "password should have minimum 6 character")
          .required("Password, please! Even superheroes need one!"),
        profile_pic: Yup.mixed(),
    });
    await schema.validate(formData, { abortEarly: false });

    //....... api call
    await fnSignUp();
    
  } catch (err) {

    const newError = {};
    err?.inner?.forEach((singleErr) => {
      // console.log("singleErr.path =" ,singleErr.path,"\n singleErr.message =" ,singleErr.message);
      newError[singleErr.path] = singleErr.message;
    });
    setErrors(newError);
  }
};

useEffect(() => {
  // console.log(data);
  if (error === null && data) {
    navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    fetchUser();
  }
}, [error, loading]);

return (
  <Card>
    <CardHeader>
      <CardTitle className="text-center">Sign Up</CardTitle>
      <CardDescription className="text-center">"Join us and chop those links like a URL ninja!</CardDescription>
      {error && <Error message={error.message} />}
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Input
          type="string"
          name="name"
          placeholder="Dhansuh Shetty"
          onChange={handleChange}
        />
        {errors.name && <Error message={errors.name} />}
      </div>
      <div className="space-y-1">
        <Input
          type="email"
          name="email"
          placeholder="yourname@example.com"
          onChange={handleChange}
        />
        {errors.email && <Error message={errors.email} />}
      </div>
      <div className="space-y-1">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <Error message={errors.password} />}
      </div>
      <div className="space-y-1">
        <Input
          type="file"
          name="profile_pic"
          accept="img/*"
          onChange={handleChange}
        />
        {errors.img && <Error message={errors.img} />}
      </div>
    </CardContent>
    <CardFooter className="flex justify-end">
      <Button onClick={handleSignUp} className="hover:scale-[0.9] transition-all">
        {loading ? <ScaleLoader height={10} /> : "SignUp"}
      </Button>
    </CardFooter>
  </Card>
);
};

export default Signup