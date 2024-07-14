import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userroutes from "./routes/user.js";
import questionroutes from "./routes/question.js";
import answerroutes from "./routes/answer.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import UserModel from "./models/User.js";
import bcrypt from 'bcryptjs'; // Corrected the import from 'bycrypt' to 'bcryptjs'
// import cookieParser from 'cookie-parser';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'stackoverflow_clone'; // Use environment variable or fallback
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use("/user", userroutes);
app.use('/questions', questionroutes);
app.use('/answer', answerroutes);
app.get('/', (req, res) => {
    res.send("Codequest is running perfectly");
});

const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

mongoose.connect(database_url)
    .then(() => app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); }))
    .catch((err) => console.log(err.message));

app.post('/Forget_pass', (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User not existed" });
            }
            const token = jwt.sign(
                { id: user._id, email: user.email },
                SECRET_KEY,
                { expiresIn: '1h' }
            );
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: email, 
                subject: 'Reset Password',
                text: `http://localhost:3000/Reset_pass/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: "Success" });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ Status: "Error", Message: "Internal Server Error" });
        });
});

app.post('/Reset_pass/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        if (!decoded) {
            return res.json({ Status: "Error with token" });
        }

        const hash = await bcrypt.hash(password, 10);
        await UserModel.findByIdAndUpdate(id, { password: hash });

        res.send({ Status: "Success" });
    } catch (err) {
        res.send({ Status: err.message });
    }
});
