import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios"

function Signup() {

    const [values, setValues] = useState({
        name: '',
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
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/login');
            })
            .catch(err => console.log(err));
        } 
    }

    return (
        <div>
            <div>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter Name' name="name"
                        onChange={handleInput}/>
                        {errors.name && <span className='text-danger'>{errors.name}</span>}

                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter Email' name="email"
                        onChange={handleInput}/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}

                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Pnter password' name="password"
                        onChange={handleInput}/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}

                    </div>
                    <button type='submit'>Signup</button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/login">Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup