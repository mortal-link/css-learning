/**
 * 模块页面生成器
 * 
 * 根据规范 JSON 生成带批注功能的学习页面
 * 
 * 使用方法：
 *   node scripts/generate-module.js css-cascade-4 01-cascade
 */

const fs = require('fs');
const path = require('path');

/**
 * 生成模块页面 HTML
 */
function generateModulePage(specData, moduleName, moduleTitle) {
  const sections = specData.sections || [];
  
  // 生成章节导航
  const tocHtml = sections
    .filter(s => s.level <= 3)
    .map(s => {
      const indent = s.level === 2 ? '' : '  ';
      return `${indent}<li><a href="#${s.id}">${s.heading}</a></li>`;
    })
    .join('\n          ');
  
  // 生成章节内容占位符
  const sectionsHtml = sections
    .filter(s => s.level === 2)
    .map(s => `
      <section class="spec-section" id="${s.id}">
        <h2>
          <a href="${specData.specName ? `https://www.w3.org/TR/${specData.specName}/#${s.id}` : '#'}" 
             target="_blank" class="spec-link-icon" title="查看规范原文">§</a>
          ${s.heading}
        </h2>
        
        <div class="spec-content">
          <p class="todo-placeholder">（内容待补充 - 从规范中提取）</p>
        </div>
        
        <div class="annotations">
          <details class="annotation-block">
            <summary>💡 批注</summary>
            <div class="annotation-content">
              <p>（在此添加中文解释和注意点）</p>
            </div>
          </details>
          
          <details class="annotation-block">
            <summary>🔬 示例</summary>
            <div class="demo-container">
              <p>（在此添加交互式示例）</p>
            </div>
          </details>
        </div>
      </section>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${moduleTitle} - CSS 规范学习</title>
  <link rel="stylesheet" href="../../assets/styles/main.css">
  <link rel="stylesheet" href="../../assets/styles/spec-reader.css">
</head>
<body>
  <nav class="sidebar">
    <div class="sidebar-header">
      <a href="../../index.html" class="back-link">← 返回</a>
      <h2>${moduleTitle}</h2>
      <p class="spec-name">
        <a href="https://www.w3.org/TR/${specData.specName}/" target="_blank">${specData.specName}</a>
      </p>
    </div>
    
    <div class="toc">
      <h3>目录</h3>
      <ul>
        ${tocHtml}
      </ul>
    </div>
  </nav>
  
  <main class="content">
    <header class="module-header">
      <h1>${specData.title || moduleTitle}</h1>
      <p class="meta">
        规范来源：<a href="https://www.w3.org/TR/${specData.specName}/" target="_blank">${specData.specName}</a>
        | 获取时间：${specData.fetchedAt ? new Date(specData.fetchedAt).toLocaleDateString('zh-CN') : '未知'}
      </p>
    </header>

    <section class="intro">
      <h2>概述</h2>
      <div class="annotations">
        <div class="annotation-block open">
          <div class="annotation-content">
            <p>（在此添加模块概述和学习要点）</p>
          </div>
        </div>
      </div>
    </section>
    
    ${sectionsHtml}
    
    <section class="notes">
      <h2>学习笔记</h2>
      <div class="annotations">
        <div class="annotation-block open">
          <div class="annotation-content">
            <p>（在此记录学习心得和疑问）</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  
  <script src="../../assets/scripts/spec-reader.js"></script>
</body>
</html>`;
}

/**
 * 主函数
 */
function main() {
  const [specName, moduleName] = process.argv.slice(2);
  
  if (!specName || !moduleName) {
    console.log('用法: node scripts/generate-module.js <spec-name> <module-name>');
    console.log('示例: node scripts/generate-module.js css-cascade-4 01-cascade');
    process.exit(1);
  }
  
  // 读取规范 JSON
  const specPath = path.join(__dirname, '..', 'specs', `${specName}.json`);
  if (!fs.existsSync(specPath)) {
    console.error(`规范文件不存在: ${specPath}`);
    console.log('请先运行: node scripts/fetch-spec.js ' + specName);
    process.exit(1);
  }
  
  const specData = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  
  // 生成模块目录
  const moduleDir = path.join(__dirname, '..', 'modules', moduleName);
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }
  
  // 生成页面
  const moduleTitle = specData.title || specName;
  const html = generateModulePage(specData, moduleName, moduleTitle);
  
  const outputPath = path.join(moduleDir, 'index.html');
  fs.writeFileSync(outputPath, html);
  
  console.log(`✓ 已生成: modules/${moduleName}/index.html`);
  console.log(`  - 章节数: ${specData.sections.length}`);
}

main();
