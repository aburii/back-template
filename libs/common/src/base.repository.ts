import { Repository} from "typeorm";
import {QueryFailedException} from "@app/database";

export class BaseRepository<T> extends Repository<T> {
    async findById(id: number): Promise<T> {
        try {
            return await this.findOneBy({id: id} as any);
        } catch (e) {
            throw new QueryFailedException(e.message, e.driverError.code);
        }
    }

    async findAll(): Promise<Array<T>> {
        try {
            return await this.find({});
        } catch (e) {
            throw new QueryFailedException(e.message, e.driverError.code);
        }
    }
}