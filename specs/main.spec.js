import puppeteer from "puppeteer";
import devices from 'puppeteer/DeviceDescriptors';
import { settings } from '../tools/settings'
const port = process.env.PORT || '4000';
const appUrl = `http://localhost:${port}`;
const width = 1920;
const height = 1080;
let browser;
let setup;

if (process.env.SHOW_BROWSER) {
  jest.setTimeout(30000);
} else {
  jest.setTimeout(20000);
}

async function makePage(initialUrl) {
  try {
    browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: !process.env.SHOW_BROWSER});
    const page = await browser.newPage();
    await setup(page);
    await page.goto(initialUrl);
    return page;
  } catch(ex) {
    try {
      console.info('retrying...', ex);
      browser.close();
    } catch(ex2) {

    }
    return await makePage(initialUrl);
  }
}

function mainTest() {
  describe("Main test", () => {
    test("Smoke test", async () => {
      console.info('about to open a page', appUrl + '/');
    }, 6 * 60 * 1000); //give it up to 1 min to execute
  });
}


describe("Normal browser", function() {
  beforeEach(async function() {
    setup = async (page) =>  await page.setViewport({ width, height });
  })
  afterEach(async function() {
    browser.close();
  })
  mainTest();
});

