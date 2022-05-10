import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';
import { Bill } from './Bill';



const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class BookRoom extends bookshelf.Model<BookRoom> {
    get tableName() { return 'BookRoom'; }

    bill(): Bookshelf.Collection<Bill> {
        return this.hasMany(Bill, 'bookRoomId');
    }

}