import { HotelRepository } from '../Repositories/Repository/Hotel';
import { UsersRepository } from '../Repositories/Repository/Users';
import { RoleRepository } from '../Repositories/Repository/Role';
import { v4 as uuidv4 } from 'uuid';
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const emailExistence = require('email-existence')
var emailCheck = require('email-check');
require('dotenv').config();


const Repository = new HotelRepository();
const UserRepo = new UsersRepository();
const RoleRepo = new RoleRepository()




export class HotelService {


    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public checkvalidateHotel = async (item: any) => {
        if (typeof item.name === "undefined" || !item.name) {
            return Promise.reject({ messager: "Name Invalid !" });
        }
        if (!item.adress || typeof item.adress === "undefined") {
            return Promise.reject({ messager: "Adress Invalid !" });
        }
        if (!item.phone || typeof item.phone === "undefined" || isNaN(item.phone)) {
            return Promise.reject({ messager: "Phone Invalid !" });
        }
        if (item.phone.length < 10) {
            return Promise.reject({ messager: "Please enter the correct phone number !" });
        }
        var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        var valid = emailRegex.test(item.email);
        if (!item.email || !valid) {
            return Promise.reject({ messager: "Please enter the correct email !" });
        }
    }

    public checkExitsEmail = async (mail: any) => {
        return emailCheck(mail)
            .then(function (res: any) {
                //   console.log('res: '+res);  // return true if correct email
            })
            .catch(function (err: any) {
                if (err.message === 'refuse') {
                    return Promise.reject({ messager: "Email not exist  !!" });
                } else {
                    return Promise.reject({ messager: "Error check email  !!" });
                }
            });
    }


    public checkvalidateNameHotelCreate = async (name: string) => {
        const nameHotel = await Repository.checkNameHotelCreate(name);
        if (Object.keys(nameHotel).length > 0) {
            return Promise.reject({ messager: "Name already exists !" });
        }
    }

    public randomPassUser = async (length: any) => {
        var username = '';
        var password = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            username += characters.charAt(Math.floor(Math.random() * charactersLength));
            password += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return { username, password };
    }

    public createUser = async (idHotel: any) => {
        const idRoleAdmin = await RoleRepo.findIdbyNameAdmin();
        const userr = await this.randomPassUser(10);
        const iduser = uuidv4();
        const user: any = { id: `${iduser}`, fullName: 'admin', username: userr.username, password: userr.password, birtDate: '', adress: '', phone: '', hotelId: `${idHotel}`, roleId: `${idRoleAdmin[0].id}` };
        await UserRepo.create(user);
        return Promise.resolve(iduser);

    }

    public create = async (item: any) => {
        await Repository.create(item);
        const idUser = await this.createUser(item.id);
        const user = await Repository.findUser(idUser);
        return Promise.resolve({
            messager: "Sucsuess",
            inforHotel: item,
            inforUser: user
        });
    }
}
