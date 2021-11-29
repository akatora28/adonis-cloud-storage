import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Logger from '@ioc:Adonis/Core/Logger';

import User from "App/Models/User";

export default class AuthService {
    public async register(email: string, password: string, auth: AuthContract) {
        // Create & save new User to database
        let user: User;
        try {
            user = new User()
            await user
                .fill({email: email, password: password})
                .save()
        } catch (error) {
            Logger.error(error.message)
            return error.message
        }

        // Login user and return credentials to frontend
        let token
        try {
            token = await auth.use("api").attempt(email, password)
        } catch (error) {
            Logger.error(error.message)
            return error.message
        }

        return token
    }
}