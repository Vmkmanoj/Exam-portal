import React, { useEffect, useState } from "react";
import "../home/home.css";
import submit from "../submit/submit";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [clickans, setClickans] = useState({}); // Stores answers keyed by question

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
      setError('You need to Login!');
    }
  };

  const displaying = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('token');

    const answersPayload = {
        questions: Object.entries(clickans).map(([question, answer]) => ({
            question: question,
            answers: [answer] // Store as an array of answers
        }))
    };

    try {
        const response = await fetch('http://localhost:3001/userans', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answersPayload), // Send structured data
        });
        if (!response.ok) {
            throw new Error('Failed to submit answers');
        }

        const res = await response.json();
        if(res.success){
            window.location.replace('/Anssumit')
        }
    

    } catch (error) {
        console.error('Error submitting answers:', error);
    }
};




const handleChanges = (question, option) => {
    // Store selected answer in an object
    setClickans((prev) => ({
        ...prev,
        [question]: option, // Key the answers by question
    }));
};


  useEffect(() => {
    questionFetch(); // Fetch questions when component mounts
  }, []);

  return (
    <div className="home-page">
      <form onSubmit={displaying}>
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
                            name={`question-${question._id}`} // Ensure radio buttons are grouped by question
                            id={`option-${question._id}-${index}`}
                            onChange={() => handleChanges(question.question, option)} // Use onChange instead of onClick
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

                <div className="submit-button">
                  <button type="submit">Submit</button>
                </div>
              </ul>
            ) : (
              <p>No questions available</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Home;
