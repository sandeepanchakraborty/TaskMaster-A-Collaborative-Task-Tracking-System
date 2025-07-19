import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./conifrm.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import UserService from "@/utilities/UserService";
function ResetPassword({ userId }) {
  const [form, setForm] = useState({ id: userId, password: "", cpassword: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Z])/.test(form.password) ||
      !/(?=.*[a-z])/.test(form.password) ||
      !/(?=.*[0-9])/.test(form.password) ||
      !/(?=.*[@#:$%^&*!])/.test(form.password)
    ) {
      newErrors.password =
        "Password must contain an uppercase letter, a lowercase letter, a number, and a special character.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (form.password.length > 42) {
      newErrors.password = "Password must be at most 42 characters.";
    }

    if (!form.cpassword) {
      newErrors.cpassword = "Confirm Password is required.";
    } else if (form.password !== form.cpassword) {
      newErrors.cpassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await UserService.resetPassword({
        password: form.password,
        cpassword: form.cpassword,
        id: userId,
      });
      // console.log(response);
      if (response.success) {
        toast.success("successfully changed the password");
        navigate("/login");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Failed to add student");
    }
  };

  return (
    <div className="container w-screen flex justify-center items-center">
      <div className="otp-box w-screen">
        <h2 className="text-xl flex justify-center font-bold">
          Reset Password
        </h2>
        {formError && (
          <p className="text-red-500 text-center text-sm mt-1">{formError}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group w-full mt-4 relative">
            <label htmlFor="password">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter your new password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              className="absolute right-2 top-8 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="form-group w-full mt-4 relative">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type={showCpassword ? "text" : "password"}
              className="form-control"
              id="cpassword"
              placeholder="Confirm your new password"
              value={form.cpassword}
              onChange={(e) => setForm({ ...form, cpassword: e.target.value })}
            />
            <span
              className="absolute right-2 top-8 cursor-pointer"
              onClick={() => setShowCpassword(!showCpassword)}
            >
              {showCpassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
            {errors.cpassword && (
              <p className="text-red-500 text-sm mt-1">{errors.cpassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] text-2xl "
          >
            <div className="relative rounded-xl bg-slate-950/50 py-2 transition-colors group-hover/btn:bg-transparent">
              <span className="relative flex items-center justify-center gap-2">
                Reset Password
              </span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
