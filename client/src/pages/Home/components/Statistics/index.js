import { useEffect, useState } from "react";
import { get } from "../../../../services/axios";
import "./style.css";

const Statistics = () => {
    const [profileCount, setProfileCount] = useState(null);
    const [statisticsCount, setStatisticsCount] = useState(null);
    const [friendshipsCount, setFriendshipCount] = useState(null);

    useEffect(() => {
        get("/profile/count")
            .then(response => setProfileCount(response.data))
            .catch(() => setProfileCount(null));
        get("/stats/count")
            .then(response => setStatisticsCount(response.data))
            .catch(() => setProfileCount(null));
    }, []);

    return (
        <div className="statistics-container">
            <div className="statistics-cell">
                <i className="fa-solid fa-user statistics-icon" />
                <div className="statistics-content">
                    <p className="statistics-number">
                        {profileCount ? profileCount : "..."}
                    </p>
                    <p className="statistics-text">
                        Profiles
                    </p>
                </div>
            </div>
            <div className="statistics-cell">
                <i className="fa-solid fa-chart-line statistics-icon" />
                <div className="statistics-content">
                    <p className="statistics-number">
                        {statisticsCount ? statisticsCount : "..."}
                    </p>
                    <p className="statistics-text">
                        Saved statistics
                    </p>
                </div>
            </div>
            <div className="statistics-cell">
                <i className="fa-solid fa-user-group statistics-icon" />
                <div className="statistics-content">
                    <p className="statistics-number">
                        {friendshipsCount ? friendshipsCount : "..."}
                    </p>
                    <p className="statistics-text">
                        Friendships
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Statistics;