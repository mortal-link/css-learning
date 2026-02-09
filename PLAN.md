# CSS 规范系统学习计划

> **项目目标**：基于 W3C CSS 官方规范，以 CSS2 章节结构为骨架、CSS3/4 模块为补充，系统化学习 CSS 原理，通过交互式示例巩固理解，最终沉淀为一个 CSS 知识库网站。
>
> **核心思路**：CSS2 是一个完整的单一规范，有清晰的章节依赖链（语法 → 选择器 → 层叠 → 盒模型 → 布局 → 视觉效果 → 排版）。以 CSS2 的 18 章作为学习骨架，将 CSS3 模块映射上去，每章先学 CSS2 基础，再补充 CSS3/4 扩展。
>
> **使用说明**：这是一个长期项目的参考计划。每次学习时，我们会选择一个具体的章节深入，并在下方记录过程中的发现、疑问和注意点。

---

## 核心资源

本计划基于 W3C 官方规范，主要参考：

| 资源 | 链接 | 说明 |
|------|------|------|
| CSS Snapshot 2025 | https://www.w3.org/TR/css-2025/ | CSS 官方定义，汇总所有稳定规范 |
| CSS Level 2 (CSS2) | https://www.w3.org/TR/CSS2/ | CSS2 完整规范，本项目的章节骨架 |
| CSS 规范完整列表 | https://www.w3.org/Style/CSS/specs | 所有模块的描述和链接 |
| Editor's Drafts | https://drafts.csswg.org/ | 最新的编辑草案 |
| GitHub | https://github.com/w3c/csswg-drafts | 规范源码，可下载 |

---

## 学习路线（以 CSS2 章节为骨架）

### 阶段一：语言基础

| 章节 | slug | CSS2 来源 | CSS3 规范 | 核心内容 |
|------|------|-----------|-----------|----------|
| Ch 01 | `intro` | Ch 1-3 | — | CSS 设计理念、处理模型、基本概念 |
| Ch 02 | `syntax` | Ch 4 | css-syntax-3, css-values-3/4 | 解析规则、属性值语法、单位系统 |
| Ch 03 | `selectors` | Ch 5 | selectors-3/4 | 选择器语法与匹配规则 |
| Ch 04 | `cascade` | Ch 6 | css-cascade-4/5, css-variables-1 | 层叠与继承、CSS 变量、@layer |

### 阶段二：盒子与布局

| 章节 | slug | CSS2 来源 | CSS3 规范 | 核心内容 |
|------|------|-----------|-----------|----------|
| Ch 05 | `media` | Ch 7 | mediaqueries-4/5 | 媒体查询、响应式设计 |
| Ch 06 | `box-model` | Ch 8 | css-box-3/4, css-logical-1 | 盒模型、逻辑属性 |
| Ch 07 | `visual-formatting` | Ch 9 | css-display-3, css-position-3, css-flexbox-1, css-grid-1/2, css-multicol-1 | 视觉格式化模型（BFC/IFC、定位、Flex、Grid、多列） |
| Ch 08 | `sizing` | Ch 10 | css-sizing-3/4, css-align-3 | 尺寸计算与对齐 |

### 阶段三：视觉表现

| 章节 | slug | CSS2 来源 | CSS3 规范 | 核心内容 |
|------|------|-----------|-----------|----------|
| Ch 09 | `visual-effects` | Ch 11 | css-overflow-3, css-masking-1 | 溢出、裁剪、遮罩 |
| Ch 10 | `generated-content` | Ch 12 | css-content-3, css-lists-3 | 伪元素、计数器、列表样式 |
| Ch 11 | `colors-backgrounds` | Ch 14 | css-color-4/5, css-backgrounds-3, css-images-3 | 颜色系统、背景、渐变 |

### 阶段四：排版

| 章节 | slug | CSS2 来源 | CSS3 规范 | 核心内容 |
|------|------|-----------|-----------|----------|
| Ch 12 | `fonts` | Ch 15 | css-fonts-4 | 字体选择与特性 |
| Ch 13 | `text` | Ch 16 | css-text-3, css-text-decor-3, css-writing-modes-4 | 文本处理、装饰、书写模式 |

### 阶段五：动态与前沿

| 章节 | slug | CSS2 来源 | CSS3 规范 | 核心内容 |
|------|------|-----------|-----------|----------|
| Ch 14 | `transforms` | — | css-transforms-1/2, css-transitions-1, css-animations-1, css-easing-1 | 变换、过渡、关键帧动画 |
| Ch 15 | `modern` | — | css-contain-2, css-nesting-1, css-scope-1 | 容器查询、嵌套、作用域 |

### 省略/合并说明

- CSS2 Ch 1-3（元信息）→ 合并为 Ch 01 `intro`
- CSS2 Ch 13（分页媒体）→ 省略（不适用于 Web 开发）
- CSS2 Ch 17（表格）→ 省略（遗留特性，可在 Ch 07 中提及）
- CSS2 Ch 18（用户界面）→ 省略（cursor/outline 等小特性，在相关章节中提及）
- CSS 变量 + @layer → 归入 `cascade`（Ch 04），因为它们本质上是层叠机制的扩展
- Transforms + Transitions + Animations → 合并为 Ch 14，三者紧密关联

---

## 章节进度追踪

| 章节 | 标题 | 状态 | 关联规范 | 章节内容 | Demo |
|------|------|------|----------|----------|------|
| Ch 01 | Introduction to CSS | ⚪ 未开始 | — | - | - |
| Ch 02 | Syntax, Values & Units | 🟢 内容完成 | css-syntax-3, css-values-3/4 | 10/10 | 3/3 |
| Ch 03 | Selectors | ⚪ 未开始 | selectors-3/4 | - | - |
| Ch 04 | Cascading & Inheritance | 🟢 内容完成 | css-cascade-4/5, css-variables-1 | 7/7 | 1/3 |
| Ch 05 | Media Queries | ⚪ 未开始 | mediaqueries-4/5 | - | - |
| Ch 06 | Box Model | 🟡 骨架完成 | css-box-3/4, css-logical-1 | 5/5 | 1/1 |
| Ch 07 | Visual Formatting Model | ⚪ 未开始 | css-display-3, css-position-3, css-flexbox-1, css-grid-1/2 | - | - |
| Ch 08 | Sizing & Alignment | ⚪ 未开始 | css-sizing-3/4, css-align-3 | - | - |
| Ch 09 | Visual Effects | ⚪ 未开始 | css-overflow-3, css-masking-1 | - | - |
| Ch 10 | Generated Content & Lists | ⚪ 未开始 | css-content-3, css-lists-3 | - | - |
| Ch 11 | Colors & Backgrounds | ⚪ 未开始 | css-color-4/5, css-backgrounds-3, css-images-3 | - | - |
| Ch 12 | Fonts | ⚪ 未开始 | css-fonts-4 | - | - |
| Ch 13 | Text & Writing Modes | ⚪ 未开始 | css-text-3, css-text-decor-3, css-writing-modes-4 | - | - |
| Ch 14 | Transforms & Animations | ⚪ 未开始 | css-transforms-1/2, css-transitions-1, css-animations-1, css-easing-1 | - | - |
| Ch 15 | Modern CSS | ⚪ 未开始 | css-contain-2, css-nesting-1, css-scope-1 | - | - |

状态说明：⚪ 未开始 → 🟡 骨架完成 → 🟢 内容完成 → ✅ 全部完成（含 demo）

---

## 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 框架 | Next.js 16 (App Router) | React 19, TypeScript |
| 样式 | Tailwind CSS v4 | oklch 色彩空间主题系统 |
| UI 组件 | shadcn/ui | Button, Card, Badge, Tabs, Accordion, Popover 等 |
| 主题 | 自研 ThemeProvider | 4 种配色 + 明/暗模式 + 系统跟随 |
| 包管理 | pnpm | - |
| 部署 | Vercel（计划） | 静态导出或 SSG |

---

## 项目结构

```
css/
├── PLAN.md                      # 本计划文件
├── package.json                 # Next.js 16 + pnpm
├── src/
│   ├── app/
│   │   ├── layout.tsx           # 根布局（共享 header + 侧边栏两栏布局 + ThemeProvider）
│   │   ├── page.tsx             # 首页：学习路线导航（5 阶段 15 章节）
│   │   ├── globals.css          # 主题系统（oklch 色彩空间，4 种配色）
│   │   └── modules/
│   │       └── [slug]/          # 动态路由
│   │           └── page.tsx     # 章节页面（CSS2 原文 + CSS3 规范 + 交互 Demo）
│   ├── components/
│   │   ├── ui/                  # shadcn/ui 组件（含 Sheet）
│   │   ├── demos/               # 交互式 demo 组件
│   │   │   ├── index.tsx        # Demo 注册表（moduleId → sectionId → Component）
│   │   │   ├── DemoSlot.tsx     # 客户端插槽（服务端页面中嵌入客户端 demo）
│   │   │   ├── SpecificityCalculator.tsx  # CSS 特异性计算器
│   │   │   ├── BoxModelVisualizer.tsx     # 盒模型可视化器
│   │   │   ├── CSSTokenizer.tsx           # CSS Token 流可视化（Monaco Editor）
│   │   │   ├── CSSValueParser.tsx         # CSS 值类型解析器
│   │   │   └── UnitConverter.tsx          # CSS 单位换算器
│   │   ├── SidebarNav.tsx       # 章节导航（客户端组件，桌面端固定侧边栏 + 移动端 Sheet）
│   │   ├── SidebarToggle.tsx    # 移动端 Sheet 侧边栏触发器
│   │   ├── TocSidebar.tsx       # 右侧 TOC 目录（客户端组件，IntersectionObserver scroll-spy）
│   │   ├── SpecContent.tsx      # 规范内容渲染器（解析引用、链接、代码块 → SpecLink）
│   │   ├── SpecLink.tsx         # 规范链接交互组件（Popover 术语卡/跨章节导航）
│   │   ├── theme-provider.tsx   # 主题管理
│   │   └── theme-toggle.tsx     # 主题切换
│   ├── data/
│   │   ├── modules.ts           # 章节元数据（15 章 + 5 阶段，首页和章节页共用）
│   │   ├── glossary.ts          # CSS 术语表（~35 条，Popover 定义卡片数据源）
│   │   └── css2-links.ts        # CSS2 文件→站内模块映射 + 参考文献 URL
│   └── lib/
│       ├── utils.ts             # Tailwind 工具函数
│       ├── specs.ts             # 规范数据读取工具
│       ├── i18n.ts              # i18n 基础（LocaleText 类型、t() 函数）
│       └── strings.ts           # UI 字符串常量（双语，按页面分组）
├── scripts/                     # 规范处理脚本
│   ├── fetch-spec.js            # 下载单个 CSS3 规范
│   ├── fetch-all-specs.js       # 批量下载所有 CSS3 规范
│   ├── extract-content.js       # 提取 CSS3 规范内容为 JSON
│   ├── fetch-css2.js            # 下载 CSS2.2 多页规范（15 章）
│   └── extract-css2.js          # 提取 CSS2.2 内容为 JSON
├── specs/                       # 已下载的规范（32 份 CSS3 + 15 份 CSS2.2）
│   ├── {spec-name}.html         # CSS3 原始规范 HTML
│   ├── {spec-name}.json         # 解析后的章节结构
│   ├── {spec-name}-content.json # 提取的核心内容
│   ├── css22-ch{N}.html         # CSS2.2 各章节 HTML
│   └── css22-ch{N}-content.json # CSS2.2 提取的核心内容
├── next.config.ts
├── tsconfig.json
├── components.json              # shadcn/ui 配置
└── postcss.config.mjs
```

---

## 内容管线

从 W3C 规范到网站页面的完整流程：

```
[W3C 网站]                        [脚本处理]                         [人工编写]                      [页面渲染]

specs/{name}.html  ──→  extract-content.js  ──→  specs/{name}-content.json  ──→  人工编写摘要、      ──→  Next.js
（已下载完成）           （提取核心章节）           （结构化内容）                    要点、术语表            [slug]/page.tsx
                                                                                 存入 data/modules.ts
```

### 当前状态
- 32 份 CSS3 规范 HTML 已全部下载
- 15 份 CSS2.2 章节 HTML 已下载并提取（185 个核心章节）
- `css-cascade-4-content.json`、`css-box-3-content.json` 等已提取，其余待提取
- 5 个交互 Demo 已完成（SpecificityCalculator、BoxModelVisualizer、CSSTokenizer、CSSValueParser、UnitConverter）
- 三栏文档布局：桌面端左侧章节导航 + 右侧 TOC（scroll-spy），移动端 Sheet 导航
- 规范内容渲染器 `SpecContent` 已实现（解析引用、链接、代码块），通过 `SpecLink` 组件支持 Popover 交互
- 规范原文展示改为 Tabs 平铺（CSS2/CSS3 双标签页），不再折叠在 Accordion 中
- 术语系统：`glossary.ts` 提供 ~35 条术语定义，粗体术语自动弹出 Popover 解释卡
- CSS2 链接映射：`css2-links.ts` 将相对路径映射到站内模块，支持跨章节导航
- i18n 架构已预留（`LocaleText` 双语类型 + `t()` 函数 + UI 字符串常量）
- **CSS2 原文 fallback**：无人工 sections 的章节自动展示 CSS2.2 原文子章节，侧边栏同步显示子章节目录

---

## 交互示例策略

每个章节规划 1-3 个交互 demo，帮助理解核心概念：

| Demo 组件 | 适用章节 | 功能 |
|-----------|----------|------|
| `SpecificityCalculator` | Ch 04 Cascade | 输入选择器，可视化计算优先级三元组 |
| `ValuePipeline` | Ch 04 Cascade | 展示 declared→cascaded→specified→computed→used→actual 流程 |
| `CascadeOriginDemo` | Ch 04 Cascade | 演示不同来源（UA/User/Author）的层叠效果 |
| `BoxModelVisualizer` | Ch 06 Box Model | 可调 margin/padding/border/content 的盒模型图 |
| `CSSTokenizer` | Ch 02 Syntax | Monaco Editor 输入 CSS → 实时展示 token 流（彩色 badge）|
| `CSSValueParser` | Ch 02 Syntax | 输入 CSS 值 → 解析类型 + CSS.supports() 验证 + 颜色预览 |
| `UnitConverter` | Ch 02 Syntax | 输入长度值 → 多单位换算 + 实时预览条 + 上下文设置 |
| `CSSPropertyPlayground` | 通用 | 实时调整任意 CSS 属性值并预览效果 |
| `FlexboxPlayground` | Ch 07 Visual Formatting | 拖拽调整 flex 容器和子项属性 |
| `GridPlayground` | Ch 07 Visual Formatting | 可视化 grid-template 定义和子项放置 |
| `ColorSpaceExplorer` | Ch 11 Colors & Backgrounds | oklch/hsl/rgb 色彩空间对比 |

### 实现原则
- 每个 demo 是独立的 React 客户端组件（`"use client"`）
- 使用 `useState` 管理可调参数
- 用 `getComputedStyle()` 显示浏览器实际计算值
- 统一放在 `src/components/demos/` 目录

---

## 每个章节的学习结构

```
1. 规范原文学习
   - 阅读官方规范关键章节
   - 提取核心概念和定义
   - 记录术语（中英对照）

2. 原理图解
   - 用自己的话解释
   - 绘制概念图/流程图

3. 交互示例
   - 可调参数的 live demo
   - 使用 getComputedStyle() 显示计算值
   - 边界情况演示

4. 知识沉淀
   - 写成网页文档
   - 整理常见误区
```

### 单个章节的创建工作流

1. 阅读规范原文，理解核心概念
2. 确认 `specs/{spec-name}-content.json` 已生成
3. 在 `src/data/modules.ts` 补充章节数据：sections 列表、摘要、要点、术语表
4. 开发 1-3 个交互 demo 组件
5. 更新章节状态（⚪ → 🟡 → 🟢 → ✅）
6. 在 PLAN.md 迭代记录中添加学习笔记

---

## 优先级路线图

### 已完成

- [x] 项目基础框架搭建（Next.js 16 + shadcn/ui + Tailwind v4）
- [x] 32 份 W3C 规范批量下载
- [x] 共享数据层 `src/data/modules.ts`
- [x] 动态路由 `[slug]/page.tsx`
- [x] 规范数据读取工具 `src/lib/specs.ts`
- [x] Demo 注册系统（注册表 + DemoSlot 插槽）
- [x] Ch 04 Cascade & Inheritance 内容完成（7 sections + SpecificityCalculator）
- [x] Ch 06 Box Model 骨架完成（5 sections + BoxModelVisualizer）
- [x] **以 CSS2 章节结构重组学习路线**（18 个 CSS3 模块 → 15 个 CSS2 章节）
- [x] **全局侧边栏导航**（桌面端固定侧边栏 + 移动端 Sheet，当前章节高亮，展开小节目录）
- [x] **CSS2.2 原文下载与展示**（15 章 HTML 下载 + 内容提取 + 章节页并列展示 CSS2 原文与 CSS3 规范）
- [x] **规范内容渲染系统**（解析参考文献引用、跨规范链接、代码块、列表等）
- [x] **i18n 架构预留**（LocaleText 双语类型、t() 函数、UI 字符串提取、Module/Section/Stage title 双语化）
- [x] **CSS2 原文 fallback 展示**（无人工 sections 的 13 个章节自动展示 CSS2.2 原文，侧边栏同步展示子章节目录）

### 短期

- [ ] Ch 01 Introduction to CSS 内容填充
- [x] Ch 02 Syntax, Values & Units 内容填充（10 sections + 3 demos）
- [ ] Ch 03 Selectors 内容填充
- [ ] 为 Ch 04 Cascade 补充更多 Demo（ValuePipeline、CascadeOriginDemo）

### 中期

- [ ] 按学习路线逐章完成内容
- [ ] 为每个章节开发 1-3 个交互 demo
- [ ] 添加章节间导航和进度系统

### 长期

- [ ] 部署到 Vercel
- [ ] 添加全文搜索功能
- [ ] 添加术语表/索引页面
- [ ] 创建 /playground 演练场页面

---

## 迭代记录

> 记录每次学习过程中的发现、疑问、注意点和心得。这是知识沉淀的核心部分。

---

### 2026-02-03 项目启动

**做了什么**：
- 创建学习计划
- 确定基于 W3C CSS 规范的学习路线
- 规划项目结构
- 搭建项目基础框架：
  - `index.html` - 首页，学习路线导航
  - `assets/styles/main.css` - 网站基础样式
  - `playground/index.html` - 交互式代码演练场
  - `modules/01-cascade/index.html` - 第一个模块骨架

---

### 2026-02-03 规范解析系统

**做了什么**：
- 创建 `scripts/fetch-spec.js` - 从 W3C 下载规范并解析章节结构
- 创建 `scripts/generate-module.js` - 根据规范 JSON 生成学习页面（⚠️ 已废弃）
- 下载了 css-cascade-4 规范，生成了 01-cascade 模块页面

**新增脚本**：
- `scripts/extract-content.js` - 从规范 HTML 提取章节内容（仍在使用）

---

### 2026-02-03 批量下载所有规范

**做了什么**：
- 创建 `scripts/fetch-all-specs.js` 批量下载脚本
- **成功下载全部 32 个 CSS 规范**（约 14.6 MB，1858+ 个章节）

---

### 2026-02-04 网站重构 - Next.js + shadcn/ui

**做了什么**：
- 使用 Next.js 16 + Tailwind CSS v4 + shadcn/ui 重构网站
- 实现主题系统：明/暗模式 + 4 种颜色主题 + 系统跟随
- 首页完成，展示学习路线导航
- Cascade & Inheritance 模块页面骨架完成

---

### 2026-02-06 内容管线打通 + 交互 Demo

**做了什么**：
- Box Model 章节内容完成：5 个 sections（Introduction、The CSS Box Model、Margins、Padding、Borders）
- Cascade 章节状态更新为 `completed`，Box Model 设为 `current`
- 在章节页面中整合规范原文：每个 section 新增「规范原文」可折叠面板
- 开发两个交互 Demo：
  - `SpecificityCalculator` — CSS 选择器特异性计算器
  - `BoxModelVisualizer` — 盒模型可视化器
- 建立 Demo 注册机制

---

### 2026-02-06 以 CSS2 章节结构重组学习路线

**做了什么**：
- 研究 CSS2 完整章节结构（18 章）和 CSS Snapshot 2025 分层体系
- 识别 CSS2 的依赖链：Syntax(4) → Selectors(5) → Cascade(6) → Media(7) → Box Model(8) → Layout(9-10)
- **将 18 个碎片化的 CSS3 模块重组为 15 个以 CSS2 为骨架的章节**
- 新增 `css2Chapters` 字段标注每个章节对应的 CSS2 原始章节号
- 5 个学习阶段：语言基础 → 盒子与布局 → 视觉表现 → 排版 → 动态与前沿
- 保留了 `cascade` 和 `box-model` 的所有已有内容和 Demo

**为什么要重组**：
- CSS3 按规范模块碎片化组织（flexbox、grid、position 各自独立），缺乏系统性
- CSS2 是一个完整的单一规范，有清晰的章节依赖链，适合作为学习骨架
- 每个章节先学 CSS2 基础概念，再补充 CSS3/4 的现代扩展

**旧模块 → 新章节映射**：
| 旧 slug | 新 slug | 说明 |
|---------|---------|------|
| `cascade` | `cascade` (Ch 04) | 保留，number 1→4 |
| `box-model` | `box-model` (Ch 06) | 保留，number 2→6 |
| `display` | `visual-formatting` (Ch 07) | 吸收 |
| `values` | `syntax` (Ch 02) | 吸收 |
| `selectors` | `selectors` (Ch 03) | 保留 |
| `flexbox`, `grid`, `position` | `visual-formatting` (Ch 07) | 合并 |
| `colors`, `backgrounds` | `colors-backgrounds` (Ch 11) | 合并 |
| `typography` | `fonts` (Ch 12) + `text` (Ch 13) | 拆分 |
| `transforms`, `transitions`, `animations` | `transforms` (Ch 14) | 合并 |
| `variables`, `layers` | `cascade` (Ch 04) | 吸收 |
| `container` | `modern` (Ch 15) | 移入 |

---

### 2026-02-06 四项增强：侧边栏、CSS2 原文、渲染器、i18n

**做了什么**：

**Phase 1: 全局侧边栏导航**
- 安装 shadcn Sheet 组件
- 新建 `SidebarNav.tsx`：使用 `usePathname()` 检测当前路由，渲染完整导航树（阶段 → 章节 → 小节）
- 新建 `SidebarToggle.tsx`：移动端用 Sheet 包裹 SidebarNav，hamburger 按钮触发
- 重写 `layout.tsx`：共享 header + 两栏布局（左侧固定侧边栏 lg 以上显示 + 右侧 main）
- 从首页和章节页删除重复的 header

**Phase 2: CSS2.2 下载与展示**
- 新建 `scripts/fetch-css2.js`：下载 15 个 CSS2.2 章节（多页规范）
- 新建 `scripts/extract-css2.js`：提取 CSS2.2 内容（适配 `<a name="">` 锚点格式）
- 在 `modules.ts` 中添加 `CSS2_CHAPTER_MAP` 和 `getCSS2SpecNames()`
- 章节页面新增 "CSS2 原文" 可折叠面板，与 "CSS3 规范原文" 并列展示

**Phase 3: 引用/内容渲染系统**
- 新建 `SpecContent.tsx`：轻量级伪 Markdown 解析器
  - 解析：参考文献引用 `[[CSS2]]`、跨规范链接、内部锚点、代码块、行内代码、粗体、列表
  - 替代之前的纯文本 `whitespace-pre-wrap` 渲染

**Phase 4: i18n 架构预留**
- 新建 `src/lib/i18n.ts`：`LocaleText { zh, en }` 类型 + `t()` 函数 + `DEFAULT_LOCALE`
- 新建 `src/lib/strings.ts`：所有 UI 硬编码中文提取为 `LocaleText` 常量（~30 个字符串）
- 重构 `Module.title`、`Section.title`、`Stage.title` 从 `string` + `titleZh` → `LocaleText`
- 更新 8 个消费者文件使用 `t()` 和 `UI` 常量
- 当前仍默认显示中文，未实现语言切换

**关键修复**：
- CSS2.2 首次提取 0 sections：原因是 CSS2.2 用 `<a name="xxx">` 而非 `id` 属性标记锚点

---

### 2026-02-06 CSS2 原文 fallback 展示

**做了什么**：
- 解决了 13 个空章节（无人工 sections）只显示"内容开发中"占位符的问题
- 在 `specs.ts` 中新增 `CSS2Section` 接口和 `getCSS2SectionList()` / `getCSS2SectionHeadings()` 函数
- 改造 `[slug]/page.tsx`：当章节无人工 sections 但有 CSS2 原文时，渲染 CSS2 子章节卡片（heading + SpecContent）
- 改造 `SidebarNav`：接收 `css2SidebarData` prop，空章节展示 CSS2 子章节目录
- 改造 `SidebarToggle`：透传 `css2SidebarData` prop
- 在 `layout.tsx` 中预计算 CSS2 侧边栏数据并传递给客户端组件
- 新增 UI 字符串：`css2SectionsTitle`、`css2SectionsDesc`

**设计决策**：
- CSS2 原文作为 fallback，当人工 sections 存在时优先显示人工内容
- 侧边栏数据在服务端（layout.tsx）预计算后序列化传给客户端组件（SidebarNav 是 `'use client'`，不能直接调用 `fs`）
- 保留了无 CSS2 原文也无人工 sections 时的占位符（目前所有章节都有 CSS2 原文，但 transforms 和 modern 无对应 CSS2 章节）

---

### 2026-02-06 第二章内容 + 布局修复 + 解析增强

**做了什么**：

**布局修复**：
- 诊断并修复章节页面右侧大量空白问题：`container` 类添加 `margin: auto` 导致在 flex 布局中内容居中
- 将 `[slug]/page.tsx` 和 `page.tsx` 中的 `container` 替换为 `px-6 lg:px-8`

**SpecContent 解析器增强**：
- 新增 `decodeEntities()` 运行时 HTML 实体解码（`&mdash;` `&ndash;` `&#NNN;` `&#xHHH;` 等）
- 扩展参考文献正则：支持 `[[REF]](any-url)` 格式（不再限制 `#biblio-` 前缀）
- 新增相对链接匹配组：`[text](path.html)` 渲染为带样式的 span
- 新增 `isTableLike()` 表格检测启发式（tab/多空格分隔的列数据 → grid 渲染）
- 增强提取脚本 `extract-css2.js` / `extract-content.js` 的 `cleanHtml()` 实体解码
- 重新提取所有 15 份 CSS2.2 章节内容

**第二章人工内容（7 sections）**：
- 整合 CSS2 Ch4（21 sections）+ css-values-3（19 sections）+ css-values-4（24 sections）为 7 个学习 sections
- `syntax-overview` — CSS 语法与解析（token 化、语句、规则集、声明、注释）
- `parsing-errors` — 解析错误处理（前向兼容解析、错误恢复规则）
- `value-definition` — 值定义语法（组合符、乘法器、类型表示法）
- `textual-values` — 文本数据类型（关键字、custom-ident、字符串、URL）
- `numeric-values` — 数值数据类型（整数、数值、百分比）
- `length-units` — 长度单位（绝对/相对/视口/容器查询单位）
- `math-functions` — 数学函数（calc、min/max/clamp、三角函数、round/mod/rem）

**第二章重新组织（10 sections）**：
- 原 7 sections → 10 sections，补充 CSS2 Ch4 遗漏内容
- 新增：§5 字符、转义与编码（CSS2 §4.1.3 + §4.4 + §4.4.1）
- 新增：§6 厂商前缀与扩展（CSS2 §4.1.2.1 Vendor-specific extensions）
- 新增：§9 其他值类型（颜色、时间、角度、分辨率、计数器 — CSS2 §4.3.5-4.3.7）
- 重写 §1 syntax-overview summary：从教学角度解释 Token 的概念（为什么需要、是什么、有哪些类型），而非仅罗列类型名

**3 个交互 Demo（Monaco Editor）**：
- 安装 `@monaco-editor/react`
- `CSSTokenizer`：Monaco Editor 输入 CSS → 实时预览 + 词法分析视图（代码格式 token 着色 + hover 交互）
- `CSSValueParser`：输入 CSS 值 → 自动识别类型（`<length>`/`<color>`/`<function>` 等）+ CSS.supports() 浏览器兼容性检测 + 可视化预览
- `UnitConverter`：输入长度值 → 12 种单位同时换算（绝对/字体相对/视口相对），带实时预览条和可调上下文（root/parent font-size、viewport 尺寸）

**技术选型**：Monaco Editor vs CodeMirror 6 — 用户选择 Monaco Editor（VS Code 同款，CSS 语言支持完善）

---

### 2026-02-06 规范原文链接交互 + 布局重设计

**做了什么**：

**问题**：
1. CSS2/CSS3 原文藏在 Accordion 里，需要点开才能看，体验差
2. 原文中的链接（相对链接、锚点、参考文献、粗体术语）不可交互，用户无法导航

**解决方案**：

**Step 1: 安装 Popover 组件**
- `pnpm dlx shadcn@latest add popover`

**Step 2: 创建数据文件**
- `src/data/glossary.ts` — ~35 条 CSS 术语定义（中英、简要解释、站内引用、W3C 链接）
- `src/data/css2-links.ts` — CSS2 文件名→站内 moduleId 映射（22 个文件）+ 参考文献 URL（30+ 条）
- 提供 `lookupGlossary()`、`resolveCSS2Link()`、`toCSS2ExternalUrl()`、`getBibrefUrl()` 工具函数

**Step 3: 创建 SpecLink 客户端组件**
- `src/components/SpecLink.tsx`（`'use client'`）— 5 种链接类型的统一交互组件：
  - `term`：粗体术语 → Popover 弹窗（术语名、中文、解释、站内跳转 + W3C 原文）
  - `relative`：CSS2 相对链接 → Popover（目标章节标题、站内跳转 + W3C 原文）
  - `internal`：内部锚点 → Popover（目标 section 标题 + summary 预览 + 页内跳转）
  - `bibref`：参考文献 → 可点击外部链接
  - `external-relative`：无法映射的 CSS2 链接 → 直接跳转 W3C

**Step 4: 改造 SpecContent**
- `renderInline()` 中 `**term**` → `<SpecLink type="term">`（从 glossary 查询）
- `[[REF]](url)` → `<SpecLink type="bibref">`（从 bibref 映射表查询 URL）
- `[text](#anchor)` → `<SpecLink type="internal">`（匹配当前模块 sections）
- `[text](path.html)` → `<SpecLink type="relative">`（通过 css2-links 映射）
- 新增 `moduleId` prop，用于解析内部锚点

**Step 5: 改造 section 卡片布局 — Tabs 替代 Accordion**
- CSS2 原文和 CSS3 规范原文从 Accordion 移出
- 在 CardContent 底部用 Tabs 平铺展示，默认显示 CSS2
- 只有一个规范时不显示 Tab 栏，直接展示
- Accordion 只保留「要点总结」和「交互示例」

**Step 6: Popover 一键预览 + 多版本原文链接**
- 用户反馈：点击链接应一步到位展示内容预览，不应只显示标题和跳转按钮
- RelativePopover：新增 `sectionSummary` prop，Popover 直接展示目标 section 内容摘要
- 提取 `SpecVersionLinks` 共享组件：统一渲染「站内查看 / CSS2.1 ↗ / CSS3 ↗」链接行
- GlossaryEntry 新增 `css2Url` 字段，术语卡片同时提供 CSS2.1 和 CSS3 原文链接
- 所有 Popover 类型底部统一展示多版本原文入口
- Popover 内嵌完整 section 卡片内容（summary + keyPoints 列表），用 ScrollArea 限制高度
- SpecContent 服务端渲染时从 sectionRef / anchor 查找关联 section，将 summary + keyPoints 传给 SpecLink
- `css2-links.ts` 新增 `ANCHOR_TO_SECTION` 降级映射：CSS2 细粒度锚点（如 `#ignore`→`parsing-errors`、`#whitespace`→`characters-escaping`）映射到站内 section，覆盖 syntax/cascade/box-model/intro 四个模块的 ~40 个锚点

**设计决策**：
- SpecContent 保持服务端组件，SpecLink 为客户端组件（Popover 需要交互）
- 术语表先覆盖 Ch 2 + Ch 4 + Ch 6 的核心术语，后续逐章补充
- 未收录的术语退化为普通 `<strong>`，无法映射的链接退化为外部链接
- Popover 交互一步到位：点击即展示内容 + 多版本原文链接，无需二次操作

**Step 7: 视觉优化 — 去透明度 + 颜色分级 + Popover 内嵌 Demo**
- 去掉所有 `/50`、`/30` 透明度背景（代码块 `bg-muted/50` → `bg-muted`，表格行 `bg-muted/30` → `bg-muted`，行内代码同理）
- 5 种链接类型用不同颜色区分：
  - **术语 term**：`primary` 色 + 2px 实线下划线，最显眼（有丰富 Popover 内容）
  - **内部锚点 internal**：紫色（`violet`），有内容时 2px 实线，无内容时虚线
  - **跨章节 relative**：蓝色（`blue`），有内容时 2px 实线，无内容时虚线
  - **外部链接 external-relative**：琥珀色（`amber`），虚线
  - **参考文献 bibref**：灰色 mono 虚线，低调
- Popover 内嵌交互 Demo：当目标 section 有注册的 DemoSlot 时，Popover 底部直接渲染 Demo 组件
  - 新增 `InlineDemo` 共享组件，通过 `getDemoComponent()` 检测是否有 demo
  - SpecContent 传递 `demoModuleId` + `demoSectionId` 给 SpecLink
  - 例：点击指向 `syntax#syntax-overview` 的链接 → Popover 内直接看到 CSSTokenizer demo
- Popover 宽度：有丰富内容时 `w-[40rem]`（640px），简单弹窗 `w-96`（384px），高度限制 `max-h-[70vh]`
- 用 `Separator` 组件替代 `border-t border-border/50` 分隔线

**Step 8: 居中布局重构 — 参考 vite.dev 风格**
- 移除桌面端固定侧边栏（`aside.w-64`），改为纯居中布局
- Header 内容区 `max-w-screen-xl mx-auto`，居中对齐
- 章节页面 `max-w-4xl mx-auto`，内容居中，两侧留白
- 首页各 section 统一 `max-w-screen-xl mx-auto`
- SidebarToggle 不再限制 `lg:hidden`，桌面端也可通过菜单按钮打开 Sheet 导航
- `main` 不再受 `flex-1 min-w-0` 约束，直接占满视口宽度

**Step 9: 三栏文档布局 — 参考 vite.dev / vuejs.org 风格**
- 章节页面改为三栏布局（xl+ 断点）：左侧章节导航（16rem）+ 中间内容（max-w-4xl）+ 右侧 TOC（14rem）
- 新建 `TocSidebar.tsx` 客户端组件：IntersectionObserver 实现 scroll-spy，高亮当前可见 section
- 左侧栏复用 `SidebarNav` 组件，在章节页面内直接渲染（不再依赖 layout.tsx 的全局侧边栏）
- 右侧 TOC 自动从 `mod.sections`（人工 sections）或 `css2Sections`（CSS2 fallback）生成
- Header 中 SidebarToggle 改为 `xl:hidden`，桌面端有固定侧边栏时隐藏
- 首页保持纯居中布局，无左右侧边栏
- CSS2 sidebar 数据在章节页面内预计算（构建时执行），避免依赖 layout props 传递
- 三栏使用 CSS Grid：`xl:grid-cols-[16rem_1fr_14rem]`，非 xl 屏幕为单栏

---

## 重要发现与注意点

> 学习过程中发现的关键概念、常见误区、跨模块关联等

- **CSS2 是系统化学习的最佳入口**：CSS3 按模块拆分虽然利于规范制定，但不利于学习。CSS2 的单一文档结构提供了从语法到布局到视觉效果的完整依赖链。
- **CSS3 模块本质是 CSS2 各章节的替代/扩展**：例如 Selectors Level 3 替代了 CSS2 §5，css-cascade-4 替代了 CSS2 §6。

---

## 待解决的疑问

> 学习过程中遇到的问题，待后续深入研究

（待补充）

---

## 参考资源

### 官方资源
- W3C CSS 规范：https://www.w3.org/Style/CSS/
- Editor's Drafts：https://drafts.csswg.org/
- CSS WG GitHub：https://github.com/w3c/csswg-drafts

### 书籍（可选）
- 《CSS 权威指南》（第四版）
- 《CSS 揭秘》
- 《CSS 世界》

### 其他
- MDN CSS 文档：https://developer.mozilla.org/en-US/docs/Web/CSS
- CSS Tricks：https://css-tricks.com/
