import "./env.js";
import config from "./config/index.js";
import { getFilesInFolder } from "./helpers/fileHelpers.js";
import { getTransformedName } from "./helpers/nameHelpers.js";

async function main(): Promise<void> {
  try {
    console.log(config);
    const files = await getFilesInFolder(config.sourceFolder);
    console.log(files);

    for (const file of files) {
      const sourceFile = `${config.sourceFolder}/${file}`;
      const destinationFile = await getTransformedName(file);

      // await moveFile(sourceFile, destinationFile);

      console.log(`${sourceFile} ->  ${destinationFile}`);
    }
  } catch (error) {
    console.error(error);
  }
}

await main();
