/**
 * CSS 2.2 规范内容提取脚本
 *
 * CSS2.2 的 HTML 结构与 CSS3 规范不同：
 * - 没有 <section> 标签，用 <div> 和 h2/h3 划分
 * - 章节标题通常在 <h2>/<h3>/<h4> 标签中
 *
 * 使用方法：
 *   node scripts/extract-css2.js          # 提取所有已下载的 CSS2 章节
 *   node scripts/extract-css2.js 6        # 只提取第 6 章
 */

const fs = require('fs');
const path = require('path');

/**
 * HTML 清理（复用 extract-content.js 的逻辑）
 */
function cleanHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<code>([^<]*)<\/code>/gi, '`$1`')
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '\n```\n$1\n```\n')
    .replace(/<dfn[^>]*>([^<]*)<\/dfn>/gi, '**$1**')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&times;/g, '\u00D7')
    .replace(/&rarr;/g, '\u2192')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/**
 * CSS2.2 的章节提取
 *
 * CSS2.2 每个页面就是一个章节，内部用 h2/h3 分小节。
 * 我们按 h2/h3 切分成子章节。
 */
function extractSections(html) {
  const sections = {};

  // 方法 1：尝试 <div> 带 id 的块（CSS2.2 常用模式）
  // CSS2.2 的子章节通常是 <h3 id="xxx"> 或 <h2 id="xxx">

  // 先尝试提取 body 内容区域（跳过头部导航）
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;

  // CSS2.2 使用 <h2>...<a name="xxx">...</a>...</h2> 而非 <h2 id="xxx">
  // 匹配 h2/h3 标签，从中提取 <a name="..."> 作为 ID
  const headingRegex = /<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(body)) !== null) {
    const level = parseInt(match[1]);
    const innerHtml = match[2];

    // 提取 <a name="xxx"> 作为 ID（CSS2.2 的锚点格式）
    const nameMatch = innerHtml.match(/<a\s+name="([^"]+)"/i);
    // 也尝试 id 属性
    const idMatch = match[0].match(/<h[23][^>]*\s+id="([^"]+)"/i);
    const id = nameMatch ? nameMatch[1] : (idMatch ? idMatch[1] : null);

    if (!id) continue;

    const heading = innerHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    headings.push({
      level,
      id,
      heading,
      index: match.index,
      endIndex: match.index + match[0].length,
    });
  }

  // 提取每个小节的内容
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const nextIndex = i + 1 < headings.length ? headings[i + 1].index : body.length;
    const content = body.slice(h.endIndex, nextIndex);
    const cleanContent = cleanHtml(content);

    if (cleanContent.length > 20) {
      sections[h.id] = {
        id: h.id,
        heading: h.heading,
        content: cleanContent,
        rawLength: content.length,
      };
    }
  }

  return sections;
}

/**
 * 过滤非核心章节
 */
function filterCoreSections(sections) {
  const skipPatterns = [
    'abstract', 'status', 'contents', 'toc',
    'acknowledgments', 'acknowledgements',
    'w3c-conformance', 'w3c-conventions',
    'index', 'references', 'normative', 'informative',
    'property-index', 'minitoc',
  ];

  const core = {};
  for (const [id, section] of Object.entries(sections)) {
    if (skipPatterns.some(p => id.toLowerCase().includes(p))) continue;
    if (id.startsWith('biblio-')) continue;
    core[id] = section;
  }
  return core;
}

function extractChapter(chNum) {
  const specsDir = path.join(__dirname, '..', 'specs');
  const specName = `css22-ch${chNum}`;
  const htmlPath = path.join(specsDir, `${specName}.html`);

  if (!fs.existsSync(htmlPath)) {
    console.log(`  ⚠ ${specName}.html 不存在，跳过`);
    return false;
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const allSections = extractSections(html);
  const coreSections = filterCoreSections(allSections);

  const outputPath = path.join(specsDir, `${specName}-content.json`);
  fs.writeFileSync(outputPath, JSON.stringify({
    specName,
    extractedAt: new Date().toISOString(),
    totalSections: Object.keys(allSections).length,
    coreSections: Object.keys(coreSections).length,
    sections: coreSections,
  }, null, 2));

  console.log(`  ✓ ${specName}: ${Object.keys(allSections).length} 个章节 → ${Object.keys(coreSections).length} 个核心章节`);
  return true;
}

function main() {
  const targetChapter = process.argv[2] ? parseInt(process.argv[2]) : null;
  const allChapters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16];
  const chapters = targetChapter ? [targetChapter] : allChapters;

  console.log('\n📖 CSS 2.2 内容提取');
  console.log(`章节数: ${chapters.length}\n`);

  let success = 0;
  for (const ch of chapters) {
    if (extractChapter(ch)) success++;
  }

  console.log(`\n完成: ${success}/${chapters.length} 成功`);
}

main();
