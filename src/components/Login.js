// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    // 환경 변수로부터 API URL 가져오기
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if (!errors.email && !errors.password) {
            axios.post(`https://hoyun-church-backend.vercel.app/login`, values)  // API URL을 환경 변수로 대체
                .then(res => {
                    if (res.data === "Success") {
                        login();  // 로그인 상태 업데이트
                        navigate('/');
                    } else {
                        alert("No record found");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' name='email' onChange={handleInput} />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter password' name='password' onChange={handleInput} />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit'>Login</button>
                    <p>You agree to our terms and policies</p> 
                    <Link to="/signup">Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
