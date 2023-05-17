"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = void 0;
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const const_1 = require("./const");
const filecontents_1 = require("./filecontents");
function createComponent(str) {
    const packageJSON = (0, fs_1.readFileSync)(const_1.processDir + "/package.json", "utf-8");
    const file = JSON.parse(packageJSON);
    const projectDeps = [];
    const featureDirectory = (0, const_1.featureDir)(str);
    const fileDirectory = (0, const_1.fileDir)(str);
    let isTypescript = false;
    let createModuleCss = true;
    if (!file.dependencies["react"])
        return console.log(chalk_1.default.red("No React project found!"));
    if (file.devDependencies["typescript"]) {
        projectDeps.push("typescript");
        isTypescript = true;
    }
    for (let [dep, _] of Object.entries(file.dependencies)) {
        switch (dep) {
            case "tailwindcss": {
                projectDeps.push("tailwindcss");
                createModuleCss = true;
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
        }
    }
    const fileExtension = isTypescript ? ".ts" : ".js";
    const componentExtension = isTypescript ? ".tsx" : ".js";
    try {
        if (!(0, fs_1.existsSync)(featureDirectory)) {
            (0, fs_1.mkdirSync)(featureDirectory);
            for (let dep of projectDeps) {
                switch (dep) {
                    case "tailwindcss":
                        if (createModuleCss)
                            (0, fs_1.writeFileSync)(fileDirectory + ".module.css", "");
                    case "redux":
                        (0, fs_1.writeFileSync)(fileDirectory + ".store" + fileExtension, (0, filecontents_1.reduxContent)(str.toLowerCase()));
                    case "react-router-dom":
                    default:
                        (0, fs_1.writeFileSync)(fileDirectory + componentExtension, (0, filecontents_1.componentContent)(str.charAt(0).toUpperCase() + str.slice(1)));
                }
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
