import React, { useState, useEffect } from "react";
import "./Game.css";
import AppleImage from "./images/apple.jpeg";
import BananaImage from "./images/banana.jpeg";
import OrangeImage from "./images/orange.jpeg";
import StrawberryImage from "./images/strawberry.jpeg";
import CarrotImage from "./images/carrot.jpeg";
import BroccoliImage from "./images/broccoli.jpeg";
import SpinachImage from "./images/spinach.jpeg";
import TomatoImage from "./images/tomato.jpeg";

const items = [
  {
    name: "Apple",
    nutritionalValue: { proteins: 0.3, carbs: 11.4, fats: 0.4, fiber: 2.4 },
    type: "fruit",
    image: AppleImage,
  },
  {
    name: "Banana",
    nutritionalValue: { proteins: 1.1, carbs: 22, fats: 0.2, fiber: 2.6 },
    type: "fruit",
    image: BananaImage,
  },
  {
    name: "Orange",
    nutritionalValue: { proteins: 1, carbs: 12, fats: 0.2, fiber: 2.4 },
    type: "fruit",
    image: OrangeImage,
  },
  {
    name: "Strawberry",
    nutritionalValue: { proteins: 0.8, carbs: 7.7, fats: 0.4, fiber: 2 },
    type: "fruit",
    image: StrawberryImage,
  },
  {
    name: "Carrot",
    nutritionalValue: { proteins: 0.9, carbs: 10.3, fats: 0.2, fiber: 2.8 },
    type: "vegetable",
    image: CarrotImage,
  },
  {
    name: "Broccoli",
    nutritionalValue: { proteins: 2.8, carbs: 6, fats: 0.4, fiber: 2.6 },
    type: "vegetable",
    image: BroccoliImage,
  },
  {
    name: "Spinach",
    nutritionalValue: { proteins: 2.9, carbs: 1.4, fats: 0.5, fiber: 2.2 },
    type: "vegetable",
    image: SpinachImage,
  },
  {
    name: "Tomato",
    nutritionalValue: { proteins: 0.9, carbs: 3.9, fats: 0.2, fiber: 1.2 },
    type: "vegetable",
    image: TomatoImage,
  },
];

const Game = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [userTurn, setUserTurn] = useState(false);
  const [chances, setChances] = useState(10);
  const [timer, setTimer] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [divdisplay, setdivdisplay] = useState(<div></div>);

  useEffect(() => {
    const randomPlayerCard = getRandomCard();
    setPlayerCard(randomPlayerCard);
  }, []);

  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (selectedMetric) {
      const randomComputerCard = getRandomCard();
      setComputerCard(randomComputerCard);
      setUserTurn(true);
    }
  }, [selectedMetric]);

  useEffect(() => {
    if (timer === 0) {
      endGame();
    }
  }, [timer]);

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  const startGame = (time, numChances) => {
    setPlayerScore(0);
    setComputerScore(0);
    setChances(numChances);
    setTimer(time);

    const randomPlayerCard = getRandomCard();
    setPlayerCard(randomPlayerCard);
    setUserTurn(true);
  };

  const handlePlayCard = () => {
    if (selectedMetric && playerCard && computerCard) {
      compareCards();
      setSelectedMetric(null);
      setUserTurn(false);
      setChances(chances - 1);

      // Remove computer card from screen
      setComputerCard(null);

      // Generate new player card instantly
      const randomPlayerCard = getRandomCard();
      setPlayerCard(randomPlayerCard);
      setUserTurn(true);

      if (chances === 1 || timer === 0) {
        endGame();
      }
    } else {
      alert("Please select a metric and play a card.");
    }
  };

  const handleQuizLink = () => {
    window.location.href = "/quiz";
  };

  const compareCards = () => {
    const playerCardValue = playerCard.nutritionalValue[selectedMetric];
    const computerCardValue = computerCard.nutritionalValue[selectedMetric];

    if (playerCardValue > computerCardValue) {
      setPlayerScore(playerScore + 1);
      setdivdisplay(<div>Nice Guess!</div>);
    } else if (playerCardValue < computerCardValue) {
      setComputerScore(computerScore + 1);
      setdivdisplay(<div>Oops!</div>);
    }
  };

  const handleSelectMetric = (metric) => {
    setSelectedMetric(metric);
    if (playerCard && computerCard) {
      compareCards();
      setSelectedMetric(null);
      setUserTurn(false);

      // Remove computer card from screen
      setComputerCard(null);

      // Generate new player card instantly
      const randomPlayerCard = getRandomCard();
      setPlayerCard(randomPlayerCard);
      setUserTurn(true);
    } else {
      setComputerCard(getRandomCard);
    }
  };

  const endGame = () => {
    setUserTurn(false);
    setSelectedMetric(null);
    setPlayerCard(null);
    setComputerCard(null);
    setTimer(null);

    const finalScore = playerScore - computerScore;
    let resultText = "";
    if (finalScore > 0) {
      resultText = "WIN!";
    } else if (finalScore < 0) {
      resultText = "Sorry! You Lost!";
    } else {
      resultText = "It's a Tie!";
    }
    setGameResult(resultText);
  };

  return (
    <div className="container">
      <h1>Card Game</h1>
      {!timer && (
        <div className="start-container">
          <h3>Select Chances:</h3>
          <button
            className="btn-selector-chances"
            onClick={() => startGame(60, 10)}
          >
            10
          </button>
          <button
            className="btn-selector-chances"
            onClick={() => startGame(120, 20)}
          >
            20
          </button>
          <button
            className="btn-selector-chances"
            onClick={() => startGame(180, 30)}
          >
            30
          </button>
          <button
            className="btn-selector-chances"
            onClick={() => startGame(300, 50)}
          >
            50
          </button>
        </div>
      )}
      {timer && (
        <div className="timer">
          <p>Time Remaining: {timer} seconds</p>
        </div>
      )}
      {playerCard && timer > 0 && (
        <div className="card-container">
          <div className="card">
            <h3>Player Card:</h3>
            {divdisplay}
            <img
              src={playerCard.image}
              alt={playerCard.name}
              className="card-image"
            />
            <p>{playerCard.name}</p>
            <p>
              Nutritional Value: {playerCard.nutritionalValue.proteins}g
              Proteins, {playerCard.nutritionalValue.carbs}g Carbs,{" "}
              {playerCard.nutritionalValue.fats}g Fats,{" "}
              {playerCard.nutritionalValue.fiber}g Fiber
            </p>
            {!selectedMetric && (
              <div className="button-container">
                <p>Select a metric:</p>
                <button onClick={() => handleSelectMetric("proteins")}>
                  Proteins
                </button>
                <button onClick={() => handleSelectMetric("carbs")}>
                  Carbs
                </button>
                <button onClick={() => handleSelectMetric("fats")}>Fats</button>
                <button onClick={() => handleSelectMetric("fiber")}>
                  Fiber
                </button>
              </div>
            )}
            {selectedMetric && userTurn && (
              <button onClick={handlePlayCard}>Click here</button>
            )}
          </div>
          {computerCard && (
            <div className="card">
              <h3>Computer Card:</h3>
              <img
                src={computerCard.image}
                alt={computerCard.name}
                className="card-image"
              />
              <p>{computerCard.name}</p>
              <p>
                Nutritional Value: {computerCard.nutritionalValue.proteins}g
                Proteins, {computerCard.nutritionalValue.carbs}g Carbs,{" "}
                {computerCard.nutritionalValue.fats}g Fats,{" "}
                {computerCard.nutritionalValue.fiber}g Fiber
              </p>
            </div>
          )}
        </div>
      )}
      {timer && (
        <div className="score-container">
          <h2>Player Score: {playerScore}</h2>
          <h2>Computer Score: {computerScore}</h2>
        </div>
      )}
      {gameResult && (
        <div className="result-container">
          <h2>{gameResult}</h2>
          <button onClick={handleQuizLink}>Start Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Game;
