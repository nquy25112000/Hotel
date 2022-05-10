import { BookRoomRepository } from '../Repositories/Repository/BookRoom';
import { RoomRepository } from '../Repositories/Repository/Room';


const Repository = new BookRoomRepository();
const roomRepository = new RoomRepository();



export class BookRoomService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({ message: "No Data to display" })
        }
        return Promise.resolve({ result: rs });
    }

    public create = async (item: any, userId: any) => {
        item.userId = userId;
        await Repository.create(item);
        return Promise.resolve({ message: "Sucsess", result: item });
    }
}
