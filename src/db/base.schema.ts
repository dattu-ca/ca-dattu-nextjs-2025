import { Document } from 'mongoose';

import { IBaseModel } from './base.model';

export type IBaseSchema = IBaseModel & Document & {}