import React from "react";
import { Department } from "../department/Department";

export const Filter = React.memo(({ departmentList, handleFilterChange }) => {
  return (
    <tr>
      <td colSpan={2}>
        <form id="filter" className='filter'>
          <input type="text" name="nome" placeholder='Nome' onChange={handleFilterChange} />
        </form>
      </td>
      <td>
        <input type="text" form="filter" name="email" placeholder='Email' onChange={handleFilterChange} />
      </td>
      <td>
        <Department form='filter' departmentList={departmentList} handleFilterChange={handleFilterChange} />
      </td>
      <td>
        <button className='btn btn-icon' onClick={() => handleFilterChange({ target: { name: 'clear' } })}>
          <span className='material-symbols-outlined'>clear</span>
        </button>
      </td>
    </tr>
  );
}, (prevProps, nextProps) => {
  return (prevProps.departmentList === nextProps.departmentList &&
    prevProps.handleFilterChange === nextProps.handleFilterChange);
});
