#!/usr/bin/env node
import { program } from "commander";
import { createComponent } from "./createComponent";

program
  .name("R-CLI")
  .description("An Angular-Like CLI for React.")
  .version("0.1.0");

program
  .command("generate")
  .alias("g")
  .argument("name", "Component name")
  .action(createComponent);

program.parse();
