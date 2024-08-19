import { useReducer, useEffect, createContext, useContext } from "react";

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    remainingSeconds: null,
    restart: 0
};

const time_per_question = 0;

function reducer(state, action) {
    switch (action.type) {
        case "DataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
                restart: 0
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
                highscore: state.points > state.highscore ? state.points : state.highscore,
                restart: 1
            }
        case "Restart":
            return {
                ...state,
                status: "ready",
                answer: null,
                points: 0,
                restart: 0,
                index: 0,
                remainingSeconds: state.questions.length * time_per_question
            }
        case "tick":
            const newRemainingSeconds = state.remainingSeconds - 1;
            return {
                ...state,
                remainingSeconds: newRemainingSeconds,
                restart: state.remainingSeconds <= 0 ? 1 : state.restart,
                status: state.remainingSeconds === 0 ? "finished" : state.status
            }
        default:
            throw new Error("Action is unknown");
    }
}

const QuizContextConst = createContext();

const QuizContext = ({children}) => {
    const [{ questions, status, index, answer, points, highscore, remainingSeconds, restart }, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "DataReceived", payload: data }))
            .catch((err) => dispatch({ type: "DataFailed" }));
    }, [])
    return <QuizContextConst.Provider values={{questions, restart, status, index, answer, points, highscore, remainingSeconds, dispatch, numQuestions, maxPoints, time_per_question}}>
        {children}
    </QuizContextConst.Provider>
}

const useQuiz = () => {
    const context = useContext(QuizContextConst);
    if(context === undefined) throw new Error("Using context outside the QuizContex Provider");
    return context;
}

export {QuizContext, useQuiz};