import React from 'react'
import { useQuiz } from '../contexts/QuizContext';

const NextButton = () => {
    const {answer, index, numQuestions, restart, dispatch} = useQuiz();

    if (answer === null) return null;
    if (index < numQuestions - 1) {
        return (
            <button onClick={() => dispatch({ type: "NextQuestion" })} className="btn btn-ui">Next</button>
        )
    }
    if (restart === 1) {
        return (
            <button onClick={() => dispatch({ type: "Restart" })} className="btn btn-ui">Restart Quiz</button>
        )
    }
    if (index === numQuestions - 1) {
        return (
            <button onClick={() => dispatch({ type: "Finish" })} className="btn btn-ui">Finish</button>
        )
    }

}

export default NextButton