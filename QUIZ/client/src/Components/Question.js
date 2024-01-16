import { useEffect, useState } from 'react';

import '../Styles/Question.css'
export const Question = ({ questions, index, handleClick, btnstate, handelSubmit }) => {


    const [checkedState, setCheckedState] = useState(false)
    const [userAnswers, setUserAnswers] = useState([])

    const handelonChange = (e) => {
        setCheckedState(!checkedState)

        const chosenAnswers = () => {
            if (e.target.checked) {
                setUserAnswers([...userAnswers, e.target.value])
            }
            else {
                setUserAnswers(userAnswers.filter((answer) => answer !== e.target.value))
            }
        }

        chosenAnswers()
    }



    useEffect(() => {

    }, [])



    return (
        <>
            <div className='questionContainer'>
                <h2 className='text-light'>{questions[index]?.question}</h2>
                <ul>

                    {questions[index]?.answers?.map((answer, i) => {
                        return < li key={i}>
                            <input
                                type="checkbox"
                                name="options"
                                id={`q${i}-option`}
                                value={i}
                                checked={checkedState[i]}
                                onChange={(e) => handelonChange(e)}
                            />
                            <label htmlFor='q1-option' className='text-light'>{answer?.answer}</label>

                        </li>
                    })}


                </ul>

            </div >
            <div className="button">
                {!btnstate ? <button className="btn" onClick={() => handleClick(userAnswers)}>Next</button>
                    : <button className="btn" onClick={() => handelSubmit(userAnswers)}  >Done</button>}
            </div>
        </>

    );
}
