import React, { useEffect, useState } from "react";
import "../home/home.css";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const questionFetch = async () => {
    const accessToken = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/readqustion', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setQuestions(data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('You neet to Login!');
    }
  };

  useEffect(() => {
    questionFetch();
  }, []);

  return (
    <div className="home-page">
      <div className="ml-52 mt-10 p-6 mainclass">
        {error && <p className="error">{error}</p>}

        <div>
          {questions.length > 0 ? (
            <ul>
              {questions.map((question) => (
                <li key={question._id}>
                  <strong>Question:</strong> {question.question}
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index} id="input">
                        <input type="radio" name={`question-${question._id}`} /> {option}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
