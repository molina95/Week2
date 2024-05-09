import { YargsInstance } from "./yargsinstance";
import {FileHandler} from "./filehandler";

const yargs = new YargsInstance();
const option: 'encode' | 'decode' = yargs.getEncodeOrDecode();
const fileHandler = new FileHandler(yargs.getFilePath(),option);
if(option == 'encode')fileHandler.encryptFile();
if(option == 'decode')fileHandler.decryptFile();