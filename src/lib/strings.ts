import type { LocaleText } from './i18n';

function text(zh: string, en: string): LocaleText {
  return { zh, en };
}

/** UI 字符串常量（按页面/组件分组） */
export const UI = {
  // ── Layout / Header ──
  appName: text('CSS Quest', 'CSS Quest'),
  w3cSpec: text('W3C 规范', 'W3C Specs'),

  // ── 首页 ──
  heroBadge: text('基于 W3C 官方规范', 'Based on W3C Official Specs'),
  heroTitle1: text('系统化学习 CSS', 'Learn CSS Systematically'),
  heroTitle2: text('理解原理，而非死记规则', 'Understand principles, not memorize rules'),
  heroDescription: text(
    'CSS 规则太多记不住？那是因为只记住了「是什么」，却没理解「为什么」。这个项目直接从 W3C 官方规范入手，帮你建立完整的 CSS 知识体系。',
    'Too many CSS rules to remember? That\'s because you only memorized "what" without understanding "why". This project starts from W3C specs to build a complete CSS knowledge system.'
  ),
  startLearning: text('开始学习', 'Start Learning'),
  specDocs: text('规范文档', 'Spec Documents'),
  learningChapters: text('学习章节', 'Chapters'),
  learningStages: text('学习阶段', 'Stages'),
  learningPath: text('学习路线', 'Learning Path'),
  learningPathDesc: text(
    '以 CSS2 章节结构为骨架，从语法基础到现代特性，环环相扣',
    'Based on CSS2 chapter structure, from syntax basics to modern features'
  ),
  stagePrefix: text('阶段', 'Stage'),
  comingSoon: text('即将推出', 'Coming Soon'),
  current: text('当前', 'Current'),
  completed: text('已完成', 'Completed'),
  readyToStart: text('准备好开始了吗？', 'Ready to start?'),
  ctaDescription: text(
    '从 CSS 概论开始，理解 CSS 的设计理念与处理模型',
    'Start from CSS Introduction, understand CSS design principles and processing model'
  ),
  startChapter1: text('开始第一章', 'Start Chapter 1'),
  footerText: text('基于 W3C CSS 规范 · 持续更新中', 'Based on W3C CSS Specs · Continuously updated'),

  // ── 章节页 ──
  back: text('返回', 'Back'),
  currentlyLearning: text('当前学习', 'Currently Learning'),
  toc: text('目录', 'Table of Contents'),
  viewCss3Spec: text('CSS3 规范', 'CSS3 Spec'),
  viewCss2Spec: text('CSS2 原文', 'CSS2 Original'),
  contentDeveloping: text('内容开发中', 'Content under development'),
  contentDevDescription: text(
    '该章节的学习内容正在编写中。请先从已解锁的章节开始学习。',
    'This chapter is under development. Start with unlocked chapters first.'
  ),
  goToCascade: text(
    '前往 Chapter 04: Cascading & Inheritance',
    'Go to Chapter 04: Cascading & Inheritance'
  ),
  keyPointsSummary: text('要点总结', 'Key Points'),
  css2Original: text('CSS2 原文', 'CSS2 Original Text'),
  css3SpecText: text('CSS3 规范原文', 'CSS3 Spec Text'),
  interactiveDemo: text('交互示例', 'Interactive Demo'),
  specTabCss2: text('CSS2 原文', 'CSS2 Original'),
  specTabCss3: text('CSS3 规范', 'CSS3 Spec'),
  isLastChapter: text('已是最后一章', 'This is the last chapter'),
  css2SectionsTitle: text('CSS2 规范原文', 'CSS2 Specification Text'),
  css2SectionsDesc: text(
    '以下内容来自 CSS2.2 规范原文。人工整理的学习内容正在编写中。',
    'The following content is from the CSS2.2 specification. Curated learning content is under development.'
  ),

  // ── 主题 ──
  selectThemeColor: text('选择主题颜色', 'Select theme color'),
  toggleTheme: text('切换主题', 'Toggle theme'),
  colorDefault: text('默认', 'Default'),
  colorForest: text('森林', 'Forest'),
  colorOcean: text('海洋', 'Ocean'),
  colorSunset: text('日落', 'Sunset'),

  // ── 侧边栏 ──
  home: text('首页', 'Home'),
  openNav: text('打开导航', 'Open navigation'),

  // ── Demo ──
  demoInProgress: text('交互示例开发中...', 'Interactive demo under development...'),
} as const;
