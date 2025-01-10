export default function findIndex(char, alphabet) {
    for (let i = 0; i < alphabet.length; i++) {
        if (alphabet.charAt(i) === char) {
            return i;
        }
    }
    return -1;
}