import { Login } from "./Components/Login";
import Register from "./Components/Register";
import { Quiz } from "./Components/Quiz";
import { Home } from "./Components/Home";
import { QuizEdit } from "./Components/QuizEdit";
import { AddQuiz } from "./Components/AddQuiz";
import { UserContext } from "./utils/userContext";
import Layout from './utils/layout';
import { Routes, Route } from 'react-router-dom';
import Missing from "./Components/missing";
import { useState } from "react";
import { RequireAuth } from "./utils/requireAuth";
import Unauthorized from "./Components/Unauthorized";
import  Navbar  from "./Components/navbar";

function App() {
  const [auth, setAuth] = useState({});
  const [quizId, setQuizId] = useState('');

  return (
    <UserContext.Provider
      value={{
        auth,
        setAuth,
        quizId,
        setQuizId
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth allowed={["Professor", "Student"]} />} >
            <Route index element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
          </Route>

          <Route element={<RequireAuth allowed={["Professor"]} />} >
            <Route path="editquiz" element={<QuizEdit />} />
            <Route path="addquiz" element={<AddQuiz />} />
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
