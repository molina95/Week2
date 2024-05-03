import { yargsInstance } from "./yargsinstance";

const yargs = new yargsInstance();
console.log("yargsInstance: ", yargs);
console.log("Option: ", yargs.getEncodeOrDecode());
console.log("file: ", yargs.getFilePath());