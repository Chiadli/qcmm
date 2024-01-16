import { Question } from "./Question";
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../Styles/Quiz.css'
import { UserContext } from "../utils/userContext";

export const Quiz = () => {

    const [Title, settitle] = useState('')
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [btnstate, setBtnState] = useState(false)
    const [score, setScore] = useState(0)
    const [end, setEnd] = useState(false)
    const { auth, quizId, setAuth } = useContext(UserContext)
    const navigate = useNavigate()


    const handleClick = (userAnswers) => {
        if (index < questions.length - 1) {
            setIndex(1 + index)
            const check = checkAnswers(userAnswers)

            if (check) {
                setScore(score + 1)



                if ((index + 1) === questions.length - 1) {
                    setBtnState(true)
                }
            }

        }
    }

    const handelSubmit = (userAnswers) => {

        const check = checkAnswers(userAnswers)

        if (check) {
            setScore(score + 1)
            setEnd(true)
        }
        else {
            setEnd(true)
        }
    }

    const checkAnswers = (userAnswers) => {

        const correctAnswers = questions[index]?.answers?.map((answer, i) => answer.correct ? i.toString() : null)
            .filter((answer) => answer !== null)
        if (userAnswers?.length !== correctAnswers?.length) {
            return false
        }

        userAnswers.sort()
        correctAnswers.sort()

        for (let index = 0; index < userAnswers?.length; index++) {
            if (userAnswers[index] !== correctAnswers[index]) {
                return false
            }

        }

        return true
    }

    const getData = () => {


        if (quizId === '') {
            navigate('/', { replace: true })
        }
        auth.type === "Student" && axios({
            method: 'post',
            url: 'http://localhost:4000/api/data/quiz/questions',


            data: {
                name: auth.name,
                quizId: quizId,

            },
        }).then((response) => {
            settitle(response.data[0].name)
            setQuestions(response.data[0].questionsList)

        }).catch((err) => {
            if (err.response.status === 401) {
                setAuth({})
                navigate('/login', { replace: true })
            }
        })

        auth.type === "Professor" && axios({
            method: 'post',
            url: 'http://localhost:4000/api/data/quiz/questions',

            headers: { 'Authorization': 'Bearer ' + auth.token },
            data: {
                userId: auth.userId,
                quizId: quizId,

            },
        }).then((response) => {
            settitle(response.data[0].name)
            setQuestions(response.data[0].questionsList)

        }).catch((err) => {
            if (err.response.status === 401) {
                setAuth({})
                navigate('/login', { replace: true })
            }
        })

    }



    const submitScore = () => {
        navigate('/', { replace: true })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>

            {!end ?
                <div className="quizContainer">
                    <h2 className="quiztitle text-light">{Title}</h2>
                    <Question questions={questions} index={index} handleClick={handleClick} handelSubmit={handelSubmit} btnstate={btnstate} />
                </div>
                :
                <div className="quizContainer">
                    <h2 className="quiztitle text-light">Result</h2>
                    <div className='questionContainer'>
                        <div>
                            <h2 className='text-light' style={{
                                "justifyContent": "center",
                                "textAlign": "center"
                            }}>Your Result :{score}</h2>
                        </div>
                    </div>
                    <button className="btn" onClick={() => submitScore()}  >Done</button>
                </div>
            }

        </>

    );
}

