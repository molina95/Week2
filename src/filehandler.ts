
import fs from 'fs'
import { Encrypter } from './encrypter';
import path from 'path';
import { Decrypter } from './decrypter';

const ENCODING: BufferEncoding = 'utf-8';
const HIGHWATERMARK: number = 1;

export class FileHandler {

    private inputFile: fs.ReadStream;
    private outputFile: fs.WriteStream;
    private encrypter: Encrypter;
    private decrypter: Decrypter;

    constructor(filePath:string, mode:'encode' | 'decode') {
        this.inputFile = fs.createReadStream(filePath, { encoding: ENCODING, highWaterMark: HIGHWATERMARK });
        let filePrefix = '';
        if(mode == 'encode') filePrefix = 'enc_';
        if(mode == 'decode') filePrefix = 'dec_';
        this.outputFile = fs.createWriteStream(filePrefix + filePath);
        this.encrypter = new Encrypter();
        this.decrypter = new Decrypter();
    }

    public encryptFile(){
        try{
            this.inputFile.on('data', datos => {
                const encryptedSequence = this.encrypter.encrypt(datos.toString());
                if (encryptedSequence) this.outputFile.write(encryptedSequence);
            });
    
            this.inputFile.on('end', () => {
                this.outputFile.write(this.encrypter.getFinalCharSequence());
                this.outputFile.close();
                console.log("End of the Stream");
            });
        }catch(fileError:any){
            switch (fileError.code) {
                case 'ENOENT': 
                    console.error(`El directorio o archivo ${path} no existe`);
                    break;
    
                default:
                    console.error(fileError);
                    break;
            }
        }
    }

    public decryptFile(){
        try{
            this.inputFile.on('data', datos => {
                const decryptedSequence = this.decrypter.decrypt(datos.toString());
                if (decryptedSequence) this.outputFile.write(decryptedSequence);
            });
    
            this.inputFile.on('end', () => {
                this.outputFile.write(this.decrypter.getFinalCharSequence());
                this.outputFile.close();
                console.log("End of the Stream");
            });
        }catch(fileError:any){
            switch (fileError.code) {
                case 'ENOENT': 
                    console.error(`El directorio o archivo ${path} no existe`);
                    break;
    
                default:
                    console.error(fileError);
                    break;
            }
        }
    }

}