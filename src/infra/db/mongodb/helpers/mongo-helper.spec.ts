import MongoHelper from './mongo-helper'
const sut = MongoHelper
describe('Mongo Helper', ()=> {
    beforeAll(async()=> {
        await sut.connect('mongodb://localhost:27017/test')
    })
    afterAll(async()=>{
        await sut.disconnect()

    })
    it('Should reconnect if mongodb is down', async ()=> {
        let accountCollection = sut.getCollection('account')
        expect(accountCollection).toBeTruthy()
        await sut.disconnect()
        accountCollection = sut.getCollection('account')
        expect(accountCollection).toBeTruthy()
    })
})