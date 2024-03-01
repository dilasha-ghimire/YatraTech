import "../css-files/adminOrdersStyle.css";
import AdminHeader from "./AdminHeader.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [searchOrderId, setSearchOrderId] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get('http://localhost:8080/api/order/get-all-orders', {
                headers: {
                    'Authorization': accessToken
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const deleteOrder = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            await axios.post(`http://localhost:8080/api/order/delete-order-by-orderId/${orderToDelete}`, {
                headers: {
                    'Authorization': accessToken
                }
            });
            setShowModal(false);
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchOrderId(event.target.value);
    };

    const filteredOrders = orders.filter(order =>
        order.orderId.toString().includes(searchOrderId)
    );

    return (
        <>
            <AdminHeader/>
            <div className="admin-orders-content">
                <div className="admin-vehicle-number-search">
                    <p>Search by Order ID: </p>
                    <input
                        className="admin-vehicle-number-searchbar"
                        style={{ color: "black" }}
                        value={searchOrderId}
                        onChange={handleSearchInputChange}
                    />
                </div>

                <div className="admin-order-display">
                    <div className="admin-vehicle-header">
                        <h2 id="admin-vehicle-header">
                            List of orders
                        </h2>
                    </div>

                    <div className="admin-order-details">
                        {filteredOrders.map(order => (
                            <div key={order.orderId} className="order-item">
                                <p><strong>Order ID:</strong> {order.orderId}</p>
                                <p><strong>User ID:</strong> {order.userId}</p>
                                <p><strong>Vehicle ID:</strong> {order.vehicleId}</p>
                                <p><strong>Pickup Location:</strong> {order.pickUpLocation}</p>
                                <p><strong>Drop-off Location:</strong> {order.dropOffLocation}</p>
                                <p><strong>Pickup Time:</strong> {order.pickUpTime}</p>
                                <p><strong>Drop-off Time:</strong> {order.dropOffTime}</p>
                                <p><strong>Order Date:</strong> {order.orderDate}</p>
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
                                            setOrderToDelete(order.orderId);
                                            setShowModal(true);
                                        }}
                                    >
                                        Delete
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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
                                    Are you sure you want to delete this order?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={deleteOrder}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminOrders;
