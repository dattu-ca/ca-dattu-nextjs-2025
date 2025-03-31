export interface IBaseModel {
    id: string;
    dateTimeCreated: Date;
    dateTimeUpdated: Date;
}

export class BaseModelClass implements IBaseModel{
    public id: string;
    public dateTimeCreated: Date;
    public dateTimeUpdated: Date;

    constructor(data?: Partial<IBaseModel>) {
        this.id = data?.id || '';
        this.dateTimeCreated = data?.dateTimeCreated || new Date();
        this.dateTimeUpdated = data?.dateTimeUpdated || new Date();
    }
}