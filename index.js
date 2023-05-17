#!/usr/bin/env node

const chalk = require("chalk");
const { Command } = require("commander");
const fs = require("fs");
const program = new Command();
const makeFile = require("./makeFile");

const srcDir = __dirname + "/src/";
let featureDir;
let isTypescript = false;

program
  .name("R-CLI")
  .description("An Angular-Like CLI for React.")
  .version("0.1.0");

program
  .command("generate")
  .alias("g")
  .argument("name", "Component name")
  .action(async (str, options) => {
    const packageJSON = fs.readFileSync(
      __dirname + "/fakepackage.json",
      "utf-8"
    );

    const parse = JSON.parse(packageJSON);
    const depedencies = parse.dependencies;
    const projectDeps = [];

    featureDir = srcDir + str;

    if (!depedencies["react"]) return console.log(chalk.red("No React Found"));

    for (let dep in depedencies) {
      switch (dep) {
        case "redux": {
          projectDeps.push("redux");
          break;
        }
        case "react-router-dom": {
          projectDeps.push("react-router-dom");
          break;
        }
        case "tailwindcss": {
          projectDeps.push("tailwindcss");
          break;
        }
        case "typescript": {
          projectDeps.push("typescript");
          isTypescript = true;
        }
        default:
          break;
      }
    }

    try {
      if (!fs.existsSync(featureDir)) {
        fs.mkdirSync(featureDir);
        for (let dep of projectDeps) {
          switch (dep) {
            case "redux": {
              makeFile(str, "store", false);
            }
            case "tailwindcss": {
              break;
            }
            case "react-router-dom": {
              makeFile(str, "router", false);
            }
            case "typescript": {
              makeFile(str, "type", false);
            }
            default:
              const fileExtension = isTypescript ? ".tsx" : ".jsx";
              const fileName = featureDir + "/" + str + fileExtension;
              fs.writeFileSync(fileName, "");
          }
          if (dep !== "tailwindcss") {
            makeFile(str, "", true);
          }
        }
      } else {
        throw console.log(chalk.red("This component name is already in use."));
      }
    } catch (err) {
      console.log(err);
    }
  });

program.parse();
