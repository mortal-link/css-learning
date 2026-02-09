/**
 * 从规范 HTML 中提取章节内容
 * 
 * 使用方法：
 *   node scripts/extract-content.js css-cascade-4
 */

const fs = require('fs');
const path = require('path');

/**
 * 简单的 HTML 清理
 */
function cleanHtml(html) {
  return html
    // 移除脚本和样式
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // 保留重要标签，简化其他
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    // 保留代码
    .replace(/<code>([^<]*)<\/code>/gi, '`$1`')
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '\n```\n$1\n```\n')
    // 定义术语
    .replace(/<dfn[^>]*>([^<]*)<\/dfn>/gi, '**$1**')
    // 列表
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    // 段落
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')
    // 移除其他标签
    .replace(/<[^>]+>/g, '')
    // 清理 HTML 实体
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
    // 清理多余空白
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/**
 * 提取章节内容
 */
function extractSections(html) {
  const sections = {};
  
  // 匹配 section 标签或 h2-h4 标签划分的内容
  // W3C 规范通常用 <section id="xxx"> 或直接用 heading 划分
  
  // 方法1：尝试匹配 <section> 标签
  const sectionRegex = /<section[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  
  while ((match = sectionRegex.exec(html)) !== null) {
    const id = match[1];
    const content = match[2];
    
    // 提取标题
    const headingMatch = content.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/i);
    const heading = headingMatch 
      ? headingMatch[1].replace(/<[^>]+>/g, '').trim()
      : id;
    
    // 清理内容
    const cleanContent = cleanHtml(content);
    
    sections[id] = {
      id,
      heading,
      content: cleanContent,
      rawLength: content.length,
    };
  }
  
  // 如果没有 section 标签，尝试用 heading 划分
  if (Object.keys(sections).length === 0) {
    // 匹配从一个 h2 到下一个 h2 之间的内容
    const h2Regex = /<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2|$)/gi;
    
    while ((match = h2Regex.exec(html)) !== null) {
      const id = match[1];
      const heading = match[2].replace(/<[^>]+>/g, '').trim();
      const content = match[3];
      
      sections[id] = {
        id,
        heading,
        content: cleanHtml(content),
        rawLength: content.length,
      };
    }
  }
  
  return sections;
}

/**
 * 提取核心章节（排除索引、参考文献等）
 */
function filterCoreSections(sections) {
  const skipIds = [
    'abstract', 'status', 'contents', 'toc',
    'acknowledgments', 'priv-sec',
    'w3c-conformance', 'w3c-conventions', 'w3c-conformance-classes',
    'w3c-partial', 'w3c-conform-future-proofing', 'w3c-testing', 'w3c-cr-exit-criteria',
    'index', 'index-defined-here', 'index-defined-elsewhere',
    'references', 'normative', 'informative',
    'property-index', 'changes',
  ];
  
  const core = {};
  for (const [id, section] of Object.entries(sections)) {
    // 跳过以上 ID 以及以 changes- 开头的
    if (skipIds.includes(id) || id.startsWith('changes-') || id.startsWith('biblio-')) {
      continue;
    }
    core[id] = section;
  }
  return core;
}

/**
 * 主函数
 */
function main() {
  const specName = process.argv[2];
  
  if (!specName) {
    console.log('用法: node scripts/extract-content.js <spec-name>');
    process.exit(1);
  }
  
  const htmlPath = path.join(__dirname, '..', 'specs', `${specName}.html`);
  if (!fs.existsSync(htmlPath)) {
    console.error(`规范文件不存在: ${htmlPath}`);
    process.exit(1);
  }
  
  console.log(`正在解析: ${specName}`);
  
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const allSections = extractSections(html);
  const coreSections = filterCoreSections(allSections);
  
  console.log(`提取了 ${Object.keys(allSections).length} 个章节`);
  console.log(`核心章节: ${Object.keys(coreSections).length} 个`);
  
  // 保存结果
  const outputPath = path.join(__dirname, '..', 'specs', `${specName}-content.json`);
  fs.writeFileSync(outputPath, JSON.stringify({
    specName,
    extractedAt: new Date().toISOString(),
    totalSections: Object.keys(allSections).length,
    coreSections: Object.keys(coreSections).length,
    sections: coreSections,
  }, null, 2));
  
  console.log(`✓ 已保存: specs/${specName}-content.json`);
  
  // 打印核心章节列表
  console.log('\n核心章节:');
  Object.values(coreSections).forEach(s => {
    const preview = s.content.slice(0, 80).replace(/\n/g, ' ');
    console.log(`  ${s.id}: ${s.heading}`);
    console.log(`    ${preview}...`);
  });
}

main();
