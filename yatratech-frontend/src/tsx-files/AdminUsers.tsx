import "../css-files/adminUsersStyle.css";
import AdminHeader from "./AdminHeader.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchUserId, setSearchUserId] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('http://localhost:8080/api/auth/get-all-users', {
                headers: {
                    'Authorization': accessToken
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
            await axios.post(`http://localhost:8080/api/auth/delete-users/${userToDelete}`, {
                headers: {
                    'Authorization': accessToken
                }
            });

            setShowModal(false);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchUserId(event.target.value);
    };

    const filteredUsers = users.filter(user => user.userId.toString().includes(searchUserId));


    return (
        <>
            <AdminHeader />
            <div className="admin-users-content">
                <div className="admin-vehicle-number-search">
                    <p>Search by User ID: </p>
                    <input
                        className="admin-vehicle-number-searchbar"
                        style={{ color: "black" }}
                        value={searchUserId}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="admin-user-display">

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
                                        Are you sure you want to delete this user and all order data of this user?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                        <button type="button" className="btn btn-primary" onClick={deleteUser}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="admin-vehicle-header">
                        <h2 id="admin-vehicle-header">
                            List of users
                        </h2>
                    </div>

                    <div className="admin-user-details">
                        {filteredUsers.map(user => (
                            <div key={user.userId} className="admin-user">
                                <p><strong>User ID:</strong> {user.userId}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Full Name:</strong> {user.fullName}</p>
                                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                                <div className="admin-user-delete"
                                     style={{
                                         display: "flex",
                                         justifyContent: "end",
                                     }}>
                                    <p
                                        style={{
                                            padding: "0",
                                            textDecoration: "underline",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            setUserToDelete(user.userId);
                                            setShowModal(true);
                                        }}>
                                        Delete</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUsers;
