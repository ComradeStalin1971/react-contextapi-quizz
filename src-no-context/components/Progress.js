import React from 'react'

const Progress = ({index, points, numQuestions, maxPoints, answer}) => {
    return (
        <header className='progress'>
            <progress max={numQuestions} value={index+Number(answer !== null)} />

            <p>Question <strong>{index + 1}</strong>/{numQuestions}</p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}

export default Progress