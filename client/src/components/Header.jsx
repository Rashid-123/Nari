// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { IoMenu } from "react-icons/io5";
// import { RxCrossCircled } from "react-icons/rx";
// import { useAuth } from "../store/auth";

// function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { isLoggedIn, LogoutUser } = useAuth();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-gray-800 text-white fixed w-full z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold">
//               <Link to="/">Nari</Link>
//             </h1>
//           </div>
//           <div className="flex items-center">
//             <div className="hidden md:flex space-x-4">
//               <Link
//                 to="/"
//                 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/resources"
//                 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Resources
//               </Link>
//               <Link
//                 to="/helpline"
//                 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Helpline
//               </Link>

//               <Link
//                 to="/incident-form"
//                 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Report Incident
//               </Link>
//               <Link
//                 to="/map"
//                 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Map
//               </Link>

//               {isLoggedIn ? (
//                 <>
//                   <Link
//                     to="/user-profile"
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     User Profile
//                   </Link>
//                   <Link
//                     to="/login"
//                     onClick={LogoutUser}
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     Logout
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/register"
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     Register
//                   </Link>
//                   <Link
//                     to="/login"
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     Login
//                   </Link>
//                 </>
//               )}
//             </div>
//             <div className="md:hidden">
//               <button
//                 onClick={toggleMenu}
//                 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               >
//                 {isOpen ? (
//                   <RxCrossCircled
//                     className="block h-6 w-6"
//                     aria-hidden="true"
//                   />
//                 ) : (
//                   <IoMenu className="block h-6 w-6" aria-hidden="true" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 max-h-64 overflow-y-auto">
//           <div className="px-2 pt-2 pb-3 sm:pb-20 space-y-1 sm:px-3">
//             <Link
//               to="/"
//               className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//             >
//               Home
//             </Link>
//             <Link
//               to="/resources"
//               className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//             >
//               Resources
//             </Link>
//             <Link
//               to="/helpline"
//               className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//             >
//               Helpline
//             </Link>
//             <Link
//               to="/incident-form"
//               className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//             >
//               Report Incident
//             </Link>
//             <Link
//               to="/map"
//               className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//             >
//               Map
//             </Link>

//             {/* Show Profile & Logout when user is logged in */}
//             {isLoggedIn ? (
//               <>
//                 <Link
//                   to="/user-profile"
//                   className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={LogoutUser}
//                   className="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 {/* Show Register & Login when user is NOT logged in */}
//                 <Link
//                   to="/register"
//                   className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   Register
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Header;



import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { useAuth } from "../store/auth";

function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { isLoggedIn, LogoutUser } = useAuth();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsSideMenuOpen(false);
  }, [location]);

  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setIsSideMenuOpen(false);
      }
    };

    if (isSideMenuOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSideMenuOpen]);

  // Prevent scrolling when side menu is open
  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSideMenuOpen]);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  // List of navigation items to avoid duplication
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/resources", label: "Resources" },
    { path: "/helpline", label: "Helpline" },
    { path: "/incident-form", label: "Report Incident" },
    { path: "/map", label: "Map" }
  ];

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <>
      <nav className="bg-gray-800 text-white fixed w-full z-30 shadow-lg z-3000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tight">
                <Link to="/" className="flex items-center hover:text-purple-300 transition-colors">
                  Nari
                </Link>
              </h1>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-1 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${isActive(item.path)} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth links */}
              {isLoggedIn ? (
                <>
                  <Link
                    to="/user-profile"
                    className={`${isActive("/user-profile")} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={LogoutUser}
                    className="ml-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className={`${isActive("/register")} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="ml-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleSideMenu}
                aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
                className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                {isSideMenuOpen ? (
                  <IoClose className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <IoMenu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side menu for mobile */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${isSideMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleSideMenu}
        ></div>

        {/* Side drawer */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-gray-900 transform transition-transform duration-300 ease-in-out ${isSideMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={toggleSideMenu}
                className="text-gray-300 hover:text-white"
                aria-label="Close menu"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${location.pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } block px-3 py-3 rounded-md text-base font-medium`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Auth links */}
                <div className="border-t border-gray-700 mt-4 pt-4">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/user-profile"
                        className={`${location.pathname === "/user-profile"
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } block px-3 py-3 rounded-md text-base font-medium`}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={LogoutUser}
                        className="w-full text-left mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-3 rounded-md text-base font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className={`${location.pathname === "/register"
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } block px-3 py-3 rounded-md text-base font-medium`}
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="block w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-3 rounded-md text-base font-medium text-center"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;