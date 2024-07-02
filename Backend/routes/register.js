import User from '../models/users.js';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if(!firstname ||!lastname ||!email ||!password) {
            return res.status(401).send('All fields are required');
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(402).send('User already exists');
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
}

export { register }