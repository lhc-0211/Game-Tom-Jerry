
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './startScreen.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imgLoading from '../../assets/img/choi-game-tom-and-jerry-chase-700.jpg'
import imgStart from '../../assets/img/a06bac91-5edf-4b11-9c7b-cb6c30a909e5.png'
import btnStart from '../../assets/img/btn-start.png'

import { Link } from 'react-router-dom';
const StartScreen = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    const [nextTab, setNextTab] = useState(true);

    const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
    };
    const createSnowFlake = () => {
        const newSnowflake = {
            id: Date.now(),
            left: getRandomNumber(10, 460) + "px",
            animationDuration: Math.random() * 3 + 2 + "s",
            opacity: getRandomNumber(0, 1),
            fontSize: getRandomNumber(0.3, 1) + "rem",
        };

        setSnowflakes((prevSnowflakes) => [...prevSnowflakes, newSnowflake]);

        setTimeout(() => {
            removeSnowflake(newSnowflake.id);
        }, 2000);
    };

    const removeSnowflake = (id) => {
        setSnowflakes((prevSnowflakes) => prevSnowflakes.filter((fl) => fl.id !== id));
    };

    useEffect(() => {
        const interval = setInterval(createSnowFlake, 100); // Tạo tuyết rơi mỗi 100ms
        setTimeout(() => {
            setNextTab(false);
        }, 5000)
        return () => {
            clearInterval(interval);
        };
    }, []);

    const imgBGr = nextTab ? imgLoading : imgStart

    return (
        <div className='container-screen'
            style={{
                backgroundImage: `url(${imgBGr})`
            }}
        >
            {
                nextTab ? (
                    <>
                        <div className="wrapper">
                            {snowflakes.map((snowflake) => (
                                <span
                                    key={snowflake.id}
                                    className="material-symbols-outlined snowflake"
                                    style={{
                                        left: snowflake.left,
                                        animationDuration: snowflake.animationDuration,
                                        opacity: snowflake.opacity,
                                        fontSize: snowflake.fontSize,
                                    }}
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-snowflake" spin />
                                </span>
                            ))}
                        </div>
                        <div className="loader-container">
                            <div className="loader-state">
                                <svg className="nyan" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 47 20">
                                    <defs>
                                        <linearGradient id="rainbow-colors" x1="0.5" x2="0.5" y2="1">
                                            <stop className="rainbow-color1" offset="0" />
                                            <stop className="rainbow-color1" offset="0.167" />
                                            <stop className="rainbow-color2" offset="0.167" />
                                            <stop className="rainbow-color2" offset="0.335" />
                                            <stop className="rainbow-color3" offset="0.335" />
                                            <stop className="rainbow-color3" offset="0.5" />
                                            <stop className="rainbow-color4" offset="0.5" />
                                            <stop className="rainbow-color4" offset="0.669" />
                                            <stop className="rainbow-color5" offset="0.669" />
                                            <stop className="rainbow-color5" offset="0.833" />
                                            <stop className="rainbow-color6" offset="0.833" />
                                            <stop className="rainbow-color6" offset="1" />
                                        </linearGradient>
                                    </defs>
                                    <g className="rainbow">
                                        <rect />
                                        <rect />
                                        <rect />
                                        <rect />
                                        <rect />
                                        <rect />
                                    </g>
                                    <g className="pig">
                                        <g className="foot" transform="translate(52)">
                                            <rect width="1" height="3" transform="translate(6 13)" />
                                            <rect width="1" height="3" transform="translate(8 13)" />
                                            <rect width="1" height="3" transform="translate(14 13)" />
                                            <rect width="1" height="3" transform="translate(12 13)" />
                                        </g>
                                        <g className="tail">
                                            <rect width="1" height="1" transform="translate(4 10)" />
                                            <rect width="1" height="1" transform="translate(3 11)" />
                                        </g>

                                        <g transform="translate(52)">
                                            <rect className="body1" width="8" height="8" transform="translate(7 6)" />
                                            <rect className="body1" width="10" height="8" transform="translate(6 7)" />
                                            <rect className="body1" width="12" height="6" transform="translate(5 8)" />
                                            <rect className="body2" width="10" height="6" transform="translate(6 8)" />
                                            <rect className="body2" width="8" height="6" transform="translate(7 7)" />
                                            <rect className="stains" width="4" height="1" transform="translate(7 13)" />
                                            <rect className="stains" width="2" height="1" transform="translate(8 12)" />
                                            <rect className="stains" width="2" height="1" transform="translate(6 9)" />
                                            <rect className="stains" width="3" height="1" transform="translate(6 8)" />
                                            <rect className="stains" width="3" height="1" transform="translate(7 7)" />
                                            <rect className="stains" width="1" height="1" transform="translate(14 7)" />
                                        </g>
                                        <g className="ears" transform="translate(52)">
                                            <rect width="1" height="3" transform="translate(10 5)" />
                                            <rect width="1" height="3" transform="translate(15 5)" />
                                        </g>
                                        <g className="snout">
                                            <rect className="snout1" width="5" height="3" transform="translate(13 10)" />
                                            <rect className="snout-holes" width="1" height="3" transform="translate(17 11) rotate(90)" />
                                            <rect className="snout2" width="1" height="1" transform="translate(16 11) rotate(90)" />
                                        </g>
                                        <g className="eyes">
                                            <rect width="1" height="1" transform="translate(12 9)" />
                                            <rect width="1" height="1" transform="translate(15 9)" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="background-container">
                                <div className="stars"></div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Link
                        to='/character'
                    >
                        <img className='img-btnStart' src={btnStart} alt="" />

                    </Link>
                )
            }

        </div >
    );
};
export default StartScreen;