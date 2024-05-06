import { YargsInstance } from "./yargsinstance";
import { Encrypter } from "./encrypter";
import {FileHandler} from "./filehandler";
import fs from "fs";

/*const yargs = new yargsInstance();

console.log("yargsInstance: ", yargs);
console.log("Option: ", yargs.getEncodeOrDecode());
console.log("file: ", yargs.getFilePath());*/
// inputFile.pipe(outputFile);

const path = 'file.txt';

const fileHandler = new FileHandler(path);
fileHandler.processFile();