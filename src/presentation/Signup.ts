import { InvalidParamError, MissingParamError } from './errors/index';
import { EmailValidator } from './../protocols/email-validator';
import { Controller } from './../protocols/controller';

import { HttpRequest, HttpResponse } from '../protocols/https'
import { badRequest, serverError } from './helpers/http-helpers'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }
    handle(httpRequest: HttpRequest): HttpResponse {

        try {

            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {

                    return badRequest(new MissingParamError(field))
                }
            }
            const isValid =
                this.emailValidator.isValid(httpRequest.body.email)

            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        } catch (err) {
           return serverError()
        }
    }
}