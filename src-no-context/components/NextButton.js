import React from 'react'

const NextButton = (props) => {
    if (props.answer === null) return null;
    if (props.index < props.numQuestions - 1) {
        return (
            <button onClick={() => props.dispatch({ type: "NextQuestion" })} className="btn btn-ui">Next</button>
        )
    }
    if (props.restart === 1) {
        return (
            <button onClick={() => props.dispatch({ type: "Restart" })} className="btn btn-ui">Restart Quiz</button>
        )
    }
    if (props.index === props.numQuestions - 1) {
        return (
            <button onClick={() => props.dispatch({ type: "Finish" })} className="btn btn-ui">Finish</button>
        )
    }

}

export default NextButton