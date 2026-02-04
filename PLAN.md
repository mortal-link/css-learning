# CSS 规范系统学习计划

> **项目目标**：基于 W3C CSS 官方规范，按模块由浅入深学习 CSS 原理，通过交互式示例巩固理解，最终沉淀为一个 CSS 知识库网站。
>
> **使用说明**：这是一个长期项目的参考计划。每次学习时，我们会选择一个具体的模块深入，并在下方记录过程中的发现、疑问和注意点。

---

## 核心资源

本计划基于 W3C 官方规范，主要参考：

| 资源 | 链接 | 说明 |
|------|------|------|
| CSS Snapshot 2025 | https://www.w3.org/TR/css-2025/ | CSS 官方定义，汇总所有稳定规范 |
| CSS 规范完整列表 | https://www.w3.org/Style/CSS/specs | 所有模块的描述和链接 |
| Editor's Drafts | https://drafts.csswg.org/ | 最新的编辑草案 |
| GitHub | https://github.com/w3c/csswg-drafts | 规范源码，可下载 |
| CSS2 PDF | https://www.w3.org/TR/CSS2/css2.pdf | CSS2 完整 PDF 版本 |

---

## 学习路线（基于规范模块）

### 阶段一：CSS 核心基础（必修）

按 CSS Snapshot 2025 的官方定义顺序：

| 序号 | 规范 | 链接 | 核心内容 |
|------|------|------|----------|
| 1 | **CSS Level 2** | https://www.w3.org/TR/CSS2/ | CSS 核心，推荐先读 Chapter 2 了解基本概念和设计原则 |
| 2 | **CSS Syntax Level 3** | https://www.w3.org/TR/css-syntax-3/ | CSS 解析规则，替代 CSS2 的语法章节 |
| 3 | **Selectors Level 3** | https://www.w3.org/TR/selectors-3/ | 选择器语法，替代 CSS2 §5 和 §6.4.3 |
| 4 | **CSS Cascading and Inheritance Level 4** | https://www.w3.org/TR/css-cascade-4/ | 层叠和继承，CSS 的 "C" |
| 5 | **CSS Values and Units Level 3** | https://www.w3.org/TR/css-values-3/ | 属性值语法和单位系统 |
| 6 | **CSS Box Model Level 3** | https://www.w3.org/TR/css-box-3/ | 盒模型 |

### 阶段二：布局系统

| 序号 | 规范 | 链接 | 核心内容 |
|------|------|------|----------|
| 7 | **CSS Display Level 3** | https://www.w3.org/TR/css-display-3/ | display 属性、格式化上下文 (BFC/IFC) |
| 8 | **CSS Positioned Layout Level 3** | https://www.w3.org/TR/css-position-3/ | 定位：relative/absolute/fixed/sticky |
| 9 | **CSS Flexible Box Layout Level 1** | https://www.w3.org/TR/css-flexbox-1/ | Flexbox 布局 |
| 10 | **CSS Grid Layout Level 1/2** | https://www.w3.org/TR/css-grid-1/ | Grid 布局 |
| 11 | **CSS Multi-column Layout Level 1** | https://www.w3.org/TR/css-multicol-1/ | 多列布局 |
| 12 | **CSS Box Alignment Level 3** | https://www.w3.org/TR/css-align-3/ | 对齐属性（跨布局模式统一） |

### 阶段三：视觉样式

| 序号 | 规范 | 链接 | 核心内容 |
|------|------|------|----------|
| 13 | **CSS Color Level 4** | https://www.w3.org/TR/css-color-4/ | 颜色系统、color-space |
| 14 | **CSS Backgrounds and Borders Level 3** | https://www.w3.org/TR/css-backgrounds-3/ | 背景、边框、圆角、阴影 |
| 15 | **CSS Images Level 3** | https://www.w3.org/TR/css-images-3/ | 图像、渐变 |
| 16 | **CSS Fonts Level 3** | https://www.w3.org/TR/css-fonts-3/ | 字体选择和特性 |
| 17 | **CSS Text Level 3** | https://www.w3.org/TR/css-text-3/ | 文本处理 |
| 18 | **CSS Text Decoration Level 3** | https://www.w3.org/TR/css-text-decor-3/ | 文本装饰 |

### 阶段四：动画与变换

| 序号 | 规范 | 链接 | 核心内容 |
|------|------|------|----------|
| 19 | **CSS Transforms Level 1** | https://www.w3.org/TR/css-transforms-1/ | 2D 变换 |
| 20 | **CSS Transitions Level 1** | https://www.w3.org/TR/css-transitions-1/ | 过渡动画 |
| 21 | **CSS Animations Level 1** | https://www.w3.org/TR/css-animations-1/ | 关键帧动画 |
| 22 | **CSS Easing Functions Level 1** | https://www.w3.org/TR/css-easing-1/ | 缓动函数 |

### 阶段五：高级特性

| 序号 | 规范 | 链接 | 核心内容 |
|------|------|------|----------|
| 23 | **CSS Custom Properties Level 1** | https://www.w3.org/TR/css-variables-1/ | CSS 变量 |
| 24 | **CSS Cascade Level 5** | https://www.w3.org/TR/css-cascade-5/ | @layer 层叠层 |
| 25 | **CSS Containment Level 3** | https://www.w3.org/TR/css-contain-3/ | 容器查询 @container |
| 26 | **CSS Writing Modes Level 3/4** | https://www.w3.org/TR/css-writing-modes-3/ | 书写模式、国际化 |

---

## 项目结构

```
css/
├── PLAN.md                    # 本计划文件
├── index.html                 # 首页：学习路线导航
├── assets/
│   ├── styles/
│   │   └── main.css          # 网站样式
│   └── scripts/
│       └── playground.js     # 交互演示脚本
├── specs/                     # 下载的规范文档（可选）
│   └── css-cascade-5.html
├── modules/                   # 按模块组织的学习内容
│   ├── 01-cascade/
│   │   ├── index.html        # 原理解析
│   │   ├── specificity.html  # 优先级详解
│   │   └── examples/         # 交互示例
│   ├── 02-box-model/
│   ├── 03-display/
│   └── ...
└── playground/                # 通用代码演练场
    └── index.html
```

---

## 每个模块的学习结构

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

---

## 第一个模块：CSS Cascading and Inheritance

从这里开始是因为它解释了 CSS 最核心的工作原理：

### 核心概念

1. **声明的来源**（Origin）：User Agent / User / Author
2. **层叠**（Cascade）：如何决定最终应用哪条规则
3. **优先级**（Specificity）：(ID, Class, Type) 三元组比较
4. **继承**（Inheritance）：哪些属性继承，为什么
5. **关键字**：`inherit`, `initial`, `unset`, `revert`

### 推荐阅读顺序

1. CSS2 Chapter 2（基本概念）
2. css-cascade-4（层叠和继承完整定义）
3. css-cascade-5（@layer 扩展）

---

## 技术实现建议

保持简单，专注 CSS 学习：

- **纯 HTML/CSS/JS** 构建网站
- 使用 **vanilla JS** 实现交互 demo
- 可选：后期用 [Astro](https://astro.build) 重构为文档站点
- 可选：使用 [CodeMirror](https://codemirror.net/) 做代码编辑器

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

**下一步**：
- 开始学习 Cascade & Inheritance 模块
- 阅读 CSS2 Chapter 2 了解基本概念

---

### 2026-02-03 规范解析系统

**做了什么**：
- 创建 `scripts/fetch-spec.js` - 从 W3C 下载规范并解析章节结构
- 创建 `scripts/generate-module.js` - 根据规范 JSON 生成学习页面
- 创建 `assets/styles/spec-reader.css` - 规范阅读器样式
- 创建 `assets/scripts/spec-reader.js` - 交互功能（目录高亮、代码复制）
- 下载了 css-cascade-4 规范，生成了 01-cascade 模块页面

**新增脚本**：
- `scripts/extract-content.js` - 从规范 HTML 提取章节内容
- `scripts/render-module.js` - 将提取的内容渲染到学习页面

**完整工作流**：
```bash
# 1. 下载规范
node scripts/fetch-spec.js css-cascade-4

# 2. 提取内容
node scripts/extract-content.js css-cascade-4

# 3. 渲染页面
node scripts/render-module.js css-cascade-4 01-cascade
```

---

### 2026-02-03 批量下载所有规范

**做了什么**：
- 扩展 `scripts/fetch-spec.js` 支持 32 个规范
- 创建 `scripts/fetch-all-specs.js` 批量下载脚本
- **成功下载全部 32 个 CSS 规范**

**下载的规范列表**：

| 阶段 | 规范 | 大小 | 章节数 |
|------|------|------|--------|
| 核心基础 | css-cascade-4 | 263 KB | 54 |
| | css-cascade-5 | 318 KB | 74 |
| | css-box-3 | 159 KB | 35 |
| | css-box-4 | 193 KB | 39 |
| | css-display-3 | 377 KB | 47 |
| | css-display-4 | 662 KB | 48 |
| | css-values-3 | 361 KB | 69 |
| | css-values-4 | 799 KB | 108 |
| | selectors-3 | 132 KB | - |
| | selectors-4 | 953 KB | 137 |
| 布局系统 | css-flexbox-1 | 1484 KB | 90 |
| | css-grid-1 | 928 KB | 110 |
| | css-grid-2 | 858 KB | 106 |
| | css-position-3 | 401 KB | 52 |
| | css-multicol-1 | 566 KB | 52 |
| | css-align-3 | 557 KB | 72 |
| 视觉样式 | css-color-4 | 1036 KB | 130 |
| | css-color-5 | 508 KB | 76 |
| | css-backgrounds-3 | 529 KB | 80 |
| | css-images-3 | 344 KB | 59 |
| | css-fonts-4 | 1187 KB | 149 |
| | css-text-3 | 506 KB | 74 |
| | css-text-decor-3 | 174 KB | 43 |
| 动画变换 | css-transforms-1 | 302 KB | 57 |
| | css-transforms-2 | 262 KB | 61 |
| | css-transitions-1 | 338 KB | 46 |
| | css-animations-1 | 270 KB | 60 |
| | css-easing-1 | 91 KB | 28 |
| 高级特性 | css-variables-1 | 260 KB | 36 |
| | css-contain-2 | 235 KB | 44 |
| | css-writing-modes-4 | 368 KB | 77 |
| | css-logical-1 | 401 KB | 39 |

**总计**：约 14.6 MB，1858+ 个章节

**使用方法**：
```bash
# 批量下载所有规范
node scripts/fetch-all-specs.js

# 下载报告保存在
specs/download-report.json
```

**下一步**：
- 为各模块生成学习页面
- 填充中文批注
- 添加交互式 demo

---

### 2026-02-04 网站重构 - Next.js + Tailwind + 像素风格

**做了什么**：
- 使用 Next.js + Tailwind CSS 重构网站
- 设计了 **星露谷物语风格** 的像素 UI：
  - 温暖的大地色调（cream、parchment、wood、grass）
  - 像素字体：Press Start 2P（标题）+ VT323（正文）
  - 像素边框和阴影效果
  - 复古按钮和卡片样式

**新项目结构**：
```
website/                    # Next.js 项目
├── src/
│   ├── app/
│   │   ├── globals.css    # 全局样式（像素风格）
│   │   ├── layout.tsx     # 根布局
│   │   ├── page.tsx       # 首页
│   │   └── modules/
│   │       └── cascade/
│   │           └── page.tsx  # Cascade 模块页面
│   └── components/
│       ├── PixelFrame.tsx   # 像素边框容器
│       ├── PixelTitle.tsx   # 像素标题
│       └── ModuleCard.tsx   # 模块卡片
```

**启动方式**：
```bash
cd website
npm run dev -- -p 3001
```

---

### 2026-02-04 使用 shadcn/ui 重构

**做了什么**：
- 引入 shadcn/ui 组件库，获得更专业的 UI
- 实现了完整的主题系统：
  - 明/暗模式切换
  - 4 种颜色主题（默认蓝、森林绿、海洋青、日落橙）
  - 主题持久化存储
- 使用 shadcn 组件：Button, Card, Badge, Tabs, Accordion, ScrollArea 等
- 现代简洁的设计风格，专业感强

**主题系统**：
- CSS 变量定义在 `globals.css`
- `ThemeProvider` 管理主题状态
- `ThemeToggle` 提供切换 UI
- 支持 `system` 跟随系统主题

**安装的组件**：
```bash
npx shadcn@latest add button card badge tabs accordion separator scroll-area navigation-menu
```

**下一步**：
- 将已下载的规范内容整合到页面
- 添加交互式 demo 组件
- 完善各模块页面

---

## 重要发现与注意点

> 学习过程中发现的关键概念、常见误区、跨模块关联等

（待补充）

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
