import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Register.css";
import { db } from "../firebase";

const Resgister = ({ ping, setPing }) => {
  const history = useHistory("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState([]);
  const [gender, setGender] = useState("");

  const register = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        if (response.user) {
          updateProfile(auth.currentUser, {
            displayName: firstName + " " + lastName,
            photoURL:
              "https://pbs.twimg.com/profile_images/831173492968140804/43M7c5j__400x400.jpg",
          }).then((s) => {
            setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              name: response.user.displayName,
              email: response.user.email,
              photoURL:
                "https://pbs.twimg.com/profile_images/831173492968140804/43M7c5j__400x400.jpg",
              birthday,
              gender,
              bio: "",
            }).then(history.push("/"));
            setPing(!ping);
          });
        }
        console.log(response.user);
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  const generateYearOptions = () => {
    const arr = [];
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
      arr.push(<option value={i}>{i}</option>);
    }
    return arr;
  };
  const generateMonthOptions = () => {
    const arr = [];
    for (let i = 1; i <= 12; i++) {
      arr.push(<option value={i}>{i}</option>);
    }
    return arr;
  };
  const generateDayOptions = () => {
    const arr = [];
    for (let i = 1; i <= 31; i++) {
      arr.push(<option value={i}>{i}</option>);
    }
    return arr;
  };
  return (
    <div className="register">
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
        alt="facebook"
        className="register-logo"
      />
      <div className="register-container">
        <h1>Sign Up</h1>
        <p>It's quick and easy.</p>
        <div className="hr3" />
        <form>
          <div className="row">
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="register-name"
              type="name"
              placeholder="First Name"
              required
            />
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="register-name"
              type="name"
              placeholder="Last Name"
              required
            />
          </div>
          <center>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              required
            />
          </center>
          <center>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="NewPassword"
              required
            />
          </center>
          <h5 className="register-date h5"> Date Of Birth</h5>
          <div className="row">
            <select
              className="register-date2"
              name="day"
              onChange={(e) => setBirthday([...birthday, e.target.value])}
            >
              <option value="0">Day</option>
              {generateDayOptions()}
            </select>
            <select
              className="register-date3"
              name="month"
              onChange={(e) => setBirthday([...birthday, e.target.value])}
            >
              <option value="0">Month</option>
              {generateMonthOptions()}
            </select>
            <select
              className="register-date3"
              name="year"
              onChange={(e) => setBirthday([...birthday, e.target.value])}
            >
              <option value="0">Year</option>
              {generateYearOptions()}
            </select>
          </div>
          <h5 className="register-gender h5"> Gender</h5>
          <div className="register-radiocontainer">
            <div className="wrapper">
              <label>Female</label>
              <input
                onChange={(e) => setGender(e.target.value)}
                type="radio"
                name="gender"
                value="Female"
                required
              />
            </div>
            <div className="wrapper">
              <label>Male</label>
              <input
                onChange={(e) => setGender(e.target.value)}
                type="radio"
                name="gender"
                value="Male"
                required
              />
            </div>
            <div className="wrapper">
              <label>Other</label>
              <input
                onChange={(e) => setGender(e.target.value)}
                type="radio"
                name="gender"
                value="Other"
                required
              />
            </div>
          </div>
          <p className="register-policy">
            By clicking Sing up, you agrre to our
            <span>Terms, Data Policy</span> and
            <span>Cookie Policy</span>. You may receive SMS Notifications from
            us and can opt out any time.
          </p>
          <center>
            <button
              onClick={register}
              type="submit"
              className="register-register"
            >
              Sign Up
            </button>
          </center>
          <center>
            <Link to="/login">
              <p className="register-login">Already have an account ?</p>
            </Link>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Resgister;
