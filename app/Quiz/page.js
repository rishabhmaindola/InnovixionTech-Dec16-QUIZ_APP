"use client";
import React, { useState } from "react";
import axios from "axios";

const Quiz = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const getQuiz = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
      );
      const data = response.data.results.map((question) => ({...question,
        options: shuffleOptions([...question.incorrect_answers, question.correct_answer]),
      }));
      setQuizItems(data);
      setQuizComplete(false);
      setCurrentQuestion(0); 
      setSelectedOption(null); 
      setScore(0); 
    } catch (error) {
      console.error("Error Fetching the Quiz", error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const checkAnswer = () => {
    if (selectedOption === quizItems[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1); 
    }
  };

  const nextQuestion = () => {
    checkAnswer(); 
    if (currentQuestion < quizItems.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedOption(null); 
    } else {
      setQuizComplete(true); 
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center">
        <button
          onClick={getQuiz}
          className="flex bg-red-500 items-center p-5 ml-12 mt-10 text-white font-bold justify-between"
        >
          Take Quiz!
        </button>
        <br />
        <div>
          {quizItems.length > 0 && (
            <div key={quizItems[currentQuestion].id} className="flex flex-col">
              <h2 className="font-bold text-xl ">{quizItems[currentQuestion].question}</h2>
              {quizItems[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionChange(option)}
                  className={`bg-slate-500 hover:bg-blue-700 text-white text-xl font-bold py-4 px-8 mt-2 rounded ${
                    selectedOption === option ? "bg-blue-700" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
              <p>Score: {score}</p>
              {quizComplete && (
                <p className="font-bold text-xl flex flex-col mx-auto mt-10">
                  Quiz Complete! Your Final Score is: {score} out of {quizItems.length}
                </p>
              )}
              {!quizComplete && (
                <button
                  onClick={nextQuestion}
                  className="bg-green-500 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 mt-2 rounded"
                >
                  Next Question
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;