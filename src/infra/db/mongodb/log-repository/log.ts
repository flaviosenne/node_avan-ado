import { LogErrorRepository } from './../../../../data/protocols/log-error-repository';
import MongoHelper from '../helpers/mongo-helper'
export class LogMongoRepository implements LogErrorRepository{
    async logError(stack: string): Promise<void>{
        const log = await MongoHelper.getCollection('log')
        return log.create({
            stack,
            date: new Date()
        })
    }
}