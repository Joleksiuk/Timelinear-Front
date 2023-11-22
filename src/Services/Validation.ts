export const Validation = {
    isValidEmail: function (email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return emailRegex.test(email)
    },
    isValidPassword: function (password: string): boolean {
        const passwordRegex = /^[a-zA-Z0-9]+$/
        return passwordRegex.test(password)
    },
    isValidUsername: function (username: string): boolean {
        const usernameRegex = /^[a-zA-Z0-9]+$/
        return usernameRegex.test(username)
    },
}
