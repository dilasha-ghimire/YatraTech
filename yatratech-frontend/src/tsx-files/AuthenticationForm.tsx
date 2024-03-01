import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/authenticationFormStyle.css';
import {useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function AuthenticationForm () {

    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showPasswordMatchAlert, setPasswordMatchAlert] = useState<boolean>(false);
    const [showPasswordCriteriaMatchAlert, setPasswordCriteriaMatchAlert] = useState<boolean>(false);
    const [showEmailTakenAlert, setEmailTakenAlert] = useState<boolean>(false);
    const [showMobileNumberAlert, setMobileNumberAlert] = useState<boolean>(false);
    const [showLoginAlert, setLoginAlert] = useState<boolean>(false);
    const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        confirmPassword: ""
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUpMode) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{8,16}$/;
                if (!passwordRegex.test(formData.password)) {
                    console.error("Password does not meet criteria");
                    setPasswordCriteriaMatchAlert(true);
                    setTimeout(() => {
                        setPasswordCriteriaMatchAlert(false);
                    }, 3000);
                    return;
                }
                if (formData.password !== formData.confirmPassword) {
                    console.error("Passwords do not match");
                    setPasswordMatchAlert(true);
                    setTimeout(() => {
                        setPasswordMatchAlert(false);
                    }, 2000);
                    return;
                }
                const mobileRegex = /^\d{10}$/;
                if (!mobileRegex.test(formData.phoneNumber)) {
                    console.error("Mobile number should be 10 digits");
                    setMobileNumberAlert(true);
                    setTimeout(() => {
                        setMobileNumberAlert(false);
                    }, 2000);
                    return;
                }
                await axios.post("http://localhost:8080/api/auth/register", formData);
                console.log("User registered successfully!");
                setShowSuccessAlert(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            else {
                const response = await axios.post("http://localhost:8080/api/auth/login", formData);
                const { accessToken,tokenType } = response.data;
                localStorage.setItem('accessToken', tokenType+accessToken);
                localStorage.setItem('userEmail', formData.email);

                const roleResponse = await axios.post("http://localhost:8080/api/auth/get-role/" + formData.email);
                const userRole = roleResponse.data;

                if (userRole === 'ADMIN') {
                    navigate('/admin-dashboard');
                }
                else if (userRole === 'USER') {
                    navigate('/homepage');
                }
                else {
                    console.error("Unknown user role");
                }
            }
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 400 && error.response.data === "Email is taken!") {
                console.error("Email is already taken!");
                setEmailTakenAlert(true);
                setTimeout(() => {
                    setEmailTakenAlert(false);
                }, 2000);
                return;
            }
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                console.error('Login failed');
                setLoginAlert(true);
                setTimeout(() => {
                    setLoginAlert(false);
                }, 2000);
                return;
            }
            else {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <div className={`authentication-container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
                {showSuccessAlert && (
                    <div
                        className="alert alert-success"
                        role="alert"
                        style={{
                            zIndex: 999,
                            width: "50%",
                            marginLeft: "25%",
                            marginTop: "2%",
                        }}
                    >
                        User registered successfully!
                        Redirecting to Login Page...
                    </div>
                )}

                {showPasswordCriteriaMatchAlert && (
                    <div
                        className="alert alert-warning"
                        role="alert"
                        style={{
                            zIndex: 999,
                            width: "50%",
                            marginLeft: "25%",
                            marginTop: "2%",
                        }}
                    >
                        Passwords must be 8 to 16 characters long and contain at
                        least one uppercase letter, one lowercase letter, one number,
                        and one symbol.
                    </div>
                )}

                {showPasswordMatchAlert && (
                    <div
                        className="alert alert-warning"
                        role="alert"
                        style={{
                            zIndex: 999,
                            width: "50%",
                            marginLeft: "25%",
                            marginTop: "2%",
                        }}
                    >
                        Passwords you have entered don't match!
                    </div>
                )}

                {showEmailTakenAlert && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                        style={{
                            zIndex: 999,
                            width: "50%",
                            marginLeft: "25%",
                            marginTop: "2%",
                        }}
                    >
                        Email already in use!
                    </div>
                )}

                {showMobileNumberAlert && (
                    <div
                        className="alert alert-warning"
                        role="alert"
                        style={{
                            zIndex: 999,
                            width: "50%",
                            marginLeft: "25%",
                            marginTop: "2%",
                        }}
                    >
                        Phone number should be of 10 digits!
                    </div>
                )}

                {showLoginAlert && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                        style={{
                            zIndex: 999,
                            width: "50%",
                            marginLeft: "25%",
                            marginTop: "2%",
                        }}
                    >
                        Incorrect email or password!
                    </div>
                )}

                <div className="authentication-form-container">
                    <div className="signin-signup">

                        <form className="sign-in-form" onSubmit={handleSubmit}>
                            <h2 className="signin-signup-form-title">Sign in</h2>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faUser} />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}/>
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faLock} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange} />
                            </div>
                            <input type="submit" value="Login" className="authenticate-btn solid" />
                        </form>

                        <form className="sign-up-form" onSubmit={handleSubmit}>
                            <h2 className="signin-signup-form-title">Sign up</h2>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faUser} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faEnvelope} />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faMobile} />
                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faLock} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="signin-signup-form-input">
                                <FontAwesomeIcon className="authenticate-icon" icon={faLock} />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
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
                                Start your journey with us today! Explore our wide
                                range of vehicles and find the perfect car for your
                                next adventure.
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
                                Welcome back! Sign in to manage your bookings,
                                access exclusive deals, and hit the road with ease.
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