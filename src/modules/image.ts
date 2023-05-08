import puppeteer from "puppeteer";

async function GenerateImage(
  html: string,
  style: any,
  name: string,
  type: string
) {
  const browser = await puppeteer.launch({ defaultViewport: null });
  const page = await browser.newPage();
  await page.setViewport({
    width: 240,
    height: 336,
  });
  await page.setContent(html);
  await page.addStyleTag({ path: style });
  await page.screenshot({
    path: "./build/" + type + "/" + name + ".png",
    printBackground: true,
  } as any);
  await browser.close();
}

export default GenerateImage;
