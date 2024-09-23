import React, { useEffect, useState } from "react";
import "../home/home.css";

function Home() {
  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [error, setError] = useState(null); // State to store any errors

  const questionFetch = async () => {
    try {
      const response = await fetch('http://localhost:3001/readqustion', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setQuestions(data.data); // Update state with fetched data
      console.log(questions)

    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to fetch questions');
    }
  };


  useEffect(()=>{
    questionFetch();

  },[])

  return (
    <div className="ml-52 mt-10 p-6 mainclass">
      

      {/* {error && <p className="error">{error}</p>} Display error message if any */}

      <div>
        {questions.length > 0 ? (
          <ul>
            {questions.map((question) => (
              <li key={question._id}>
                <strong>Question:</strong> {question.question}
                <ul>
                  {question.options.map((option, index) => (
                    <li key={index}><input type="radio" />{option}</li>
                  ))}
                </ul>
                <strong>Correct Answer:</strong> {question.correctAnswer}
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
