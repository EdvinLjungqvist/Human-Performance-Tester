import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { get } from "../../services/axios";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const Statistics = () => {
    const [verbalMemoryData, setVerbalMemoryData] = useState(null);

    useEffect(() => {
        get("/stats/verbal-memory/average")
            .then(response => {
                const data = response.data;
                const scores = data.map(entry => entry.score);
                const counts = data.map(entry => entry.count);

                const chartData = {
                    labels: scores,
                    datasets: [{
                        label: "Number of attempts",
                        data: counts,
                        borderColor: "#f9faff",
                        backgroundColor: "#f9faff",
                        tension: 0.4
                    }]
                };
                setVerbalMemoryData(chartData);
            })
            .catch(() => setVerbalMemoryData(null));
    }, []);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Number of attempts"
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Score"
                }
            }
        },
        plugins: {
            legend: {
                onClick: null
            }
        },
        maintainAspectRatio: false
    };

    return (
        <section className="content-container">
            <div className="title-container">
                <h1>
                    Statistics
                </h1>
                <p>
                    Here you can find different statistics
                </p>
            </div>
            <div className="content-container">
                <h2>
                    Verbal memory
                </h2>
                <p>
                    Distribution of scores among participants
                </p>
                {verbalMemoryData && (
                    <div style={{ height: "400px" }}>
                        <Line data={verbalMemoryData} options={options} />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Statistics;
