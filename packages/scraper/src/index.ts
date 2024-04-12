import fetch from "cross-fetch";
import { parse } from "node-html-parser";
import "./env.js";
import { logger } from "./helpers/logger.js";

const main = async (): Promise<void> => {
  const urls = [
    "https://www.price.ro/preturi-logitech-g915-tkl-lightspeed-wireless-gl-tactile-mecanica-920-009503-3023630",
  ];

  const lowestPrice = await scrapeUrls(urls);

  logger.info(`Lowest price = ${lowestPrice} RON`);
};

const scrapeUrls = async (urls: string[]): Promise<number> => {
  let lowestPrice = Infinity;

  for (const url of urls) {
    logger.debug(`URL = ${url}`);
    try {
      const response = await fetch(url);
      const html = await response.text();
      const price = extractPrice(html);

      if (price < lowestPrice) {
        lowestPrice = price;
      }
    } catch (error) {
      logger.error(`Failed to scrape URL: ${url}`, error);
    }
  }

  return lowestPrice;
};

const extractPrice = (html: string): number => {
  const root = parse(html);

  const htmlEl = root.querySelector(".price");
  if (!htmlEl) {
    return Infinity;
  }

  return parseFloat(htmlEl.text.replace(/[^0-9,]/g, "").replace(",", "."));
};

// const sendPostRequest = async (url: string, data: any): Promise<void> => {
//   try {
//     await fetch(url, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" },
//     });
//     logger.info("Post request sent successfully");
//   } catch (error) {
//     logger.error("Failed to send post request", error);
//   }
// };

// const lanUrl = "http://lan-url";
// const postData = { price: lowestPrice };

// await sendPostRequest(lanUrl, postData);
await main();
