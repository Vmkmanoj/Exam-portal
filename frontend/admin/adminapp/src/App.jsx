import './App.css'; // Assuming you save the CSS in App.css
import { useState } from "react";

function App() {
  const [quiz, setQuiz] = useState(""); 
  const [options, setOptions] = useState({
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: ""
  }); 
  const [ans, setAns] = useState("");

  function handleOptionChange(e, option) {
    setOptions({
      ...options,
      [option]: e.target.value
    });
  }

  const  createQuiz =async(e)=> {
    e.preventDefault();
    const quizData = {
      question: quiz,
      options: [options.optionA, options.optionB, options.optionC, options.optionD],
      answers: ans
    };
    console.log(quizData);
    try {
      const response = await fetch('http://localhost:3000/quizadding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // Log the response data
    } catch (error) {
      console.error("Error creating quiz:", error);
    }


    setQuiz("");
    setOptions({
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: ""
    });

  }










  return (
    <>
      <div>
        <form onSubmit={createQuiz}>
          <label>Enter your question:</label>
          <input
            type="text"
            value={quiz}
            onChange={(e) => setQuiz(e.target.value)}
            placeholder="Type your question here"
          />

          <label>Enter your options:</label>
          <input
            type="text"
            value={options.optionA}
            onChange={(e) => handleOptionChange(e, "optionA")}
            placeholder="Option A"
          />
          <input
            type="text"
            value={options.optionB}
            onChange={(e) => handleOptionChange(e, "optionB")}
            placeholder="Option B"
          />
          <input
            type="text"
            value={options.optionC}
            onChange={(e) => handleOptionChange(e, "optionC")}
            placeholder="Option C"
          />
          <input
            type="text"
            value={options.optionD}
            onChange={(e) => handleOptionChange(e, "optionD")}
            placeholder="Option D"
          />

          <label>Enter correct answer:</label>
          <input 
            type="text" 
            value={ans} 
            onChange={(e) => setAns(e.target.value)}
            placeholder="Correct Answer"
          />

          <button type="submit">Create Quiz</button>
        </form>
      </div>
    </>
  );
}

export default App;
