import React from "react";
import { HTTPClient } from "../../utils/http/HTTPClient";

export const Department = React.memo(({ form, handleFilterChange }) => {
	const [departmentList, setDepartmentList] = React.useState([]);
	const fetchData = async () => {
		try {
			const result = await HTTPClient.get('departamentos');
			debugger;
			setDepartmentList(result?.data);
		} catch (err) {
			console.log("falha ao consulta r departamentos");
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);
	return (
		<select form={form} name="departamento" onChange={handleFilterChange} required>
			<option value="">Selecione o departamento</option>
			{departmentList?.map((department, index) => (
				<option key={index} value={department.name}>{department.name}</option>
			))}
		</select>
	)
}, (prevProps, nextProps) => (prevProps.handleFilterChange === nextProps.handleFilterChange && prevProps.form === nextProps.form));