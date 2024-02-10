import '../css-files/adminHeaderStyle.css';
import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AdminHeader: React.FC = () => {

    return (
        <>
            <div className="admin-header">
                <div className="homepage-title-container">
                    <img id = "homepage-icon" src = "/YatraTech.png" alt="YatraTech Icon"/>
                    <h2 id = "homepage-title"><span className="yatra">Yatra</span><span className="tech">Tech</span></h2>
                </div>
            </div>

            <div className="admin-header-nav" id="admin-header-navbar">
                <nav className="admin-header-nav-container">
                    <div>
                        <div className="admin-header-nav-list">
                            <div className="admin-header-nav-items">
                                <Link to="" className="admin-header-nav-link">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faHouse} />
                                    <span className="admin-header-nav-name">Home</span>
                                </Link>

                                <Link to="" className="admin-header-nav-link">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faUser} />
                                    <span className="admin-header-nav-name">Users</span>
                                </Link>

                                <Link to="" className="admin-header-nav-link">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faTableList} />
                                    <span className="admin-header-nav-name">Orders</span>
                                </Link>

                                <Link to="" className="admin-header-nav-link">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faCarSide} />
                                    <span className="admin-header-nav-name">Vehicles</span>
                                </Link>


                                <button className="admin-header-nav-link admin-header-nav-logout">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faArrowRightFromBracket} />
                                    <span className="admin-header-nav-name">Log Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default AdminHeader;