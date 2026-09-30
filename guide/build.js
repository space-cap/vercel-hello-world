const fs = require('fs');
const path = require('path');

const guideDir = path.resolve(process.cwd());
const templatePath = path.join(guideDir, 'template.html');
const chaptersDir = path.join(guideDir, 'chapters');
const outputPath = path.join(guideDir, 'index.html');

// Ordered list of chapter files
const chapterFiles = [
  '00-cover.html',
  '00-intro.html',
  'part1.html',
  'ch01.html',
  'ch02.html',
  'ch03.html',
  'part2.html',
  'ch04.html',
  'ch05.html',
  'ch06.html',
  'part3.html',
  'ch07.html',
  'ch08.html',
  'ch09.html',
  'ch10.html',
  'part4.html',
  'ch11.html',
  'ch12.html',
  'ch13.html',
  'part5.html',
  'ch14.html',
  'ch15.html',
  'appendix-a.html',
  'appendix-b.html',
  'epilogue.html'
];

function buildGuide() {
  console.log('📖 Building VibeCraft E-book Guide...');

  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template file not found: ${templatePath}`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  let combinedContent = '';
  let count = 0;

  for (const filename of chapterFiles) {
    const filePath = path.join(chaptersDir, filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      combinedContent += `\n<!-- === ${filename} === -->\n` + content.trim() + '\n';
      count++;
    } else {
      console.warn(`⚠️ Warning: Chapter file not found: ${filename}`);
    }
  }

  const finalHtml = template.replace('<!-- {{BOOK_CONTENT}} -->', combinedContent.trim());
  fs.writeFileSync(outputPath, finalHtml, 'utf8');

  console.log(`✅ Success! Combined ${count} chapters into guide/index.html`);
}

buildGuide();
