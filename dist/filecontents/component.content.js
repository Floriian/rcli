"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentContent = void 0;
const componentContent = (name) => {
    return `
    import React from 'react'

    export default function ${name}() {
        return <></>;
    }
    `;
};
exports.componentContent = componentContent;
