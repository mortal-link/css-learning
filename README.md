# CSS Quest - 系统化学习 CSS

基于 W3C 官方规范的 CSS 学习网站，理解原理而非死记规则。

## 项目特点

- **基于官方规范**：直接从 W3C CSS 规范学习，理解底层原理
- **系统化路线**：5 个阶段 17 个模块，循序渐进
- **现代 UI**：使用 Next.js + shadcn/ui，支持主题切换
- **交互示例**：每个概念配有可交互的 demo（开发中）

## 技术栈

### 网站
- **框架**：Next.js 16 (App Router)
- **样式**：Tailwind CSS v4
- **组件**：shadcn/ui
- **语言**：TypeScript
- **包管理**：pnpm

### 工具脚本
- **规范下载**：`scripts/fetch-spec.js` - 下载 W3C 规范
- **内容提取**：`scripts/extract-content.js` - 提取规范内容
- **页面生成**：`scripts/render-module.js` - 生成学习页面

## 快速开始

### 安装依赖

```bash
cd website
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

### 下载规范

```bash
# 下载单个规范
node scripts/fetch-spec.js css-cascade-4

# 批量下载所有规范
node scripts/fetch-all-specs.js
```

### 提取内容

```bash
# 提取规范内容
node scripts/extract-content.js css-cascade-4

# 渲染到页面
node scripts/render-module.js css-cascade-4 01-cascade
```

## 项目结构

```
css/
├── website/              # Next.js 网站
│   ├── src/
│   │   ├── app/         # 页面
│   │   ├── components/  # 组件
│   │   └── lib/         # 工具函数
│   └── public/          # 静态资源
├── specs/               # W3C 规范文档
│   ├── *.html          # 原始 HTML
│   ├── *.json          # 解析后的结构
│   └── *-content.json  # 提取的内容
├── scripts/             # 工具脚本
└── PLAN.md             # 学习计划和迭代记录
```

## 学习路线

### 阶段一：核心基础
1. Cascade & Inheritance - 层叠与继承
2. Box Model - 盒模型
3. Display - 显示类型
4. Values & Units - 值与单位
5. Selectors - 选择器

### 阶段二：布局系统
6. Flexbox - 弹性布局
7. Grid - 网格布局
8. Positioning - 定位
9. Box Alignment - 对齐

### 阶段三：视觉样式
10. Colors - 颜色系统
11. Backgrounds & Borders - 背景与边框
12. Typography - 字体与文本

### 阶段四：动画与变换
13. Transforms - 变换
14. Transitions - 过渡
15. Animations - 动画

### 阶段五：高级特性
16. Custom Properties - CSS 变量
17. Cascade Layers - 层叠层
18. Container Queries - 容器查询

## 主题系统

支持明/暗模式和 4 种颜色主题：
- 默认（蓝色）
- 森林（绿色）
- 海洋（青色）
- 日落（橙色）

主题设置会自动保存到 localStorage。

## 开发计划

查看 [PLAN.md](./PLAN.md) 了解详细的学习计划和迭代记录。

## 参考资源

- [W3C CSS 规范](https://www.w3.org/Style/CSS/)
- [CSS Snapshot 2025](https://www.w3.org/TR/css-2025/)
- [MDN CSS 文档](https://developer.mozilla.org/en-US/docs/Web/CSS)

## License

MIT
