import { useEffect, useState } from "react";
import VerbalMemoryGame from "../../../games/VerbalMemory";
import { get } from "../../../services/axios";

const VerbalMemory = () => {
    const [stats, setStats] = useState(null);
    const [allStats, setAllStats] = useState(null);

    useEffect(() => {
        const fetchStats = () => {
            get("/stats/verbal-memory")
                .then(response => setStats(response.data))
                .catch(() => setStats(null));
            get("/stats/verbal-memory/all")
                .then(response => setAllStats(response.data))
                .catch(() => setAllStats(null));
        };
        fetchStats();
    }, []);

    return (
        <div className="content-container">
            <VerbalMemoryGame />
            {stats && (
                <>
                    <h3>
                        Personal statistics:
                    </h3>
                    <ul>
                        <li>
                            Average score: <span className="text-highlight">{Math.floor(stats.average)}</span>
                        </li>
                        <li>
                            Best score: <span className="text-highlight">{stats.max}</span>
                        </li>
                    </ul>
                </>
            )}
            {allStats && (
                <>
                    <h3>
                        General statistics:
                    </h3>
                    <ul>
                        <li>
                            Average score: <span className="text-highlight">{Math.floor(allStats.average)}</span>
                        </li>
                        <li>
                            Best score: <span className="text-highlight">{allStats.max}</span>
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
};

export default VerbalMemory;