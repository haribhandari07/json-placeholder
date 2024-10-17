import React, {useEffect, useState} from 'react';
import Accordion from "../components/Accordion.jsx";
import './Users.css'


//https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/todos?userId=3

const fetchTodosByUser = async (userId) => {
    try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(res => res.json())
        return data
    } catch (e) {
        console.log(e)
    }
}

const UsersPage = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
                setUsers(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchUsers()
    }, []);


    const handleFetchTodo = async (userId) => {
        if (!userId) return
        const userAlreadyHasTodos = users.find(user => user.id === userId)?.todos
        // no need to fetch todos if it's already fetched
        if (userAlreadyHasTodos?.length > 0) return
        const todoData = await fetchTodosByUser(userId)
        const usersDataWithTodo = users.map(user => {
            if (user.id === userId) {
                const updatedUserData = {
                    ...user,
                    todos: todoData
                }
                return updatedUserData
            }
            return user
        })
        setUsers(usersDataWithTodo)
    }

    const updateTodo = ({todoId, userId}) => {
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                user.todos.map(todo => {
                    if (todo.id === todoId) {
                        todo.completed = !todo.completed
                    }
                    return todo
                })
            }
            return user
        })

        setUsers(updatedUsers)
    }



    return (
        <div className="container">
            <h2>Users</h2>
            <ul>
                {Array.isArray(users) ? (
                    users.map(user => {
                        return (
                            <li key={user.id}>
                                <Accordion
                                    title={
                                        <div>
                                            <span className="userId">{user?.id}</span>
                                            <span className="username">{user?.username}</span>
                                            <span>{user?.email}</span>
                                        </div>
                                    }
                                    body={
                                        <div>{
                                            user?.todos?.map(todo => {
                                                return (
                                                    <div className="todoContainer">
                                                        <input className="checkbox" type="checkbox"
                                                               checked={todo?.completed} onChange={() => updateTodo({todoId: todo.id, userId: user.id})}/>
                                                        <div className="todoTitle">{todo?.title}</div>
                                                    </div>
                                                )
                                            })
                                        }</div>
                                    }
                                    handleTitleClick={() => handleFetchTodo(user?.id)}
                                />
                            </li>
                        )
                    })
                ) : null}
            </ul>
        </div>
    );
};

export default UsersPage;
