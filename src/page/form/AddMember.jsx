import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AddMember = ({ removePop, memberAdd }) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "member",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!form.firstName) {
      tempErrors.firstName = "First Name is required.";
    } else if (form.firstName.length < 2) {
      tempErrors.firstName = "First Name must be at least 2 characters.";
    } else if (!nameRegex.test(form.firstName)) {
      tempErrors.firstName = "First Name must not contain symbols or numbers.";
    } else if (form.firstName.length > 42) {
      tempErrors.firstName = "First Name must be less than 42 characters.";
    }

    if (!form.lastName) {
      tempErrors.lastName = "Last Name is required.";
    } else if (form.lastName.length < 2) {
      tempErrors.lastName = "Last Name must be at least 2 characters.";
    } else if (!nameRegex.test(form.lastName)) {
      tempErrors.lastName = "Last Name must not contain symbols or numbers.";
    } else if (form.lastName.length > 42) {
      tempErrors.lastName = "Last Name must be less than 42 characters.";
    }
    if (!form.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = "Invalid email format.";
    }
    if (!form.password) {
      tempErrors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Z])/.test(form.password) ||
      !/(?=.*[a-z])/.test(form.password) ||
      !/(?=.*[0-9])/.test(form.password) ||
      !/(?=.*[@#$%^&*!])/.test(form.password)
    ) {
      tempErrors.password =
        "Password must contain uppercase, lowercase, number, and special character.";
    } else if (form.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // console.log(form);
    memberAdd(form);
    removePop();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-transparent rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Member
      </h2>
      <form onSubmit={handleSubmit}>
        {["firstName", "lastName", "email"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-lg font-medium text-gray-700 capitalize">
              {field.replace("Name", " Name")}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              id={field}
              value={form[field]}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors[field] ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="mb-4 relative">
          <label className="block text-lg font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={form.password}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg`}
          />
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={removePop}
            className="px-2 py-1 bg-gray-400 mr-2 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 text-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="group/btn relative w-fit overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
          >
            <div className="relative rounded-xl bg-slate-950/50 px-4 py-2 transition-colors group-hover/btn:bg-transparent">
              <span className="relative flex items-center justify-center gap-2 text-xl">
                Add Member
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
