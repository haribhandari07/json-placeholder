import React, {useEffect, useState} from 'react';


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


    return (
        <div>
            <h2>Users</h2>
            {Array.isArray(users) ? (
                users.map(user => {
                    return (
                        <ul key={user.id}>
                           <li>
                               <div>
                                   <span>{user?.id}</span>
                                   <span>{user?.username}</span>
                                   <span>{user?.email}</span>
                               </div>
                               <div onClick={() =>  handleFetchTodo(user?.id)}>
                                   <div>{
                                       user?.todos?.map(todo => {
                                           return (
                                               <div>
                                                   <input type="checkbox" checked={todo?.completed}/>
                                                   <span>{todo?.title}</span>
                                               </div>
                                           )
                                       })
                                   }</div>
                               </div>
                           </li>
                        </ul>
                    )
                })
            ) : null}
        </div>
    );
};

export default UsersPage;
