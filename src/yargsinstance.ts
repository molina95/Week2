import yargs from "yargs/yargs";
import helpers from "yargs/helpers";

const SCRIPT_NAME = "rle"
const RLE_USAGE = "$0 [option]... [input-file]";

export class yargsInstance {

    private argv;
    private encodeOrDecode:string = '';
    private instance;
    private filePath:string = '';

    constructor() {
        //Creating an instance of Yargs
        this.instance = yargs(helpers.hideBin(process.argv));
        //Setting the name and usage of the Script
        this.instance.scriptName(SCRIPT_NAME);
        this.instance.usage(RLE_USAGE);
        //Setting options for rle script
        this.instance.option("encode", {
            alias: 'e',
            describe: 'sets the script to encode a file',
            type: 'boolean',
            demandOption: false
        });
        this.instance.option("decode", {
            alias: 'd',
            describe: 'sets the script to decode a file',
            type: 'boolean',
            demandOption: false
        });
        //Enabling help menu
        this.instance.help();
        this.argv = this.instance.parseSync();
        this.setEncodeOrDecode();
        this.setFilePath();
    }
    
    private setEncodeOrDecode(){
        if(this.argv.encode){
            this.encodeOrDecode = 'encode';
            return;
        }
        if(this.argv.decode){
            this.encodeOrDecode = 'decode';
            return;
        }
        this.throwError(`${this.argv.$0}: There is no --encode -e or --decode -d option`);
    }

    private setFilePath(){
        if(this.argv._[0] && typeof this.argv._[0] == 'string'){
            this.filePath = this.argv._[0];
            return;
        }
        this.throwError(`${this.argv.$0}: --${this.getEncodeOrDecode()} Missing input-file`);
    }

    public getEncodeOrDecode():string{
        return this.encodeOrDecode;
    }
    
    public getFilePath():string{
        return this.filePath;
    }

    private throwError(errorMessage:string){
        console.error(errorMessage);
        this.instance.showHelp();
        process.exit(0);
    }
}