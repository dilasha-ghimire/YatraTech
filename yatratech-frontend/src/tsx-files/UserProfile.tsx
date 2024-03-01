import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/userProfileStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from "react";

function UserProfile() {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    const [userDetails, setUserDetails] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showMobileNumberAlert, setMobileNumberAlert] = useState<boolean>(false);
    const [initialFullName, setInitialFullName] = useState('');
    const [initialPhoneNumber, setInitialPhoneNumber] = useState('');
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        axios.get(`http://localhost:8080/api/auth/getId/${userEmail}`, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                const userId = response.data;
                axios.get(`http://localhost:8080/api/auth/users/${userId}`, {
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    }
                })
                    .then(response => {
                        setUserDetails(response.data);
                        setFullName(response.data.fullName);
                        setPhoneNumber(response.data.phoneNumber);
                        setInitialFullName(response.data.fullName);
                        setInitialPhoneNumber(response.data.phoneNumber);

                    })
                    .catch(error => {
                        console.error('Error fetching user details:', error);
                    });

                axios.get(`http://localhost:8080/api/order/get-all-orders-by-user-id/${userId}`, {
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    }
                })
                    .then(response => {
                        setOrderHistory(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching order history:', error);
                    });

            })
            .catch(error => {
                console.error('Error fetching userId:', error);
            });
    }, []);

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        if (!showEditForm) {
            setFullName(initialFullName);
            setPhoneNumber(initialPhoneNumber);
        }
    }

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleDetailsEditSubmit = (event) => {
        event.preventDefault();
        const userEmail = localStorage.getItem('userEmail');

        if (phoneNumber.length !== 10) {
            setMobileNumberAlert(true);
            setTimeout(() => {
                setMobileNumberAlert(false);
            }, 2000);
            return;
        }

        axios.post(`http://localhost:8080/api/auth/update-user`, {
            email: userEmail,
            fullName: fullName,
            phoneNumber: phoneNumber
        }, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                setShowEditForm(false);
                setShowSuccessAlert(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => {
                console.error('Error updating user details:', error);
            });
    }

    return (
        <>
            <div className="user-header">
                <div className="user-homepage-title-container">
                    <Link to="/homepage"><img id = "user-homepage-icon" src = "/YatraTech.png" alt="YatraTech Icon"/></Link>
                    <Link to="/homepage"><h2 id = "user-homepage-title"><span className="user-yatra">Yatra</span><span className="user-tech">Tech</span></h2></Link>
                </div>
                <div className="user-homepage-profile-icon-container">
                    <button onClick={handleLogout} className="user-homepage-logout-button">Logout</button>
                    <Link to="/profile">
                        <FontAwesomeIcon className="user-header-profile-icon" icon={faUser} />
                    </Link>
                </div>
            </div>

            <div className="user-profile-content">

                {showSuccessAlert && (
                <div
                    className="alert alert-success"
                    role="alert"
                    style={{
                        position: "absolute",
                        zIndex: 999999,
                        width: "50%",
                        marginLeft: "25%",
                        marginTop: "2%",
                    }}
                >
                    Profile updated successfully!
                </div>
                )}

                {showMobileNumberAlert && (
                    <div
                        className="alert alert-warning"
                        role="alert"
                        style={{
                            position: "absolute",
                            zIndex: 999999,
                            width: "50%",
                            marginLeft: "25%",
                            marginTop: "2%",
                        }}
                    >
                        Phone number should be of 10 digits!
                    </div>
                )}

                <div
                    className="user-profile-edit-form"
                    style={{
                        display: showEditForm ? 'block' : 'none',
                        position: "absolute",
                        zIndex: 99999,
                        width: "30vw",
                        backgroundColor: "rgba(2,62,138,1)",
                        right: 10,
                        top: "110px",
                        borderRadius: "10px"
                    }}
                >
                    <form onSubmit={handleDetailsEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName" style={{ color: "#fff" }} className="edit-form-title">Edit Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    color: "#fff",
                                    fontSize: "1.5vw"
                                }}
                                value={fullName}
                                onChange={handleFullNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber" style={{ color: "#fff" }} className="edit-form-title">Edit Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    color: "#fff",
                                    fontSize: "1.5vw"
                                }}
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-secondary btn-sm edit-btn-submit">Submit</button>
                        <button type="button" style = {{marginLeft: "10px"}} className="btn btn-secondary edit-btn-submit" onClick={toggleEditForm}>Cancel</button>
                    </form>
                </div>


                <div className="user-profile-details-container">
                    <div className="user-profile-your-details">
                        <h1>Your Profile</h1>
                        {userDetails && (
                            <>
                                <p style={{paddingLeft: "20px"}}><strong>Full Name:</strong> {userDetails.fullName}</p>
                                <p style={{paddingLeft: "40px"}}><strong>Email:</strong> {userDetails.email}</p>
                                <p style={{paddingLeft: "60px"}}><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
                            </>
                        )}
                    </div>
                    <div className="user-profile-buttons">
                        <button type="button" className="btn btn-secondary btn-sm user-profile-edit" onClick={toggleEditForm}>Edit</button>
                    </div>

                </div>

                <div className="user-profile-order-history">
                    <div className="user-profile-order-history-title">
                        <h1>Your Order History</h1>
                    </div>
                    <div className="user-profile-order-list">
                        <div className="user-profile-order-card"
                        style={{
                            marginLeft: "2vw",
                            marginBottom: "2vw",
                            width: "35vw",
                            padding: "1vw",
                            border: '3px solid #ccc',
                            borderRadius: "30px"
                        }}>
                            {orderHistory.map(order => (
                                <div key={order.orderId}>
                                    Order Date: {order.orderDate} <br/>
                                    Pickup Location: {order.pickUpLocation} <br />
                                    Drop-off Location: {order.dropOffLocation} <br />
                                    Vehicle Name: {order.vehicleDetails.vehicleName} <br/>
                                    Vehicle Number: {order.vehicleDetails.vehicleNumber} <br/>
                                    Seats: {order.vehicleDetails.numberOfSeats} <br/>
                                    Price per Hour: {order.vehicleDetails.pricePerHour} <br />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile