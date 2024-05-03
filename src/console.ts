import { yargsInstance } from "./yargsinstance";
import fs from "fs";

/*const yargs = new yargsInstance();

console.log("yargsInstance: ", yargs);
console.log("Option: ", yargs.getEncodeOrDecode());
console.log("file: ", yargs.getFilePath());*/

const inputFile = fs.createReadStream("file.txt", {encoding: "utf-8", highWaterMark:1});
const outputFile = fs.createWriteStream("file2.txt");


// inputFile.pipe(outputFile);

let num = 0;
let previousChar:string = '';
inputFile.on('data', datos => {
    const onChar = datos.toString();
    if(previousChar == '') previousChar = onChar;

    if(onChar == '\n' || onChar == ' ' || onChar == '\r'){

    }else{
        if((onChar.charCodeAt(0) >= 65 && onChar.charCodeAt(0) <= 90) || (onChar.charCodeAt(0) >= 97 && onChar.charCodeAt(0) <= 122) ){
            if(previousChar.charCodeAt(0) == onChar.charCodeAt(0) || previousChar.charCodeAt(0) == (onChar.charCodeAt(0) + 32)){
                num++;
            }else{
                console.log(`${previousChar.toUpperCase()}${num}`);
                outputFile.write(`${previousChar.toUpperCase()}${num}`);
                num = 1;
            }
        }else if(onChar.charCodeAt(0) == 209 || onChar.charCodeAt(0) == 241){
            if(previousChar.charCodeAt(0) == onChar.charCodeAt(0) || previousChar.charCodeAt(0) == (onChar.charCodeAt(0) + 32)){
                num++;
            }else{
                console.log(`${previousChar.toUpperCase()}${num}`);
                outputFile.write(`${previousChar.toUpperCase()}${num}`);
                num = 1;
            }
        }else{
            if(previousChar == onChar){
                num++;
            }else{
                console.log(`${previousChar.toUpperCase()}${num}`);
                outputFile.write(`${previousChar.toUpperCase()}${num}`);
                num = 1;
            }
        }
        
        previousChar = onChar;
    } 
    
    

    //console.log(datos.length, datos, datos.toString().charCodeAt(0));
});


inputFile.on('end', ()=>{
    console.log(`${previousChar}${num}`);
    outputFile.write(`${previousChar.toUpperCase()}${num}`);
    outputFile.close();
    console.log("End of the Stream");

});
