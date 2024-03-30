import './css/home.css';
import axios from 'axios';
import List from './List';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const Home = () => {

    const [userData, setUserData] = useState([]);

    const fetchData = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:5000/departamentos`);
            console.log(result.data);
            setUserData(result.data);
        } catch (err) {
            console.log("something went wrong");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });

    }
    const [loading, setLoading] = useState()

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce = await axios.post("http://127.0.0.1:5000/funcionario", userField);
            console.log(responce)
            setLoading(true);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if (loading) {
        return <Home />
    }

    return (
        <div className="container">
            <h2>Registro de Funcionários</h2>
            <div className='form-container'>
                <div className='form-box'>
                    <h3>Cadastrar um funcionário</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstName">Nome:</label>
                            <input type="text" id="name" placeholder="" name="firstName" onChange={e => changeUserFieldHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="secondName">Sobrenome:</label>
                            <input type="text" id="second_name" placeholder="" name="secondName" onChange={e => changeUserFieldHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="" name="email" onChange={e => changeUserFieldHandler(e)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Departamento:</label>
                            <select id="department" name="department" onChange={e => changeUserFieldHandler(e)} required>
                                <option value="">Selecione o departamento</option>
                                {userData && userData.map((department, index) => (
                                    <option key={index} value={department.id}>{department.name}</option>
                                ))}
                            </select>
                        </div>


                        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Cadastrar</button>
                    </form>
                </div>
                {<div className='list-container'>
                    <List />
                    <ToastContainer />
                </div>}
            </div>
        </div>
    );
};


export default Home;