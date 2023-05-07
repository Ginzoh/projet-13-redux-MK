import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth); // Get status and error from auth state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(loginUser({ email: username, password }));
    if (action.type === 'auth/loginUser/fulfilled') { // Update action type
      navigate('/login');
    }
  };
  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {error && <p className="error-message">Wrong credentials</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
              >Remember me</label>
            </div>
            <button type="submit" className="sign-in-button" disabled={isLoading === 'loading'}>
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignIn;
