import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import "./1.css";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://nutrition-card.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //   useEffect(() => {
  //     const getCountries = async () => {
  //       try {
  //         setIsLoading(true);
  //         const result = await Country.getAllCountries();
  //         let allCountries = [];
  //         allCountries = result?.map(({ isoCode, name }) => ({
  //           isoCode,
  //           name,
  //         }));
  //         const [{ isoCode: firstCountry } = {}] = allCountries;
  //         setCountries(allCountries);
  //         setSelectedCountry(firstCountry);
  //         setIsLoading(false);
  //       } catch (error) {
  //         setCountries([]);
  //         setIsLoading(false);
  //       }
  //     };

  //     getCountries();
  //   }, []);

  //   useEffect(() => {
  //     const getStates = async () => {
  //       try {
  //         const result = await State.getStatesOfCountry(selectedCountry);
  //         let allStates = [];
  //         allStates = result?.map(({ isoCode, name }) => ({
  //           isoCode,
  //           name,
  //         }));
  //         const [{ isoCode: firstState = "" } = {}] = allStates;
  //         setCities([]);
  //         setSelectedCity("");
  //         setStates(allStates);
  //         setSelectedState(firstState);
  //       } catch (error) {
  //         setStates([]);
  //         setCities([]);
  //         setSelectedCity("");
  //       }
  //     };

  //     getStates();
  //   }, [selectedCountry]);

  //   useEffect(() => {
  //     const getCities = async () => {
  //       try {
  //         const result = await City.getCitiesOfState(
  //           selectedCountry,
  //           selectedState
  //         );
  //         let allCities = [];
  //         allCities = result?.map(({ name }) => ({
  //           name,
  //         }));
  //         const [{ name: firstCity = "" } = {}] = allCities;
  //         setCities(allCities);
  //         setSelectedCity(firstCity);
  //       } catch (error) {
  //         setCities([]);
  //       }
  //     };

  //     getCities();
  //   }, [selectedState]);

  //   const secondDivRef = useRef(null);
  //   const thirdDivRef = useRef(null);
  //   const fourthDivRef = useRef(null);

  //   const handleFirstDivClick = () => {
  //     if (secondDivRef.current) {
  //       secondDivRef.current.click();
  //     }
  //   };
  //   const handleSecondDivClick = () => {
  //     if (thirdDivRef.current) {
  //       thirdDivRef.current.click();
  //     }
  //   };
  //   const handlethirdDivClick = () => {
  //     if (fourthDivRef.current) {
  //       fourthDivRef.current.click();
  //     }
  //   };

  //   const cityname = selectedCity;
  //   var countryname = countries.find(
  //     (country) => country.isoCode === selectedCountry
  //   )?.name;
  //   const statename =
  //     states.find((state) => state.isoCode === selectedState)?.name || "";

  const [data, setData] = useState({
    firstName: "",
    age: "",
    email: "",
    password: "",
  });

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              onChange={handleChange}
              value={data.age}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              type="submit"
              //   onClick={handleFirstDivClick}
              className={styles.green_btn}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
