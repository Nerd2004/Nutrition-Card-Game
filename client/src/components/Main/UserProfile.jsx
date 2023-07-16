// import { useState, useEffect } from "react";
// import axios from "axios";

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         console.log(token);
//         const response = await axios.get("http://localhost:4000/api/auth", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUserData(response.data);
//       } catch (error) {
//         // Handle error
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (userData) {
//     return (
//       <div>
//         <h1>Welcome, {userData.username}!</h1>
//         <p>Email: {userData.email}</p>
//         {/* Display other user data as needed */}
//       </div>
//     );
//   }

//   return <p>Loading...</p>;
// };

// export default UserProfile;
