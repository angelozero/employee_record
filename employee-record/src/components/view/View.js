import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './view.css';

const View = ({ employeeId }) => {
    const [employee, setEmployee] = useState({});
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar a edição

    useEffect(() => {
        fetchEmployee();
    }, [employeeId]);

    const fetchEmployee = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:5000/funcionario/${employeeId}`);
            console.log(result.data);
            setEmployee(result.data);
        } catch (err) {
            console.log("Falha ao consultar funcionário");
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
        try {
            await axios.put(`http://127.0.0.1:5000/funcionario/${employeeId}`, employee);
            console.log("Funcionário atualizado com sucesso.");
            toast.success('Funcionário atualizado com sucesso.');
        } catch (err) {
            console.log("Falha ao atualizar os dados do funcionário");
            toast.error('Falha ao atualizar os dados do funcionário.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    return (
        <div>
            <h1>Detalhes do Funcionário</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{employee.id}</td>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                employee.name
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="second_name"
                                    value={employee.second_name}
                                    onChange={handleChange}
                                />
                            ) : (
                                employee.second_name
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                employee.email
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="department"
                                    value={employee.department && employee.department.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                employee.department && employee.department.name
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                {isEditing ? (
                    <button onClick={handleSave}>Salvar</button>
                ) : (
                    <button onClick={handleEdit}>Editar</button>
                )}
            </div>
        </div>
    );
};

export default View;
