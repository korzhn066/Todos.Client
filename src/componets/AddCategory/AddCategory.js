import React, {useState} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import styles from './AddCategory.module.css'

const AddCategory = props => {
    const {refresh} = props

    const [name, setName] = useState()

    const [cookie, setCookie] = useCookies(["jwt"])
    const token = cookie["jwt"]

    const addCategory = () => {
        axios.post('https://localhost:7139/Category/AddCategory', 
        {},
        {
            params: {
                categoryName: name
            },
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
            <input className={styles.input} onChange={(e) => setName(e.target.value)} placeholder='имя'/>
            <button onClick={addCategory} className={styles.button}>Добавить категорию</button>
        </div>
    )
}

export default AddCategory