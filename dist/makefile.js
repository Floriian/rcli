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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFile = void 0;
const fs_1 = require("fs");
function makeFile(dir, name, type, isCss = false, isTypescript = true, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileExtension = isTypescript ? ".ts" : isCss ? ".css" : ".js";
        console.log(fileExtension);
        try {
            (0, fs_1.writeFileSync)(fileExtension, content ? content : "", { flag: "w" });
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.makeFile = makeFile;
