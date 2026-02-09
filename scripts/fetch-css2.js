/**
 * CSS 2.2 规范下载脚本
 *
 * CSS2.2 是多页规范，每章一个独立 HTML 文件。
 *
 * 使用方法：
 *   node scripts/fetch-css2.js          # 下载所有章节
 *   node scripts/fetch-css2.js 6        # 只下载第 6 章
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.w3.org/TR/CSS22/';

// CSS2.2 章节编号 → 文件名映射
const CSS2_PAGES = {
  1: 'about.html',
  2: 'intro.html',
  3: 'conform.html',
  4: 'syndata.html',
  5: 'selector.html',
  6: 'cascade.html',
  7: 'media.html',
  8: 'box.html',
  9: 'visuren.html',
  10: 'visudet.html',
  11: 'visufx.html',
  12: 'generate.html',
  14: 'colors.html',
  15: 'fonts.html',
  16: 'text.html',
};

/**
 * 获取 URL 内容
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * 解析章节标题
 */
function parseSpec(html, specName) {
  const sections = [];
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : specName;

  // CSS2 使用 <h2>/<h3>/<h4> 带 id 属性
  const sectionRegex = /<h([2-4])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;

  while ((match = sectionRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    let heading = match[3]
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    sections.push({ level, id, heading });
  }

  return { title, specName, sections, fetchedAt: new Date().toISOString() };
}

/**
 * 保存规范文件
 */
function saveSpec(specName, html, parsed) {
  const specsDir = path.join(__dirname, '..', 'specs');
  if (!fs.existsSync(specsDir)) {
    fs.mkdirSync(specsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(specsDir, `${specName}.html`), html);
  fs.writeFileSync(path.join(specsDir, `${specName}.json`), JSON.stringify(parsed, null, 2));

  console.log(`  ✓ ${specName}.html (${(html.length / 1024).toFixed(1)} KB, ${parsed.sections.length} 个章节)`);
}

/**
 * 延时工具
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const targetChapter = process.argv[2] ? parseInt(process.argv[2]) : null;
  const chapters = targetChapter
    ? { [targetChapter]: CSS2_PAGES[targetChapter] }
    : CSS2_PAGES;

  if (targetChapter && !CSS2_PAGES[targetChapter]) {
    console.error(`未知章节: ${targetChapter}`);
    console.log('可用章节:', Object.keys(CSS2_PAGES).join(', '));
    process.exit(1);
  }

  console.log(`\n📖 CSS 2.2 规范下载`);
  console.log(`来源: ${BASE_URL}`);
  console.log(`章节数: ${Object.keys(chapters).length}\n`);

  let success = 0;
  let failed = 0;

  for (const [chNum, filename] of Object.entries(chapters)) {
    const specName = `css22-ch${chNum}`;
    const url = `${BASE_URL}${filename}`;

    try {
      console.log(`下载 Ch ${chNum}: ${filename}`);
      const html = await fetchUrl(url);
      const parsed = parseSpec(html, specName);
      saveSpec(specName, html, parsed);
      success++;
    } catch (err) {
      console.error(`  ✗ Ch ${chNum} 失败: ${err.message}`);
      failed++;
    }

    // 请求间隔
    await sleep(500);
  }

  console.log(`\n完成: ${success} 成功, ${failed} 失败`);
}

main();
