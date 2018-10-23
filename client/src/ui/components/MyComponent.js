import React from 'react';
import ReactTextRotator from 'react-text-rotator';

const content = [
  {
    text: 'Click upload button.',
    className: 'classA',
    animation: 'fade'
  },
  {
    text: 'Select desired CSV file to upload.',
    className: 'classB',
    animation: 'fade'
  },
  {
    text: 'Fill in the desired text to be sent to all users in the CSV file phone number.',
    className: 'classC',
    animation: 'fade'
  },
  {
    text: 'Click Submit.',
    className: 'classD',
    animation: 'fade'
  }
];

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Instruction</h1>
        <ReactTextRotator content={content} time={5000} startDelay={2000} />
      </div>
    );
  }
}

export default MyComponent;
