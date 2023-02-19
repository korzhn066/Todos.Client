import React from 'react'

import Todo from '../Todo/Todo'

import styles from './TodosList.module.css'

const TodosList = props => {
    const {todos, refresh} = props

    return (
        <div className={styles.container}>
            {
                todos?.map(todo => 
                    <Todo key={todo.todoId} id={todo.todoId} name={todo.name} description={todo.description} refresh={refresh}/>
                )
            }
        </div>
    )
}

export default TodosList