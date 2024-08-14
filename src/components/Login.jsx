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
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urlState } from "@/context";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);
  const { data, loading, error, fn: fnLogin } = useFetch(login, formData); // custom-hook

  const navigate = useNavigate();
  const [seachParams] = useSearchParams();
  const longLink = seachParams.get("createNew");
  //  console.log("search param = ",longLink);

  const { fetchUser } = urlState(); //  ...context api

  //  ..... getting the data from the form....
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //......... frontend validation using Yup library
  const handleLoginButton = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("No email, no magic! Give us your address to proceed."),
        password: Yup.string()
          .min(6, "password should have minimum 6 character")
          .required("An Password is like a VIP pass—don't forget yours!"),
      });
      await schema.validate(formData, { abortEarly: false });
      //....... api call
      await fnLogin();

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
  }, [data, error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Log-In</CardTitle>
        <CardDescription className="text-center">"Log In - Time to Chop Links Like a Pro!"</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
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
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleLoginButton} className="hover:scale-[0.9] transition-all">
          {loading ? <ScaleLoader height={10} /> : "Log-In"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
