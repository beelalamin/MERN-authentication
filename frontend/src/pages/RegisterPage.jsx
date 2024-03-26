import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      toast.error("password do not match!");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();

        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        // console.log("Invalid Credentials");
        toast.error(err?.data?.message || err);
      }
    }
  };

  return (
    <div>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitHandler}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Sign Up
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="Email"
                  id="email"
                  name="email"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="Confirmpassword"
                  name="Confirmpassword"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Confirm password"
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  required
                />
              </div>

              <div>
              <button
                  className="flex justify-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md  focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  <Loader loading={isLoading} />
                  <span className="ml-2"> Sign Up</span>
                </button>
              </div>

              <p className="text-sm mt-5 ">
                Already Have an account?
                <Link to="/login" className="text-indigo-400">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
