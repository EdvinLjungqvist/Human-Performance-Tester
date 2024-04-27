import { useEffect, useState } from "react";
import VerbalMemoryGame from "../../../games/VerbalMemory";
import { get } from "../../../services/axios";
import Table from "../../../components/Table";
import { useAuth } from "../../../hooks/AuthProvider";

const VerbalMemory = () => {
    const [stats, setStats] = useState(null);
    const [leaderboard, setLeaderboard] = useState(null);
    const { profile } = useAuth();

    useEffect(() => {
        const fetchStats = () => {
            get("/stats/verbal-memory")
                .then(response => setStats(response.data))
                .catch(() => setStats(null));
            get("/stats/verbal-memory/global")
                .then(async response => {
                    const leaderboard = response.data;

                    for (const stat of leaderboard) {
                        await get(`/profile/${stat.profile_id}`)
                            .then(response => {
                                delete stat.profile_id;
                                stat.profile = response.data;
                            })
                            .catch(reason => console.error(reason.message));
                    }
                    setLeaderboard(leaderboard);
                })
                .catch(() => setLeaderboard(null));
        };
        fetchStats();
    }, []);

    return (
        <div className="content-container">
            <VerbalMemoryGame />
            {stats && (
                <>
                    <div className="title-container">
                        <h2>
                            Personal best
                        </h2>
                        <p>
                            See your best attempts below!
                        </p>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Score
                                </th>
                                <th>
                                    Timestamp
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((stat, index) => (
                                <tr key={index}>
                                    <td>
                                        {stat.score}
                                    </td>
                                    <td>
                                        {new Date(stat.timestamp).toDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
            {leaderboard && (
                <>
                    <div className="title-container">
                        <h2>
                            Global leaderboard
                        </h2>
                        <p>
                            Here are the best attempts globally!
                        </p>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Score
                                </th>
                                <th>
                                    Profile
                                </th>
                                <th>
                                    Timestamp
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((stat, index) => (
                                <tr key={index}>
                                    <td>
                                        {stat.score}
                                    </td>
                                    <td>
                                        <span className={`role ${stat.profile.role}`}>{stat.profile.role}</span> {stat.profile.username} {profile && profile.id === stat.profile.id && "(You)"}
                                    </td>
                                    <td>
                                        {new Date(stat.timestamp).toDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default VerbalMemory;