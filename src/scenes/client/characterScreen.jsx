
import React from 'react';

import bgCharacter from '../../assets/img/bg2_1d3e7f2.jpg'
import bgImage1 from '../../assets/img/bg1.png'
import bgImage2 from '../../assets/img/bg2.png'

import './characterScreen.scss';
import { Link } from 'react-router-dom';

const CharacterScreen = () => {
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
                        backgroundImage: `url(${bgImage1})`
                    }}
                >
                </div>

            </div>

            <div className='list-choice'>
                <Link
                    to='/player'
                >
                    <div className='player-button'>
                        <div className='player-button_img one-player'></div>
                        <div className='player-button__content'>
                            Một người chơi
                        </div>
                    </div>
                </Link>
                <Link to='/player/2player'>
                    <div className='player-button'>
                        <div className='player-button_img two-player'></div>
                        <div className='player-button__content'>
                            Hai người chơi
                        </div>

                    </div>
                </Link>
            </div>
            <div className="bg2"
                style={{
                    backgroundImage: `url(${bgImage2})`
                }}
            >
            </div>
        </div>

    )
}

export default CharacterScreen;