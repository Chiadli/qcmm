import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../Styles/QuizEdit.css'
import { UserContext } from "../utils/userContext";

export const QuizEdit = () => {

    const { auth, quizId, setAuth } = useContext(UserContext)
    const [quizInfo, setQuizInfo] = useState({})
    const [questions, setQuestions] = useState([])
    const [startAt, setStartAt] = useState(null)
    const [endAt, setEndAt] = useState(null)
    const [pop, setPop] = useState(false)
    const navigate = useNavigate()

    const getData = async () => {
        if (auth.type === "Professor") {
            if (quizId !== undefined || quizId !== '') {
                await axios({
                    method: 'get',
                    url: 'http://localhost:4000/api/data/quiz/' + quizId,

                    params: {
                        userId: auth.userId,
                        type: auth.type

                    },
                }).then((response) => {
                    setQuizInfo(response.data[0])
                    setStartAt(response.data[0]?.startAt.split('.')[0])
                    setEndAt(response.data[0]?.endAt.split('.')[0])
                }).catch((err) => {
                    if (err.response.status === 401) {
                        setAuth({})

                        navigate('/login', { replace: true })
                    }
                })



            } else {
                navigate('/', { replace: true })
            }
        }
        else { navigate('/login', { replace: true }) }
    }

    const getQuestions = async () => {

        if (auth.type === "Professor") {
            await axios({
                method: 'get',
                url: 'http://localhost:4000/api/data/question',

                headers: { 'Authorization': 'Bearer ' + auth.token },
                params: {
                    userId: auth.userId,
                    type: auth.type
                },
            }).then((response) => {
                setQuestions(response.data)
                console.log(response.data)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    setAuth({})

                    navigate('/login', { replace: true })
                }
            })
        }
        else { navigate('/login', { replace: true }) }
    }

    useEffect(() => {
        getData()
        getQuestions()
    }, [])

    const handleclick = (i) => {

        const newarray = quizInfo?.questionsList?.map((e, index) => index !== i ? e : null).filter((e) => e !== null)

        setQuizInfo(prev => {
            return {
                ...prev,
                questionsList: newarray
            }
        })
    }

    const handleaddclick = (i) => {
        quizInfo?.questionsList?.push(questions[i])

        setQuizInfo(prev => {
            return {
                ...prev,
                questionsList: quizInfo?.questionsList
            }
        })

    }


    const handelSubmit = (e) => {
        e.preventDefault()
        quizInfo.startAt = startAt
        quizInfo.endAt = endAt
        auth.type === "Professor" && axios({
            method: 'put',
            url: `http://localhost:4000/api/data/quiz/${quizId}`,

            headers: { 'Authorization': 'Bearer ' + auth.token },
            data: {
                quizInfo,
                createdBy: auth.userId

            },
        }).then((response) => {

            navigate('/', { replace: true })

        }).catch((err) => {
            console.log(err)
            if (err?.response?.status === 401) {

                setAuth({})
                navigate('/login', { replace: true })
            }
        })

    }

    return (
        <>
            <div className='Container'>
                <Link to='/'>home</Link>
                <div className="Wrapform">
                    <form className="form" >
                        <span className="title">Edit Quiz</span>
                        <div className="Input">
                            <input type="text" className="inputPlace" placeholder="Name" value={quizInfo?.name}
                                onChange={((e) =>
                                    setQuizInfo(prev => {
                                        return {
                                            ...prev,
                                            name: e.target.value
                                        }
                                    }))} />
                            <span className="Input-focus"></span>
                        </div>
                        <div style={{ "marginBottom": "20px" }}>Questions List:</div>
                        <div className="questionsList">

                            {quizInfo?.questionsList?.map(value => value)
                                .map((value, i) => {
                                    return <div className="question" onClick={() => handleclick(i)} key={i}>
                                        <span>{i + 1}: {value?.question}</span><br></br>
                                        <span>type: {value?.type}</span><br></br>
                                        <span>level: {value?.level}</span><br></br>
                                        <span>Answers : {value?.answers.map((value, i) => {
                                            return <>
                                                <br></br>
                                                <span style={{ "color": value?.correct ? "green" : "red" }}>{value?.answer}</span>

                                            </>

                                        })}</span>
                                    </div>
                                })}

                        </div>
                        <div className="Button-container">
                            <button className="btn" onClick={(e) => {
                                e.preventDefault();
                                setPop(!pop)
                            }}>Add question</button>
                        </div>
                        {pop && <div className='pop'>
                            <div className='questionsList toadd' >
                                {questions?.map(value => value)
                                    .map((value, i) => {
                                        return <div className="question" key={i} onClick={(e) => { handleaddclick(i) }}>
                                            <span>{i + 1}: {value?.question}</span><br></br>
                                            <span>type: {value?.type}</span><br></br>
                                            <span>level: {value?.level}</span><br></br>
                                            <span>Answers : {value?.answers.map((value, i) => {
                                                return <>
                                                    <br></br>
                                                    <span style={{ "color": value?.correct ? "green" : "red" }}>{value?.answer}</span>
                                                </>

                                            })}</span>
                                        </div>
                                    })}
                            </div>
                        </div>
                        }
                        <div className='dateInput'>
                            <label htmlFor='startAt'>startAt: </label>
                            <input type="datetime-local" id='startAt' value={startAt}
                                min={new Date().toISOString().split('.')[0].split(':')[0] + ':' + new Date().toISOString().split('.')[0].split(':')[1]}
                                onChange={(e) => setStartAt(e.target.value.split('.')[0])}></input>
                        </div>
                        <div className='dateInput'>
                            <label htmlFor='endAt'>endAt: </label>
                            <input type="datetime-local" id='endAt' value={endAt} min={startAt} onChange={(e) => setEndAt(e.target.value.split('.')[0])}></input>
                        </div>

                        <div className="Button-container">
                            <button className="btn" onClick={(e) => handelSubmit(e)}>Edit</button>
                        </div>

                    </form>

                </div>

            </div>

        </>

    );
}
