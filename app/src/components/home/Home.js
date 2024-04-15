import React from 'react';
import { Register } from '../register/Register';
import './home.css';
import { List } from '../list/List';

export const Home = () => {
    const [loading, setLoading] = React.useState(false);
    const [showRegister, setShowRegister] = React.useState(false);

    return (
        <div className="home-container">
            <div className="container">
                {showRegister
                    ? (
                        !loading
                            ? (<Register setLoading={setLoading} showRegister={setShowRegister} />)
                            : (<p>Enviando...</p>))
                    : (<List showRegister={setShowRegister} />)
                }
            </div>
        </div>
    );
};