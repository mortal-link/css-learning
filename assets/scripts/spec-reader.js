/**
 * CSS 规范阅读器交互脚本
 */

(function() {
  'use strict';

  // 平滑滚动到锚点
  document.querySelectorAll('.toc a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // 更新 URL
        history.pushState(null, '', '#' + targetId);
      }
    });
  });

  // 高亮当前章节
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('.spec-section');
    const tocLinks = document.querySelectorAll('.toc a');
    
    let currentSection = null;
    const scrollTop = window.scrollY + 100;
    
    sections.forEach(section => {
      if (section.offsetTop <= scrollTop) {
        currentSection = section;
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (currentSection && link.getAttribute('href') === '#' + currentSection.id) {
        link.classList.add('active');
      }
    });
  }
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .toc a.active {
      background: var(--color-primary);
      color: white !important;
    }
  `;
  document.head.appendChild(style);
  
  // 监听滚动
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        highlightCurrentSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // 初始高亮
  highlightCurrentSection();

  // 展开/收起批注
  document.querySelectorAll('.annotation-block summary').forEach(summary => {
    summary.addEventListener('click', (e) => {
      // 让 <details> 的默认行为处理
    });
  });

  // 复制代码按钮
  document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = '复制';
    button.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 8px;
      font-size: 12px;
      background: rgba(255,255,255,0.1);
      border: none;
      border-radius: 4px;
      color: #94a3b8;
      cursor: pointer;
    `;
    
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    button.addEventListener('click', () => {
      const code = pre.querySelector('code') || pre;
      navigator.clipboard.writeText(code.textContent.replace('复制', '').trim());
      button.textContent = '已复制!';
      setTimeout(() => button.textContent = '复制', 2000);
    });
  });

  console.log('Spec reader initialized');
})();
