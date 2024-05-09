
export class Encrypter {

    private num: number = 0;
    private previousChar: string = '';

    public encrypt(onChar: string): string {
        let charSequence = '';

        if (this.previousChar == '') this.previousChar = onChar;

        if (onChar == '\n' || onChar == ' ' || onChar == '\r') {

        } else {
            if ((onChar.charCodeAt(0) >= 65 && onChar.charCodeAt(0) <= 90) || (onChar.charCodeAt(0) >= 97 && onChar.charCodeAt(0) <= 122)) {
                if (this.previousChar.charCodeAt(0) == onChar.charCodeAt(0) || this.previousChar.charCodeAt(0) == (onChar.charCodeAt(0) + 32)) {
                    this.num++;
                } else {
                    charSequence = `${this.previousChar.toUpperCase()}${this.num}`;
                    this.num = 1;
                }
            } else if (onChar.charCodeAt(0) == 209 || onChar.charCodeAt(0) == 241) {
                if (this.previousChar.charCodeAt(0) == onChar.charCodeAt(0) || this.previousChar.charCodeAt(0) == (onChar.charCodeAt(0) + 32)) {
                    this.num++;
                } else {
                    charSequence = `${this.previousChar.toUpperCase()}${this.num}`;
                    this.num = 1;
                }
            } else {
                if (this.previousChar == onChar) {
                    this.num++;
                } else {
                    charSequence = `${this.previousChar.toUpperCase()}${this.num}`;
                    this.num = 1;
                }
            }

            this.previousChar = onChar;
        }
        return charSequence;    
    }

    public getFinalCharSequence(): string {
        return `${this.previousChar.toUpperCase()}${this.num}`;
    }
}