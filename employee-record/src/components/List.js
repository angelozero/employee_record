import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './css/list.css';

const List = () => {
    const [userData, setUserData] = useState([]);
    const [filters, setFilters] = useState({
        page: 1,
        total: 5,
        departamento: '',
        nome: '',
        email: ''
    });

    useEffect(() => {
        fetchData();
    }, [filters]);

    const fetchData = async () => {
        try {
            const { page, total, departamento, nome, email } = filters;
            const result = await axios.get(`http://127.0.0.1:5000/funcionarios?pagina=${page}&total=${total}&departamento=${departamento}&nome=${nome}&email=${email}`);
            console.log(result.data);
            setUserData(result.data);
        } catch (err) {
            console.log("something went wrong");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/funcionario/${id}`);
            const newUserData = userData.results.filter((item) => item.id !== id);
            setUserData({ ...userData, results: newUserData });
            toast.success('Funionário excluído com sucesso.');
        } catch (error) {
            console.error('Falha:', error);
            toast.error('Falha ao excluir o registro do funcionário.');
        }
    };

    const handlePageChange = (page) => {
        setFilters({ ...filters, page: page });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Atualize os filtros com os valores dos campos de entrada
        const formData = new FormData(e.target);
        const updatedFilters = {
            page: 1,
            total: 5,
            departamento: formData.get('departamento'),
            nome: formData.get('nome'),
            email: formData.get('email')
        };
        setFilters(updatedFilters);
    };

    return (
        <div className="container">
            <h3>Detalhes dos Funcionários</h3>

            {/* Formulário de filtros */}
            <form onSubmit={handleSubmit} className="filter-form">
                <h4>Filtros para consulta</h4>
                <div className="form-group">
                    <label htmlFor="departamento">Departamento:</label>
                    <input type="text" id="departamento" name="departamento" />
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <button type="submit">Pesquisar</button>
            </form>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>
                    {userData && userData.results ? (
                        userData.results.map((employee, i) => {
                            return (
                                <tr key={i}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.department.name}</td>
                                    <td>
                                        <NavLink to={`/view/${employee.id}`} className="btn btn-success mx-2">View</NavLink>
                                        <NavLink to={`/edit/${employee.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                        <button onClick={() => handleDelete(employee.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5">No user data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Componentes de paginação */}
            <div className="pagination">
                <button disabled={userData && userData.page <= 1} onClick={() => handlePageChange(userData && userData.page - 1)}>Anterior</button>
                <span> página {userData && userData.page} de {userData && userData.total_pages !== 0 ? userData.total_pages : 1} </span>
                <button disabled={userData && userData.page === userData.total_pages || userData.page === 1} onClick={() => handlePageChange(userData && userData.page + 1)}>Próximo</button>
            </div>
        </div>
    );
};

export default List;
