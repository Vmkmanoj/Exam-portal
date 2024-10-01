import React, { useEffect, useState } from "react";
import "../home/home.css";

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
    e.preventDefault(); // Prevent default form submission behavior

    const accessToken = localStorage.getItem('token');

    // console.log(clickans); // Log clickans to inspect its structure

    try {
        const response = await fetch('http://localhost:3001/userans', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clickans), // Send the state as the body
        });
        
        
        

        if (!response.ok) {
            throw new Error('Failed to submit answers');
        }

        const res = await response.json();
        // console.log(res);
    } catch (error) {
        console.error('Error submitting answers:', error);
    }
};



  const handleChanges = (questionId, option) => {
    // Update the selected answer for a specific question
    setClickans((prev) => ({
      ...prev,
      [questionId]: option, // Set the selected option for the given question
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
