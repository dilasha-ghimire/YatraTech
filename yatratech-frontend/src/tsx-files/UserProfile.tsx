import '../css-files/userProfileStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function UserProfile() {
    return (
        <>
            <div className="user-header">
                <div className="user-homepage-title-container">
                    <Link to="/homepage"><img id = "user-homepage-icon" src = "/YatraTech.png" alt="YatraTech Icon"/></Link>
                    <Link to="/homepage"><h2 id = "user-homepage-title"><span className="user-yatra">Yatra</span><span className="user-tech">Tech</span></h2></Link>
                </div>
                <div className="user-homepage-profile-icon-container">
                    <button className="user-homepage-logout-button">Logout</button>
                    <Link to="/profile">
                        <FontAwesomeIcon className="user-header-profile-icon" icon={faUser} />
                    </Link>
                </div>
            </div>

            <div className="user-profile-content">

            </div>
        </>
    )
}

export default UserProfile