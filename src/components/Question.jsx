const Question = (props) => {
  return (
    <div style={{width: 800, height: 150, display:'flex', textAlign: 'center', flexDirection: 'column', color: 'black', fontSize: 22, paddingTop: 10}} >
        Level {props.actualLevel + 1}:
        {" "}
        {props.question.id} - {props.question.question}
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: 5, paddingTop: 20}}>
            {
                Object.entries(props.question.answers).map((answer, index) => {
                    return (
                        <button onClick={() => props.handleAnswer(answer[0])} key={index} style={{width: 200, height: 50, border: '1px solid gray', color: 'white', display:'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18}} >
                            {answer[0] } - {answer[1]}
                        </button>
                    )
                })
            }
        </div>
        {
            props.answered !== null ?
            props.answered ? <h2 style={{color: 'green'}}>Correct</h2> : <h2 style={{color: 'red'}}>Incorrect</h2> : null
        }
    </div>
  )
}

export default Question