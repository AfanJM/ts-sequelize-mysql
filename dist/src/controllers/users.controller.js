"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUsers = exports.getUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_1.default.findByPk(id);
        if (!user)
            return res.status(404).json({ Message: 'No existe este usuario' });
        return res.json({
            user,
            msg: 'Usuario por id'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Error en el servidor' });
    }
});
exports.getUser = getUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.findAll();
        return res.json({
            users,
            msg: 'Lista de usuarios'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Error en el servidor' });
    }
});
exports.getUsers = getUsers;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email } = req.body;
    try {
        const existEmail = yield users_1.default.findOne({
            where: {
                email: email
            }
        });
        if (existEmail)
            return res.status(400).json({ Message: 'Ya existe un usuario con este email' });
        const users = yield users_1.default.create({ nombre, email });
        return res.json({
            users,
            msg: 'Usuario creado correctamente'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Error en el servidor' });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email } = req.body;
    const { id } = req.params;
    const findUser = yield users_1.default.findByPk(id);
    if (!findUser)
        return res.status(500).json({ Message: 'El usuario no existe' });
    const user = yield users_1.default.update({ nombre, email }, {
        where: { id }
    });
    res.json({
        user,
        msg: 'usuario actualizado'
    });
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existUser = yield users_1.default.findByPk(id);
    if (!existUser)
        return res.status(404).json({ Message: 'El usuario no existe' });
    const user = yield users_1.default.update({ estado: false }, {
        where: {
            id
        }
    });
    //update usuarios set id estado = ? where = ? [estado, id ]
    res.json({
        user,
        msg: 'Usuario eliminado'
    });
});
exports.deleteUser = deleteUser;
