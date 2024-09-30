import React, { useEffect, useState } from "react";
import "../home/home.css";
// import { UNSAFE_FetchersContext } from "react-router-dom";

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


  const username = async () => {

    const token = localStorage.getItem('token')


    const response = await fetch('http://localhost:3001/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const res = await response.json();

    console.log(res);


  }
  useEffect(() => {
    questionFetch();
  }, []);



  return (
    <div className="home-page">
      <form>
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
                        <li key={index}>
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            id={`option-${question._id}-${index}`}
                          />
                          <label
                            htmlFor={`option-${question._id}-${index}`}
                            className="cursor-pointer"
                          >
                            {option}
                          </label>
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
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

    </div>
  );
}

export default Home;
