import React from 'react'
import axios from 'axios';
import './register.css'
import { toast } from 'react-toastify';


export const Register = React.memo(function ({ userData, setLoading, showRegister }) {
	const [userField, setUserField] = React.useState({
		name: "",
		second_name: "",
		email: "",
		department_id: ""
	});

	const changeUserFieldHandler = React.useCallback((e) => {
		const { name, value } = e.target;
		const newValue = name === 'department_id' ? parseInt(value, 10) : value;
		setUserField({
			...userField,
			[name]: newValue
		});
	}, [userField]);

	const handleSubmit = React.useCallback(async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			console.log("salvando")
			await axios.post("http://127.0.0.1:8080/funcionario", userField);
			setLoading(true);
			showRegister(false);
			toast.success('Funcionário cadastrado com sucesso.');
		} catch (err) {
			toast.error(`Falha: ${err?.response?.data?.message}`);
		}
		setLoading(false);
	}, [setLoading, userField, showRegister]);

	return (
		<>
			<div className='register-container'>
				<h3 className='page-title'>Cadastrar um funcionário</h3>
				<div className='form-box'>
					<form className='register-form'>
						<div className="form-group">
							<label htmlFor="name">Nome:</label>
							<input type="text" id="name" placeholder="" name="name" onChange={changeUserFieldHandler} />
						</div>
						<div className="form-group">
							<label htmlFor="second_name">Sobrenome:</label>
							<input type="text" id="second_name" placeholder="" name="second_name" onChange={changeUserFieldHandler} />
						</div>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" id="email" placeholder="" name="email" onChange={changeUserFieldHandler} required />
						</div>
						<div className="form-group">
							<label htmlFor="department_id">Departamento:</label>
							<select id="department_id" name="department_id" onChange={changeUserFieldHandler} required>
								<option value="">Selecione o departamento</option>
								{userData?.map((department, index) => (
									<option key={index} value={department.id}>{department.name}</option>
								))}
							</select>
						</div>
						<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Cadastrar</button>
					</form>
				</div>
			</div>
			<p className='nav-link' onClick={() => showRegister(false)}>Voltar</p>
		</>
	)
}, []);