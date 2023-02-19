import axios from 'axios'
import React from 'react'

import { useCookies } from 'react-cookie'

import styles from './Todo.module.css'

const Todo = props => {
    const {id, name, description, refresh} = props

    const [cookie] = useCookies(["jwt"])
    const token = cookie["jwt"]

    const deleteTodo = () => {
        axios.delete('https://localhost:7139/Todo/RemoveTodo', {
            params: {
                todoId: id
            },
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

        refresh()
    }

    return (
        <div className={styles.container}>
            <h3>{name}</h3>
            {description}    
            <button onClick={deleteTodo}>Удалить</button>        
        </div>
    )
}

export default Todo