import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import DBConnection from './database/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 8000;

DBConnection();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


// app.post('/register', async (req, res) => {
//     const { firstname, lastname, email, password } = req.body;
//     if(!firstname ||!lastname ||!email ||!password) {
//         return res.status(400).send('All fields are required');
//     }
//     const existingUser = await User.findOne({ email });
//     if(existingUser) {
//         console.log(existingUser);
//         return res.status(400).send('Email already exists');
//     }

//     const hashpassword = await bcrypt.hashSync(password, 10);
//     console.log(hashpassword);

//     const user = await User.create({ firstname, lastname, email, password: hashpassword });

//     const token = jwt.sign({ id: user._id,email }, process.env.SECRET_KEY, {
//         expiresIn: '1h'
//     })

//     user.token = token;
//     user.password = undefined;
//     res.status(201).json({
//         message: 'User registered successfully',
//         success:true,
//         user,
//         token
//     });
// })