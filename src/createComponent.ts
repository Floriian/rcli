import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import chalk from "chalk";
import { AllDependencies, Dependencies, PackageJSON } from "./types";
import { featureDir, fileDir, processDir } from "./const";
import { componentContent, reduxContent } from "./filecontents";

export function createComponent(str: string) {
  const packageJSON = readFileSync(processDir + "/package.json", "utf-8");

  const file: PackageJSON = JSON.parse(packageJSON);
  const projectDeps: AllDependencies[] = [];

  const featureDirectory = featureDir(str);
  const fileDirectory = fileDir(str);

  let isTypescript = false;
  let createModuleCss = true;

  if (!file.dependencies["react"])
    return console.log(chalk.red("No React project found!"));

  if (file.devDependencies["typescript"]) {
    projectDeps.push("typescript" as AllDependencies);
    isTypescript = true;
  }

  for (let [dep, _] of Object.entries(file.dependencies)) {
    switch (dep as AllDependencies) {
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
    if (!existsSync(featureDirectory)) {
      mkdirSync(featureDirectory);

      for (let dep of projectDeps) {
        switch (dep as Dependencies) {
          case "tailwindcss":
            if (createModuleCss)
              writeFileSync(fileDirectory + ".module.css", "");
          case "redux":
            writeFileSync(
              fileDirectory + ".store" + fileExtension,
              reduxContent(str.toLowerCase())
            );
          case "react-router-dom":

          default:
            writeFileSync(
              fileDirectory + componentExtension,
              componentContent(str.charAt(0).toUpperCase() + str.slice(1))
            );
        }
      }
    } else {
      console.log(chalk.red("This feature name is already taken."));
    }
  } catch (e) {
    console.log(e);
  }
}
