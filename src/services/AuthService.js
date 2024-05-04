import $api from '../http/index'

export default class AuthService{
    static async registration(name,email,password){
        return await $api.post('/registration',{name,email,password})
    }

    static async login(email,password){
        return await $api.post('/login',{email,password})
    }

    static async refresh(){
        return await $api.get('/refresh')
    }

    static async logout(){
        return await $api.post('/logout')
    }
}