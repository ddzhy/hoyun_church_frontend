import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import Validation from './LoginValidation';
import axios from "axios"


function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if(res.data === "Success") {
                    navigate('/')
                } else {
                    alert("no record existed");
                }
            })
            .catch(err => console.log(err));
        } 
    }

    return ( 
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' name='email'
                        onChange={handleInput} />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Pnter password' name='password'
                        onChange={handleInput} />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit'>Login</button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/signup">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login