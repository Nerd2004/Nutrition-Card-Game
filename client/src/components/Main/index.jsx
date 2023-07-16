import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [user, setUsers] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const getUsers = async () => {
    const person = JSON.parse(localStorage.getItem("user"));
    console.log(person);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Navbar</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* {user.role == "admin" && (
        <div>
          smart usre
          <p>Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
      {user.role == "normal" && (
        <div>
          Idoit user
          <p>Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )} */}
    </div>
  );
};

export default Main;
