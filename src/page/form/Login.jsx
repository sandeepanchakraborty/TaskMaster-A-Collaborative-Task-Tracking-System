import React, { useState, useEffect } from "react";
import "./Form.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import UserService from "@/utilities/UserService";
import { loginAction } from "@/redux/action";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000 - Date.now();

      if (expirationTime > 0) {
        dispatch(
          loginAction({
            token,
            id: decoded.id,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            role: decoded.role,
            isLogged: true,
          })
        );

        setTimeout(() => {
          localStorage.removeItem("authToken");
          dispatch(
            loginAction({
              token: "",
              id: "",
              firstName: "",
              lastName: "",
              email: "",
              role: "",
              isLogged: false,
            })
          );
          toast.error("Session expired. Please login again.");
          navigate("/login");
        }, expirationTime);
      } else {
        localStorage.removeItem("authToken");
      }
    }
  }, [dispatch, navigate]);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    let email = e.target.value;
    let errorMessage = "";

    if (email && email.length <= 3) {
      errorMessage = "Email must be greater than 3 characters";
    } else if (email && email.indexOf("@") === -1) {
      errorMessage = 'Email must contain "@"';
    } else if (email && email.indexOf("@") !== email.lastIndexOf("@")) {
      errorMessage = 'Email must contain only one "@"';
    } else if (email && email.lastIndexOf(".") < email.indexOf("@")) {
      errorMessage = "Expected format: example@gmail.com";
    } else if (form.email.length > 42) {
      errorMessage.email = "Email must be less than 42 characters.";
    }

    setForm({ ...form, email });

    if (!validateEmail(email)) {
      setErrors({
        ...errors,
        email: errorMessage || "Please enter a valid email address",
      });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 42) {
      return "Password must be between 8 and 42 characters long";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setForm({ ...form, password });
    const passwordError = validatePassword(password);
    setErrors({ ...errors, password: passwordError });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!form.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!form.password) {
      errors.password = "Password is required";
      isValid = false;
    } else {
      const passwordError = validatePassword(form.password);
      if (passwordError) {
        errors.password = passwordError;
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogged) {
      return navigate("/");
    } else {
      if (!validateForm()) {
        toast.error("Please fill the form before submitting.");
        return;
      }
    }

    try {
      const response = await UserService.login(form);
      if (response?.success) {
        const { token } = response;

        localStorage.setItem("authToken", token);

        const decoded = jwtDecode(token);
        console.log(decoded);

        const expirationTime = decoded.exp * 1000 - Date.now();

        dispatch(
          loginAction({
            token: response.token,
            id: response?.data?.id,
            firstName: response?.data?.firstName,
            lastName: response?.data?.lastName,
            email: response?.data?.email,
            role: response?.data?.role,
            isLogged: true,
          })
        );

        setTimeout(() => {
          localStorage.removeItem("authToken");
          dispatch(
            loginAction({
              token: "",
              id: "",
              firstName: "",
              lastName: "",
              email: "",
              role: "",
              isLogged: false,
            })
          );
          toast.error("Session expired. Please login again.");
          navigate("/login");
        }, expirationTime);

        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-slate-100 w-screen h-screen mx-auto flex justify-center items-center shadow-xl">
      <h1 className="sm:text-2xl text-xl capitalize m-1 md:text-3xl">
        welcome to web-based <br className="sm:m-0 md:mt-2" />
        task <span className="text-[#F87F16]"> management system</span>
      </h1>
      <div className="login-box w-full shadow-xl rounded-br-lg">
        <h2 className="text-3xl font-bold text-[#171643]">Login</h2>
        <form autoComplete="off" onSubmit={handleSubmit} className="w-full">
          <div className="form-group w-full">
            <label
              htmlFor="userName"
              className="mb-3 text-[#171643] text-xl sm:text-2xl"
            >
              Email
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.email ? "is-invalid" : ""
              } text-xl`}
              id="username"
              placeholder="Enter your email"
              autoComplete="off"
              value={form.email}
              onChange={handleEmailChange}
            />
            {errors.email && (
              <div className="invalid-feedback text-red-800 text-lg">
                {errors.email}
              </div>
            )}
          </div>
          <div className="form-group relative">
            <label
              htmlFor="userPassword"
              className="mb-3 text-[#171643] text-xl sm:text-2xl"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              } text-xl`}
              id="password"
              placeholder="Enter your password"
              autoComplete="off"
              value={form.password}
              onChange={handlePasswordChange}
            />
            <span
              className="absolute right-2 top-12 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
            {errors.password && (
              <div className="invalid-feedback text-red-800 text-lg">
                {errors.password}
              </div>
            )}
          </div>
          <div className="form-group">
            <Link
              to="/forgetPassword"
              className="forgot-password-link hover:text-black text-lg"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] text-2xl"
          >
            <div className="relative rounded-xl bg-slate-950/50 py-2 transition-colors group-hover/btn:bg-transparent">
              <span className="relative flex items-center justify-center gap-2">
                Login
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                >
                  <path
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
