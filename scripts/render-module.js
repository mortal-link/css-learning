/**
 * 将提取的规范内容渲染到模块页面
 * 
 * 使用方法：
 *   node scripts/render-module.js css-cascade-4 01-cascade
 */

const fs = require('fs');
const path = require('path');

/**
 * 将 Markdown 风格的内容转换为 HTML
 */
function markdownToHtml(text) {
  return text
    // 代码块
    .replace(/```\n([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>')
    // 粗体
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    // 段落
    .replace(/\n\n+/g, '</p>\n<p>')
    // 列表项
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // 清理
    .replace(/\r/g, '')
    .trim();
}

/**
 * 生成章节 HTML
 */
function renderSection(section, specName) {
  const content = markdownToHtml(section.content);
  const specUrl = `https://www.w3.org/TR/${specName}/#${section.id}`;
  
  return `
    <section class="spec-section" id="${section.id}">
      <h2>
        <a href="${specUrl}" target="_blank" class="spec-link-icon" title="查看规范原文">§</a>
        ${section.heading}
      </h2>
      
      <div class="spec-content">
        <p>${content}</p>
      </div>
      
      <div class="annotations">
        <details class="annotation-block">
          <summary>💡 中文批注</summary>
          <div class="annotation-content">
            <p class="todo-placeholder">（在此添加中文解释和要点）</p>
          </div>
        </details>
        
        <details class="annotation-block">
          <summary>🔬 交互示例</summary>
          <div class="demo-container">
            <p class="todo-placeholder">（在此添加交互式示例）</p>
          </div>
        </details>
      </div>
    </section>`;
}

/**
 * 生成完整页面
 */
function renderPage(specData, contentData, moduleName) {
  const sections = Object.values(contentData.sections);
  
  // 生成目录
  const tocHtml = sections
    .map(s => `<li><a href="#${s.id}">${s.heading}</a></li>`)
    .join('\n          ');
  
  // 生成章节内容
  const sectionsHtml = sections
    .map(s => renderSection(s, specData.specName))
    .join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${specData.title} - CSS 规范学习</title>
  <link rel="stylesheet" href="../../assets/styles/main.css">
  <link rel="stylesheet" href="../../assets/styles/spec-reader.css">
</head>
<body>
  <nav class="sidebar">
    <div class="sidebar-header">
      <a href="../../index.html" class="back-link">← 返回首页</a>
      <h2>CSS Cascade</h2>
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
      <h1>${specData.title}</h1>
      <p class="meta">
        规范来源：<a href="https://www.w3.org/TR/${specData.specName}/" target="_blank">${specData.specName}</a>
        | 提取时间：${new Date(contentData.extractedAt).toLocaleDateString('zh-CN')}
      </p>
    </header>

    <section class="intro" id="overview">
      <h2>模块概述</h2>
      <div class="spec-quote">
        <p>This CSS module describes how to collate style rules and assign values to all properties on all elements. By way of cascading and inheritance, values are propagated for all properties on all elements.</p>
        <p class="spec-quote-source">— CSS Cascading and Inheritance Level 4, Abstract</p>
      </div>
      
      <div class="annotations">
        <div class="annotation-block open">
          <div class="annotation-content">
            <h4>为什么从这里开始？</h4>
            <p>CSS 的 "C" 就是 <strong>Cascading（层叠）</strong>。理解层叠和继承机制是掌握 CSS 的关键：</p>
            <ul>
              <li><strong>层叠</strong>：当多条规则作用于同一元素时，如何决定最终值</li>
              <li><strong>继承</strong>：某些属性如何从父元素传递到子元素</li>
              <li><strong>默认值</strong>：当没有规则匹配时，如何确定属性值</li>
            </ul>
            <p>掌握这些原理后，你会发现 CSS 的各种规则都是这些基础概念的应用。</p>
          </div>
        </div>
      </div>
    </section>
    
    ${sectionsHtml}
    
    <section class="notes" id="learning-notes">
      <h2>学习笔记</h2>
      <div class="annotations">
        <div class="annotation-block open">
          <div class="annotation-content">
            <p class="todo-placeholder">（在此记录学习心得和疑问）</p>
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
    console.log('用法: node scripts/render-module.js <spec-name> <module-name>');
    process.exit(1);
  }
  
  // 读取规范元数据
  const specPath = path.join(__dirname, '..', 'specs', `${specName}.json`);
  if (!fs.existsSync(specPath)) {
    console.error(`规范文件不存在: ${specPath}`);
    process.exit(1);
  }
  const specData = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  
  // 读取提取的内容
  const contentPath = path.join(__dirname, '..', 'specs', `${specName}-content.json`);
  if (!fs.existsSync(contentPath)) {
    console.error(`内容文件不存在: ${contentPath}`);
    console.log('请先运行: node scripts/extract-content.js ' + specName);
    process.exit(1);
  }
  const contentData = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  
  // 生成页面
  const html = renderPage(specData, contentData, moduleName);
  
  // 保存
  const moduleDir = path.join(__dirname, '..', 'modules', moduleName);
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }
  
  const outputPath = path.join(moduleDir, 'index.html');
  fs.writeFileSync(outputPath, html);
  
  console.log(`✓ 已渲染: modules/${moduleName}/index.html`);
  console.log(`  - 章节数: ${Object.keys(contentData.sections).length}`);
}

main();
