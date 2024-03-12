import React, { useState } from 'react';

function NumberInput({ onNumberClick, onEnterClick, onClearNumber, onClearList, currentNumber }) {
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

  const renderNumbers = () => {
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <button key={i} onClick={() => handleNumberClick(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <div>Current Number: {number / 10}</div>
      <div>
        <button onClick={handleClearNumber}>Clear Number</button>
        <button onClick={onClearList}>Clear List</button>
        <button onClick={handleBackspaceClick}>Backspace</button>
      </div>
      <div>
        {renderNumbers()}
        <button onClick={() => handleNumberClick(0)}>0</button>
      </div>
      <button onClick={handleEnterClick}>Enter</button>
    </div>
  );
}

function NumberList({ numbers, onSortClick }) {
  return (
    <div>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number / 10}</li>
        ))}
      </ul>
      <button onClick={onSortClick}>Sort</button>
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
    <div>
      <h1>Number Sorting App</h1>
      <NumberInput 
        onNumberClick={(digit) => setCurrentNumber(currentNumber * 10 + digit)}
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
  );
}

export default App;
