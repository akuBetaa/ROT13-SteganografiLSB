import findIndex from '@/utils/find-index.utils';

export default function rotUtils(text, shift) {
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let char of text) {
        let index = findIndex(char, alphabetUpper);
        if (index !== -1) {
            // Menggunakan operasi modulus yang benar untuk shift negatif dan positif
            const newIndex = (index + shift + 26) % 26;
            result += alphabetUpper.charAt(newIndex);
        } else {
            index = findIndex(char, alphabetLower);
            if (index !== -1) {
                const newIndex = (index + shift + 26) % 26;
                result += alphabetLower.charAt(newIndex);
            } else {
                result += char; // karakter yang bukan huruf tetap dipertahankan
            }
        }
    }
    return result;
}
