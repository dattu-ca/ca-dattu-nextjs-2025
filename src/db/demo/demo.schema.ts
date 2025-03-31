import mongoose from 'mongoose';

import { COLLECTIONS } from './collectionNames';
import { mongoDb } from '../dbConnect';
import { IBaseSchema } from '../base.schema';
import { IDemoModel } from './demo.model';


const SchemaName = COLLECTIONS.DEMO;

type ISchema = IBaseSchema & IDemoModel & {
    
}

const Schema = new mongoose.Schema<ISchema>({
    dateTimeCreated: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: new Date(),
    },
    dateTimeUpdated: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: new Date(),
    },
    todo: {
        type: String,
        required: true,
        trim: true,
    },
});

Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });

Schema.pre('findOneAndDelete', async function (next) {
    next();
});

const DbModel = mongoDb.models?.[SchemaName] || mongoDb.model(SchemaName, Schema);


export { DbModel as DemoSchema };
export type { ISchema as IDemoSchema };