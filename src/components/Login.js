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
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (!validationErrors.email && !validationErrors.password) {
            axios.post(`${process.env.REACT_APP_API_URL}/login`, values)
                .then(res => {
                    if (res.data === "Success") {
                        login(); 
                        navigate('/');
                    } else {
                        alert("No record found");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <i 
                    className="fa-solid fa-house-user header-icon"
                    onClick={navigateToHome}
                ></i>
            </div>
            <div className="login-box">
                <h2 className="login-title">로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor='email' className="input-label">이메일</label>
                        <input 
                            type='email' 
                            placeholder='Enter Email' 
                            name='email' 
                            className="input-field"
                            onChange={handleInput} 
                        />
                        {errors.email && <span className='error-text'>{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor='password' className="input-label">비밀번호</label>
                        <div className="input-container">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='Enter password' 
                                name='password' 
                                className="input-field"
                                onChange={handleInput} 
                            />
                            <i 
                                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`} 
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                        {errors.password && <span className='error-text'>{errors.password}</span>}
                    </div>
                    <button type='submit' className="login-button">로그인</button>
                    <p className="terms-text">당사의 약관 및 정책에 동의합니다</p> 
                    <Link to="/signup" className="signup-link">계정이 없으신가요? 회원가입</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
