import React, { useEffect, useState } from "react";


const Home = () => {

	const [todosList, setTodosList] = useState([])

	const loadTodos = async () => {
		try {
			const res = await fetch('https://playground.4geeks.com/todo/users/rderausseo')
			const data = await res.json()
			console.log("array data.todos: ", data.todos);
			setTodosList(data.todos);
		} catch (error) {
			console.error("Tuvimos un error: ", error)
		}
	}

	/* 
		Este método fue echo solo de prueba, solo para probar si estaba haciendo bien el request

	const createMyUser = () => {
		fetch('https://playground.4geeks.com/todo/users/rderausseo', {
			method: 'POST',
			body: JSON.stringify({ name: "rderausseoA" })
		})
			.then(res => {
				console.log(res.status)
				console.log(res.ok)
				console.log(res.text())
			})
			.then(data => {
				console.log(data)
			})
			.catch(error => console.log("error: ", error));
	} 
	
	*/

	const addTask = async (task) => {

		const newTask = { label: task, is_done: true };

		try {
			const res = await fetch('https://playground.4geeks.com/todo/todos/rderausseo', {
				method: 'POST',
				body: JSON.stringify(newTask),
				headers: { "content-type": "application/json" }
			});

			const data = await res.json();
			setTodosList([...todosList, data])

		} catch (error) {
			console.error("error:", error)
		}

	}

	const deleteTask = async (taskid) => {

		try {
			const res = await fetch('https://playground.4geeks.com/todo/todos/' + taskid, {
				method: 'DELETE',
				headers: { "content-type": "application/json" }
			});

			console.log(res.ok)
			console.log(res.status)
			console.log(res.text())
			if (res.ok)
				setTodosList(todosList.filter(task => task.id !== taskid))
			else
				throw new Error("Error al eliminar, no se puede actualizar la lista")

		} catch (error) {
			console.error("error:", error)
		}

	}

	const deleteAll = async () => {

		try {
			for (const item of todosList) {

				const response = fetch('https://playground.4geeks.com/todo/todos/' + item.id, {
					method: 'DELETE',
					headers: { "content-type": "application/json" }
				});
			}
			setTodosList([])
		} catch (error) {
			console.error("error:", error);
		}

	}

	useEffect(() => {
		loadTodos();
	}, [])


	return (

		<div className="container ">
			<h1 className="display-1 mt-5 text-primary-emphasis text-center">Todos</h1>

			<div className="row p-4 bg-primary-subtle ">
				<div className="col-12 mb-3">
					<input type="text" className="form-control" placeholder="What need to be done ?" onKeyDown={e => { e.key === "Enter" && e.target.value !== "" ? addTask(e.target.value) : "" }} />
				</div>

				<ul className="list-group bg-light ps-2">
					{
						todosList.map((item) => {
							return (
								<>
									<li className="list-group" key={item.id}>
										<div className="d-flex justify-content-between p-3">
											<p className="fs-3"> {item.label} </p>
											<button onClick={() => deleteTask(item.id)} className="btn btn-danger show" > <span> X </span> </button>
										</div>
									</li>
									<hr />
								</>

							)
						})
					}
				</ul>
				<span className="text-secondary mt-2"> {todosList.length} item left </span>
				<div className="offset-5 col-4">
					<button className="btn btn-danger" onClick={deleteAll}> Eliminar todo </button>
				</div>
			</div>

		</div>

	);
};

export default Home;
