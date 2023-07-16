import axios from "axios";

import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = () => {
  const person = JSON.parse(localStorage.getItem("user"));
  const [userScore, setUserScore] = useState(0);
  // const [newscore, setnewscore] = useState(0);
  const submitscore = async () => {
    const useremail = person.email;
    console.log({ email: useremail, score: userScore });
    await axios
      .put("http://localhost:4000/api/update", {
        email: useremail,
        score: userScore,
      })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeValue, setTimeValue] = useState(15);
  const [timer, setTimer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const questions = [
    {
      numb: 1,
      question: "Which of the following is rich in carbohydrates?",
      answer: "Blackgram",
      options: ["Cauliflower", "Spinach", "Blackgram", "Coriander"],
    },
    {
      numb: 2,
      question: "Which of the following has high fiber content?",
      answer: "Flax seeds",
      options: ["Broccoli", "Almonds", "Flax seeds", "Coriander"],
    },
    {
      numb: 3,
      question: "Which of the following contains the most fat?",
      answer: "Cloves",
      options: ["Cloves", "Sunflower seeds", "Watermelon", "Black Grams"],
    },
    {
      numb: 4,
      question: "Which of them contains the most proteins?",
      answer: "Peanuts",
      options: ["Guava", "Peanuts", "Mango", "Coriander"],
    },
    {
      numb: 5,
      question: "Which of the following is rich in carbohydrates?",
      answer: "Rajma",
      options: ["Cinnamon", "Rajma", "Carrot", "Mung Beans"],
    },
  ];

  useEffect(() => {
    if (timeValue === 0) {
      clearInterval(timer);
      handleAnswerClick(null);
    }
  }, [timeValue, timer]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuestionIndex(0);
    setUserScore(0);
    setTimeValue(15);
    setQuizCompleted(false);
    startTimer();
  };

  const handleExitQuiz = async () => {
    submitscore();
    setQuizStarted(true);
    window.location.href = "/leaderboard";
  };

  const handleContinueQuiz = () => {
    setQuizStarted(true);
    startTimer();
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeValue(15);
    } else {
      setQuizCompleted(true);
      setQuizStarted(false);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = questions[questionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setUserScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const startTimer = () => {
    const newTimer = setInterval(() => {
      setTimeValue((prevValue) => prevValue - 1);
    }, 1000);
    setTimer(newTimer);
  };

  useEffect(() => {
    if (quizCompleted) {
      clearInterval(timer);
    }
  }, [quizCompleted, timer]);

  return (
    <div>
      {quizStarted && (
        <div className="quiz_box activeQuiz">
          <header>
            <div className="title">Quiz</div>
            <div className="timer">
              <div className="time_left_txt">Time Left</div>
              <div className="timer_sec">{timeValue}</div>
            </div>
            <div className="time_line"></div>
          </header>
          <section>
            <div className="que_text">
              <span>
                {questions[questionIndex].numb}.{" "}
                {questions[questionIndex].question}
              </span>
            </div>
            <div className="option_list">
              {questions[questionIndex].options.map((option, index) => (
                <div
                  key={index}
                  className="option"
                  onClick={() => handleAnswerClick(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </section>
          <footer>
            <div className="total_que">
              {questionIndex + 1} of {questions.length} Questions
            </div>
            <button className="next_btn" onClick={handleNextQuestion}>
              Next Que
            </button>
          </footer>
        </div>
      )}
      {!quizStarted && !quizCompleted && (
        <div>
          <div className="start_btn activeInfo">
            <button onClick={startQuiz}>Start Quiz</button>
          </div>
          <div className="info_box activeInfo">
            <div className="info-title">
              <span>Some Rules of this Quiz</span>
            </div>
            <div className="info-list">
              <div className="info">
                1. You will have only <span>15 seconds</span> per each question.
              </div>
              <div className="info">
                2. Once you select your answer, it can't be undone.
              </div>
              <div className="info">
                3. You can't select any option once time goes off.
              </div>
              <div className="info">
                4. You can't exit from the Quiz while you're playing.
              </div>
              <div className="info">
                5. You'll get points on the basis of your correct answers.
              </div>
            </div>
            <div className="buttons">
              <button className="quit" onClick={handleExitQuiz}>
                Exit Quiz
              </button>
              <button className="restart" onClick={handleContinueQuiz}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {quizCompleted && (
        <div
          className="start_btn activeInfo"
          style={{ backgroundColor: "#8494e1" }}
        >
          <div className="icon">
            <i className="fas fa-crown"></i>
          </div>
          <div className="complete_text">Quiz Completed!</div>
          <div className="score_text">
            <span className="userScore">
              Your score: <p style={{ color: "black" }}>{userScore}</p>
            </span>
          </div>
          <div className="buttons">
            <button
              className="quit"
              style={{ marginLeft: "200px" }}
              onClick={handleExitQuiz}
            >
              Quit Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
