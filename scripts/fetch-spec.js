/**
 * CSS 规范获取和解析脚本
 * 
 * 使用方法：
 *   node scripts/fetch-spec.js css-cascade-4
 * 
 * 这会：
 * 1. 从 W3C 下载规范 HTML
 * 2. 解析出章节结构
 * 3. 保存到 specs/ 目录
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 规范 URL 映射
const SPEC_URLS = {
  // 阶段一：核心基础
  'css-cascade-4': 'https://www.w3.org/TR/css-cascade-4/',
  'css-cascade-5': 'https://www.w3.org/TR/css-cascade-5/',
  'css-box-3': 'https://www.w3.org/TR/css-box-3/',
  'css-box-4': 'https://www.w3.org/TR/css-box-4/',
  'css-display-3': 'https://www.w3.org/TR/css-display-3/',
  'css-display-4': 'https://www.w3.org/TR/css-display-4/',
  'css-values-3': 'https://www.w3.org/TR/css-values-3/',
  'css-values-4': 'https://www.w3.org/TR/css-values-4/',
  'selectors-3': 'https://www.w3.org/TR/selectors-3/',
  'selectors-4': 'https://www.w3.org/TR/selectors-4/',
  
  // 阶段二：布局系统
  'css-flexbox-1': 'https://www.w3.org/TR/css-flexbox-1/',
  'css-grid-1': 'https://www.w3.org/TR/css-grid-1/',
  'css-grid-2': 'https://www.w3.org/TR/css-grid-2/',
  'css-position-3': 'https://www.w3.org/TR/css-position-3/',
  'css-multicol-1': 'https://www.w3.org/TR/css-multicol-1/',
  'css-align-3': 'https://www.w3.org/TR/css-align-3/',
  
  // 阶段三：视觉样式
  'css-color-4': 'https://www.w3.org/TR/css-color-4/',
  'css-color-5': 'https://www.w3.org/TR/css-color-5/',
  'css-backgrounds-3': 'https://www.w3.org/TR/css-backgrounds-3/',
  'css-images-3': 'https://www.w3.org/TR/css-images-3/',
  'css-fonts-4': 'https://www.w3.org/TR/css-fonts-4/',
  'css-text-3': 'https://www.w3.org/TR/css-text-3/',
  'css-text-decor-3': 'https://www.w3.org/TR/css-text-decor-3/',
  
  // 阶段四：动画与变换
  'css-transforms-1': 'https://www.w3.org/TR/css-transforms-1/',
  'css-transforms-2': 'https://www.w3.org/TR/css-transforms-2/',
  'css-transitions-1': 'https://www.w3.org/TR/css-transitions-1/',
  'css-animations-1': 'https://www.w3.org/TR/css-animations-1/',
  'css-easing-1': 'https://www.w3.org/TR/css-easing-1/',
  
  // 阶段五：高级特性
  'css-variables-1': 'https://www.w3.org/TR/css-variables-1/',
  'css-contain-2': 'https://www.w3.org/TR/css-contain-2/',
  'css-writing-modes-4': 'https://www.w3.org/TR/css-writing-modes-4/',
  'css-logical-1': 'https://www.w3.org/TR/css-logical-1/',
};

/**
 * 获取 URL 内容
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // 处理重定向
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
 * 简单的 HTML 解析 - 提取章节
 */
function parseSpec(html, specName) {
  const sections = [];
  
  // 提取标题
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : specName;
  
  // 提取主要内容区域
  // W3C 规范通常在 <body> 中，主要章节用 <section> 或 <h2>/<h3> 标记
  
  // 匹配章节标题 (h2-h4 带 id)
  const sectionRegex = /<h([2-4])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  
  while ((match = sectionRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    // 清理标题文本
    let heading = match[3]
      .replace(/<[^>]+>/g, '') // 移除 HTML 标签
      .replace(/\s+/g, ' ')    // 合并空白
      .trim();
    
    sections.push({
      level,
      id,
      heading,
    });
  }
  
  return {
    title,
    specName,
    sections,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * 保存规范
 */
function saveSpec(specName, html, parsed) {
  const specsDir = path.join(__dirname, '..', 'specs');
  
  // 确保目录存在
  if (!fs.existsSync(specsDir)) {
    fs.mkdirSync(specsDir, { recursive: true });
  }
  
  // 保存原始 HTML
  fs.writeFileSync(
    path.join(specsDir, `${specName}.html`),
    html
  );
  
  // 保存解析结果
  fs.writeFileSync(
    path.join(specsDir, `${specName}.json`),
    JSON.stringify(parsed, null, 2)
  );
  
  console.log(`✓ 已保存: specs/${specName}.html`);
  console.log(`✓ 已保存: specs/${specName}.json`);
  console.log(`  - 标题: ${parsed.title}`);
  console.log(`  - 章节数: ${parsed.sections.length}`);
}

/**
 * 主函数
 */
async function main() {
  const specName = process.argv[2];
  
  if (!specName) {
    console.log('用法: node scripts/fetch-spec.js <spec-name>');
    console.log('\n可用的规范:');
    Object.keys(SPEC_URLS).forEach(name => {
      console.log(`  - ${name}`);
    });
    process.exit(1);
  }
  
  const url = SPEC_URLS[specName];
  if (!url) {
    console.error(`未知规范: ${specName}`);
    console.log('\n可用的规范:');
    Object.keys(SPEC_URLS).forEach(name => {
      console.log(`  - ${name}`);
    });
    process.exit(1);
  }
  
  console.log(`正在获取: ${url}`);
  
  try {
    const html = await fetchUrl(url);
    console.log(`✓ 已下载 (${(html.length / 1024).toFixed(1)} KB)`);
    
    const parsed = parseSpec(html, specName);
    saveSpec(specName, html, parsed);
    
    console.log('\n章节列表:');
    parsed.sections.slice(0, 15).forEach(s => {
      const indent = '  '.repeat(s.level - 2);
      console.log(`${indent}${s.id}: ${s.heading}`);
    });
    if (parsed.sections.length > 15) {
      console.log(`  ... 还有 ${parsed.sections.length - 15} 个章节`);
    }
    
  } catch (err) {
    console.error('错误:', err.message);
    process.exit(1);
  }
}

main();
