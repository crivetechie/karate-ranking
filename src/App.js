import React, { useState } from "react";
import "./App.css"; // Importing CSS for styling

function NumberInput({
  onNumberClick,
  onEnterClick,
  onClearNumber,
  onClearList,
  currentNumber,
}) {
  const [number, setNumber] = useState(0);

  const handleNumberClick = (digit) => {
    setNumber(number * 10 + digit);
  };

  const handleEnterClick = () => {
    onEnterClick(number / 10);
    setNumber(0);
  };

  const handleClearNumber = () => {
    setNumber(0);
    onClearNumber();
  };

  const handleBackspaceClick = () => {
    setNumber(Math.floor(number / 10));
  };

  return (
    <div className="number-input">
      <div className="current-number">Current Number: {number / 10}</div>
      <div className="button-container">
        <div className="button-row">
          <button className="digit-button" onClick={() => handleNumberClick(7)}>
            7
          </button>
          <button className="digit-button" onClick={() => handleNumberClick(8)}>
            8
          </button>
          <button className="digit-button" onClick={() => handleNumberClick(9)}>
            9
          </button>
        </div>
        <div className="button-row">
          <button className="digit-button" onClick={() => handleNumberClick(4)}>
            4
          </button>
          <button className="digit-button" onClick={() => handleNumberClick(5)}>
            5
          </button>
          <button className="digit-button" onClick={() => handleNumberClick(6)}>
            6
          </button>
        </div>
        <div className="button-row">
          <button className="digit-button" onClick={() => handleNumberClick(1)}>
            1
          </button>
          <button className="digit-button" onClick={() => handleNumberClick(2)}>
            2
          </button>
          <button className="digit-button" onClick={() => handleNumberClick(3)}>
            3
          </button>
        </div>
        <div className="button-row">
          <button className="digit-button" onClick={handleClearNumber}>
            Clear
          </button>
          <button className="digit-button" onClick={() => handleNumberClick(0)}>
            0
          </button>
          <button className="digit-button" onClick={handleEnterClick}>
            Enter
          </button>
        </div>
        <div className="button-row">
          <button className="backspace-button" onClick={handleBackspaceClick}>
            Backspace
          </button>
          <button className="clear-list-button" onClick={onClearList}>
            Clear List
          </button>
        </div>
      </div>
    </div>
  );
}

function NumberList({ numbers, onSortClick }) {
  return (
    <div className="number-list">
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number / 10}</li>
        ))}
      </ul>
      <button className="sort-button" onClick={onSortClick}>
        Sort
      </button>
    </div>
  );
}

function App() {
  const [numbers, setNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);

  const addNumber = (number) => {
    setNumbers([...numbers, number * 10]);
  };

  const sortNumbers = () => {
    const sortedNumbers = [...numbers].sort((a, b) => b - a);
    setNumbers(sortedNumbers);
  };

  const clearList = () => {
    setNumbers([]);
  };

  return (
    <div className="container">
      <h1>Number Sorting App</h1>
      <div className="calculator-container">
        <NumberInput
          onNumberClick={(digit) =>
            setCurrentNumber(currentNumber * 10 + digit)
          }
          onEnterClick={(number) => {
            addNumber(number);
            setCurrentNumber(0);
          }}
          onClearNumber={() => setCurrentNumber(0)}
          onClearList={clearList}
          currentNumber={currentNumber}
        />
        <NumberList numbers={numbers} onSortClick={sortNumbers} />
      </div>
    </div>
  );
}

export default App;
