import React from 'react';
import axios from 'axios';
import { Register } from '../register/Register';
import './home.css';
import List  from '../list/List';

const Home = () => {
    const [userData, setUserData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [showRegister, setShowRegister] = React.useState(false);

    const fetchData = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:8080/departamentos`);
            setUserData(result?.data);
        } catch (err) {
            console.log("falha ao consultar departamentos");
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="home-container">
            <h1>Registro de Funcionários</h1>
            <div className="container">
                {showRegister
                    ? (!loading ? (<Register userData={userData} setLoading={setLoading} showRegister={setShowRegister} />) : (<p>Enviando...</p>))
                    : (<List showRegister={setShowRegister} />)
                }
            </div>
        </div>
    );
};

export default Home;