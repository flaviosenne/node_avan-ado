import { Router } from 'express';
import { makeSignUpController} from '../factories/signup/signup'
import{ adptRoute} from '../adapters/express-routes-adapter'
export default (router: Router): void => {
    router.post('/signup', adptRoute(makeSignUpController()))
}