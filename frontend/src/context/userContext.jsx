// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const UserContext = createContext();

// export const useUserContext = () => {
//   return useContext(UserContext);
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const res = await axios.get("http://localhost:8000/api/user/profile", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser(res.data.user);
//         } catch (error) {
//           console.log("Error fetching user data:", error);
//         }
//       }
//     };

//     fetchUser();
//   }, []);

//   return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
// };