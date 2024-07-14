import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './ResetPassword.css';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/Reset_pass/${id}/${token}`, { password });
            if (res.data.Status === "Success") {
                navigate('/Auth');
            } else {
                console.log(res.data.Status);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="reset_container">
            <div className="reset_sub_container">
                <h4>Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="reset_password">
                        <label htmlFor="password">
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="reset_btn">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
