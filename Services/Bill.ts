
import { BillRepository } from '../Repositories/Repository/Bill';
import { BookRoomRepository } from '../Repositories/Repository/BookRoom';
import { UsersRepository } from '../Repositories/Repository/Users';
import { RoomRepository } from '../Repositories/Repository/Room';
import { RoomTypeRepository } from '../Repositories/Repository/RoomType';
import { v4 as uuidv4 } from 'uuid';
const Repository = new BillRepository();
const BookRoomRepo = new BookRoomRepository();
const userRepo = new UsersRepository();
const roomTypeRepo = new RoomTypeRepository();
const roomRepo = new RoomRepository();

export class BillService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public getTotalBill = async (id: any) => {
        const bookroom: any = await BookRoomRepo.findOne(id);
        const room: any = await roomRepo.findOne(bookroom[0].roomId);
        const romtype: any = await roomTypeRepo.findOne(room[0].roomTypeId);
        const price = romtype[0].price / 60
        const fromDate = bookroom[0].fromDate.getTime()
        const ToDate = bookroom[0].toDate.getTime()
        const time = (ToDate - fromDate) / 60000;
        return Promise.resolve(time * price)
    }

    public create = async (id: any) => {
        const price = await this.getTotalBill(id)
        const bill: any = { id: uuidv4(), total: price, bookRoomId: id }
        await Repository.create(bill)
        return Promise.resolve({ ressult: bill })
    }
}