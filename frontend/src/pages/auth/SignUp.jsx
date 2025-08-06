import React, { useContext,useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!fullName) {
      setError("Full name is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setError("");
    // Here you would typically handle the sign-up logic, such as sending the data to your backend API.
    
    // API Call
    try {
      //upload image if present 
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    } 
    catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } 
      else {
        setError("An error occurred. Please try again later.");
      }
    }
  } 

  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[100%] h-auto md:h-full mt-10:mt-0 flex flex-col justify-center ">
          <h3 className="text-xl font-semibold text-black">
            Create an Account
          </h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Join us and start managing your finances today!
          </p>

          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Inputs
                value={fullName}
                onChange={({ target }) => setfullName(target.value)}
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
              />
              <Inputs
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="Enter your email address"
                type="text"
              />
              <div className="col-span-2">
                <Inputs
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="Minimum 8 characters"
                  type="password"
                />
              </div>
            </div>
            
            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
            <button type="submit" className="btn-primary">
              SIGN UP
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
