import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import Loading from '../components/Loading'; // Loading 컴포넌트 import

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    
        if (!validationErrors.email && !validationErrors.password) {
            setIsLoading(true); // 로그인 요청 시작 시 로딩 상태로 전환
            axios.post(`https://hoyun-church-backend.vercel.app/login`, values)
                .then(res => {
                    if (res.data === "Success") {
                        login(); 
                        navigate('/'); // 로그인 성공 시 홈으로 이동
                    } else if (res.data === "Fail") {
                        alert("이메일 또는 비밀번호가 잘못되었습니다."); // 적절한 오류 메시지
                    } else {
                        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
                    }
                })
                .catch(err => {
                    console.error("Axios Error:", err);  // 디버깅: Axios 오류 로그
                    alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
                })
                .finally(() => setIsLoading(false)); // 요청이 끝나면 로딩 상태 해제
        }
    };
    

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            {isLoading ? ( // 로딩 중이면 Loading 컴포넌트 표시
                <Loading />
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default Login;
