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
  const [output, setOutput] = useState({}); // Initializes an empty object

  // Handling option changes
  function handleOptionChange(e, option) {
    setOptions({
      ...options,
      [option]: e.target.value
    });
  }

  // Creating the quiz and sending data to the backend
  const createQuiz = async (e) => {
    e.preventDefault();
    const quizData = {
      question: quiz,
      options: [options.optionA, options.optionB, options.optionC, options.optionD],
      rightans: ans,
    };
  
    try {
      const response = await fetch("http://localhost:3001/quizadding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log(data); // Log the response data
  
      // Set the output to the response data directly
      setOutput(data);

      console.log(output)
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  
    setQuiz(""); // Clear question input
    setOptions({  // Clear all options
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
    });
  
    setAns(""); // Clear the correct answer
  };

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

        {/* Display the output if available */}
        {output && output.data && (
          <div>
            <h3>Quiz Created:</h3>
            <p>Question: {output.data.question}</p>
            <p>Options: {output.data.options.join(", ")}</p>
            <p>Correct Answer: {output.data.rightans}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
