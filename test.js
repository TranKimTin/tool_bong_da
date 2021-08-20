const puppeteer = require('puppeteer');
let x = 0;
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: [
            `--disable-extensions-except=${__dirname}`,
            `--load-extension=${__dirname}`,
            '--enable-automation',
            '--start-maximized'
        ]
    })
    const page = await browser.newPage();
    await page.setViewport({ width: 0, height: 0 });
    // await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://vn.kucdn2.net/');
    movemouse(page);
    // await browser.close();
})();

async function movemouse(page) {
    try {
        if (x % 7 == 0) await page.mouse.move(0, 0);
        // if(x % 7 == 1) await page.mouse.down();
        if (x % 7 == 2) await page.mouse.move(0, 500);
        if (x % 7 == 3) await page.mouse.move(500, 500);
        if (x % 7 == 4) await page.mouse.move(500, 0);
        if (x % 7 == 5) await page.mouse.move(0, 0);
        // if(x % 7 == 6) await page.mouse.up();
        x++;
    }
    catch(err){
        console.log("move error", err);
    }
    setTimeout(() => {
        movemouse(page);
    }, 1000);
}