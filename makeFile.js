async function makeFile(name, type, isCss) {
  const fileExtension = isTypescript ? ".ts" : ".js";
  const fileName = featureDir + "/" + `${name}.` + type + fileExtension;

  const cssFile = featureDir + "/" + `${name}` + ".module.css";
  try {
    if (isCss) {
      await fs.writeFileSync(cssFile, "");
    }
    await fs.writeFileSync(fileName, "");
  } catch (e) {
    console.log(e);
  }
}
module.exports = makeFile;
