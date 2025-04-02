// import { Link } from "react-router-dom";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import { useEffect, useState } from "react";

// function MainContent() {
//   const [typedText, setTypedText] = useState("");
//   const fullText = "Hii, Welcome! Here you can Report an Incident";

//   useEffect(() => {
//     let index = 0;

//     const typingEffect = setInterval(() => {
//       if (index < fullText.length) {
//         setTypedText((prev) => prev + fullText.charAt(index));
//         index++;
//       } else {
//         clearInterval(typingEffect);
//       }
//     }, 100);

//     return () => clearInterval(typingEffect);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900/95 text-white flex flex-col items-center justify-center py-16 px-8 lg:w-full">
//       <div className="flex flex-col md:flex-row items-start justify-between max-w-7xl mx-auto">
//         {/* Left Content - Text and Buttons */}
//         <div className="md:w-1/2 flex flex-col text-left">
//           <h1 className="text-7xl font-bold text-pink-500">Nari</h1>
//           <p className="text-2xl mt-4">
//             For our fierce warriors and their never diminishing light.
//           </p>
//           <p className="text-2xl text-pink-300 mt-4">{typedText}</p>

//           {/* Buttons in descending width */}
//           <div className="mt-16 space-y-4 justify-start">
//             <div className="group w-96 h-16 bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold flex items-center justify-between px-6 cursor-pointer rounded-lg transition-all duration-300">
//               <Link
//                 to="/incident-form"
//                 className="w-full h-full flex items-center justify-between"
//               >
//                 <span>Report Incident</span>
//                 <span className="inline-flex items-center opacity-0 group-hover:opacity-100 group-hover:ml-4 transition-all duration-300">
//                   <FaLongArrowAltRight className="text-gray-900" size={24} />
//                 </span>
//               </Link>
//             </div>

//             <div className="group w-80 h-16 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold flex items-center justify-between px-6 cursor-pointer rounded-lg transition-all duration-300">
//               <Link
//                 to="/map"
//                 className="w-full h-full flex items-center justify-between"
//               >
//                 <span>View Incidents</span>
//                 <span className="inline-flex items-center opacity-0 group-hover:opacity-100 group-hover:ml-4 transition-all duration-300">
//                   <FaLongArrowAltRight className="text-gray-900" size={24} />
//                 </span>
//               </Link>
//             </div>

//             <div className="group w-72 h-16 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold flex items-center justify-between px-6 cursor-pointer rounded-lg transition-all duration-300">
//               <Link
//                 to="/resources"
//                 className="w-full h-full flex items-center justify-between"
//               >
//                 <span>Get Resources</span>
//                 <span className="inline-flex items-center opacity-0 group-hover:opacity-100 group-hover:ml-4 transition-all duration-300">
//                   <FaLongArrowAltRight className="text-gray-900" size={24} />
//                 </span>
//               </Link>
//             </div>

//             <div className="group w-64 h-16 bg-pink-400 hover:bg-pink-500 text-white text-lg font-semibold flex items-center justify-between px-6 cursor-pointer rounded-lg transition-all duration-300">
//               <Link
//                 to="/helpline"
//                 className="w-full h-full flex items-center justify-between"
//               >
//                 <span>Get Help</span>
//                 <span className="inline-flex items-center opacity-0 group-hover:opacity-100 group-hover:ml-4 transition-all duration-300">
//                   <FaLongArrowAltRight className="text-gray-900" size={24} />
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Right Content - Image */}
//         <div className="mt-10 md:mt-0 md:ml-8 flex-shrink-0 w-full md:w-1/2 lg:w-[45%]">
//           <img
//             src="/home_page.jpg"
//             alt="main image"
//             className="w-full h-auto object-cover mt-10"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainContent;



import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaMapMarkedAlt, FaBookOpen, FaPhoneAlt, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

function MainContent() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Hii, Welcome! Here you can Report an Incident";

  useEffect(() => {
    let index = 0;

    const typingEffect = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center py-14 justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-4 py-8 lg:py-0 gap-8">
        {/* Left Content - Text and Card Buttons */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl font-bold text-pink-500 tracking-tight mb-4">Nari</h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-4">
            For our fierce warriors and their never diminishing light.
          </p>
          <p className="text-xl sm:text-2xl text-pink-300 h-8 mb-8">{typedText}</p>

          {/* Card-style Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <Link to="/incident-form" className="group">
              <div className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 p-6 rounded-xl shadow-lg transition-all duration-300 h-full">
                <div className="flex items-center mb-3">
                  <FaExclamationTriangle className="text-white mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Report Incident</h3>
                </div>
                <p className="text-gray-200 mb-4">Share your experience and help others stay safe.</p>
                <div className="flex justify-end">
                  <FaChevronRight className="transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            </Link>

            <Link to="/map" className="group">
              <div className="bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 p-6 rounded-xl shadow-lg transition-all duration-300 h-full">
                <div className="flex items-center mb-3">
                  <FaMapMarkedAlt className="text-white mr-3" size={24} />
                  <h3 className="text-xl font-semibold">View Incidents</h3>
                </div>
                <p className="text-gray-200 mb-4">Explore reported incidents on an interactive map.</p>
                <div className="flex justify-end">
                  <FaChevronRight className="transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            </Link>

            <Link to="/resources" className="group">
              <div className="bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 p-6 rounded-xl shadow-lg transition-all duration-300 h-full">
                <div className="flex items-center mb-3">
                  <FaBookOpen className="text-white mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Get Resources</h3>
                </div>
                <p className="text-gray-200 mb-4">Access guides, articles and supportive materials.</p>
                <div className="flex justify-end">
                  <FaChevronRight className="transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            </Link>

            <Link to="/helpline" className="group">
              <div className="bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 p-6 rounded-xl shadow-lg transition-all duration-300 h-full">
                <div className="flex items-center mb-3">
                  <FaPhoneAlt className="text-white mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Get Help</h3>
                </div>
                <p className="text-gray-200 mb-4">Find emergency contacts and support services.</p>
                <div className="flex justify-end">
                  <FaChevronRight className="transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Content - Centered Image */}
        <div className="lg:w-1/2 flex items-center justify-center h-full">
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-0.5 bg-pink-500 rounded-lg blur opacity-20"></div>
            <img
              src="/home_page.jpg"
              alt="Women empowerment"
              className="relative w-full h-auto object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;