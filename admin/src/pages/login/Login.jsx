import './login.css';
import BasicTextFields from "../../components/inputs/BasicTextField";
import MainButton from "../../components/buttons/mainButton/MainButton";
import {useContext, useState} from "react";
import useValidate from "../../hooks/useValidate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AdminContext} from "../../context/AdminContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userErrMessage, setUserErrMessage] = useState('');
    const [passErrMessage, setPassErrMessage] = useState('');
    const [userEmptyErr, userMinLengthErr] = useValidate(username, {minLength: 2, isEmpty: false});
    const [passEmptyErr, passMinLengthErr] = useValidate(password, {minLength: 3, isEmpty: false});

    const {dispatch} = useContext(AdminContext);
    const navigate = useNavigate();

    async function clickHandler(e) {
        e.preventDefault();

        if (userEmptyErr) {
            setUserErrMessage('Username can`t be empty');
            setPassErrMessage('');
            return 0;
        }else if (userMinLengthErr) {
            setUserErrMessage('Username is too short');
            setPassErrMessage('');
            return 0;
        }else if (passEmptyErr) {
            setPassErrMessage('Password can`t be empty');
            setUserErrMessage('');
            return 0;
        }else if (passMinLengthErr) {
            setPassErrMessage('Password is not secure enough');
            setUserErrMessage('');
            return 0;
        }

        setUserErrMessage('');
        setPassErrMessage('');

        dispatch({type: 'LOGIN_START'});
        try {
            const res = await axios.post('/auth/login', {username, password});
            if (res.data.isAdmin) {
                dispatch({type: 'LOGIN_SUCCESS', payload: res.data.details});
                navigate('/users');
            }
        } catch (err) {
            dispatch({type: 'LOGIN_FAILURE', payload: err.response.data});
        }
    }

    return (
        <div className="container">
            <label style={{color: "red"}}>{userErrMessage}</label>
            <BasicTextFields
                props={{
                    type: 'text',
                    id: 'username',
                    label: 'Username',
                    onChange: (e) => setUsername(e.target.value),
                    value: username,
                }}
            />

            <label style={{color: "red"}}>{passErrMessage}</label>
            <BasicTextFields
                props={{
                    type: 'password',
                    id: 'password',
                    label: 'Password',
                    onChange: (e) => setPassword(e.target.value),
                    value: password,
               }}
            />

            <div className="pos-center">
                <MainButton props={{
                    name: 'Login',
                    clickHandler,
                }}
                />
            </div>
        </div>
    );
};

export default Login;