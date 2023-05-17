import { writeFileSync } from "fs";

export async function makeFile(
  dir: string,
  name: string,
  type: string,
  isCss: boolean = false,
  isTypescript: boolean = true,
  content?: string
) {
  const fileExtension = isTypescript ? ".ts" : isCss ? ".css" : ".js";
  console.log(fileExtension);
  try {
    writeFileSync(fileExtension, content ? content : "", { flag: "w" });
  } catch (e) {
    console.log(e);
  }
}
