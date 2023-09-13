const MainScreen = (props) => {

    const handleStartIntro = () => {
        props.setConfig({...props.config, intro: true})
    }

  return (
    /* MAIN SCREEN WITH BUTTONS OS START AND INSTRUCTIONS */
    <div style={{width: 1200, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, color: 'white', backgroundColor: 'black'}}>
        <h1 style={{color: 'white'}}>Welcome to the game! </h1>
        <h2><u>By Jose daniel Pinzon And Juan Fernando agudelo</u></h2>
        <h2 style={{color: 'white'}}>Instructions:</h2>
        <h3 style={{color: 'white', textAlign: 'center', width: 500}}>Answer the questions and escape from the castle infected with zombies that will kill you if you answer wrong!</h3>
        <h3 style={{color: 'white'}}>The game consists of 5 levels with 8 questions each</h3>
        <h3 style={{color: 'white'}}>Good Luck!</h3>
        <button onClick={handleStartIntro} style={{width: 200, height: 50, border: '1px solid gray', color: 'white', display:'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18}} >
            START GAME
        </button>
    </div>
  )
}

export default MainScreen