import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './view.css';

const View = ({ employeeId }) => {
    const [employee, setEmployee] = React.useState({});
    const [isEditing, setIsEditing] = React.useState(false); // Estado para controlar a edição

    const fetchEmployee = React.useCallback(async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:8080/funcionario/${employeeId}`);
            console.log(result?.data);
            setEmployee(result?.data);
        } catch (err) {
            console.log("Falha ao consultar funcionário");
        }
    }, [employeeId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
        try {
            await axios.put(`http://127.0.0.1:8080/funcionario/${employeeId}`, employee);
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


    React.useEffect(() => {
        fetchEmployee();
    }, [fetchEmployee]);

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