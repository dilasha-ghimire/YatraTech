import '../css-files/userHomepageStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useEffect, useState} from "react";


function UserHomepage() {

    const navigate = useNavigate();
    const [orderedVehicleIds, setOrderedVehicleIds] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [unauthorized, setUnauthorized] = useState(false);
    const [nameQuery, setNameQuery] = useState("");
    const [typeQuery, setTypeQuery] = useState("");

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    const fetchVehicles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/order/ordered-vehicle-ids",
                {
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    }
                }
            );
            setOrderedVehicleIds(response.data);

            const vehiclesResponse = await axios.get(
                "http://localhost:8080/api/vehicle/find-all-vehicles",
                {
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    }
                }
            );
            setVehicles(vehiclesResponse.data);
            console.log(vehiclesResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const availableVehicles = vehicles.filter(vehicle => !orderedVehicleIds.includes(vehicle.vehicleId));

    const handleOrderSubmitClick = async (vehicle) => {
        const orderDateInput = document.getElementById('order-date');
        const pickupLocationInput = document.getElementById('pickup-location');
        const dropoffLocationInput = document.getElementById('dropoff-location');
        const pickupTimeInput = document.getElementById('pickup-time');
        const dropoffTimeInput = document.getElementById('dropoff-time');

        if (
            !orderDateInput.value ||
            !pickupLocationInput.value ||
            !dropoffLocationInput.value ||
            !pickupTimeInput.value ||
            !dropoffTimeInput.value
        ) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const userEmail = localStorage.getItem('userEmail');
            const response = await axios.get(`http://localhost:8080/api/auth/getId/${userEmail}`, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                }
            });
            const userId = response.data;

            const accessToken = localStorage.getItem('accessToken');

            await axios.post('http://localhost:8080/api/order/placeOrder',
                {
                    userId: userId,
                    vehicleId: vehicle.vehicleId,
                    orderDate: orderDateInput.value,
                    pickUpLocation: pickupLocationInput.value,
                    dropOffLocation: dropoffLocationInput.value,
                    pickUpTime: pickupTimeInput.value,
                    dropOffTime: dropoffTimeInput.value
                },
                {
                    headers: {
                        Authorization: accessToken
                    }
                }
            );

            setSelectedVehicle(null);
            setShowOrderForm(false);
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 3000);
            console.log('Order placed successfully');
        } catch (error) {
            console.error('Error placing order:', error);
            setUnauthorized(true);
        }
    };
    console.log(unauthorized);


    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const year = tomorrow.getFullYear();
        let month = tomorrow.getMonth() + 1;
        let day = tomorrow.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };

    const tomorrowDate = getTomorrowDate();

    const handleOrderClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowOrderForm(true);
    }

    const handleCancelClick = () => {
        setSelectedVehicle(null);
        setShowOrderForm(false);
    }

    const filteredVehicles = availableVehicles.filter((vehicle) => {
        const nameMatch = vehicle.vehicleName
            .toLowerCase()
            .includes(nameQuery.toLowerCase());
        const typeMatch = vehicle.vehicleType
            .toLowerCase()
            .includes(typeQuery.toLowerCase());
        return nameMatch && typeMatch;
    });

    return (
        <>
            <div className="user-homepage-everything">

                {showSuccessAlert && (
                    <div
                        className="alert alert-success"
                        role="alert"
                        style={{
                            position: "fixed",
                            zIndex: 999,
                            width: "50%",
                            marginLeft: "25%",
                            top: "110px",
                        }}
                    >
                        Order placed Successfully!
                    </div>
                )}

                {unauthorized && (
                    <div
                        className="alert alert-warning"
                        role="alert"
                        style={{
                            position: "fixed",
                            zIndex: 999,
                            width: "50%",
                            marginLeft: "25%",
                            top: "110px",
                        }}
                    >
                        Please login to continue...
                    </div>
                )}

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

                {showOrderForm && selectedVehicle && (
                    <div className="user-order-form">
                        <div className="user-order-form-title">
                            <h2>Order Details</h2>
                            <button type="button" className="btn btn-outline-secondary" onClick={handleCancelClick}>Cancel</button>
                        </div>
                        <div className="user-order-form-detail">
                            <p>You've selected '{selectedVehicle.vehicleName}' with '{selectedVehicle.numberOfSeats}' seats and costs '{selectedVehicle.pricePerHour}'</p>                        </div>
                        <div className="user-order-form-container">
                            <div className="order-date">
                                <label htmlFor="order-date" id="order-date-label">Order Date:</label>
                                <input type="date" id="order-date" name="order-date" min={tomorrowDate} />
                            </div>
                            <div className="pickup-location">
                                <label htmlFor="pickup-location" id="pickup-location-label">Pickup Location:</label>
                                <input type="text" id="pickup-location" name="pickup-location"/>
                            </div>
                            <div className="pickup-time">
                                <label htmlFor="pickup-time" id="pickup-time-label">Pickup Time:</label>
                                <input type="time" id="pickup-time" name="pickup-time"/>
                            </div>
                            <div className="dropoff-location">
                                <label htmlFor="dropoff-location" id="dropoff-location-label">Drop-off Location:</label>
                                <input type="text" id="dropoff-location" name="dropoff-location"/>
                            </div>
                            <div className="dropoff-time">
                                <label htmlFor="dropoff-time" id="dropoff-time-label">Drop-off Time:</label>
                                <input type="time" id="dropoff-time" name="dropoff-time"/>
                            </div>
                        </div>
                        <div className="user-order-form-submit">
                            <button type="submit" className="btn btn-outline-success" onClick={() => handleOrderSubmitClick(selectedVehicle)}>Submit</button>
                        </div>
                    </div>
                )}

                <div className="user-homepage-content">
                    <div className = "user-homepage-welcome-container" style = {{backgroundImage: `url('src/assets/UserHomepage/Homepage.png')` }}></div>

                    <div className="user-homepage-welcome-note">
                        <h1 style = {{fontSize: "5vw" }}>Welcome to YatraTech!</h1>
                        <p>Welcome to YatraTech, a budding startup focused on delivering unparalleled service quality. While our fleet may be small in quantity, our dedication to excellence is unwavering. We invite you to experience our services and join us in our journey to elevate both our online presence and physical reach. Your support and feedback are invaluable to us as we strive to enhance our offerings. Please note that as a startup, we currently do not have an advanced payment system on our website. You can settle payments conveniently through cash or mobile banking when picking up your chosen vehicle. Thank you for choosing YatraTech!</p>
                    </div>

                    <div className= "user-homepage-title">
                        <h1 style = {{fontSize: "5vw" }}> Our Vehicles </h1>
                    </div>

                    <div className="user-homepage-search-bars">
                            <div className="user-homepage-name-search">
                                <p>Search by Name: </p>
                                <input
                                    className="user-homepage-name-searchbar"
                                    value={nameQuery}
                                    onChange={(e) => setNameQuery(e.target.value)}
                                />
                            </div>
                            <div className="user-homepage-type-search">
                                <p>Search by Type: </p>
                                <input
                                    className="user-homepage-type-searchbar"
                                    value={typeQuery}
                                    onChange={(e) => setTypeQuery(e.target.value)}
                                />
                            </div>
                    </div>

                    <div className= "user-homepage-vehicle-list">
                        {filteredVehicles.map((vehicle) => (
                            <div key={vehicle.vehicleId} className="user-homepage-vehicle-card">
                                    <div className="user-homepage-card-image-view">
                                        {vehicle.vehicleImage && (
                                            <img
                                                src={`/images/${vehicle.vehicleImage}`}
                                                alt={vehicle.vehicleName}
                                                id="user-homepage-card-image"/>
                                        )}
                                    </div>

                                    <div className="user-homepage-divider">
                                        <div className= "user-homepage-vehicle-card-content">
                                            <h3>{vehicle.vehicleName}</h3>
                                            <p>
                                                <strong>Type: </strong>
                                                {vehicle.vehicleType}
                                            </p>
                                            <p>
                                                <strong>Number: </strong>
                                                {vehicle.vehicleNumber}
                                            </p>
                                            <p>
                                                <strong>Seats: </strong>
                                                {vehicle.numberOfSeats}
                                            </p>
                                            <p>
                                                <strong>Price per hour: </strong>
                                                {vehicle.pricePerHour}
                                            </p>
                                        </div>

                                        <div className= "user-homepage-order-button">
                                            <button className="user-homepage-order-btn" onClick={() => handleOrderClick(vehicle)}>Place your order</button>
                                        </div>
                                    </div>
                            </div>
                        ))}
                    </div>

                    <div className="user-homepage-footer">
                        <p>Copyright © YatraTech 2024</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHomepage