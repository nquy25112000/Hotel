
import { Users } from '../../Models/Users'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect'


const knex = new Connect().knex;
const users = new Users();

export class UsersRepository extends KnexRepository<Users> {
    constructor() {
        super(users.tableName);
    }
    selectAcount(user: string, pass: string): Promise<Object> {
        return knex(this.tableName)
            .where('username', '=', user)
            .andWhere('password', '=', pass)
            .select()
    };
    findUserName(username: string): Promise<Users[]> {
        return knex(this.tableName)
            .where('username', '=', username)
            .select()
    };
    findUserNameOtherId(user: string, id: any): Promise<Users[]> {
        return knex(this.tableName)
            .where('username', '=', user)
            .andWhere('id', '!=', id)
            .select()
    };

    findAllWhereHotelOtherUserId(hotelId: string, id: string): Promise<any> {
        return knex.table(this.tableName)
            .select()
            .where(this.tableName + ".hotelId", "=", hotelId)
            .andWhere(this.tableName + ".id", "!=", id)
    }

}