import React, { useEffect, useReducer } from 'react'
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishState from './FinishState';
import Footer from './Footer';
import Timer from './Timer';

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingSeconds: null
};

const time_per_question = 30;

function reducer(state, action) {
  switch (action.type) {
    case "DataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }
    case "DataFailed":
      return {
        ...state,
        status: "error"
      }
    case "Active":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * time_per_question
      }
    case "NewAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      }
    case "NextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1
      }
    case "Finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    case "Restart":
      return {
        ...state,
        status: "ready",
        answer: null,
        points: 0,
        index: 0,
        remainingSeconds: state.questions.length * time_per_question
      }
    case "tick":
      const newRemainingSeconds = state.remainingSeconds - 1;
      return {
        ...state,
        remainingSeconds: newRemainingSeconds,
        status: state.remainingSeconds === 0 ? "finished" : state.status
      }
    default:
      throw new Error("Action is unknown");
  }
}

const App = () => {
  const [{ questions, status, index, answer, points, highscore, remainingSeconds }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "DataReceived", payload: data }))
      .catch((err) => dispatch({ type: "DataFailed" }));
  }, [])

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
        {status === "active" &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer} />
            <Question dispatch={dispatch} restart={0} answer={answer} question={questions[index]} />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextButton dispatch={dispatch} restart={0} answer={answer} numQuestions={numQuestions} index={index} />
            </Footer>
          </>
        }
        {status === "finished" &&
          <>
            <FinishState points={points} highscore={highscore} maxPoints={maxPoints} />
            <NextButton dispatch={dispatch} restart={1} answer={answer} numQuestions={numQuestions} index={index} />
          </>
        }
      </Main>
    </div>
  )
}

export default App