import React from 'react';

const FilterForm = ({ handleSubmit }) => {
    return (
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
    );
};

export default FilterForm;
