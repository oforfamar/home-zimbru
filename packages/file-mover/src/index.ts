import "./env.js";
import config from "./config/index.js";
import { getFilesInFolder } from "./helpers/fileHelpers.js";
import { getDestinationFilename } from "./helpers/getDestinationFilename.js";
import { logger } from "./helpers/logger.js";

const main = async (): Promise<void> => {
  try {
    const files = await getFilesInFolder(config.sourceFolder);

    for (const file of files) {
      const sourceFile = `${config.sourceFolder}/${file}`;
      const destinationFileName = await getDestinationFilename(file);

      if (destinationFileName === "NOT_PROCESSED") {
        logger.warn(`${file} was not found in shows data, skipping!`);
        continue;
      }

      const destinationFile = `${config.destinationBasePath}/${destinationFileName}`;

      // await moveFile(sourceFile, destinationFile);

      logger.info(`${sourceFile} -> ${destinationFile}`);
    }
  } catch (error) {
    logger.error(error);
  }
};

await main();
