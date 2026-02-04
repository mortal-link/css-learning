/**
 * 批量下载所有 CSS 规范
 * 
 * 使用方法：
 *   node scripts/fetch-all-specs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 规范 URL 映射（与 fetch-spec.js 保持同步）
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
      
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
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
  
  // 匹配章节标题 (h2-h4 带 id)
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
  
  if (!fs.existsSync(specsDir)) {
    fs.mkdirSync(specsDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(specsDir, `${specName}.html`), html);
  fs.writeFileSync(path.join(specsDir, `${specName}.json`), JSON.stringify(parsed, null, 2));
}

/**
 * 下载单个规范
 */
async function downloadSpec(specName, url) {
  const specsDir = path.join(__dirname, '..', 'specs');
  const htmlPath = path.join(specsDir, `${specName}.html`);
  
  // 检查是否已下载
  if (fs.existsSync(htmlPath)) {
    const stats = fs.statSync(htmlPath);
    const size = (stats.size / 1024).toFixed(1);
    return { specName, status: 'skipped', size: `${size} KB`, message: '已存在' };
  }
  
  try {
    const html = await fetchUrl(url);
    const parsed = parseSpec(html, specName);
    saveSpec(specName, html, parsed);
    
    const size = (html.length / 1024).toFixed(1);
    return { 
      specName, 
      status: 'downloaded', 
      size: `${size} KB`,
      title: parsed.title,
      sections: parsed.sections.length
    };
  } catch (err) {
    return { specName, status: 'error', message: err.message };
  }
}

/**
 * 延迟函数
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 主函数
 */
async function main() {
  const specNames = Object.keys(SPEC_URLS);
  console.log(`准备下载 ${specNames.length} 个 CSS 规范...\n`);
  
  const results = {
    downloaded: [],
    skipped: [],
    errors: []
  };
  
  for (let i = 0; i < specNames.length; i++) {
    const specName = specNames[i];
    const url = SPEC_URLS[specName];
    
    process.stdout.write(`[${i + 1}/${specNames.length}] ${specName}... `);
    
    const result = await downloadSpec(specName, url);
    
    if (result.status === 'downloaded') {
      console.log(`✓ ${result.size} (${result.sections} 章节)`);
      results.downloaded.push(result);
    } else if (result.status === 'skipped') {
      console.log(`⊘ ${result.message} (${result.size})`);
      results.skipped.push(result);
    } else {
      console.log(`✗ ${result.message}`);
      results.errors.push(result);
    }
    
    // 避免请求过快
    if (result.status === 'downloaded') {
      await delay(500);
    }
  }
  
  // 汇总
  console.log('\n========== 下载完成 ==========');
  console.log(`新下载: ${results.downloaded.length}`);
  console.log(`已跳过: ${results.skipped.length}`);
  console.log(`失败: ${results.errors.length}`);
  
  if (results.errors.length > 0) {
    console.log('\n失败列表:');
    results.errors.forEach(e => console.log(`  - ${e.specName}: ${e.message}`));
  }
  
  // 保存下载报告
  const report = {
    downloadedAt: new Date().toISOString(),
    total: specNames.length,
    downloaded: results.downloaded.length,
    skipped: results.skipped.length,
    errors: results.errors.length,
    specs: specNames.map(name => {
      const d = results.downloaded.find(r => r.specName === name);
      const s = results.skipped.find(r => r.specName === name);
      const e = results.errors.find(r => r.specName === name);
      
      if (d) return { name, status: 'ok', title: d.title, sections: d.sections };
      if (s) return { name, status: 'ok', message: 'previously downloaded' };
      if (e) return { name, status: 'error', message: e.message };
      return { name, status: 'unknown' };
    })
  };
  
  const reportPath = path.join(__dirname, '..', 'specs', 'download-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n报告已保存: specs/download-report.json`);
}

main();
