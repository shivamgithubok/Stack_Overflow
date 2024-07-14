import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Forget_Pass() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/Forget_pass', { email })
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/Auth');
                }
            })
            .catch(err => {
                console.error('Axios error:', err);
            });
    };

    return (
        <div className="container">
            <div className="sub_container">
                <h4>Forget Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn">
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Forget_Pass;
