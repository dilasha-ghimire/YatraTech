import 'bootstrap/dist/css/bootstrap.min.css';
import "../css-files/adminVehiclesStyle.css";
import AdminHeader from "./AdminHeader.tsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function AdminVehicles () {

    const [isVehicleFormVisible, setVehicleFormVisible] = useState(false);
    const [showFormPriceAlert, setShowFormPriceAlert] = useState<boolean>(false);
    const [showFormSeatAlert, setFormSeatAlert] = useState<boolean>(false);
    const [showImageRequiredAlert, setImageRequiredAlert] = useState<boolean>(false);
    const [showVehicleSavedAlert, setVehicleSavedAlert] = useState<boolean>(false);
    const [showErrorAlert, setErrorAlert] = useState<boolean>(false);
    const [vehicles, setVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);
    const [editFormData, setEditFormData] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);
    const [nameQuery, setNameQuery] = useState("");
    const [numberQuery, setNumberQuery] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState([]);

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        filterVehicles();
    }, [nameQuery, numberQuery, vehicles]);

    const filterVehicles = () => {
        const filteredAdminVehicles = vehicles.filter((vehicle) => {
            const nameMatch = vehicle.vehicleName.toLowerCase().includes(nameQuery.toLowerCase());
            const numberMatch = vehicle.vehicleNumber.toLowerCase().includes(numberQuery.toLowerCase());
            return nameMatch && numberMatch;
        });
        setFilteredVehicles(filteredAdminVehicles);
    };

    const handleVehicleButtonClick = () => {
        setVehicleFormVisible(!isVehicleFormVisible);
    }

    const [formData, setFormData] =
        useState({
            vehicleName: "",
            vehicleType: "",
            vehicleNumber: "",
            numberOfSeats: "",
            pricePerHour: "",
            vehicleImage: null
        });

    const openImageInNewTab = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData({
            ...formData,
            vehicleImage: selectedFile
        });

        const reader = new FileReader();
        reader.onload = () => {
            setEditImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(Number(formData.numberOfSeats))) {
            console.error("Number of seat is supposed to be a numerical value.");
            setFormSeatAlert(true);
            setTimeout(() => {
                setFormSeatAlert(false);
            }, 3000);
            return;
        }

        if (isNaN(Number(formData.pricePerHour))) {
            console.error("Price per hour is supposed to be a numerical value.");
            setShowFormPriceAlert(true);
            setTimeout(() => {
                setShowFormPriceAlert(false);
            }, 3000);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('vehicleName', formData.vehicleName);
        formDataToSend.append('vehicleType', formData.vehicleType);
        formDataToSend.append('vehicleNumber', formData.vehicleNumber);
        formDataToSend.append('numberOfSeats', formData.numberOfSeats);
        formDataToSend.append('pricePerHour', formData.pricePerHour);

        if (formData.vehicleImage) {
            formDataToSend.append('vehicleImage', formData.vehicleImage);
        }

        try {

            const accessToken = localStorage.getItem('accessToken');

            let endpoint = 'http://localhost:8080/api/vehicle/save-vehicle';
            let contentType = 'multipart/form-data';

            if (editFormData) {
                formDataToSend.append('vehicleId', editFormData.vehicleId);

                if (formData.vehicleImage) {
                    endpoint = 'http://localhost:8080/api/vehicle/update-vehicle';
                }
                else {
                    endpoint = 'http://localhost:8080/api/vehicle/update-vehicle-without-image';
                    contentType = 'application/json';
                }
            }

            const response = await axios.post(endpoint, formDataToSend, {
                headers: {
                    'Authorization': accessToken,
                    'Content-Type': contentType
                }
            });

            console.log(response.data);
            if (response.data === "Vehicle saved" || response.data === "Vehicle updated") {
                setVehicleSavedAlert(true);
                setTimeout(() => {
                    setVehicleSavedAlert(false);
                    window.location.reload();
                }, 3000);
                fetchVehicles();
                setFormData({
                    vehicleName: "",
                    vehicleType: "",
                    vehicleNumber: "",
                    numberOfSeats: "",
                    pricePerHour: "",
                    vehicleImage: null
                });
                setVehicleFormVisible(false);
            }
        }
        catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 401) {
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 3000);
                }
                else {
                    console.error("An error occurred:", axiosError.message);
                }
            }
            else {
                console.error("An error occurred:", error);
            }
        }
    };

    const contentWrapperRef = useRef(null);
    const handleEdit = (vehicle) => {
        contentWrapperRef.current.scrollIntoView({ behavior: "smooth" });
        setEditFormData(vehicle);
        setVehicleFormVisible(true);
        if (vehicle.vehicleImage) {
            setEditImagePreview(`/images/${vehicle.vehicleImage}`);
        } else {
            setEditImagePreview(null);
        }
    };

    const populateFormWithEditData = () => {
        if (editFormData) {
            setFormData({
                vehicleName: editFormData.vehicleName,
                vehicleType: editFormData.vehicleType,
                vehicleNumber: editFormData.vehicleNumber,
                numberOfSeats: editFormData.numberOfSeats,
                pricePerHour: editFormData.pricePerHour,
                vehicleImage: null
            });
        }
    };

    useEffect(() => {
        populateFormWithEditData();
    }, [isVehicleFormVisible, editFormData]);

    const fetchVehicles = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get("http://localhost:8080/api/vehicle/find-all-vehicles", {
                headers: {
                    'Authorization': accessToken
                }
            });
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            await axios.delete(`http://localhost:8080/api/vehicle/delete-vehicle/${vehicleToDelete}`, {
                headers: {
                    'Authorization': accessToken
                }
            });

            setShowModal(false);
            fetchVehicles();
        }
        catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 401) {
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 3000);
                }
                else {
                    console.error("An error occurred:", axiosError.message);
                }
            }
            else {
                console.error("An error occurred:", error);
            }
        }
    };

    return (
        <>
            <div className= "admin-vehicle-everything">
                <AdminHeader/>

                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this vehicle?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="admin-vehicles-content" ref={contentWrapperRef}>

                    <div className="admin-vehicle-search-bars">
                        <div className="admin-vehicle-name-search">
                            <p>Search by Name: </p>
                            <input
                                className="admin-vehicle-name-searchbar"
                                style = {{color: "black"}}
                                value={nameQuery}
                                onChange={(e) => setNameQuery(e.target.value)}
                            />
                        </div>
                        <div className="admin-vehicle-number-search">
                            <p>Search by Number: </p>
                            <input
                                className="admin-vehicle-number-searchbar"
                                style = {{color: "black"}}
                                value={numberQuery}
                                onChange={(e) => setNumberQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className = "admin-vehicle-header-container">

                        {showFormSeatAlert && (
                            <div
                                className="alert alert-warning"
                                role="alert"
                                style={{
                                    position: "absolute",
                                    zIndex: 99999999,
                                    width: "50%",
                                    marginLeft: "15%",
                                    marginTop: "2%",
                                }}
                            >
                                Number of seat is supposed to be a numerical value.
                            </div>
                        )}

                        {showFormPriceAlert && (
                            <div
                                className="alert alert-warning"
                                role="alert"
                                style={{
                                    position: "absolute",
                                    zIndex: 99999999,
                                    width: "50%",
                                    marginLeft: "15%",
                                    marginTop: "2%",
                                }}
                            >
                                Price per hour is supposed to be a numerical value.
                            </div>
                        )}

                        {showImageRequiredAlert && (
                            <div
                                className="alert alert-warning"
                                role="alert"
                                style={{
                                    position: "absolute",
                                    zIndex: 99999999,
                                    width: "50%",
                                    marginLeft: "15%",
                                    marginTop: "2%",
                                }}
                            >
                                Vehicle image is required.
                            </div>
                        )}

                        {showVehicleSavedAlert && (
                            <div
                                className="alert alert-success"
                                role="alert"
                                style={{
                                    position: "absolute",
                                    zIndex: 99999999,
                                    width: "50%",
                                    marginLeft: "15%",
                                    marginTop: "2%",
                                }}
                            >
                                Vehicle saved successfully.
                            </div>
                        )}

                        {showErrorAlert && (
                            <div
                                className="alert alert-warning"
                                role="alert"
                                style={{
                                    position: "absolute",
                                    zIndex: 99999999,
                                    width: "50%",
                                    marginLeft: "15%",
                                    marginTop: "2%",
                                }}
                            >
                                You don't have the correct authorization to execute operations.
                            </div>
                        )}



                        <div className = "admin-vehicle-header">
                            <h2 id = "admin-vehicle-header">
                                List of vehicles
                            </h2>
                        </div>
                        <div className="admin-vehicle-add-button">
                            <button className="admin-vehicle-addButton" onClick={handleVehicleButtonClick}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className = "admin-vehicle-vehicle-display">

                        {isVehicleFormVisible && (
                            <div className = "admin-vehicle-save-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="admin-vehicle-image-upload">
                                            <div className="admin-vehicle-image-show">
                                                <div id="admin-vehicle-form-img">
                                                    <div className="admin-vehicle-img-preview" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                                                        {editImagePreview && (
                                                            <img
                                                                src={editImagePreview}
                                                                alt="Preview"
                                                                style={{ width: "200px", height: "150px", objectFit: "cover" }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        <div className="admin-vehicle-image-select">
                                            <label htmlFor="vehicleImage" className="img-vehicle-browse-button">Select Image</label>
                                            <input
                                                type="file"
                                                id="vehicleImage"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="admin-vehicle-content-upload">
                                        <div className="admin-vehicle-name">
                                            <label htmlFor="adminVehicleName" id="admin-vehicle-name">Name of Vehicle</label>
                                            <input type="text" id="vehicleName" value={formData.vehicleName} onChange={handleInputChange}/>
                                        </div>

                                        <div className="admin-vehicle-type">
                                            <label htmlFor="adminVehicleType" id="admin-vehicle-type">Type of Vehicle</label>
                                            <input type="text" id="vehicleType" value={formData.vehicleType} onChange={handleInputChange} />
                                        </div>

                                        <div className="admin-vehicle-number">
                                            <label htmlFor="adminVehicleNumber" id="admin-vehicle-number">Vehicle Number</label>
                                            <input type="text" id="vehicleNumber" value={formData.vehicleNumber} onChange={handleInputChange}/>
                                        </div>

                                        <div className="admin-seat-and-price">
                                            <div className="admin-vehicle-seat">
                                                <label htmlFor="adminVehicleSeat" id="admin-vehicle-seat">Number of Seats</label>
                                                <input type="text" id="numberOfSeats" value={formData.numberOfSeats} onChange={handleInputChange}/>
                                            </div>

                                            <div className="admin-vehicle-price">
                                                <label htmlFor="adminVehiclePrice" id="admin-vehicle-price">Price per hour</label>
                                                <input type="text" id="pricePerHour" value={formData.pricePerHour} onChange={handleInputChange}/>
                                            </div>
                                        </div>

                                        <div className="admin-vehicle-submit">
                                            <button type="submit" id="admin-vehicle-submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="admin-vehicle-list">
                            {filteredVehicles.map((vehicle) => (
                                <div key={vehicle.vehicleId} className="vehicle-card">
                                    <div className= "vehicle-card-wrapper">
                                        <div className= "vehicle-card-content">
                                            <h3>{vehicle.vehicleName}</h3>
                                            <p>
                                                <strong>Vehicle ID: </strong>
                                                {vehicle.vehicleId}
                                            </p>
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
                                        <div className="admin-vehicle-card-image-view">
                                            {vehicle.vehicleImage && (
                                                <img
                                                    src={`/images/${vehicle.vehicleImage}`}
                                                    onClick={() => openImageInNewTab(`/images/${vehicle.vehicleImage}`)}
                                                    alt={vehicle.vehicleName}
                                                    id="admin-vehicle-card-image"/>
                                            )}
                                        </div>
                                    </div>
                                    <div className = "admin-vehicle-card-buttons">
                                        <p onClick={() => handleEdit(vehicle)}>Edit</p>
                                        <p onClick={() => {
                                            setVehicleToDelete(vehicle.vehicleId);
                                            setShowModal(true);
                                        }}>
                                            Delete</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminVehicles