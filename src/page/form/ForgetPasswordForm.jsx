import React, { useState } from "react";
import "./Form.css";

import { toast } from "react-toastify";
import ConfirmOtp from "./ConfirmOtp";
import UserService from "@/utilities/UserService";

function ForgetPasswordForm() {
  const [form, setForm] = useState({ email: "" });
  const [emailError, setEmailError] = useState("");
  const [optShow, setOptShow] = useState(false);
  const [userId, setUserId] = useState();

  const validateEmail = (email) => {
    if (!email || typeof email !== "string") {
      return "Email is required.";
    }

    email = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.length < 5 || email.length > 42) {
      return "Email must be between 5 and 42 characters.";
    }

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValidationError = validateEmail(form.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await UserService.forgetPassword(form);

      console.log(response);
      if (response.success) {
        setOptShow(true);
        setUserId(response.data.id);
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("try again");
    }
  };

  return (
    <>
      {optShow ? (
        <ConfirmOtp userId={userId} />
      ) : (
        <div className=" sm:w-screen container w-full bg-white ">
          <div className=" forgot-password-box shadow-2xl bg-white ">
            <h2 className="text-2xl font-bold">Forgot Password</h2>
            <p className="text-sm font-semibold sm:text-xl">
              Enter your email below to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="sm:w-full">
              <div className="form-group flex flex-col justify-center items-center">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      email: e.target.value,
                    });
                    setEmailError(validateEmail(e.target.value));
                  }}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] text-xl "
              >
                <div className="relative rounded-xl bg-slate-950/50 py-1 transition-colors group-hover/btn:bg-transparent">
                  <span className="relative flex items-center justify-center gap-2">
                    Send Verification
                  </span>
                </div>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgetPasswordForm;
