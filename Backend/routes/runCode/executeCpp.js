import fs from 'fs';
import path from 'path';
import {exec} from 'child_process';
import { __dirname } from './generatefile.js';


const outPath = path.join(__dirname, 'outputs');

if(!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath,{recursive: true});
}

const executeCpp = async (filePath,inputFile) => {
    console.log(filePath);
    const jobId = path.basename(filePath).split('.')[0];
    const outFilePath = path.join(outPath, `${jobId}.exe`);
    console.log(outFilePath);

    // for linux the command is g++ ${filePath} -o ${outFilePath} && cd ${outPath} && ./${jobId}.exe
    // for windows the command is g++ ${filePath} -o ${outFilePath} && cd ${outPath} && .\\${jobId}.exe
    return new Promise((resolve, reject) => {
        const process = exec(`g++ ${filePath} -o ${outFilePath} && cd ${outPath} && ./${jobId}.exe`
            , (error, stdout, stderr) => {
            if(error) {
                reject({error,stderr});
            } 
            if(stderr) {
                console.log(stderr);
                reject(stderr);
            }
            else {
                console.log(stdout);
                resolve(stdout);
            }
        });
        process.stdin.write(inputFile);
        process.stdin.end();
    })
}

export default executeCpp;