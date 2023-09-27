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
const path_1 = __importDefault(require("path"));
const users_1 = __importDefault(require("../routes/users"));
const db_1 = __importDefault(require("../config/db"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '9000';
        this.middlewars();
        this.routes();
        this.db();
    }
    db() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.authenticate();
                console.log('Conectado correctamente a la DB');
            }
            catch (error) {
                throw new Error('Error a la hora de conectar a la DB');
            }
        });
    }
    routes() {
        this.app.use(users_1.default);
    }
    middlewars() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.pathPublic = path_1.default.join(__dirname, '../../../src/public');
        this.app.use(express_1.default.static(this.pathPublic));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server corriendo en el puerto: ', this.port);
        });
    }
}
exports.default = Server;
