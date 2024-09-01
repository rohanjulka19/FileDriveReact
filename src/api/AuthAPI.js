const apiBaseUrl = import.meta.env.VITE_API_BASE_URL 

const AuthAPI = {
    async login(email, password) {
        const encodedCredentials = btoa(`${email}:${password}`)
        const resp = await fetch(`${apiBaseUrl}/files/login`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${encodedCredentials}`
            },
            credentials: "include"
        }) 
        return resp
    }
}

export default AuthAPI;