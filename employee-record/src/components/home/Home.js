import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '../list/List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css';

const Home = () => {
    const [userData, setUserData] = useState([]);
    const [userField, setUserField] = useState({
        name: "",
        second_name: "",
        email: "",
        department_id: ""
    });

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:5000/departamentos`);
            setUserData(result.data);
        } catch (err) {
            console.log("falha ao consultar departamentos");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const changeUserFieldHandler = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'department_id' ? parseInt(value, 10) : value;
        setUserField({
            ...userField,
            [name]: newValue
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            console.log("salvando")
            console.log(userField)
            const response = await axios.post("http://127.0.0.1:5000/funcionario", userField);
            setLoading(true);
            toast.success('Funcionário cadastrado com sucesso.');
        } catch (err) {
            toast.error('Falha: ' + err.response.data.error);
        }
    };

    if (loading) {
        return <Home />;
    }

    return (
        <div className="container">
            <h2>Registro de Funcionários</h2>
            <div className='form-container'>
                <div className='form-box'>
                    <h3>Cadastrar um funcionário</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome:</label>
                            <input type="text" id="name" placeholder="" name="name" onChange={e => changeUserFieldHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="second_name">Sobrenome:</label>
                            <input type="text" id="second_name" placeholder="" name="second_name" onChange={e => changeUserFieldHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="" name="email" onChange={e => changeUserFieldHandler(e)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_id">Departamento:</label>
                            <select id="department_id" name="department_id" onChange={e => changeUserFieldHandler(e)} required>
                            <option value="">Selecione o departamento</option>
                                {userData && userData.map((department, index) => (
                                    <option key={index} value={department.id}>{department.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Cadastrar</button>
                    </form>
                </div>
                <div className='list-container'>
                    <List />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;
