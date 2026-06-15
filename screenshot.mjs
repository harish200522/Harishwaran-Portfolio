import puppeteer from 'puppeteer';
const outDir = 'C:/Users/PC/.gemini/antigravity/brain/a426e836-50d9-4e11-91df-cb3937be4622/scratch';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// 1. Hero Section
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));
await page.screenshot({ path: `${outDir}/hero_desktop_after.png` });

// 2. Skills Section
await page.evaluate(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: `${outDir}/skills_desktop_after.png` });

// 3. Projects Section
await page.evaluate(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: `${outDir}/projects_desktop_after.png` });

await browser.close();
console.log('Done!');
