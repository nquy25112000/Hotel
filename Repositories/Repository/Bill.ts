
import { Bill } from '../../Models/Bill'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect';
import { BookRoom } from '../../Models/BookRoom'
import { Room } from '../../Models/Room';

const room = new Room();
const bookRoom = new BookRoom();

const knex = new Connect().knex;

const bill = new Bill();

export class BillRepository extends KnexRepository<Bill> {
    constructor() {
        super(bill.tableName);
    }
}