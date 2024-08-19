import React from 'react'

const Options = ({ question, dispatch, answer }) => {
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