import React from 'react';
import './clubs.css';

export default function Clubs(props) {
    const clubs = props.club.data;

    if (!clubs[0]) {
        return (
            <div className="main-clubs">
                <div className="container">
                    <div className="clubs-text">Clubs</div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="main-clubs1">
            <div className="container">
                <div className="clubs-text1">Clubs</div>
                <div className="cards-list1">
                    {clubs[0].map(c => (
                        <div key={c.id} className="card1 1">
                            <div className="card_image1">
                                <img src={c.img} alt={c.name} />
                            </div>
                            <div className="card_title1 title-white">
                                <p>{c.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
