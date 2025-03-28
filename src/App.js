import React, { useState } from "react";
import "./App.css"; // Importing CSS for styling

function NumberInput({ onEnterClick, onClearNumber, onClearList }) {
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

  // Format current number to always display one decimal digit
  const formattedCurrentNumber = (number / 10).toFixed(1);

  return (
    <div className="number-input">
      <div className="current-number">{formattedCurrentNumber}</div>
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
          <button className="digit-button" onClick={() => handleNumberClick(0)}>
            0
          </button>
        </div>
        <div className="button-row">
          <button className="cancel-button" onClick={handleClearNumber}>
            Cancella
          </button>
          <button className="add-button" onClick={handleEnterClick}>
            Inserisci
          </button>
        </div>
        <div className="button-row">
          <button className="pool-button" onClick={onClearList}>
            Nuova pool
          </button>
        </div>
      </div>
    </div>
  );
}

function NumberList({ numbers }) {
  const duplicateNumbers = {}; // Object to store count of duplicate numbers

  // Count occurrences of each number
  numbers.forEach((number) => {
    duplicateNumbers[number] = (duplicateNumbers[number] || 0) + 1;
  });

  // Group numbers into arrays of 5 elements each
  const groupedNumbers = [];
  for (let i = 0; i < numbers.length; i += 5) {
    groupedNumbers.push(numbers.slice(i, i + 5));
  }

  return (
    <div className="number-list">
      <h2>Ordine:</h2>
      {groupedNumbers.map((group, index) => (
        <ul className="number-list-ul" key={index}>
          {group.map((number, idx) => (
            <li
              key={idx}
              className={
                duplicateNumbers[number] >= 2 ? "duplicate-number" : ""
              }
            >
              {number / 10}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function App() {
  const [numbers, setNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);

  const addNumber = (number) => {
    const sortedNumbers = [...numbers, number * 10].sort((a, b) => b - a);
    setNumbers(sortedNumbers);
  };

  const clearList = () => {
    setNumbers([]);
  };

  return (
    <div className="container">
      <div className="app-content">
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
        <NumberList numbers={numbers} />
      </div>
    </div>
  );
}

export default App;
