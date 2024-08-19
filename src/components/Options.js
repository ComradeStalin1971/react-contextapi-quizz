import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

const Options = ({question}) => {
    const { dispatch, answer } = useQuiz();
    return (
        <div className='options'>
            {question.options.map((option, index) => 
            <button 
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${answer !== null ? index === question.correctOption ? "correct" : 'wrong' : ''}`} 
            onClick={() => dispatch({ type: "NewAnswer", payload: index })} 
            key={option} disabled={answer !== null}>
                {option}
            </button>)}
        </div>
    )
}

export default Options