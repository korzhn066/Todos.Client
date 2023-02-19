import React, {useState} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import styles from './AddTodo.module.css'

const AddTodo = props => {
    const {getCategoryId, refresh} = props

    const [name, setName] = useState()
    const [description, setDescription] = useState()

    const [cookie, setCookie] = useCookies(["jwt"])
    const token = cookie["jwt"]

    const [isNotCategory, setIsNotCategory] = useState(false)

    const addTodo = () => {
        if (getCategoryId() == -1) setIsNotCategory(true)

        return

        axios.post('https://localhost:7139/Todo/AddTodo', 
        {
            name: name,
            description: description,
            categoryId: getCategoryId()
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error);
        });

        refresh()
    }

    return (
        <div className={styles.container}>
            <input className={styles.todoInput} onChange={(e) => setName(e.target.value)} placeholder='имя'/>
            <input className={styles.todoInput} onChange={(e) => setDescription(e.target.value)} placeholder='описание'/>
            <button onClick={addTodo} className={styles.todoButton}>Добавить todo</button>
            {isNotCategory && <span>Выберите категорию</span>}
        </div>
    )
}

export default AddTodo