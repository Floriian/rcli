"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduxContent = void 0;
const reduxContent = (name) => {
    return `
    import { createSlice } from "react-redux";

    export const ${name} = createSlice({})
    `;
};
exports.reduxContent = reduxContent;
