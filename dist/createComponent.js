"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = void 0;
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
let isTypescript = false;
function createComponent(str, options) {
    const processDir = path_1.default.resolve(process.cwd());
    const packageJSON = (0, fs_1.readFileSync)(processDir + "/package.json", "utf-8");
    const file = JSON.parse(packageJSON);
    const projectDeps = [];
    const srcDir = processDir + "/src/";
    const featureDir = srcDir + str + "/";
    const fileName = featureDir + str;
    if (!file.dependencies["react"])
        return console.log(chalk_1.default.red("No React project found!"));
    if (file.dependencies["typescript"]) {
        projectDeps.push("typescript");
        isTypescript = true;
    }
    for (let [dep, _] of Object.entries(file.dependencies)) {
        switch (dep) {
            case "tailwindcss": {
                projectDeps.push("tailwindcss");
                break;
            }
            case "redux": {
                projectDeps.push("redux");
                break;
            }
            case "react-router-dom": {
                projectDeps.push("react-router-dom");
                break;
            }
            default:
                break;
        }
    }
    try {
        if (!(0, fs_1.existsSync)(featureDir)) {
            (0, fs_1.mkdirSync)(featureDir);
            for (let dep of projectDeps) {
                console.log(dep);
            }
        }
        else {
            console.log(chalk_1.default.red("This feature name is already taken."));
        }
    }
    catch (e) {
        console.log(e);
    }
}
exports.createComponent = createComponent;
