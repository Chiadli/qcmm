import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/userContext';

const LogoutButton = ({ onLogout }) => (
  <button onClick={onLogout}>Log out</button>
);

const Navbar = () => {
  const { auth, setAuth, setQuizId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    setQuizId('');
    navigate('/login', { replace: true });
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <nav>
          {auth?.userId ? (
            <>
              <div>
                <span>{auth?.nom}</span>
                <LogoutButton onLogout={handleLogout} />
              </div>
              {auth?.type === 'Professor' && (
                <>
                  <div>
                    <Link to="/addQuiz">Add Quiz</Link>
                  </div>
                  <div>
                    <Link to="/modifyquestions">Modify Question</Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <span> | </span>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
