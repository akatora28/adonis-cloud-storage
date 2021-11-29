import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

import AuthService from 'App/Services/AuthService'
import RegisterUserValidator from 'App/Validators/Auth/RegisterUserValidator'
import LoginUserValidator from 'App/Validators/Auth/LoginUserValidator'

export default class AuthController {
    authService: AuthService
        
    constructor() {
        this.authService = new AuthService
    }

    public async register({request, auth}: HttpContextContract) {
        await request.validate(RegisterUserValidator)

        // TODO: convert to DTO?
        const email = request.input("email")
        const password = request.input("password")

        let token: String
        try {
            token = await this.authService.register(email, password, auth)
        } catch (error) {
            Logger.error(error.message)
            return error.message
        }
        
        return token
    }

    public async login({request, auth}: HttpContextContract) {
        await request.validate(LoginUserValidator)

        const email = request.input("email")
        const password = request.input("password")

        let token: String
        try {
            token = await this.authService.login(email, password, auth)
        } catch(error) {
            Logger.error(error.message)
            return error.message
        }

        return token
    }
}
