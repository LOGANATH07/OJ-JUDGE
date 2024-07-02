import User from '../models/users.js';
import bcrypt from 'bcryptjs';

const login = async (req, res) => {
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
}

export { login }