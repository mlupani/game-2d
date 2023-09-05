import { useState } from 'react'
import './App.css'
import Map from './components/map'
import Question from './components/Question';
import questions from './data/data.json'

function App() {
  const [actualLevel, setActualLevel] = useState(0);
  const [actualQuestion, setActualQuestion] = useState(0);
  const [answered, setAnswered] = useState(null);

  const handleAnswer = (answer) => {
    if (answer === questions[actualLevel].questions[actualQuestion].correctAnswer){
      setAnswered(true)
      setTimeout(() => {
        setAnswered(null)
        setActualQuestion(actualQuestion + 1)
      }, 1500)
    }
    else{
      setAnswered(false)
      setTimeout(() => {
        setAnswered(null)
        setActualQuestion(0)
      }, 1500)
    }
  }

  return (
    <>
      <div style={{width: 1200, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2}}>
        <Map/>
        <Question question={questions[actualLevel].questions[actualQuestion]} answered={answered} handleAnswer={handleAnswer} />
      </div>
    </>
  )
}

export default App
