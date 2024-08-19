import React from 'react'
import NextButton from './NextButton';

const FinishState = ({ points, maxPoints, highscore }) => {
    const percentange = (points / maxPoints) * 100;
    let emoji;
    if (points === maxPoints) emoji = '🥇';
    if (points > 80 && points < 100) emoji = '🥳';
    if (points > 50 && points < 80) emoji = '🙃';
    if (points > 0 && points < 50) emoji = '🙂';
    if (points === 0) emoji = '🤦‍♂';
    return (
        <>
            <p className='result'>
                {emoji} You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentange)}%)
            </p>
            <p className='highscore'>(Highscore: {highscore} points)</p>
            <NextButton />
        </>
    )
}

export default FinishState