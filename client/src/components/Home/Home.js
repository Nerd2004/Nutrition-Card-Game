import React from "react";
import "./Home.css";
// import { useState, useEffect } from "react";

function Home() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handlePlayNow = () => {
    window.location.href = "/game";
  };
  return (
    <div>
      <nav class="navbar">
        <div class="website-name">Janajagriti Trust</div>

        <span class="hamburger">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </span>

        <div class="nav-links">
          <ul class="navul">
            <li class="item">
              <a href="/home">HOME</a>
            </li>
            <li class="item">
              <a href="/leaderboard">LEADERBOARD</a>
            </li>
            <li class="item">
              <a href="/games">GAMES & FUN</a>
            </li>
            <li class="item">
              <a href="/youtube">YOUTUBE</a>
            </li>
            <li class="item">
              <a href="/services">SERVICES</a>
            </li>
            <li
              class="item"
              style={{
                color: "black",
                cursor: "pointer",
                marginTop: "21px",
                marginRight: "29px",
                marginLeft: "12px",
                padding: "3px 23px",
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </li>
          </ul>
        </div>
      </nav>

      <section id="home" class="container1">
        <h1 class="h-primary">Welcome to Janajagriti</h1>
        <p>
          Janajagriti Trust aims to bring awareness to holistic well-being. We
          mainly focus on educating school children between the ages of 7-10 on
          physical, mental, and environmental health using games. We also
          conduct workshops on nutrition and yoga for holistic health. Our
          initiative has positively impacted over 1000 children in a span of 2
          years.
          <br />
          • 91% of the students gained the right nutritious knowledge.
          <br />• 87% of the students learnt more than 2 food items/nutrients.
        </p>

        <button class="btn" onClick={handlePlayNow}>
          Play Now
        </button>

        <div class="container"></div>
      </section>

      <section id="contact">
        <h1 class="h-primary center">Contact Us</h1>
        <div id="contact-box">
          <form action="">
            <div class="form-group">
              <label for="name">Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div class="form-group">
              <label for="email">Email: </label>
              <input
                type="email"
                name="name"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div class="form-group">
              <label for="phone">Phone Number: </label>
              <input
                type="phone"
                name="name"
                id="phone"
                placeholder="Enter your phone"
              />
            </div>
            <div class="form-group">
              <label for="message">Message: </label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </form>
        </div>
      </section>

      <footer className="newfooter">
        <div class="wrapper">
          <div class="icon facebook">
            <div class="tooltip">Facebook</div>
            <span>
              <i class="fab fa-facebook-f"></i>
            </span>
          </div>
          <div class="icon twitter">
            <div class="tooltip">Twitter</div>
            <span>
              <i class="fab fa-twitter"></i>
            </span>
          </div>
          <div class="icon instagram">
            <div class="tooltip">Instagram</div>
            <span>
              <i class="fab fa-instagram"></i>
            </span>
          </div>
          <div class="icon github">
            <div class="tooltip">Github</div>
            <span>
              <i class="fab fa-github"></i>
            </span>
          </div>
          <div class="icon youtube">
            <div class="tooltip">YouTube</div>
            <span>
              <i class="fab fa-youtube"></i>
            </span>
          </div>
        </div>
      </footer>

      <script src="navbar.js"></script>
    </div>
  );
}

export default Home;
