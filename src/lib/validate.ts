export const rules ={
    validateEmail: (v:string) => {
        const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return validRegex.test(v) || 'Enter e-mail address'
    }
}