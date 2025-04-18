// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import axios from "axios";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import { useAuth } from "../store/auth";
// import black_icon from "../assets/current_location.png";
// import blue_icon from "../assets/safe.png";
// import red_icon from "../assets/Insident.png";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// // Custom Icons
// const incidentIcon = new L.Icon({
//   iconUrl: red_icon,
//   iconSize: [40, 40],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });

// const userIcon = new L.Icon({
//   iconUrl: black_icon,
//   iconSize: [40, 40],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });
// const safePlaceIcon = new L.Icon({
//   iconUrl: blue_icon,
//   iconSize: [35, 35],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });

// const Map = () => {
//   const [incidents, setIncidents] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [safePlaces, setSafePlaces] = useState([]);
//   const [nearestSafePlace, setNearestSafePlace] = useState(null);
//   const [selectedIncident, setSelectedIncident] = useState(null);
//   const [searchParams, setSearchParams] = useState({
//     dateRange: null,
//     category: "",
//   });
//   const { token } = useAuth();

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserLocation([position.coords.latitude, position.coords.longitude]);
//         fetchSafePlaces(position.coords.latitude, position.coords.longitude);
//         // setUserLocation(25.5940947, 85.1375645); // Default location
//         // fetchSafePlaces(25.5940947, 85.1375645); // Default location
//         console.log(position);
//       },

//       (error) => {
//         console.error("Error getting location:", error);
//         setUserLocation([25.562596, 84.672492]); // Default location
//       }
//     );

//     const fetchIncidents = async () => {
//       try {
//         const config = {
//           headers: { Authorization: `Bearer ${token}` },
//         };
//         const res = await axios.get(
//           `${backendUrl}/api/incidents/getAllIncidents`,
//           config
//         );
//         console.log("Fetched incidents:", res.data); // Debugging
//         setIncidents(res.data);
//       } catch (error) {
//         console.error("Error fetching incidents:", error);
//       }
//     };

//     fetchIncidents();
//   }, []);

//   // Fetch Safe Places
//   const fetchSafePlaces = async (lat, lon) => {
//     const query = `[out:json];
//       (
//         node["amenity"="hospital"](around:5000, ${lat}, ${lon});
//         node["amenity"="school"](around:5000, ${lat}, ${lon});
//         node["amenity"="police"](around:5000, ${lat}, ${lon});
//       );
//       out;`;

//     try {
//       const response = await axios.get(
//         `https://overpass-api.de/api/interpreter?data=${query}`
//       );
//       const places = response.data.elements
//         .filter((el) => el.lat && el.lon) // Ensure valid coordinates
//         .map((el) => ({
//           id: el.id,
//           name: el.tags.name || "Unknown Safe Place",
//           lat: el.lat,
//           lon: el.lon,
//         }));
//       setSafePlaces(places);
//       console.log(places);
//     } catch (error) {
//       console.error("Error fetching safe places:", error);
//     }
//   };

//   // Find the Nearest Safe Place
//   const findNearestSafePlace = () => {
//     if (!userLocation || safePlaces.length === 0) return;
//     let minDist = Infinity;
//     let nearest = null;

//     safePlaces.forEach((place) => {
//       const distance = Math.hypot(
//         userLocation[0] - place.lat,
//         userLocation[1] - place.lon
//       );
//       if (distance < minDist) {
//         minDist = distance;
//         nearest = place;
//       }
//     });

//     setNearestSafePlace(nearest);
//   };

//   // Filter incidents based on category and date range
//   const filteredIncidents = incidents.filter((incident) => {
//     const matchesCategory = searchParams.category
//       ? incident.category === searchParams.category
//       : true;
//     const matchesDateRange = searchParams.dateRange
//       ? new Date(incident.date) >= searchParams.dateRange[0] &&
//         new Date(incident.date) <= searchParams.dateRange[1]
//       : true;

//     return matchesCategory && matchesDateRange;
//   });

//   return (
//     <div className="flex flex-col h-[90vh] pt-[60px] pb-[30px] relative z-10">
//       <h2 className="pt-3 text-center text-4xl mb-2 sticky top-[60px] bg-pink-500 z-20">
//         Incident Reports Map
//       </h2>
//       <div className="mt-2 flex justify-center gap-2">
//         <select
//           value={searchParams.category}
//           onChange={(e) =>
//             setSearchParams({ ...searchParams, category: e.target.value })
//           }
//           className="p-2 border border-gray-300 rounded"
//         >
//           <option value="" disabled>
//             Select Category
//           </option>
//           <option value="mistreatment">Mistreatment</option>
//           <option value="hooligans">Hooligans</option>
//           <option value="cat-calling">Cat-calling</option>
//           <option value="shady-area">Shady Area</option>
//         </select>
//         <input
//           type="date"
//           placeholder="Start Date"
//           onChange={(e) =>
//             setSearchParams({
//               ...searchParams,
//               dateRange: [
//                 new Date(e.target.value),
//                 searchParams.dateRange ? searchParams.dateRange[1] : new Date(),
//               ],
//             })
//           }
//           className="p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="date"
//           placeholder="End Date"
//           onChange={(e) =>
//             setSearchParams({
//               ...searchParams,
//               dateRange: [
//                 searchParams.dateRange ? searchParams.dateRange[0] : new Date(),
//                 new Date(e.target.value),
//               ],
//             })
//           }
//           className="p-2 border border-gray-300 rounded"
//         />
//       </div>
//       <MapContainer
//         center={userLocation || [25.5940947, 85.1375645]}
//         zoom={15}
//         className="h-full w-full"
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         {/* User Location Marker */}
//         {userLocation && (
//           <Marker position={userLocation} icon={userIcon}>
//             <Popup>Your Location</Popup>
//           </Marker>
//         )}

//         {/* Incident Markers */}
//         {filteredIncidents.map((incident) => {
//           if (
//             !incident.location ||
//             !incident.location.coordinates ||
//             incident.location.coordinates.length < 2
//           ) {
//             console.warn("Invalid coordinates for incident:", incident);
//             return null; // Skip rendering this incident
//           }

//           return (
//             <Marker
//               key={incident._id}
//               position={[
//                 incident.location.coordinates[1],
//                 incident.location.coordinates[0],
//               ]} // Note: Coordinates are [longitude, latitude]
//               icon={incidentIcon}
//               eventHandlers={{
//                 click: () => setSelectedIncident(incident),
//               }}
//             >
//               <Popup>{incident.category}</Popup>
//             </Marker>
//           );
//         })}

//         {/* Safe Places */}
//         {safePlaces.map((place) => (
//           <Marker
//             key={place.id}
//             position={[place.lat, place.lon]}
//             icon={safePlaceIcon}
//           >
//             <Popup>{place.name}</Popup>
//           </Marker>
//         ))}

//         {/* Show Route if Nearest Safe Place is Found */}
//         {nearestSafePlace && (
//           <RoutingComponent
//             start={userLocation}
//             end={[nearestSafePlace.lat, nearestSafePlace.lon]}
//           />
//         )}
//       </MapContainer>
//       {/* Find Safe Place Button */}
//       <button
//         className="bg-green-500 text-white p-3 rounded mt-3 mx-auto"
//         onClick={findNearestSafePlace}
//       >
//         Find Safest Route
//       </button>

//       {selectedIncident && (
//         <div className="mt-2 p-2 border border-gray-300 text-center">
//           <h3 className="text-lg font-semibold">Incident Details</h3>
//           <p>
//             <strong>Description:</strong> {selectedIncident.description}
//           </p>
//           <p>
//             <strong>Category:</strong> {selectedIncident.category}
//           </p>
//           <p>
//             <strong>Date:</strong>{" "}
//             {new Date(selectedIncident.date).toLocaleDateString()}
//           </p>
//           <p>
//             <strong>Time:</strong>{" "}
//             {new Date(selectedIncident.date).toLocaleTimeString()}
//           </p>
//           <p>
//             <strong>Reported by:</strong> {selectedIncident.user || "Anonymous"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Routing Component
// const RoutingComponent = ({ start, end }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map || !start || !end) return;

//     const routingControl = L.Routing.control({
//       waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
//       routeWhileDragging: true,
//       createMarker: () => null, // Hide extra markers
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [map, start, end]);

//   return null;
// };

// export default Map;




import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useAuth } from "../store/auth";
import black_icon from "../assets/current_location.png";
import blue_icon from "../assets/safe.png";
import red_icon from "../assets/Insident.png";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Custom Icons
const incidentIcon = new L.Icon({
  iconUrl: red_icon,
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const userIcon = new L.Icon({
  iconUrl: black_icon,
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const safePlaceIcon = new L.Icon({
  iconUrl: blue_icon,
  iconSize: [35, 35],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const Map = () => {
  const [incidents, setIncidents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [safePlaces, setSafePlaces] = useState([]);
  const [nearestSafePlace, setNearestSafePlace] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [searchParams, setSearchParams] = useState({
    dateRange: null,
    category: "",
  });
  const { token } = useAuth();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        fetchSafePlaces(position.coords.latitude, position.coords.longitude);
        console.log(position);
      },
      (error) => {
        console.error("Error getting location:", error);
        setUserLocation([25.562596, 84.672492]); // Default location
        fetchSafePlaces(25.562596, 84.672492);
      }
    );

    const fetchIncidents = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(
          `${backendUrl}/api/incidents/getAllIncidents`,
          config
        );
        console.log("Fetched incidents:", res.data);
        setIncidents(res.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, [token]);

  // Fetch Safe Places
  const fetchSafePlaces = async (lat, lon) => {
    const query = `[out:json];
      (
        node["amenity"="hospital"](around:5000, ${lat}, ${lon});
        node["amenity"="school"](around:5000, ${lat}, ${lon});
        node["amenity"="police"](around:5000, ${lat}, ${lon});
      );
      out;`;

    try {
      const response = await axios.get(
        `https://overpass-api.de/api/interpreter?data=${query}`
      );
      const places = response.data.elements
        .filter((el) => el.lat && el.lon) // Ensure valid coordinates
        .map((el) => ({
          id: el.id,
          name: el.tags.name || "Unknown Safe Place",
          lat: el.lat,
          lon: el.lon,
        }));
      setSafePlaces(places);
      console.log(places);
    } catch (error) {
      console.error("Error fetching safe places:", error);
    }
  };

  // Find the Nearest Safe Place
  const findNearestSafePlace = () => {
    if (!userLocation || safePlaces.length === 0) return;
    let minDist = Infinity;
    let nearest = null;

    safePlaces.forEach((place) => {
      const distance = Math.hypot(
        userLocation[0] - place.lat,
        userLocation[1] - place.lon
      );
      if (distance < minDist) {
        minDist = distance;
        nearest = place;
      }
    });

    setNearestSafePlace(nearest);
  };

  // Filter incidents based on category and date range
  const filteredIncidents = incidents.filter((incident) => {
    const matchesCategory = searchParams.category
      ? incident.category === searchParams.category
      : true;
    const matchesDateRange = searchParams.dateRange
      ? new Date(incident.date) >= searchParams.dateRange[0] &&
      new Date(incident.date) <= searchParams.dateRange[1]
      : true;

    return matchesCategory && matchesDateRange;
  });

  return (
    <div className="flex flex-col min-h-screen mt-16">
      {/* Page title */}
      <h2 className="text-center text-4xl py-4 bg-red-500 text-white font-bold shadow-md">
        Incident Reports Map
      </h2>

      {/* Filter controls */}
      <div className="p-4 bg-white shadow-md">
        <div className="flex flex-wrap justify-center gap-2">
          <select
            value={searchParams.category}
            onChange={(e) =>
              setSearchParams({ ...searchParams, category: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            <option value="mistreatment">Mistreatment</option>
            <option value="hooligans">Hooligans</option>
            <option value="cat-calling">Cat-calling</option>
            <option value="shady-area">Shady Area</option>
          </select>

          <div className="flex gap-2">
            <input
              type="date"
              placeholder="Start Date"
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  dateRange: [
                    new Date(e.target.value),
                    searchParams.dateRange ? searchParams.dateRange[1] : new Date(),
                  ],
                })
              }
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              placeholder="End Date"
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  dateRange: [
                    searchParams.dateRange ? searchParams.dateRange[0] : new Date(),
                    new Date(e.target.value),
                  ],
                })
              }
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Map container */}
      <div className="flex-grow relative">
        {userLocation && (
          <MapContainer
            center={userLocation}
            zoom={15}
            className="h-[calc(100vh-16rem)] w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* User Location Marker */}
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>

            {/* Incident Markers */}
            {filteredIncidents.map((incident) => {
              if (
                !incident.location ||
                !incident.location.coordinates ||
                incident.location.coordinates.length < 2
              ) {
                console.warn("Invalid coordinates for incident:", incident);
                return null;
              }

              return (
                <Marker
                  key={incident._id}
                  position={[
                    incident.location.coordinates[1],
                    incident.location.coordinates[0],
                  ]}
                  icon={incidentIcon}
                  eventHandlers={{
                    click: () => setSelectedIncident(incident),
                  }}
                >
                  <Popup>{incident.category}</Popup>
                </Marker>
              );
            })}

            {/* Safe Places */}
            {safePlaces.map((place) => (
              <Marker
                key={place.id}
                position={[place.lat, place.lon]}
                icon={safePlaceIcon}
              >
                <Popup>{place.name}</Popup>
              </Marker>
            ))}

            {/* Show Route if Nearest Safe Place is Found */}
            {nearestSafePlace && (
              <RoutingComponent
                start={userLocation}
                end={[nearestSafePlace.lat, nearestSafePlace.lon]}
              />
            )}
          </MapContainer>
        )}
      </div>

      {/* Action button and incident details */}
      <div className="bg-white p-4 shadow-md">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded shadow-md mx-auto block transition-colors"
          onClick={findNearestSafePlace}
        >
          Find Safest Route
        </button>

        {selectedIncident && (
          <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-center mb-2">Incident Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <span className="font-medium">Description:</span> {selectedIncident.description}
              </p>
              <p>
                <span className="font-medium">Category:</span> {selectedIncident.category}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(selectedIncident.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {new Date(selectedIncident.date).toLocaleTimeString()}
              </p>
              <p>
                <span className="font-medium">Reported by:</span> {selectedIncident.user || "Anonymous"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Routing Component
const RoutingComponent = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      createMarker: () => null, // Hide extra markers
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;
};

export default Map;