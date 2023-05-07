import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleEditButtonClick = () => {
    setEditMode(true);
    setFirstNameInput(profile.firstName);
    setLastNameInput(profile.lastName);
  };

  const handleSaveButtonClick = () => {
    dispatch(updateProfile({ firstName: firstNameInput, lastName: lastNameInput }));
    setEditMode(false);
  };

  const handleCancelButtonClick = () => {
    setEditMode(false);
  };
  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {editMode ? (
              <div className="input-wrapped">
                <label htmlFor="firstName"></label>
                <input
                  className="input-name"
                  id="firstName"
                  value={firstNameInput}
                  onChange={(e) => setFirstNameInput(e.target.value)}
                />
                <label htmlFor="lastName"></label>
                <input
                  className="input-name"
                  id="lastName"
                  value={lastNameInput}
                  onChange={(e) => setLastNameInput(e.target.value)}
                />
              </div>
            ) : (
              `${profile ? `${profile.firstName} ${profile.lastName}` : 'Loading...'}!`
            )}
          </h1>
          {editMode ? (
            <div className="button-wrapper">
              <button className='backButton' onClick={handleSaveButtonClick}>Save</button>
              <button className='backButton' onClick={handleCancelButtonClick}>Cancel</button>
            </div>
          ) : (
            <button className="edit-button" onClick={handleEditButtonClick}>
              Edit Name
            </button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserDashboard;
