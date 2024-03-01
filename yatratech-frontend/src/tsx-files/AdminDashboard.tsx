import "../css-files/adminDashboardStyle.css";
import AdminHeader from "./AdminHeader.tsx";
import React, {useEffect, useState} from "react";
import {faArrowRightFromBracket, faCar, faCarSide, faTableList, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function AdminDashboard () {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    interface DataRecord {
        totalRecords: number;
    }

    const fetchDataFromAPI = async (url: string, setData: React.Dispatch<React.SetStateAction<DataRecord | null>>) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(url, {
                headers: {
                    'Authorization': accessToken
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data from', url, ':', error);
        }
    };

    const [userRecords, setUserRecords] = useState<DataRecord | null>(null);
    const [orderRecords, setOrderRecords] = useState<DataRecord | null>(null);
    const [vehicleRecords, setVehicleRecords] = useState<DataRecord | null>(null);

    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                fetchDataFromAPI('http://localhost:8080/api/auth/total-users-records', setUserRecords),
                fetchDataFromAPI('http://localhost:8080/api/order/total-order-records', setOrderRecords),
                fetchDataFromAPI('http://localhost:8080/api/vehicle/total-vehicle-records', setVehicleRecords)
            ]);
        };

        fetchAllData();
    }, []);


    return (
        <>
            <div className="admin-header">
                <div className="adminheader-title-container">
                    <img id = "adminheader-icon" src = "/YatraTech.png" alt="YatraTech Icon"/>
                    <h2 id = "adminheader-title"><span className="admin-yatra">Yatra</span><span className="admin-tech">Tech</span></h2>
                </div>
                <div className="admin-dashboard-logout">
                    <button onClick={handleLogout} id="admin-dashboard-logout">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="admin-dashboard-logout-icon"/>
                        Logout
                    </button>
                </div>
            </div>

            <div className="admin-dashboard-content">
                <div className = "admin-dashboard-header"
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <h2 id = "admin-vehicle-header">
                        Dashboard Overview
                    </h2>
                </div>

                <div className="admin-dashboard-record">
                    <div className="admin-dashboard-users">
                        <h2>{userRecords ? userRecords.totalRecords : "N/A"}</h2>
                        <h3>total users</h3>
                    </div>
                    <div className="admin-dashboard-vehicle">
                        <h2>{vehicleRecords ? vehicleRecords.totalRecords : "N/A"}</h2>
                        <h3>total vehicle count</h3>
                    </div>
                    <div className="admin-dashboard-orders">
                        <h2>{orderRecords ? orderRecords.totalRecords : "N/A"}</h2>
                        <h3>total orders</h3>
                    </div>
                </div>

                <div className = "admin-dashboard-header"
                     style={{
                         display: "flex",
                         justifyContent: "center"
                     }}>
                    <h2 id = "admin-vehicle-header">
                        Access your pages
                    </h2>
                </div>

               <div className="admin-dashboard-buttons">
                   <Link to = "/admin-users">
                       <button style={{
                           padding: 0,
                           borderRadius: "40px",
                           backgroundColor: "rgba(2, 62, 138, 0.49)"
                       }}>
                           <div className="admin-dashboard-users-button">
                               <FontAwesomeIcon className="admin-dashboard-button-icon" icon={faUser} />
                               <h2>Users</h2>
                           </div>
                       </button>
                   </Link>
                   <Link to = "/admin-vehicles">
                       <button style={{
                           padding: 0,
                           borderRadius: "40px",
                           backgroundColor: "rgba(2, 62, 138, 0.49)"
                       }}>
                           <div className="admin-dashboard-vehicle-button">
                               <FontAwesomeIcon className="admin-dashboard-button-icon" icon={faCarSide} />
                               <h2>Vehicles</h2>
                           </div>
                       </button>
                   </Link>
                   <Link to = "/admin-orders">
                       <button style={{
                           padding: 0,
                           borderRadius: "40px",
                           backgroundColor: "rgba(2, 62, 138, 0.49)"
                       }}>
                            <div className="admin-dashboard-orders-button">
                                <FontAwesomeIcon className="admin-dashboard-button-icon" icon={faTableList} />
                               <h2>Orders</h2>
                            </div>
                       </button>
                   </Link>
               </div>
            </div>
        </>
    )
}

export default AdminDashboard