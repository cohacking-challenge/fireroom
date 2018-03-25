import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './firebase/app';
import db from './firebase/db';

// setToCorrectAnswer(db.collection('questions').doc('0PRWmuTay83dP0H4CwzP'));

// function setToCorrectAnswer(ref) {
//   const answerRef = ref.collection('answers').doc('e71YA2BvTfaA4MEiGABe');
//   answerRef.set(
//     {
//       isCorrect: true,
//     },
//     { merge: true },
//   );
// }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
