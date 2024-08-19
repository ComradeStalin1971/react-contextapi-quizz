import React from 'react'
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
import { useQuiz } from '../contexts/QuizContext';


const App = () => {
  const { status } = useQuiz();
  return (
    <div className='app'>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" &&
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        }
        {status === "finished" &&
          <>
            <FinishState />          
          </>
        }
      </Main>
    </div>
  )
}

export default App