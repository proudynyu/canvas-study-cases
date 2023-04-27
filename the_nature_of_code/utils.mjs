export class Utils {
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }
}
