import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  //   const linkClass = ({ isActive }) =>
  //     isActive
  //       ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
  //       : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-indigo-900 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                MERN AUTH
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                {userInfo ? (
                  <>
                    <p
                      to="/"
                      className="text-white hover:text-white rounded-md px-3 py-2"
                    >
                      Hi <b>{userInfo.name}</b>
                    </p>

                    <NavLink
                      to="/profile"
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      Manage Account
                    </NavLink>

                    <NavLink
                      to="/logout"
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                      onClick={logoutHandler}
                    >
                      logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      Log In
                    </NavLink>

                    <NavLink
                      to="/register"
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
