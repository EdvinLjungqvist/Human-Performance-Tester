import React, { useEffect, useState } from "react";
import words from "../../data/words.json";
import { get, post } from "../../services/axios";
import "./style.css";

const VerbalMemory = () => {
    const [state, setState] = useState(0);
    const [word, setWord] = useState(null);
    const [seenWords, setSeenWords] = useState([]);
    const [score, setScore] = useState(0);
    const [stats, setStats] = useState(null);
    const [allStats, setAllStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        if (state === 1) {
            setSeenWords([]);
            setScore(0);
            generateWord();
        } else if (state === 2) {
            if (score > 0) {
                post("/stats/verbal-memory", { score: score })
                    .then(response => console.log(response))
                    .catch(reason => console.error(reason));
            }
            fetchStats();
        }
    }, [state]);

    const fetchStats = () => {
        get("/stats/verbal-memory")
            .then(response => setStats(response.data))
            .catch(() => setStats(null));
        get("/stats/verbal-memory/all")
            .then(response => setAllStats(response.data))
            .catch(() => setAllStats(null));
    };

    const generateWord = () => {
        setWord(seenWords.length > 0 && Math.random() < 0.5 ? seenWords[Math.floor(Math.random() * seenWords.length)] : words[Math.floor(Math.random() * words.length)]);
    };

    const handleButtonClick = (clickedNew) => {
        const isSeenWord = hasWord(word);

        const correct = clickedNew ? isSeenWord : !isSeenWord;

        if (correct) {
            setScore(score + 1);
        } else {
            setState(2);
        }

        if (!isSeenWord && word !== null) {
            setSeenWords([...seenWords, word]);
        }
        generateWord();
    };

    const hasWord = (wordToCheck) => {
        return seenWords.includes(wordToCheck);
    };

    return (
        <div className="content-container">
            <div className={`verbal-memory`}>
                {state === 0 ? (
                    <>
                        <div className="title-container">
                            <h1>
                                Verbal memory
                            </h1>
                        </div>
                        <div className="button-container">
                            <button className="green" onClick={() => setState(1)}>
                                Start
                            </button>
                        </div>
                    </>
                ) : state === 1 ? (
                    <>
                        <div className="title-container">
                            <h1>{word ? word : "?"}</h1>
                            <p>Score: {score}</p>
                        </div>
                        <div className="button-container">
                            <button className="red" onClick={() => handleButtonClick(true)}>
                                Seen
                            </button>
                            <button className="green" onClick={() => handleButtonClick(false)}>
                                New
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="title-container">
                            <h1>You failed!</h1>
                            <p>Score: {score}</p>
                        </div>
                        <div className="button-container">
                            <button onClick={() => setState(1)}>
                                Retry
                            </button>
                        </div>
                    </>
                )}
            </div>
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
