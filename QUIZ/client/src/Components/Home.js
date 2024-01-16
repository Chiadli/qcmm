import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css'
import { UserContext } from "../utils/userContext";

export const Home = () => {

    const { auth, setQuizId, setAuth } = useContext(UserContext)
    const [quizzes, setQuizzes] = useState([])
    const navigate = useNavigate()


    const getQuiz = () => {
        auth.type === "Student" && axios({
            method: 'get',
            url: 'http://localhost:4000/api/data/quiz',

            params: {
                name: auth.name,
                type: auth.type
            },

        }).then((response) => {
            setQuizzes(response.data)
        }).catch((err) => {
            console.log(err.response)
            if (err?.response?.status === 401) {
                setAuth({})
                navigate('/login', { replace: true })
            }
        })

        auth.type === "Professor" && axios({
            method: 'get',
            url: 'http://localhost:4000/api/data/quiz',

            params: {
                userId: auth.userId,
                type: auth.type
            },

        }).then((response) => {
            setQuizzes(response.data)
        }).catch((err) => {
            if (err.response.status === 401) {
                setAuth({})
                navigate('/login', { replace: true })
            }
        })
    }
    useEffect(() => {
        getQuiz()
    }, [])




    function convertMsToTime(milliseconds) {
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;


        hours = hours % 24;

        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
            seconds,
        )}`;
    }

    const handleClick = (id) => {

        setQuizId(id)
        navigate('/quiz', { replace: true })
    }

    const handelEdit = (id) => {
        setQuizId(id)
        navigate('/editquiz', { replace: true })
    }
    return (
        <>
            {
                quizzes?.map((quiz, index) => {
                    return <>
                        {auth.type === "Student" && <div className="quizHomeContainer" key={index} onClick={() => { quiz?.attempts !== quiz?.studentsList[0]?.attempts && handleClick(quiz._id) }}>

                            <div className="quizHomeTitle">{quiz?.name}</div>
                            <div className='quizHomeInfo'>
                                <div>time: {convertMsToTime(Math.abs(new Date(quiz?.endAt) - new Date(quiz?.startAt)))}</div>

                                <div>max attempts: {quiz?.attempts}</div>
                                <div>your attempts: {quiz?.studentsList[0]?.attempts}</div>
                            </div>
                        </div>}
                        {auth.type === "Professor" && <div className="quizHomeContainer" key={index} onClick={() => { handelEdit(quiz._id) }}>

                            <div className="quizHomeTitle">{quiz?.name}</div>
                            <div className='quizHomeInfo'>
                                <div>time: {convertMsToTime(Math.abs(new Date(quiz?.endAt) - new Date(quiz?.startAt)))}</div>

                                <div>max attempts: {quiz?.attempts}</div>
                            </div>
                        </div>}

                    </>
                })
            }

        </>
    );
}

