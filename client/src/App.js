import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Game from "./Game";
import Quiz from "./components/Quiz/Quiz";
import Leaderboard from "./components/Leaderboard";
import Home from "./components/Home/Home";
function App() {
  const use = localStorage.getItem("token");
  // const person = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      {use && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/leaderboard" exact element={<Leaderboard />} />
      {use && <Route path="/quiz" exact element={<Quiz />} />}
      {use && <Route path="/game" exact element={<Game />} />}
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
