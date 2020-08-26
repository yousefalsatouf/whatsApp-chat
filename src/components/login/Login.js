import React from 'react'
// assets
import '../../assets/css/login.css'
import logo from '../../assets/img/whatsapplogo.jpg'
//material ui
import { Button } from '@material-ui/core'
// firebase
import { auth, provider } from '../../config/firebase'
import { UseStateValue } from '../states/StateProvider'
import { actionTypes } from '../states/Reducer'


const Login = () => {
    const [{ }, dispatch] = UseStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={logo} />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login