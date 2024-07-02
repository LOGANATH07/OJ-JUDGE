import express from 'express';
import { login } from './login.js';
import { register } from './register.js';
import { postproblem } from './postproblem.js';
import { getproblem } from './getproblem.js';
import { allproblems } from './allproblems.js';
import { runCpp } from './runCpp.js';
import { posttestcases } from './posttestcases.js';
import { gettestcases } from './gettestcases.js';
const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.post('/postproblem',postproblem)
router.post('/posttestcases',posttestcases)
router.post('/run',runCpp)
router.get('/getproblem',getproblem)
router.get('/allproblems',allproblems)
router.get('/gettestcases',gettestcases)


export default router;