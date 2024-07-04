import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

import { fileURLToPath } from 'url';

// Get the current file URL and convert it to a file path
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(__dirname);
const dirCodes = path.join(__dirname, 'codes');

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes,{recursive: true});
}

const generateFile = async (format,content) => {
    const jobId = uuid();
    const filename = `${jobId}.cpp`;
    const filePath = path.join(dirCodes, filename);
    await fs.writeFileSync(filePath, content);
    return filePath
}

export default generateFile;