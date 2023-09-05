const Question = (props) => {
  return (
    <div style={{width: 800, height: 150, border: '1px solid gray', display:'flex', textAlign: 'center', flexDirection: 'column', color: 'black', fontSize: 22}} >
        {props.question.question}
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: 2}}>
            {
                Object.entries(props.question.answers).map((answer, index) => {
                    return (
                        <button onClick={() => props.handleAnswer(answer[0])} key={index} style={{width: 200, height: 50, border: '1px solid gray', color: 'white', display:'flex', justifyContent: 'center', alignItems: 'center', fontSize: 22}} >
                            {answer[0] } - {answer[1]}
                        </button>
                    )
                })
            }
        </div>
        {
            props.answered !== null ?
            props.answered ? <p>Correct</p> : <p>Incorrect</p> : null
        }
    </div>
  )
}

export default Question