"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var process_1 = __importDefault(require("./api/process"));
var routes = express_1.default.Router();
routes.use('/api/process', process_1.default);
//routes.use('/listImages', listImagesRouter);
exports.default = routes;
