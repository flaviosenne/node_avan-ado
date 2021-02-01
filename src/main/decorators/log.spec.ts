import {LogControllerDecorator} from './log'
import{HttpRequest, HttpResponse, Controller} from '../../presentation/protocols'

interface SutTypes {
    sut: LogControllerDecorator,
    controllerStub: Controller
}
const makeController = (): Controller => {
    class ControllerStub implements Controller{
        async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
            const httpResponse = {
                statusCode: 200,
                body: {
                    name:'joao'
                }
            }
            return new Promise(resolve => resolve(httpResponse))
        }
    }
    return new ControllerStub()
}

const makeSut = (): SutTypes => {
   const controllerStub = makeController()
    const sut = new LogControllerDecorator(controllerStub)
    return{
        sut, controllerStub
    }
}
describe('LogController Decorator',()=>{
    it('Should call controller handle',async()=>{
        const {sut, controllerStub} = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest = {
            body: {
                name:'any_name',
                email:'any_email@mail.com',
                password:'any_password',
                passwordConfirmation:'any_password',
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })

    it('Should return the same result of the controller',async()=>{
        const {sut} = makeSut()
        const httpRequest = {
            body: {
                name:'any_name',
                email:'any_email@mail.com',
                password:'any_password',
                passwordConfirmation:'any_password',
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: 'joao'
            }
        })
    })
})