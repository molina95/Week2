
import fs from 'fs'
import { Encrypter } from './encrypter';

const ENCODING: BufferEncoding = 'utf-8';
const HIGHWATERMARK: number = 1;

export class FileHandler {

    private inputFile: fs.ReadStream;
    private outputFile: fs.WriteStream;
    private encrypter: Encrypter;

    constructor(path:string) {
        this.inputFile = fs.createReadStream(path, { encoding: ENCODING, highWaterMark: HIGHWATERMARK });
        this.outputFile = fs.createWriteStream('enc_' + path);
        this.encrypter = new Encrypter();
    }

    public processFile(){
        this.inputFile.on('data', datos => {
            const encryptedSequence = this.encrypter.encrypt(datos.toString());
            if (encryptedSequence) this.outputFile.write(encryptedSequence);
        });

        this.inputFile.on('end', () => {
            this.outputFile.write(this.encrypter.getFinalCharSequence());
            this.outputFile.close();
            console.log("End of the Stream");
        });
    }

}