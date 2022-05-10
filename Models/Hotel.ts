import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';
import { Users } from './Users';
import { Room } from './Room';




const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class Hotel extends bookshelf.Model<Hotel> {
    get tableName() { return 'Hotel'; }

    users(): Bookshelf.Collection<Users> {
        return this.hasMany(Users, 'hotelId');
    }
    room(): Bookshelf.Collection<Room> {
        return this.hasMany(Room, 'holtelId');
    }
}