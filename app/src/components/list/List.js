import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import View from '../view/View';
import Filter from '../filter/Filter';
import './list.css';
import './modal.css';


const List = React.memo(({ showRegister }) => {
    const [userData, setUserData] = React.useState([]);
    const [filters, setFilters] = React.useState({
        page: 1,
        total: 5,
        departamento: '',
        nome: '',
        email: ''
    });
    const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
    const [showModalView, setShowModalView] = React.useState(false);

    const handleViewClick = (id) => {
        setSelectedEmployeeId(id);
        setShowModalView(true);
    };

    const fetchData = React.useCallback(async () => {
        try {
            const { page, total, departamento, nome, email } = filters;
            const result = await axios.get(`http://127.0.0.1:8080/funcionarios?pagina=${page}&total=${total}&departamento=${departamento}&nome=${nome}&email=${email}`);
            setUserData(result.data);
        } catch (err) {
            console.log("Falha na consulta de funcionarios", err.response);
        }
    }, [filters]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/funcionario/${id}`);
            const newUserData = userData?.results.filter((item) => item.id !== id);
            setUserData({ ...userData, results: newUserData });
            toast.success('Funcionário excluído com sucesso.');
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

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <div className='list-container'>
                <h3 className='page-title'>Detalhes dos Funcionários</h3>

                {userData?.results?.length > 0 && (
                    <Filter handleSubmit={handleSubmit} />
                )}

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
                        {userData?.results ? (
                            userData?.results
                                //.sort((a, b) => a.name.localeCompare(b.name))
                                .map((employee, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.department.name}</td>
                                            <td>
                                                <button className="btn btn-info mx-2" variant="success" onClick={() => {
                                                    handleViewClick(employee.id)
                                                }}>Info</button>
                                                <button onClick={() => handleDelete(employee.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                        ) : (
                            <tr>
                                <td colSpan="5">Não há registro de funcionário</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {userData?.results?.length > 0 && (
                    <div className="pagination">
                        <button disabled={userData && userData.page <= 1} onClick={() => handlePageChange(userData && userData.page - 1)}>Anterior</button>
                        <span> página {userData && userData.page} de {userData && userData.total_pages !== 0 ? userData.total_pages : 1} </span>
                        <button disabled={(userData && userData.page === userData.total_pages) || userData.total_pages === 0} onClick={() => handlePageChange(userData && userData.page + 1)}>Próximo</button>
                    </div>
                )}

                {showModalView && (
                    <div className="modal-background">
                        <div className="modal-content">
                            <button className="close-modal-btn" onClick={() => setShowModalView(false)}>Fechar</button>
                            <View employeeId={selectedEmployeeId} onClose={() => setShowModalView(false)} />
                        </div>
                    </div>
                )}
            </div>
            <p className='nav-link' onClick={() => showRegister(true)}>Cadastrar funcionario</p>
        </>
    );
});

export default List;