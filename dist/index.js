#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const createComponent_1 = require("./createComponent");
commander_1.program
    .name("R-CLI")
    .description("An Angular-Like CLI for React.")
    .version("0.1.0");
commander_1.program
    .command("generate")
    .alias("g")
    .argument("name", "Component name")
    .action(createComponent_1.createComponent);
commander_1.program.parse();
