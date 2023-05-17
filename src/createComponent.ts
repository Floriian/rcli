import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import chalk from "chalk";
import { AllDependencies, Dependencies, PackageJSON } from "./types";
import { makeFile } from "./makefile";
import { reduxContent } from "./filecontents/redux.content";
import { componentContent } from "./filecontents/component.content";
import path from "path";

let isTypescript = false;

export function createComponent(str: string, options: string) {
  const processDir = path.resolve(process.cwd());
  const packageJSON = readFileSync(processDir + "/package.json", "utf-8");

  const file: PackageJSON = JSON.parse(packageJSON);
  const projectDeps: AllDependencies[] = [];

  const srcDir = processDir + "/src/";
  const featureDir = srcDir + str + "/";
  const fileName = featureDir + str;

  if (!file.dependencies["react"])
    return console.log(chalk.red("No React project found!"));

  if (file.dependencies["typescript"]) {
    projectDeps.push("typescript" as AllDependencies);
    isTypescript = true;
  }

  for (let [dep, _] of Object.entries(file.dependencies)) {
    switch (dep as Dependencies) {
      case "tailwindcss": {
        projectDeps.push("tailwindcss" as AllDependencies);
        break;
      }
      case "redux": {
        projectDeps.push("redux" as AllDependencies);
        break;
      }
      case "react-router-dom": {
        projectDeps.push("react-router-dom" as AllDependencies);
        break;
      }
      default:
        break;
    }
  }

  try {
    if (!existsSync(featureDir)) {
      mkdirSync(featureDir);
      for (let dep of projectDeps) {
        console.log(dep);
      }
    } else {
      console.log(chalk.red("This feature name is already taken."));
    }
  } catch (e) {
    console.log(e);
  }
}
