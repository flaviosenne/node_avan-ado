import { InvalidParamError } from './../../errors/invalid-param-error';
import { CompareFieldsfValidation } from './compare-fields-validation';
const makeSut = (): CompareFieldsfValidation => {
    return new CompareFieldsfValidation('field', 'fieldToCompare')
}
describe('CompareFields Validation',() => {
    it('Should return a MissingParamError if validation fails',()=>{
        const sut =makeSut()
        const error = sut.validate({
             field: 'any_value', fieldToCompare: 'wrong_value'
            })
        expect(error).toEqual(new InvalidParamError('fieldToCompare'))
    })
    it('Should not return if validation succeeds',()=>{
        const sut = makeSut()
        const error = sut.validate({
            field: 'any_value', fieldToCompare: 'any_value'
           })
        expect(error).toBeFalsy()
    })
})