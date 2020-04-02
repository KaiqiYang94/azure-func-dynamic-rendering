// http://localhost:8080/api/DynamciRenderingPOC

const puppeteer = require('puppeteer');

module.exports = async (context, req) => {    
    context.log("Function triggered");
    try {
        let path = undefined;
        if (req.query.path || (req.body && req.body.path)) {
            path = req.query.path || req.body.path
        }
        path = path.replace("'", "").replace('"', "") || 'https://www.google.com';

        context.log("path =  " + path);

        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
    
        const page = await browser.newPage();
        await page.goto(path, {
            timeout: 300000
        });
    
        const html = await page.content();
        await page.close();
    
        // const pageTitle = await page.title();
        await browser.close();
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: html,
            headers: {
                "Content-Type": "text/html"
            }
        };

    } catch (error) {
        context.log(error)
        context.res = {
            status: 500, /* Defaults to 200 */
            body: null
        };
    }
};