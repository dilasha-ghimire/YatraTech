import '../css-files/authenticationFormStyle.css';
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function AuthenticationForm () {

    const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    return (
        <>
            <div className={`authentication-container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
                <div className="authentication-form-container">
                    <div className="signin-signup">
                        <form className="sign-in-form">
                            <h2 className="signin-signup-form-title">Sign in</h2>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faUser} />
                                <input type="text" placeholder="Username" />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faLock} />
                                <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" className="authenticate-btn solid" />
                        </form>

                        <form className="sign-up-form">
                            <h2 className="signin-signup-form-title">Sign up</h2>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faUser} />
                                <input type="text" placeholder="Full Name" />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faEnvelope} />
                                <input type="email" placeholder="Email" />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faMobile} />
                                <input type="tel" placeholder="Mobile Number" />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faLock} />
                                <input type="password" placeholder="Password" />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faLock} />
                                <input type="password" placeholder="Confirm Password" />
                            </div>
                            <input type="submit" value="Sign up" className="authenticate-btn" />
                        </form>

                    </div>
                </div>

                <div className="authenticate-panels-container">
                    <div className="auth-panel auth-left-panel">
                        <div className="auth-content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <div className="sign-up-button-container">
                                <button className="authenticate-btn transparent" onClick={handleSignUpClick}>
                                    Sign up
                                </button>
                                <Link to="/"><button className="gobacktohp-btn transparent">
                                    GO BACK TO HOMEPAGE
                                </button></Link>
                            </div>
                        </div>
                        <img src="src/assets/AuthenticationForm/one-person.png" className="authentication-image" alt="Car Image" />
                    </div>
                    <div className="auth-panel auth-right-panel">
                        <div className="auth-content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <div className="sign-up-button-container">
                                <button className="authenticate-btn transparent" onClick={handleSignInClick}>
                                    Sign in
                                </button>
                                <Link to="/"><button className="gobacktohp-btn transparent">
                                    GO BACK TO HOMEPAGE
                                </button></Link>
                            </div>
                        </div>
                        <img src="src/assets/AuthenticationForm/two-people.png" className="authentication-image" alt="Car Image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthenticationForm;