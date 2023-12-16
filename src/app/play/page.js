"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

// import css files
import styles from "./play.module.css";

// import game logic
import useGameLogic from '@/components/GameLogic';

const Play = () => {
    const router = useRouter();

    const {
        matrix,
        activeColumns,
        points,
        handleClick,
        startGame,
        isRunning,
        timer,
    } = useGameLogic();

    const [gameRunning, setGameRunning] = useState(false);

    useEffect(() => {
        if (isRunning !== gameRunning) {
            setGameRunning(isRunning);
        }
    }, [isRunning, gameRunning]);

    const handleStartClick = () => {
        startGame();
    };

    const handleBackClick = () => {
        router.push('/');
    };

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.body}>
            <div className={`${styles.row} ${styles.section1}`}>
                <div>
                    Points: {points}
                </div>
                <div>
                    Time: {formatTime(timer)}
                </div>
            </div>
            <div className={`${styles.row} ${styles.section2}`}>
                <div className={styles.cube}>
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map((cell, cellIndex) => (
                                <div
                                    key={cellIndex}
                                    className={styles.tile}
                                    style={{
                                        backgroundColor:
                                            activeColumns.includes(cellIndex) ? 'red' : cell === 1 ? 'blue' : 'transparent'
                                    }}
                                    onClick={() => handleClick(rowIndex, cellIndex)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles.row} ${styles.section3}`}>
                <button className={`${styles.btn} ${styles.start}`} onClick={handleStartClick} disabled={isRunning}>
                    Start
                </button>
                <button className={`${styles.btn} ${styles.back}`} onClick={handleBackClick}>
                    Back
                </button>
            </div>
        </div>
    )
}

export default Play