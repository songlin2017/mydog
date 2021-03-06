import { Application, RpcClass, rpcErr } from "mydog";
import roomMgr from "../../../domain/roomMgr";
import Proto = require("../../../domain/Proto");

export default function (app: Application) {
    return new remote(app);
}

declare global {
    interface Rpc {
        chat: {
            chatRemote: RpcClass<remote>
        }
    }
}

class remote {
    private app: Application;
    private roomMgr: roomMgr;
    constructor(app: Application) {
        this.app = app;
        this.roomMgr = app.get("roomMgr");
    }

    getRooms(cb: (err: rpcErr, data: Proto.connector_main_getChatInfo_rsp) => void) {
        cb(null as any, this.roomMgr.getRooms());
    };

    newRoom(msg: Proto.connector_main_newRoom_req, cb: (err: rpcErr, info: Proto.join_room_rsp) => void) {
        let info = this.roomMgr.newRoom(msg);
        cb(null as any, info);
    };

    joinRoom(msg: Proto.connector_main_newRoom_req, cb: (err: rpcErr, info: Proto.join_room_rsp) => void) {
        let info = this.roomMgr.joinRoom(msg);
        cb(null as any, info);
    };

    leaveRoom(msg: { "roomId": number, "playerId": number }) {
        this.roomMgr.leaveRoom(msg.roomId, msg.playerId);
    };
}