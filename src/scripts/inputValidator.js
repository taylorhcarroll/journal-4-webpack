
const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,(){}:;-!?"

const validateInputString = ( string ) => {
   return string.split("").filter( character => validCharacters.includes( character ) ).join("")
}
export default validateInputString