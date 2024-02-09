import '../css-files/homepageStyle.css';
import {Link} from "react-router-dom";

function Homepage () {
    return (
        <>
            <div className="homepage-content">
                <div className="homepage-header">
                    <div className="homepage-title-container">
                        <img id = "homepage-icon" src = "/YatraTech.png" alt="YatraTech Icon"/>
                        <h2 id = "homepage-title"><span className="yatra">Yatra</span><span className="tech">Tech</span></h2>
                    </div>
                    <div className="homepage-login-container">
                        <Link to="/join-our-family"><img id = "homepage-login-icon" src = "src/assets/Homepage/user-login.png" alt="YatraTech Login Icon"/></Link>
                    </div>
                </div>
                <div className="homepage-main">
                    <div className="homepage-written">
                        <div className="homepage-h3">
                            <h2 style={{marginBottom: 0}}> Your Journey, <br/> Your Car, <br/> Your Way </h2>
                        </div>
                        <div className="homepage-p">
                            <p>Experience the ultimate freedom of
                                choice with <br/> YatraTech - tailor your
                                adventure by choosing <br/> from our
                                premium fleet of vehicle.
                            </p>
                        </div>
                        <div className="homepage-explore-button">
                            <Link to="/join-our-family"><button id="hp-explore-button">
                                GET STARTED
                            </button></Link>
                        </div>
                    </div>
                    <div className="homepage-gif">
                        <div className="hp-gif">
                            <img id="hp-gif" src="src/assets/Homepage/Car.gif" alt="Car"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage;