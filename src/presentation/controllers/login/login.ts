import { Authentication } from './../../../domain/usecases/authentication';
import { serverError } from './../../helpers/http-helpers';
import { InvalidParamError } from './../../errors/invalid-param-error';
import { EmailValidator } from './../../protocols/email-validator';
import { MissingParamError } from './../../errors/missing-param-error';
import { badRequest } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly authentication: Authentication
    constructor(emailValidator: EmailValidator, authentication: Authentication){
        this.emailValidator = emailValidator
        this.authentication = authentication
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try{

            const {email, password} = httpRequest.body    
            if(!email){
                return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
            }if(!password){
                return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
            }
            const isValid = this.emailValidator.isValid(email)
            if(!isValid){
                return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
            }
            await this.authentication.auth(email, password)
        }catch(err){
            return serverError(err)
        }
    }
}