
export class Decrypter {

    private char: string = '';
    private repeat: string = '';

    public decrypt(streamChar: string): string {
        let sequence: string = '';


        if (streamChar == '\n' || streamChar == ' ' || streamChar == '\r') {
            console.error('Invalid format for decrypted file.');
            process.exit(0);
        }

        if (isNaN(streamChar as any)) {
            if(this.repeat){
                let i = 0;
                while(i < Number(this.repeat)){
                    sequence += this.char.toUpperCase();
                    i++;
                }
            }
            this.repeat = '';
            this.char = streamChar;
        } else {
            this.repeat += streamChar;
        }

        return sequence;
    }

    public getFinalCharSequence(): string {
        let sequence = '';
        if(this.char != '' && this.repeat != ''){
            let i = 0;
            while(i < Number(this.repeat)){
                sequence += this.char;
                i++;
            }
        }
        return sequence;
    }
}
