import './css/home.css';
import List from './List';
import React, { } from 'react';
import { ToastContainer } from 'react-toastify';

const Home = () => {
    return (
        <div className="container">
            <h2>Registro de Funcionários</h2>
            <div className='form-container'>
                <div className='form-box'>
                    <h3>Cadastrar um funcionário</h3>
                    <form>
                    <div className="form-group">
                            <label htmlFor="firstName">Nome:</label>
                            <input type="text" id="firstName" placeholder="" name="firstName" /*onChange={e => changeUserFieldHandler(e)}*/ />
                        </div>
                        <div className="form-group">
                            <label htmlFor="secondName">Sobrenome:</label>
                            <input type="text" id="secondName" placeholder="" name="secondName" /*onChange={e => changeUserFieldHandler(e)}*/ />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="" name="email" /*onChange={e => changeUserFieldHandler(e)}*/ required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Departamento:</label>
                            <input type="text" id="department" placeholder="" name="department" /*onChange={e => changeUserFieldHandler(e)}*/ required />
                        </div>

                        <button type="submit">Add User</button>
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