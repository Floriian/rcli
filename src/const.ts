import path from "path";

export const processDir = path.resolve(process.cwd());
export const srcDir = processDir + "/src/";
export const featureDir = (str: string) => srcDir + str + "/";
export const fileDir = (str: string) => featureDir(str) + str;
