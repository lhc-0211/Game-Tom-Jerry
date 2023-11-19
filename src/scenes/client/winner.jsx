
import React from 'react';

import bgCharacter from '../../assets/img/bg2_1d3e7f2.jpg'
import bgImage1 from '../../assets/img/king_076311f.png'
import bgImage2 from '../../assets/img/bg2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './characterScreen.scss';
import { Link } from 'react-router-dom';

const Winner = () => {
    return (
        <div className="container-screen character"
            style={{ backgroundImage: `url(${bgCharacter})` }}
        >
            <div style={{
            }}>
                <div className="logo">

                </div>
                <div className="bg1"
                    style={{
                        // backgroundImage: `url(${bgImage1})`
                    }}
                >
                </div>

            </div>

            <div className='list-choice'>
                <div className='text_Win'>End Game</div>
            </div>
            <div className="bg-win"
                style={{
                    backgroundImage: `url(${bgImage1})`
                }}
            >
            </div>
            <div className='icon-home'>
                <Link
                    to='/character'
                    style={{
                        color: ' rgb(218 171 146)'
                    }}
                >
                    <FontAwesomeIcon icon="fa-solid fa-house" beat />

                </Link>
            </div>
            <div className='icon-reload'>
                <Link

                    style={{
                        color: ' rgb(218 171 146)'
                    }}
                >
                    <FontAwesomeIcon icon="fa-solid fa-rotate-right" beat />

                </Link>
            </div>
        </div>

    )
}

export default Winner;