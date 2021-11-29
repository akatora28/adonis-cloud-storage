import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger';

import AuthService from 'App/Services/AuthService'
import RegisterUserValidator from 'App/Validators/Auth/RegisterUserValidator';

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

        let token: String // type string?
        try {
            token = await this.authService.register(email, password, auth)
        } catch (error) {
            Logger.error(error.message)
            return error.message
        }
        
        return token
    }
}
