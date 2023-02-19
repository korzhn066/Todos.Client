import React, {useState} from 'react'
import axios from 'axios'
import useCookies from 'react-cookie/cjs/useCookies'
import { useNavigate } from 'react-router-dom'

import styles from './AuthenticatePage.module.css'

const AuthenticatePage = props => {
    const [cookies, setCookie] = useCookies(['jwt']);

    const [isLogin, setIsLogin] = useState(true)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const Navigate = useNavigate()

    const Authenticate = () => {
        if (isLogin) {
            axios.post('https://localhost:7139/Authenticate/Login', {
                name : userName,
                password: password
            }).then((response) => {
                setCookie('jwt', response.data.access_token, {path: '/'})
                Navigate('/todos')
            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            axios.post('https://localhost:7139/Authenticate/Register', {
                name : userName,
                password: password
            }).then((response) => {
                setCookie('jwt', response.access_token, {path: '/'})
                Navigate('/todos')
            }).catch((error) => {
                console.log(error);
            });
        }
      }

    return (
        <div className={styles.container}>
            { isLogin && <h1>Войти</h1>}
            { !isLogin && <h1>Регистрация</h1>}
            <div className={styles.form}>
                <input className={styles.input} onChange={e => setUserName(e.target.value)} placeholder="Имя"/>
                <input className={styles.input} onChange={e => setPassword(e.target.value)} placeholder="Пароль"/>
                <button className={styles.button} onClick={Authenticate}>
                    { isLogin && <span>Войти</span>}
                    { !isLogin && <span>Регистрация</span>}
                </button>   

                {isLogin && <h2>Хотите зарегестрироваться?</h2>}   
                {!isLogin && <h2>Хотите войти?</h2>}  
                <button className={styles.button} onClick={() => setIsLogin(!isLogin)}>
                    { !isLogin && <span>Войти</span>}
                    { isLogin && <span>Регистрация</span>}
                </button>             
            </div>
    </div>
    )
}

export default AuthenticatePage