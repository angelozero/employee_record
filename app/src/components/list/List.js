import React from 'react';
import { toast } from 'react-toastify';
import { View } from '../view/View';
import './list.css';
import { HTTPClient } from '../../utils/http/HTTPClient';
import { Modal } from '../modal/Modal';
import { Pagination } from '../pagination/Pagination';
import { Filter } from '../filter/Filter';


export const List = ({ departmentList, showRegister }) => {
  const [userData, setUserData] = React.useState();
  const [filters, setFilters] = React.useState({
    page: 1,
    total: 5,
    departamento: '',
    nome: '',
    email: ''
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
  const [showModalView, setShowModalView] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  const handleViewClick = (id) => {
    setSelectedEmployeeId(id);
    setShowModalView(true);
  };

  const fetchData = React.useCallback(async () => {
    try {
      const { page, total, departamento, nome, email } = filters;
      const result = await HTTPClient.get(`funcionarios?pagina=${page}&total=${total}&departamento=${departamento}&nome=${nome}&email=${email}`);
      setUserData(result.data);
    } catch (err) {
      console.log("Falha na consulta de funcionarios", err.response);
    }
  }, [filters]);

  const handleDelete = React.useCallback(async (id) => {
    try {
      await HTTPClient.delete(`funcionario/${id}`);
      const newUserData = userData?.results.filter((item) => item.id !== id);
      setUserData({ ...userData, results: newUserData });
      toast.success('Funcionário excluído com sucesso.');
    } catch (error) {
      console.error('Falha:', error);
      toast.error('Falha ao excluir o registro do funcionário.');
    }
  }, [userData]);

  const handlePageChange = React.useCallback((page) => {
    setFilters({ ...filters, page: page });
  }, [filters]);

  const handleFilterChange = React.useCallback(
    event => {
      const formElement = document.querySelector('#filter');
      const formData = new FormData(formElement);
      if (event?.target?.name === 'clear') {
        formElement.reset();
        setFilters({ ...filters, departamento: '', nome: '', email: '' });
        return;
      }
      const updatedFilters = {
        page: 1,
        total: 5,
        departamento: formData.get('departamento'),
        nome: formData.get('nome'),
        email: formData.get('email')
      };
      setFilters({ ...filters, ...updatedFilters });
    }, [filters]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className='list-container paper'>
        <h3 className='page-title'>Detalhes dos Funcionários</h3>

        <button className='btn btn-text btn-filter' onClick={() => setShowFilters(!showFilters)}>
          Filtrar <span className='material-symbols-outlined'>filter_alt</span>
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Departamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {showFilters && (
              <Filter departmentList={departmentList} handleFilterChange={handleFilterChange} />
            )}
            {userData?.results ? (
              userData?.results.map((employee, i) => {
                return (
                  <tr key={i}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department.name}</td>
                    <td>
                      <button
                        className="btn btn-info btn-rounded mx-2"
                        onClick={() => handleViewClick(employee.id)}
                      >
                        Info
                        <span className='material-symbols-outlined'>info</span>
                      </button>
                      <button
                        className="btn btn-danger btn-rounded"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                        <span className='material-symbols-outlined'>delete</span>
                      </button>
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

        {userData?.results?.length > 0 && <Pagination total={userData?.total_pages} page={userData?.page} onPageChange={handlePageChange} />}

        <p className='nav-link add-new' onClick={() => showRegister(true)}>+</p>
      </div>
      <Modal visible={showModalView} onClose={() => setShowModalView(false)}>
        <View employeeId={selectedEmployeeId} onClose={() => setShowModalView(false)} />
      </Modal>
    </>
  );
};
