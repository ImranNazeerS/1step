import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  signOut,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import TopLoadingBar from 'react-top-loading-bar';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const topLoadingBarRef = useRef(null);

  const handleSignout = async () => {
    try {
      topLoadingBarRef.current.continuousStart(50);
      await fetch("/server/auth/signout");
      dispatch(signOut());
      navigate('/');
    }
    
    catch (error) {
      console.log(error);
    } finally {
      topLoadingBarRef.current.complete();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click outside of the dropdown, close it
        setDropdownVisible(false);
      }
    };

    // Attach the event listener to the document body
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      // Remove the event listener when the component is unmounted
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const navigation = [
    { title: "Home", path: "/" },
    { title: "For Parents", path: "" },
    { title: "For Providers", path: "" },
    { title: "About Us", path: "" },
  ];

  const submenuNav = [
    { title: "Overview", path: "/" },
    { title: "Diagnostic Evaluations", path: "/freescreeners" },
    { title: "Occupational Therapy", path: "" },
    { title: "Speech Therapy", path: "" },

    { title: "|" },
    { title: "Learn:" },
    { title: "Early Concerns: Start Here", path: "" },
    { title: "Read Expert Guides", path: "" },
  ];
  return (
    <header className="text-base lg:text-sm sticky top-0 z-50 bg-white border-b">
      <TopLoadingBar ref={topLoadingBarRef} color="#ff9900" height={3} />
      <div
        className={`bg-sky-200 items-center gap-x-14 px-4 max-w-screen-4xl mx-auto lg:flex lg:px-8 lg:static ${
          state ? "h-full fixed inset-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
          <Link to={"/"}>
            <img src={logo} width={120} height={50} alt="1Step" />
          </Link>
          <div className="lg:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${
            state ? "" : "hidden"
          }`}
        >
          <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex-1 items-center justify-start pb-4 lg:flex lg:pb-0"
            >
              <div className="flex items-center gap-1 px-2 border rounded-lg border-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-stone-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Find a therapist"
                  className="w-full px-2 py-2 text-black bg-transparent rounded-md outline-none"
                />
              </div>
            </form>
            {navigation.map((item, idx) => {
              return (
                <li key={idx}>
                  <a
                    href={item.path}
                    className="block text-gray-700 hover:text-gray-900"
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}

            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              {currentUser ? (
                <div> 
                  <img
                    id="avatarButton"
                    type="button"
                    data-dropdown-toggle="userDropdown"
                    data-dropdown-placement="bottom-start"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    src={currentUser.profilePicture}
                    alt="User dropdown"
                    onClick={toggleDropdown}
                    ref={dropdownRef}
                  />
                  {/* Dropdown menu */}
                  <div
                    id="userDropdown"
                    className={`z-10 ${
                      isDropdownVisible ? "" : "hidden"
                    } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                    style={{ position: 'absolute', top: '80px',right:'10px'}}
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>Hi,  {currentUser.username}</div>
                      <div className="font-medium truncate">
                      {currentUser.email}
                      </div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="avatarButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Providers
                        </a>
                      </li>
                      <li>
                        <Link to='/profile'
                          
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a href="#"
                        onClick={handleSignout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                // <img src={currentUser.profilePicture} alt='profile' className="h-8 w-8 rounded-full object-cover"/>
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="block py-3 text-center text-slate-900 hover:text-amber-400 border rounded-lg md:border-none transition-all duration-300 ease-in-out"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block py-3 px-4 font-medium text-center text-indigo-950 bg-amber-400 hover:bg-amber-300 active:shadow-none rounded-lg shadow md:inline transition-all duration-300 ease-in-out"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
      <nav className="border-b">
        <ul className="flex items-center gap-x-3 max-w-screen-2xl mx-auto px-4 overflow-x-auto lg:px-8">
          {submenuNav.map((item, idx) => {
            return (
              // Replace [idx == 0] with [window.location.pathname == item.path]
              <li
                key={idx}
                className={`py-1 ${
                  idx == 0 ? "border-b-2 border-indigo-600" : ""
                }`}
              >
                <Link
                  to={item.path}
                  className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150"
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
