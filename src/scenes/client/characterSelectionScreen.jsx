
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import bgCharacterSelected from '../../assets/img/conbg2_b962497.png'
import avaTom from '../../assets/img/tom_275e0f7.jpg'
import avaJerry from '../../assets/img/jerry_dbb5058.png'
import imgBodyTom from '../../assets/img/tom_be2af94.png'
import imgBodyJerry from '../../assets/img/jerry_6849b8d.png'
import bgImage from '../../assets/img/conbg1_7f38818.png'
import icon from '../../assets/img/i2_bf9ab5e.png'

import './characterSelectionScreen.scss'
import { Link } from 'react-router-dom';
const CharacterSelectionScreen = () => {
    const characterLst = [
        {
            ava: avaTom,
            name: 'tom',
            description: 'Tom – anh ấy có thể nhảy, hát, chơi piano và tạo ra đôi cánh bay. Dường như không có gì anh ấy không thể làm được. Đừng đề cập đến việc bắt Jerry.',
            imgBody: imgBodyTom
        },
        {
            ava: avaJerry,
            name: 'jerry',
            description: 'Một chú chuột nghịch ngợm thích lừa Tom. Anh và Tom có ​​một mối quan hệ yêu-ghét.',
            imgBody: imgBodyJerry
        }
    ]

    const [nameSelected, setNameSelected] = useState('tom')
    const checkSelectedCharacter = (name) => {
        setNameSelected(name);
    }

    return (
        <div className='container-screen-bg'

        >
            <div className='container-screen selected-screen'
                style={{ backgroundImage: `url(${bgCharacterSelected})` }}
            >
                <div className="list-character">
                    <div className="list-character__logo">

                    </div>
                    <div className="list-character__detail">
                        {
                            characterLst && characterLst.map((character, index) => (
                                <Link
                                    onClick={() => checkSelectedCharacter(character.name)}
                                    key={index}
                                >
                                    <div className='detail-character__left-icon'
                                        style={{
                                            background: `url(${icon})`
                                        }}
                                    ></div>
                                    <div className='card-character'>
                                        <div className='card-character__avt'
                                            style={{
                                                backgroundImage: `url(${character.ava})`
                                            }}
                                        ></div>
                                        <div className={nameSelected === character.name ? 'card-character__detail is-selected' : 'card-character__detail'}>{character.name}</div>
                                    </div>
                                </Link>

                            ))
                        }
                        <Link
                            style={{
                                color: '#973e0e',
                                position: 'relative',
                                fontSize: '24px',
                                top: '28px'
                            }}
                            to='/character'
                        >
                            <FontAwesomeIcon icon="fa-solid fa-left-long" beat />
                        </Link>
                    </div>
                </div>
                <div className="detail-character">
                    {characterLst && characterLst.map((character, index) => (
                        <Link key={index}>
                            {nameSelected === character.name && (
                                <div className='detail-character__left'>

                                    <div className='detail-character__left-detail'>
                                        <div className="name-character">{character.name}</div>
                                        <div className="description-character">{character.description}</div>
                                    </div>
                                    <div className='imgBody-character'
                                        style={{
                                            backgroundImage: `url(${character.imgBody})`,
                                            backgroundSize: character.name === 'tom' ? '110px 200px' : '140px 200px'
                                        }}
                                    ></div>

                                </div>

                            )}
                        </Link>
                    ))}
                    <Link
                        style={{
                            color: '#973e0e',
                            position: 'relative',
                            float: 'right',
                            fontSize: '24px'
                        }}
                        to={`/player/${nameSelected}`
                        }
                    // // search: `?character=${nameSelected}`,
                    >
                        <FontAwesomeIcon icon="fa-solid fa-right-long" beat />
                    </Link>

                </div>
            </div>
        </div >

    )
}

export default CharacterSelectionScreen;