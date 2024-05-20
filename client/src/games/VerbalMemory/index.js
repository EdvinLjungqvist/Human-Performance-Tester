import React, { useEffect, useState } from "react";
import words from "../../data/words.json";
import { post } from "../../services/axios";
import { useSocket } from "../../hooks/SocketProvider";
import "./style.css";

const VerbalMemory = multiplayer => {
    const [state, setState] = useState(0);
    const [word, setWord] = useState(null);
    const [seenWords, setSeenWords] = useState([]);
    const [score, setScore] = useState(0);
    const { socket } = useSocket();

    useEffect(() => {
        if (state === 1) {
            setSeenWords([]);
            setScore(0);
            generateWord();
        } else if (state === 2) {
            if (score > 0) {
                post("/stats/verbal-memory", { score: score })
                    .catch(reason => console.error(reason.message));
            }
        }
    }, [state]);

    const generateWord = () => {
        setWord(seenWords.length > 0 && Math.random() < 0.5 ? seenWords[Math.floor(Math.random() * seenWords.length)] : words[Math.floor(Math.random() * words.length)]);
    };

    const handleButtonClick = (clickedNew) => {
        const isSeenWord = hasWord(word);

        const correct = clickedNew ? isSeenWord : !isSeenWord;

        if (correct) {
            setScore(score + 1);
            
            if (multiplayer) {
                socket.emit("game:score", score + 1);
            }
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
                            <h2>
                                Verbal memory
                            </h2>
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
                            <h2>{word ? word : "?"}</h2>
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
                            <h2>You failed!</h2>
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
        </div>
    );
};

export default VerbalMemory;
