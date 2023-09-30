import { useState, useEffect } from 'react'
import './App.css'
import Level from './components/Level'
import Question from './components/Question';
import questions from './data/data.json'
import MainScreen from './components/MainScreen';
import Intro from './components/Intro';
import Map from './components/Map';

let enemies_array = []
let count_enemies = 1;

const INITIAL_CONFIG = {
  fps: 50,
  stopEnemies: false,
  stopWarrior: false,
  gameOver: false,
  enemies_x: 100,
  startGame: false,
  actualLevel: 0,
  nextLevel: 1,
  intro: false,
  advanceLevel: true,
  firstLevel: true,
  warrior: {
    width: 64,
    height: 80,
    x: 0,
    y: 72,
    attack: false,
    currentFrame:0,
    totalFrames:3,
    totalFramesAttack: 7,
    totalFramesDead: 7,
    speed: 0.1,
    dead: false
  },
  levelInMap: {
    [0] : {
      x: 0,
      y: 80,
    },
    [1]: {
      x: 45,
      y: 55,
    },
    [2]: {
      x: 130,
      y: 0,
    },
    [3]: {
      x: 175,
      y: 65,
    },
    [4]: {
      x: 230,
      y: 40,
    },
  },
  enemies: Object.entries(questions).map(([level, questions]) => {
    return questions.questions.map((question, indexQuestion) => {
      const enemies = 
      {
        width: 32,
        height: 32,
        x: ((count_enemies++) * 100) + 100,
        y: 110,
        currentFrame: 0,
        totalFrames: 3,
        dead: false,
        totalExplotionFrames: 3,
        explotionCurrentFrames: 0
      }
      enemies_array.push(enemies)
      return enemies
    })
  })
}

INITIAL_CONFIG.enemies = enemies_array

function App() {
  const [actualLevel, setActualLevel] = useState(0);
  const [actualQuestion, setActualQuestion] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [config, setConfig] = useState(INITIAL_CONFIG);

  const handleAnswer = (answer) => {
    if (answer === questions[actualLevel].questions[actualQuestion].correctAnswer){
      setAnswered(true)
      setConfig({
        ...config,
        warrior: {
          ...config.warrior,
          attack: true
        },
        enemies: config.enemies.map((enemy, index) => {
          if(index === 0)
            return {
              ...enemy,
              dead: true,
              explotionCurrentFrames: enemy.explotionCurrentFrames >= enemy.totalExplotionFrames ? enemy.explotionCurrentFrames = 0 : enemy.explotionCurrentFrames += 0.1
            }
          return enemy
        })
      })
      setTimeout(() => {
        setAnswered(null)
        setActualQuestion(actualQuestion + 1)
        config.enemies.shift()
        setConfig({
          ...config,
          enemies: config.enemies,
          stopEnemies: false,
          firstLevel: false,
          actualLevel: actualQuestion === 0 ? actualLevel + 1 : actualLevel,
          nextLevel: actualQuestion === 0 ? actualLevel + 2 : actualLevel + 1,
          warrior: {
            ...config.warrior,
            attack: false

          }
        })
        if(actualQuestion === 0){
          setActualQuestion(0)
          setActualLevel(actualLevel + 1)
          setConfig({
            ...config,
            advanceLevel: true,
            nextLevel: actualLevel + 1,
            stopEnemies: true,
            actualLevel: actualLevel,
          })
        }
      }, 2000)
    }
    else{
      setAnswered(false)
      setConfig({
        ...config,
        gameOver: true,
        warrior: {
          ...config.warrior,
          attack: false,
          dead: true
        }
      })
    }
  }

  const retry = () => {
    setConfig({
      ...INITIAL_CONFIG,
      enemies: enemies_array
    });
    setActualLevel(0);
    setActualQuestion(0);
    setAnswered(null);
  }

  useEffect(() => {
    let stop = config.stopEnemies
    let attack = config.warrior.attack
    let width = config.warrior.width
    let dead = config.warrior.dead
    let y = config.warrior.y
    let warriorCurrentFrame = config.warrior.currentFrame
    let timer = null
    if(config.startGame && !config.advanceLevel){
      timer = setInterval(() => {
        //MOVE ENEMIES
        const newEnemies = config.enemies.map((enemy) => {
          if (enemy.x === 80 || stop){
            stop = true
            if(enemy.dead){
              return {
                ...enemy,
                explotionCurrentFrames: enemy.explotionCurrentFrames >= enemy.totalExplotionFrames ? enemy.explotionCurrentFrames = 0 : enemy.explotionCurrentFrames += 0.1
              }
            }else{
              return {
                ...enemy,
              }
            }
          }
          return {
            ...enemy,
            x: enemy.x--,
            currentFrame: enemy.currentFrame >= enemy.totalFrames ? enemy.currentFrame = 0 : enemy.currentFrame += 0.1
          }
        })
        if(config.warrior.attack){
          width = 96
          if(warriorCurrentFrame >= config.warrior.totalFramesAttack){
            warriorCurrentFrame = 0
            attack = false;
          }
          else
            warriorCurrentFrame += config.warrior.speed
        }
        else if(config.warrior.dead){
          width = 80
          y = 102;
          if(warriorCurrentFrame >= config.warrior.totalFramesDead){
            warriorCurrentFrame = config.warrior.totalFramesDead
            dead = true;
          }
          else
            warriorCurrentFrame += config.warrior.speed
        }
        else{
          width = 64
          if(warriorCurrentFrame >= config.warrior.totalFrames)
            warriorCurrentFrame = 0
          else
          warriorCurrentFrame += config.warrior.speed
        }
        setConfig({
          ...config,
          stopEnemies: stop,
          enemies: newEnemies,
          warrior: {
            ...config.warrior,
            currentFrame: warriorCurrentFrame,
            attack,
            width,
            dead,
            y
          }
        })
      }, 1000 / config.fps)
    }
    return () => {
      clearInterval(timer);
    };
  },[config.stopEnemies, config.warrior.attack, answered, config.warrior.dead, config.gameOver, config.startGame, config.actualLevel, config.advanceLevel])

  if(!config.startGame && !config.intro)
    return (
      <div style={{width: 1200, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, color: 'white'}}>
        <MainScreen config={config} setConfig={setConfig} />
      </div>
    )

  if(!config.startGame && config.intro)
    return (
      <div style={{width: 1200, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, color: 'white'}}>
        <Intro config={config} setConfig={setConfig} />
      </div>
    )

  if(config.startGame && !config.intro && config.advanceLevel){
    return (
      <Map config={config} setConfig={setConfig} />
    )
  }

  return (
    <>
      <div style={{width: 1200, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Level config={config}  />
        {
          config.stopEnemies && <Question actualLevel={actualLevel} question={questions[actualLevel].questions[actualQuestion]} answered={answered} handleAnswer={handleAnswer} />
        }
        {
          config.gameOver && 
          <>
            <h2 style={{color: 'red'}}><u>GAME OVER</u></h2>
            <button onClick={retry} style={{width: 200, height: 50, border: '1px solid gray', color: 'white', display:'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18, marginTop: 50}} >
                RETRY
            </button>
          </>
        }
      </div>
    </>
  )
}

export default App
