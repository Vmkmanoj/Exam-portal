import React from "react";
import now_avaibleTest from "../../assets/test";
import './taketest.css'; // Assuming you create a CSS file for styling

function Taketest() {
    return (
        <div className="test-container ml-36">
            {now_avaibleTest.map((test, index) => (
                <div className="test-card" key={index}>
                    <h3 className="test-title">{test.testname}</h3>
                    <p className="test-info">Duration: {test.duration}</p>
                    <p className="test-info">Start Time: {test.start}</p>
                    <button className="start-btn">Start Test</button>
                </div>
            ))}
        </div>
    );
}

export default Taketest;
