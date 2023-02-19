import React, {useState, useEffect} from 'react'
import AddCategory from '../../componets/AddCategory/AddCategory'
import AddTodo from '../../componets/AddTodo/AddTodo'
import CategoriesList from '../../componets/CategoriesList/CategoriesList'
import axios from 'axios'
import useCookies from 'react-cookie/cjs/useCookies'
import TodosList from '../../componets/TodosList/TodosList'

import styles from './TodosPage.module.css'

const TodosPage = props => {
    const [cookie] = useCookies(["jwt"])
    const token = cookie["jwt"]

    const [categoryId, setCategory] = useState(-1)
    const [todos, setTodos] = useState()
    const [categories, setCategories] = useState()

    const [refreshC, setRefrshC] = useState(0)
    const [refreshT, setRefrshT] = useState(0)

    const RefreshC = () => setRefrshC(refreshC + 1)
    const RefreshT = () => setRefrshT(refreshT + 1)

    const onChangeCategory = (id) => {
        setCategory(id)
    }

    const getCategoryId = () => {
        return categoryId
    }
    
    const getTodos = () => {
        if (categoryId === -1) {
            axios.get('https://localhost:7139/Todo/GetAll',
        {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then((response) => {
            console.log(response.data)
            setTodos(response.data)
            
        }).catch((error) => {
            console.log(error);
        });
        }
        else{
            axios.get('https://localhost:7139/Todo/GetByCategory',
            {
                params: {
                    categoryId : categoryId
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            }).then((response) => {
                console.log(response.data)
                setTodos(response.data)
                
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const getCategories = () => {
        axios.get('https://localhost:7139/Category/GetAll',
        {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then((response) => {
            setCategories(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    const deleteCategory = () => {
        axios.delete('https://localhost:7139/Category/RemoveCategory', {
            params: {
                categoryId: categoryId
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

        RefreshC()
        RefreshT()
    }

    useEffect(() => {
        getCategories()
        console.log("wasC")
    }, [refreshC])

    useEffect(() => {
        getTodos()
        console.log("wasT")
    }, [categoryId, refreshT])

    return (
        <div className={styles.container}>
            <CategoriesList categories={categories} onChangeCategory={onChangeCategory} refresh={RefreshC}/>
            <button onClick={deleteCategory}>Удалить категорию</button>
            <AddCategory refresh={RefreshC}/>
            <AddTodo refresh={RefreshT} getCategoryId={getCategoryId}/>
            <TodosList todos={todos} refresh={RefreshT}/>
    
        </div>
    )
}

export default TodosPage