import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/users.js';
const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        // console.log(req.body);
        const userCheck = await User.findOne({email: req.body.email });
        if(!userCheck) {
            return res.status(400).json({
               message: 'User not found',
            status:400});
        }
        const enteredpassword = await bcrypt.compareSync(req.body.password, userCheck.password);
        if(!enteredpassword) {
            return res.status(401).json({
                message: 'Invalid password',
             status:401});
        }
        res.status(200).json({
            message: 'User logged in successfully',
            success:true,
            user: userCheck
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
})

router.post('/register', async (req, res) => {
    try {
        console.log(req.body.email);
        const { firstname, lastname, email, password } = req.body;
        if(!firstname ||!lastname ||!email ||!password) {
            return res.status(400).send('All fields are required');
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstname, lastname, email, password: hashedPassword });
        user.save();
        res.status(201).json({
            message: 'User registered successfully',
            success:true,
            user
        })
    } catch (error) {
            console.log(error.message);
            res.status(500).json('Server Error');
        }
})

// router.post('/login',async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if(!email ||!password) {
//             return res.status(400).send('All fields are required');
//         }
//         const user = await User.findOne({ email });
//         if(!user) {
//             return res.status(404).send('User not found');
//         }
//         const enteredpassword = await bcrypt.compareSync(password, user.password);
//         if(!enteredpassword) {
//             return res.status(401).send('Invalid password');
//         }
//         const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
//             expiresIn: '1d'
//         })
//         user.token = token;
//         user.password = undefined;

//         const options = {
//             expires:new Date(Date.now() + 60 * 60 * 24 * 1000),
//             httpOnly: true
//         }

//         res.status(200).cookie('token', token, options).json({
//             message: 'User logged in successfully',
//             success: true,
//             token
//         })
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// })

export default router;