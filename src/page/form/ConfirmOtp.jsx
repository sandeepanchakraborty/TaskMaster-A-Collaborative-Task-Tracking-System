import React, { useState } from "react";
import "./conifrm.css";

import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";
import UserService from "@/utilities/UserService";

function ConfirmOtp({ userId }) {
  const [form, setForm] = useState({ id: userId, otp: "" });
  const [otpError, setOtpError] = useState("");
  const [resetPasswordShow, setResetPasswordShow] = useState(false);
  const validateOtp = (otp) => {
    if (!otp || typeof otp !== "string") {
      return "OTP is required.";
    }

    otp = otp.trim();

    if (otp.length !== 6) {
      return "OTP must be 6 digits.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValidationError = validateOtp(form.otp);
    if (otpValidationError) {
      setOtpError(otpValidationError);
      return;
    } else {
      setOtpError("");
    }

    try {
      const response = await UserService.confirmOtp(form);
      // console.log(response);
      if (response.success) {
        toast.success("set new password");
        setResetPasswordShow(true);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("try again");
    }
  };

  return (
    <>
      {resetPasswordShow ? (
        <ResetPassword userId={userId} />
      ) : (
        <div className="container w-screen flex justify-center items-center">
          <div className="otp-box w-screen ">
            <h2 className="text-xl flex justify-center font-bold">
              Confirm OTP
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group w-full">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter the OTP"
                  value={form.otp} // Bind value to form state
                  onChange={(e) => {
                    setForm({
                      ...form,
                      otp: e.target.value,
                    });
                    setOtpError(validateOtp(e.target.value)); // Validate OTP as the user types
                  }}
                />
                {otpError && (
                  <p className="text-red-500 text-sm mt-1">{otpError}</p>
                )}
              </div>
              <button
                type="submit"
                className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] text-2xl"
              >
                <div className="relative rounded-xl bg-slate-950/50 py-1 transition-colors group-hover/btn:bg-transparent">
                  <span className="relative flex items-center justify-center gap-2">
                    Verify
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

export default ConfirmOtp;
