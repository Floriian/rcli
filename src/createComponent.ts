import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import chalk from "chalk";
import { AllDependencies, Dependencies, PackageJSON } from "./types";
import { featureDir, fileDir, processDir } from "./const";
import { componentContent, reduxContent, routerContent } from "./filecontents";

export function createComponent(str: string) {
  const packageJSON = readFileSync(processDir + "/package.json", "utf-8");

  const file: PackageJSON = JSON.parse(packageJSON);
  const projectDeps: AllDependencies[] = [];

  const featureDirectory = featureDir(str);
  const fileDirectory = fileDir(str);

  let isTypescript = false;

  let isTailwind = true;

  if (!file.dependencies["react"])
    return console.log(chalk.red("No React project found!"));

  if (file.devDependencies["typescript"]) {
    projectDeps.push("typescript" as AllDependencies);
    isTypescript = true;
  }

  if (!file.devDependencies["tailwindcss"]) {
    isTailwind = false;
    projectDeps.push("tailwindcss");
  }

  for (let [dep, _] of Object.entries(file.dependencies)) {
    switch (dep as AllDependencies) {
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
            if (!isTailwind) writeFileSync(fileDirectory + ".module.css", "");
          case "redux":
            writeFileSync(
              fileDirectory + ".store" + fileExtension,
              reduxContent(str.toLowerCase())
            );
          case "react-router-dom":
            writeFileSync(
              fileDirectory + ".router" + fileExtension,
              routerContent(
                str.charAt(0).toUpperCase() + str.slice(1),
                fileExtension
              )
            );

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
