import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'table-model',
    number: '1',
    title: { zh: 'CSS 表格模型', en: 'The CSS Table Model' },
    summary: {
      zh: 'CSS 表格模型定义了表格结构在 CSS 中的表示方式，包括表格、行、列、单元格等元素的 display 值，以及匿名表格对象的生成规则。',
      en: 'The CSS table model defines how table structures are represented in CSS, including display values for tables, rows, columns, cells, and rules for anonymous table object generation.',
    },
    keyPoints: [
      'display: table 创建块级表格盒，display: inline-table 创建内联级表格盒',
      '表格内部元素使用特殊的 display 值：table-row-group、table-header-group、table-footer-group、table-row、table-column-group、table-column、table-cell、table-caption',
      '缺失的表格包裹层会自动生成匿名表格对象，如 table-cell 元素缺少 table-row 父元素时会自动插入匿名行对象',
      '表格渲染分为多个层次：表格盒 → 列组 → 列 → 行组 → 行 → 单元格，每层的背景和边框按此顺序绘制',
      '列和列组元素不生成盒子，仅作为接收样式属性的占位符（width、border、background、visibility）',
      'table-caption 元素生成主块盒，其位置由 caption-side 属性控制',
      '表格内部盒子的生成遵循严格的层次关系：table-row 必须包含在 table-row-group 或直接在 table 内',
      '匿名对象生成规则：任何不在正确父元素内的表格内部元素会自动包裹在匿名对象中',
      'display: table 和 inline-table 元素建立新的块格式化上下文（BFC）',
      '表格盒、行组盒、行盒不是块容器盒，仅 table-cell 建立块格式化上下文并可包含块级子元素',
      '表格元素的 vertical-align 仅在单元格内生效，用于控制单元格内容的垂直对齐',
      'thead、tbody、tfoot 对应 table-header-group、table-row-group、table-footer-group，渲染时 header 在顶部、footer 在底部',
    ],
    tutorial: [
      { type: 'heading', text: '表格 display 值体系' },
      { type: 'paragraph', text: 'CSS 表格模型不仅适用于 HTML 的 <table> 元素，任何元素都可以通过设置相应的 display 值转换为表格布局。理解这套 display 值体系是掌握表格布局的基础。' },
      { type: 'code', code: `/* 表格容器 */
.container {
  display: table; /* 块级表格盒，类似 <table> */
}

.inline-container {
  display: inline-table; /* 内联级表格盒 */
}

/* 表格内部结构 */
.header { display: table-header-group; } /* 对应 <thead> */
.body { display: table-row-group; }      /* 对应 <tbody> */
.footer { display: table-footer-group; } /* 对应 <tfoot> */
.row { display: table-row; }             /* 对应 <tr> */
.cell { display: table-cell; }           /* 对应 <td> */

/* 列结构（不生成可视盒子）*/
.col-group { display: table-column-group; } /* 对应 <colgroup> */
.col { display: table-column; }             /* 对应 <col> */

/* 标题 */
.caption { display: table-caption; }        /* 对应 <caption> */`, lang: 'css', caption: '完整的表格 display 值体系' },
      { type: 'tip', text: 'display: table 会建立新的块格式化上下文（BFC），可用于清除浮动或防止 margin 折叠。' },
      { type: 'heading', text: '表格渲染层次' },
      { type: 'paragraph', text: '表格的背景和边框按特定层次顺序绘制：表格盒（最底层）→ 列组 → 列 → 行组 → 行 → 单元格（最顶层）。理解这个层次关系对于控制背景色和边框样式至关重要。' },
      { type: 'example', title: '表格分层渲染示例', code: `.table {
  display: table;
  background: lightgray; /* 表格层背景 */
}
.col {
  display: table-column;
  background: lightblue; /* 列层背景，会覆盖表格背景 */
}
.row {
  display: table-row;
  background: lightyellow; /* 行层背景，会覆盖列背景 */
}
.cell {
  display: table-cell;
  background: white; /* 单元格背景，最顶层，覆盖所有下层 */
}`, lang: 'css', explanation: '单元格的白色背景会覆盖行的黄色，行的黄色会覆盖列的蓝色，层层叠加。' },
      { type: 'heading', text: '匿名表格对象生成规则' },
      { type: 'paragraph', text: '当表格结构不完整时，浏览器会自动插入匿名盒子补全层次关系。这个机制确保表格布局始终符合规范要求，但也可能导致意外的布局结果。' },
      { type: 'code', code: `/* HTML 结构不完整 */
<div style="display: table;">
  <div style="display: table-cell;">单元格 1</div>
  <div style="display: table-cell;">单元格 2</div>
</div>

/* 浏览器会自动生成匿名 table-row 包裹这两个单元格 */
/* 等价于： */
<div style="display: table;">
  <anonymous style="display: table-row;">
    <div style="display: table-cell;">单元格 1</div>
    <div style="display: table-cell;">单元格 2</div>
  </anonymous>
</div>`, lang: 'css', caption: '缺失的 table-row 会被自动补全' },
      { type: 'warning', text: '匿名盒子无法直接设置样式，可能导致某些 CSS 属性无法按预期应用。建议显式声明完整的表格结构。' },
      { type: 'list', items: [
        'table-cell 必须是 table-row 的直接子元素，否则会生成匿名 table-row',
        'table-row 必须是 table-row-group 或 table 的子元素',
        'table-column 必须是 table-column-group 或 table 的子元素',
        '非表格元素出现在表格内部时，会被包裹在匿名 table-cell 中'
      ] },
      { type: 'heading', text: '列元素的特殊性' },
      { type: 'paragraph', text: 'table-column 和 table-column-group 元素非常特殊：它们不生成可视盒子，仅作为属性占位符。只有四个属性对列元素有效：width、border、background、visibility。' },
      { type: 'code', code: `.col {
  display: table-column;
  width: 200px;           /* ✓ 有效：设置列宽 */
  background: lightblue;  /* ✓ 有效：列背景色 */
  border: 1px solid red;  /* ✓ 有效（仅在 border-collapse: collapse 时） */
  visibility: collapse;   /* ✓ 有效：隐藏整列 */

  padding: 10px;          /* ✗ 无效 */
  margin: 10px;           /* ✗ 无效 */
  color: red;             /* ✗ 无效 */
}`, lang: 'css', caption: '只有少数属性对列元素有效' },
      { type: 'example', title: '使用 visibility: collapse 隐藏列', code: `.hidden-col {
  display: table-column;
  visibility: collapse; /* 整列消失，其他列会填充空间 */
}`, lang: 'css', explanation: 'visibility: collapse 会让整列消失，类似删除该列，其他列会重新分配宽度。这与 visibility: hidden 不同，后者仅隐藏内容但保留空间。' },
      { type: 'heading', text: 'table-caption 与 caption-side' },
      { type: 'paragraph', text: 'table-caption 元素生成表格标题盒，默认显示在表格顶部。caption-side 属性可以控制标题位置。' },
      { type: 'code', code: `.caption {
  display: table-caption;
  caption-side: top;    /* 默认：显示在表格顶部 */
  /* caption-side: bottom; */ /* 显示在表格底部 */

  text-align: center;
  font-weight: bold;
  padding: 10px;
}`, lang: 'css', caption: 'caption-side 控制标题在表格上方或下方' },
      { type: 'tip', text: 'table-caption 是主块盒，可以包含任何块级内容，不仅限于文本。它的宽度默认与表格盒相同。' },
      { type: 'heading', text: '表格与格式化上下文' },
      { type: 'paragraph', text: 'display: table 和 inline-table 都会建立新的块格式化上下文（BFC）。这意味着表格内部的布局独立于外部，常用于清除浮动或隔离 margin。' },
      { type: 'example', title: '使用 display: table 清除浮动', code: `.clearfix {
  display: table; /* 建立 BFC，包含浮动子元素 */
}

.float-child {
  float: left;
  width: 100px;
  height: 100px;
}`, lang: 'css', explanation: 'display: table 会包含内部的浮动元素，父容器高度会被撑开。这是清除浮动的一种经典技巧。' },
      { type: 'warning', text: '表格盒、行组盒、行盒本身不是块容器盒，不能直接包含块级元素。只有 table-cell 建立块格式化上下文，可以包含块级内容。' },
      { type: 'list', items: [
        'display: table 和 inline-table 建立 BFC',
        'table-cell 也建立 BFC，可包含块级子元素',
        'table-row 和 table-row-group 不建立 BFC',
        'thead、tbody、tfoot 在渲染时会按语义顺序排列：header 在顶部、footer 在底部，即使在 HTML 中顺序不同'
      ] },
      { type: 'code', code: `<!-- HTML 中 tfoot 在 tbody 之前 -->
<table>
  <tfoot>
    <tr><td>页脚</td></tr>
  </tfoot>
  <tbody>
    <tr><td>内容</td></tr>
  </tbody>
</table>

/* 渲染时 tbody 仍会在 tfoot 之上显示 */`, lang: 'html', caption: 'tbody 和 tfoot 的渲染顺序由语义决定，而非 DOM 顺序' },
    ] as TutorialBlock[],
  },
  {
    id: 'table-visual',
    number: '2',
    title: { zh: '表格视觉格式化', en: 'Table Visual Formatting' },
    summary: {
      zh: '表格的视觉格式化包括宽高计算算法、标题位置控制、以及单元格内的对齐方式。table-layout 属性决定是使用固定布局还是自动布局算法。',
      en: 'Table visual formatting includes width/height calculation algorithms, caption positioning, and alignment within cells. The table-layout property determines whether to use fixed or auto layout algorithms.',
    },
    keyPoints: [
      'table-layout: auto 使用自动表格布局算法，列宽根据内容动态计算',
      'table-layout: fixed 使用固定表格布局算法，列宽由第一行单元格的宽度或 col 元素的 width 决定，性能更优',
      'caption-side 属性控制 table-caption 在表格的上方（top）或下方（bottom）显示',
      '表格宽度计算：auto 布局需分析所有单元格内容，fixed 布局仅需首行即可确定',
      '表格高度由所有行高之和加上边框和间距决定，行高由该行中最高的单元格决定',
      '单元格内的 vertical-align 控制单元格内容的垂直对齐：top、middle、bottom、baseline',
      '单元格内的水平对齐由 text-align 属性控制（继承自父元素）',
      'fixed 布局算法：未指定宽度的列平分剩余空间，表格宽度可独立于内容确定',
      'auto 布局算法：计算每个单元格的最小宽度（min-content）和最大宽度（max-content），然后分配列宽',
      '表格的 width 属性为 auto 时，表格宽度由内容和布局算法共同决定',
      'table-layout: fixed 下，溢出单元格宽度的内容会被裁剪或溢出，取决于 overflow 属性',
      'baseline 对齐：单元格内第一行的基线与行内其他基线对齐的单元格的基线对齐',
    ],
    tutorial: [
      { type: 'heading', text: 'table-layout 布局算法概览' },
      { type: 'paragraph', text: 'CSS 提供了两种表格布局算法：**auto**（自动布局）和 **fixed**（固定布局）。这两种算法在列宽计算方式、性能表现和适用场景上有本质区别。' },
      { type: 'code', code: `/* 自动布局（默认）*/
.table-auto {
  display: table;
  table-layout: auto; /* 根据所有单元格内容动态计算列宽 */
}

/* 固定布局 */
.table-fixed {
  display: table;
  table-layout: fixed; /* 仅根据第一行确定列宽，性能更优 */
  width: 600px; /* fixed 布局通常需要明确指定表格宽度 */
}`, lang: 'css', caption: 'table-layout 的两种取值' },
      { type: 'list', items: [
        '**auto 布局**：浏览器需要分析所有单元格内容才能确定列宽，内容变化会触发重新计算',
        '**fixed 布局**：浏览器只需读取首行（或 col 元素）的宽度即可确定列宽，后续内容不影响布局',
        'fixed 布局适合列宽预先确定的场景，如数据表格、表单布局',
        'auto 布局适合内容驱动的场景，让浏览器自动优化列宽分配'
      ] },
      { type: 'heading', text: '固定布局算法详解' },
      { type: 'paragraph', text: '在 table-layout: fixed 模式下，列宽由第一行的单元格宽度或 `<col>` 元素的 width 属性决定。如果某列未指定宽度，则与其他未指定列平分剩余空间。' },
      { type: 'example', title: '固定布局的列宽分配', code: `.table {
  display: table;
  table-layout: fixed;
  width: 600px; /* 表格总宽度 */
}

.col1 { width: 200px; } /* 第1列固定 200px */
.col2 { width: 150px; } /* 第2列固定 150px */
/* 第3列未指定，获得剩余空间：600 - 200 - 150 = 250px */

/* HTML 结构 */
<div class="table">
  <div style="display: table-row;">
    <div class="col1" style="display: table-cell;">列 1</div>
    <div class="col2" style="display: table-cell;">列 2</div>
    <div style="display: table-cell;">列 3（自动分配）</div>
  </div>
</div>`, lang: 'css', explanation: '固定布局下，只要第一行确定了列宽，后续所有行都遵循相同的列宽，无论内容多少。' },
      { type: 'tip', text: '如果多个列未指定宽度，它们会平均分配剩余空间。例如表格宽度 600px，第1列 200px，第2、3列未指定，则第2、3列各获得 (600-200)/2 = 200px。' },
      { type: 'heading', text: '自动布局算法详解' },
      { type: 'paragraph', text: '在 table-layout: auto 模式下，浏览器会分析所有单元格的内容，计算每列的最小内容宽度（min-content）和最大内容宽度（max-content），然后根据表格宽度约束分配列宽。' },
      { type: 'code', code: `/* 自动布局会分析所有单元格内容 */
.table-auto {
  display: table;
  table-layout: auto;
  /* width 可选，不指定则由内容撑开 */
}

/* 示例：3列内容差异很大 */
<div class="table-auto">
  <div style="display: table-row;">
    <div style="display: table-cell;">短</div>
    <div style="display: table-cell;">This is a very long content that needs more space</div>
    <div style="display: table-cell;">中等长度内容</div>
  </div>
</div>

/* 浏览器会自动给第2列分配更多宽度 */`, lang: 'css', caption: '自动布局根据内容长度智能分配列宽' },
      { type: 'warning', text: 'auto 布局需要加载并分析完整表格内容后才能开始渲染，对于大型表格会导致明显的性能问题和布局跳动。' },
      { type: 'heading', text: '固定布局的性能优势' },
      { type: 'paragraph', text: '固定布局最大的优势是性能。浏览器在接收到第一行数据后就可以立即确定列宽并开始渲染，无需等待后续内容。这对于大型表格或数据流式加载场景至关重要。' },
      { type: 'example', title: 'fixed 布局的性能优势', code: `/* 大型数据表格推荐使用 fixed 布局 */
.data-table {
  display: table;
  table-layout: fixed;
  width: 100%;
}

.data-table .col-id { width: 10%; }
.data-table .col-name { width: 30%; }
.data-table .col-email { width: 40%; }
.data-table .col-actions { width: 20%; }

/* 即使表格有 10000 行，浏览器也只需读取第1行即可完成布局 */`, lang: 'css', explanation: '对于超过 100 行的表格，fixed 布局的渲染速度可以比 auto 布局快 10 倍以上。' },
      { type: 'heading', text: 'caption-side 控制标题位置' },
      { type: 'paragraph', text: 'caption-side 属性控制 table-caption 元素显示在表格的上方还是下方。默认值是 top（表格顶部）。' },
      { type: 'code', code: `.caption-top {
  display: table-caption;
  caption-side: top; /* 默认：标题在表格上方 */
  text-align: center;
  font-weight: bold;
  padding: 8px;
}

.caption-bottom {
  display: table-caption;
  caption-side: bottom; /* 标题在表格下方，常用于图表注释 */
  text-align: right;
  font-size: 0.9em;
  color: #666;
}`, lang: 'css', caption: 'caption-side 控制标题在表格上方或下方' },
      { type: 'heading', text: '单元格垂直对齐：vertical-align' },
      { type: 'paragraph', text: '在表格单元格中，vertical-align 属性控制单元格内容的垂直位置。可用值包括 top、middle、bottom、baseline。这与行内元素的 vertical-align 是同一个属性。' },
      { type: 'example', title: '单元格内容垂直对齐', code: `.cell-top {
  display: table-cell;
  vertical-align: top; /* 内容靠顶部对齐 */
  height: 100px;
}

.cell-middle {
  display: table-cell;
  vertical-align: middle; /* 内容垂直居中（默认值）*/
  height: 100px;
}

.cell-bottom {
  display: table-cell;
  vertical-align: bottom; /* 内容靠底部对齐 */
  height: 100px;
}

.cell-baseline {
  display: table-cell;
  vertical-align: baseline; /* 按第一行文本基线对齐 */
}`, lang: 'css', explanation: 'vertical-align 在表格单元格中的行为与在行内元素中不同，它控制整个单元格内容的垂直位置，而不仅仅是单行文本。' },
      { type: 'heading', text: '表格宽度计算' },
      { type: 'paragraph', text: '表格的总宽度取决于 table-layout 算法、width 属性以及边框间距。auto 布局下，表格宽度由内容决定；fixed 布局下，通常需要显式指定 width 值。' },
      { type: 'code', code: `/* auto 布局：表格宽度由内容决定 */
.table-auto {
  table-layout: auto;
  /* width: auto（默认）表格宽度由内容撑开 */
  /* width: 100% 则限制最大宽度为父容器宽度 */
}

/* fixed 布局：需要显式指定宽度 */
.table-fixed {
  table-layout: fixed;
  width: 800px; /* 或 width: 100% */
  /* 若不指定 width，表格会收缩到最小尺寸 */
}`, lang: 'css', caption: 'fixed 布局通常需要明确的 width 值' },
      { type: 'heading', text: '表格高度计算' },
      { type: 'paragraph', text: '表格的高度由所有行高之和加上边框和间距决定。每行的高度由该行中最高的单元格决定。单元格的 height 属性设置的是最小高度，实际高度会根据内容自动增长。' },
      { type: 'example', title: '行高由最高单元格决定', code: `<div style="display: table;">
  <div style="display: table-row;">
    <div style="display: table-cell; height: 50px;">高度 50px</div>
    <div style="display: table-cell; height: 100px;">高度 100px</div>
    <div style="display: table-cell;">自动高度</div>
  </div>
</div>

/* 这一行的实际高度是 100px（最高单元格的高度）*/
/* 第1个和第3个单元格也会被拉伸到 100px */`, lang: 'html', explanation: '表格行的高度总是由该行中最高的单元格决定，同一行内的所有单元格高度相同。' },
      { type: 'heading', text: '实战：固定布局 vs 自动布局对比' },
      { type: 'paragraph', text: '通过一个实际例子对比两种布局算法的行为差异。固定布局下，长内容会溢出或被裁剪；自动布局下，列宽会自动扩展以容纳内容。' },
      { type: 'code', code: `/* 固定布局：内容溢出 */
.table-fixed {
  table-layout: fixed;
  width: 400px;
}
.table-fixed .cell {
  width: 100px; /* 每列 100px */
  overflow: hidden; /* 溢出内容被裁剪 */
  text-overflow: ellipsis; /* 显示省略号 */
  white-space: nowrap;
}

/* 自动布局：列宽自适应 */
.table-auto {
  table-layout: auto;
  width: 400px;
}
.table-auto .cell {
  /* 浏览器会根据内容自动调整列宽 */
  /* 短内容的列会收缩，长内容的列会扩展 */
}`, lang: 'css', caption: 'fixed 需要处理内容溢出，auto 会自动调整列宽' },
      { type: 'tip', text: '实践建议：如果列宽可预测（如后台管理表格），使用 fixed 布局获得更好的性能；如果内容长度不确定（如用户生成内容），使用 auto 布局获得更好的视觉效果。' },
    ] as TutorialBlock[],
  },
  {
    id: 'table-borders',
    number: '3',
    title: { zh: '表格边框模型', en: 'Table Border Models' },
    summary: {
      zh: 'CSS 定义了两种表格边框模型：分离边框模型（separated borders）和合并边框模型（collapsed borders）。border-collapse 属性在两者间切换。',
      en: 'CSS defines two table border models: separated borders model and collapsed borders model. The border-collapse property switches between them.',
    },
    keyPoints: [
      'border-collapse: separate 使用分离边框模型，每个单元格有独立的边框，单元格之间有间距',
      'border-collapse: collapse 使用合并边框模型，相邻单元格共享边框，边框冲突时按优先级规则解决',
      'border-spacing 属性在分离边框模型中设置单元格之间的水平和垂直间距',
      'empty-cells 属性在分离边框模型中控制空单元格的边框和背景是否显示：show 或 hide',
      '合并边框模型的冲突解决规则：border-style: hidden 优先级最高，隐藏所有冲突边框',
      '合并边框宽度冲突：宽度较大的边框优先显示',
      '合并边框样式冲突：按 hidden > double > solid > dashed > dotted > ridge > outset > groove > inset > none 优先级顺序',
      '合并边框颜色冲突：若宽度和样式相同，则按单元格 > 行 > 行组 > 列 > 列组 > 表格的优先级选择颜色',
      '分离边框模型中，border-spacing 不可为负值，单元格边框之间的间距始终可见',
      '合并边框模型中，边框绘制在单元格之间的网格线上，边框宽度的一半在单元格内，一半在单元格外',
      'empty-cells: hide 会隐藏空单元格的边框和背景，但不影响布局，单元格仍占据空间',
      '合并边框模型下，表格的 border 属性设置表格外围边框，单元格的 border 设置内部网格线',
      '行组、列组、行、列的边框在合并模型中参与边框冲突解决，但在分离模型中被忽略',
      'border-collapse 影响表格的布局尺寸：collapse 模式下边框不占据额外空间，separate 模式下 border-spacing 会增加表格尺寸',
    ],
    tutorial: [
      { type: 'heading', text: 'border-collapse 两种边框模型' },
      { type: 'paragraph', text: 'CSS 提供了两种截然不同的表格边框模型：**separate**（分离边框）和 **collapse**（合并边框）。理解这两种模型的差异是掌握表格样式的关键。' },
      { type: 'code', code: `/* 分离边框模型（默认）*/
.table-separate {
  display: table;
  border-collapse: separate; /* 每个单元格有独立边框 */
  border-spacing: 10px; /* 单元格之间的间距 */
}

/* 合并边框模型 */
.table-collapse {
  display: table;
  border-collapse: collapse; /* 相邻单元格共享边框 */
  /* border-spacing 在 collapse 模式下无效 */
}`, lang: 'css', caption: 'border-collapse 切换两种边框模型' },
      { type: 'list', items: [
        '**separate 模型**：每个单元格有完整的四条边框，单元格之间有可见间距',
        '**collapse 模型**：相邻单元格共享边框，看起来像统一的网格线',
        'separate 是默认值，符合传统 HTML 表格的渲染方式',
        'collapse 常用于现代数据表格，视觉更简洁整齐'
      ] },
      { type: 'heading', text: '分离边框模型详解' },
      { type: 'paragraph', text: '在分离边框模型中，每个单元格都有独立的边框。单元格之间的间距由 border-spacing 属性控制，可以分别设置水平和垂直间距。' },
      { type: 'example', title: '分离边框模型与 border-spacing', code: `.table {
  display: table;
  border-collapse: separate;
  border-spacing: 15px 10px; /* 水平间距 15px，垂直间距 10px */
  border: 2px solid #333; /* 表格外围边框 */
}

.cell {
  display: table-cell;
  border: 1px solid #999; /* 每个单元格独立边框 */
  padding: 8px;
  background: white;
}

/* 结果：单元格之间有明显的间距，边框不重叠 */`, lang: 'css', explanation: 'border-spacing 接受一个或两个值。一个值时，水平和垂直间距相同；两个值时，第一个是水平间距，第二个是垂直间距。' },
      { type: 'tip', text: 'border-spacing 只在 border-collapse: separate 模式下有效。它不能设置负值，最小值为 0。' },
      { type: 'heading', text: 'empty-cells 控制空单元格显示' },
      { type: 'paragraph', text: '在分离边框模型中，empty-cells 属性控制空单元格（没有内容的单元格）的边框和背景是否显示。' },
      { type: 'code', code: `.table-show-empty {
  border-collapse: separate;
  empty-cells: show; /* 默认：显示空单元格的边框和背景 */
}

.table-hide-empty {
  border-collapse: separate;
  empty-cells: hide; /* 隐藏空单元格的边框和背景 */
}

/* 注意：hide 只是隐藏视觉效果，单元格仍占据布局空间 */`, lang: 'css', caption: 'empty-cells 只在 separate 模式下有效' },
      { type: 'warning', text: 'empty-cells: hide 不会移除单元格，只是隐藏其边框和背景。单元格仍然占据空间，影响表格布局。' },
      { type: 'heading', text: '合并边框模型详解' },
      { type: 'paragraph', text: '在合并边框模型中，相邻单元格共享边框。当两个单元格的边框相遇时，浏览器需要决定显示哪一个边框，这就涉及到边框冲突解决规则。' },
      { type: 'code', code: `.table {
  display: table;
  border-collapse: collapse;
  border: 2px solid black; /* 表格外围边框 */
}

.cell {
  display: table-cell;
  border: 1px solid #ccc; /* 内部单元格边框 */
  padding: 10px;
}

/* 相邻单元格的边框会合并成一条线，而不是两条 */`, lang: 'css', caption: '合并边框模型让表格看起来像统一的网格' },
      { type: 'heading', text: '边框冲突解决规则（重要）' },
      { type: 'paragraph', text: '当多个边框竞争同一位置时，CSS 按以下优先级规则选择显示哪一个边框：1) hidden 样式最高优先级，2) 宽度较大的边框，3) 样式优先级，4) 来源优先级。' },
      { type: 'example', title: '边框冲突解决规则示例', code: `/* 规则 1：hidden 样式最高优先级 */
.cell-hidden {
  border: 10px solid red;
  border-right: 1px hidden; /* hidden 优先，右边框完全隐藏 */
}

/* 规则 2：宽度较大的边框优先 */
.cell-a { border-right: 3px solid blue; }
.cell-b { border-left: 1px solid red; }
/* cell-a 和 cell-b 相邻时，显示 3px 的蓝色边框 */

/* 规则 3：样式优先级 */
/* double > solid > dashed > dotted > ridge > outset > groove > inset > none */
.cell-x { border-right: 2px solid blue; }
.cell-y { border-left: 2px double red; }
/* 宽度相同时，double 优先于 solid，显示红色 double 边框 */

/* 规则 4：来源优先级（宽度、样式都相同时）*/
/* cell > row > row-group > column > column-group > table */`, lang: 'css', explanation: '这些规则依次应用。先检查是否有 hidden，再比较宽度，然后比较样式，最后比较来源。' },
      { type: 'list', items: [
        '**样式优先级**：hidden > double > solid > dashed > dotted > ridge > outset > groove > inset > none',
        '**来源优先级**：单元格 > 行 > 行组 > 列 > 列组 > 表格',
        '如果两个边框的宽度、样式、来源都相同，则选择颜色较深的（实际上是先定义的）'
      ] },
      { type: 'heading', text: '边框绘制位置' },
      { type: 'paragraph', text: '在合并边框模型中，边框绘制在单元格之间的网格线中心。这意味着边框宽度的一半在单元格内，一半在单元格外。' },
      { type: 'code', code: `/* 合并边框的绘制位置 */
.cell {
  display: table-cell;
  border: 4px solid red;
  width: 100px;
  /* 实际内容宽度：100px */
  /* 边框向内外各延伸 2px（4px 的一半）*/
}

/* 这与普通盒模型不同！*/
/* 普通盒模型中，border 完全在盒子外围 */`, lang: 'css', caption: '合并边框绘制在网格线中心，跨越单元格边界' },
      { type: 'heading', text: '实战：创建简洁的数据表格' },
      { type: 'paragraph', text: '合并边框模型最常见的应用就是创建简洁、专业的数据表格。通过合理使用 border-collapse 和边框样式，可以实现各种表格效果。' },
      { type: 'example', title: '专业数据表格样式', code: `.data-table {
  display: table;
  border-collapse: collapse;
  width: 100%;
  border: 2px solid #333; /* 外围边框较粗 */
}

.header-cell {
  display: table-cell;
  border: 1px solid #666; /* 表头边框 */
  background: #f0f0f0;
  font-weight: bold;
  padding: 12px;
}

.data-cell {
  display: table-cell;
  border: 1px solid #ddd; /* 数据单元格边框较淡 */
  padding: 10px;
}

.data-cell:hover {
  background: #f9f9f9;
}`, lang: 'css', explanation: '通过不同粗细和颜色的边框，可以在视觉上区分表格的不同区域（表头、数据行、外围）。' },
      { type: 'heading', text: 'border-collapse 对表格尺寸的影响' },
      { type: 'paragraph', text: 'border-collapse 不仅影响边框的视觉效果，还会影响表格的实际尺寸计算。separate 模式下，border-spacing 会增加表格的总尺寸；collapse 模式下，边框不占据额外空间。' },
      { type: 'code', code: `/* separate 模式：表格尺寸 = 内容 + 边框 + border-spacing */
.table-separate {
  border-collapse: separate;
  border-spacing: 10px;
  /* 假设内容宽度 300px，边框 2px */
  /* 实际表格宽度 > 300px（要加上 border-spacing）*/
}

/* collapse 模式：表格尺寸 = 内容 + 边框/2 */
.table-collapse {
  border-collapse: collapse;
  /* 假设内容宽度 300px，边框 2px */
  /* 实际表格宽度约等于 300px（边框不额外占据空间）*/
}`, lang: 'css', caption: 'collapse 模式的表格通常更紧凑' },
      { type: 'tip', text: '实践建议：现代 Web 应用的数据表格通常使用 border-collapse: collapse，配合细边框（1px）和合适的 padding，可以获得简洁专业的视觉效果。' },
    ] as TutorialBlock[],
  },
  {
    id: 'table-layout-algo',
    number: '4',
    title: { zh: '表格布局算法', en: 'Table Layout Algorithm' },
    summary: {
      zh: '表格布局算法详细定义了如何计算表格和单元格的宽度、高度。自动布局算法根据内容动态调整，固定布局算法根据首行确定列宽。',
      en: 'Table layout algorithms define in detail how to calculate table and cell widths and heights. Auto layout adjusts dynamically based on content, while fixed layout determines column widths from the first row.',
    },
    keyPoints: [
      '自动布局算法分三步：计算最小列宽（min-content）、计算最大列宽（max-content）、分配可用宽度',
      '最小列宽：单元格内容不换行时的最小宽度，文本按最长单词计算',
      '最大列宽：单元格内容在不强制换行情况下的宽度',
      '固定布局算法：仅分析首行单元格和 col 元素的 width 值，后续行不影响列宽',
      '固定布局中，未指定宽度的列平均分配剩余空间',
      '跨列单元格（colspan）的宽度分配：在自动布局中，将额外宽度按比例分配给被跨越的列',
      '表格高度算法：先计算每行的高度（由该行最高单元格决定），再将所有行高相加',
      '单元格的 height 属性设置该单元格的最小高度，实际高度由行高决定',
      '跨行单元格（rowspan）的高度分配：将单元格高度按比例分配给被跨越的行',
      'percentage 宽度在自动布局中作为约束参与计算，在固定布局中直接应用于列宽',
      'auto 布局的宽度分配策略：优先满足指定了 width 的列，剩余空间分配给 auto 列',
      '固定布局性能优势：浏览器可在接收到首行后立即开始渲染，无需等待全部内容',
    ],
    tutorial: [
      { type: 'heading', text: '自动布局算法三步骤' },
      { type: 'paragraph', text: 'table-layout: auto 的布局算法分为三个步骤：1) 计算每列的最小内容宽度（min-content），2) 计算每列的最大内容宽度（max-content），3) 根据表格宽度约束分配实际列宽。' },
      { type: 'code', code: `/* 自动布局算法需要分析所有单元格 */
.table-auto {
  display: table;
  table-layout: auto;
  width: 600px; /* 总宽度约束 */
}

/* 浏览器会遍历所有单元格，计算： */
/* 1. min-content：每列的最小可能宽度（最长单词/图片宽度）*/
/* 2. max-content：每列的理想宽度（内容不换行时的宽度）*/
/* 3. 在 min-content 和 max-content 之间分配宽度 */`, lang: 'css', caption: '自动布局的三步骤算法' },
      { type: 'list', items: [
        '**第一步（min-content）**：计算每列在内容不溢出情况下的最小宽度',
        '**第二步（max-content）**：计算每列在内容不换行情况下的理想宽度',
        '**第三步（分配）**：根据表格总宽度，在 min 和 max 之间为每列分配实际宽度'
      ] },
      { type: 'heading', text: 'min-content 宽度详解' },
      { type: 'paragraph', text: 'min-content 宽度是单元格内容在不溢出的情况下可以收缩到的最小宽度。对于文本内容，这通常是最长的单词或不可断行片段的宽度。' },
      { type: 'example', title: 'min-content 宽度计算', code: `/* 文本内容的 min-content */
<div style="display: table-cell;">
  This is a verylongwordthatcannotbreak here
</div>

/* min-content = "verylongwordthatcannotbreak" 的宽度 */
/* 其他单词可以换行，但这个长单词是最小约束 */

/* 图片的 min-content */
<div style="display: table-cell;">
  <img src="photo.jpg" width="200">
</div>

/* min-content = 200px（图片固有宽度）*/`, lang: 'html', explanation: 'min-content 确保内容不会溢出单元格。浏览器会找到每列中最宽的"不可分割"内容作为该列的 min-content。' },
      { type: 'tip', text: '对于 CJK 文字（中文、日文、韩文），每个字符都可以作为断行点，因此 min-content 通常是单个字符的宽度。但对于英文，min-content 是最长单词的宽度。' },
      { type: 'heading', text: 'max-content 宽度详解' },
      { type: 'paragraph', text: 'max-content 宽度是单元格内容在不强制换行的情况下占据的宽度。这代表了内容的"理想"宽度，即不考虑空间限制时内容想要占据的宽度。' },
      { type: 'code', code: `/* 文本的 max-content */
<div style="display: table-cell;">
  This is a long sentence that would prefer not to wrap.
</div>

/* max-content = 整句话不换行时的宽度 */

/* 多行文本的 max-content */
<div style="display: table-cell;">
  Line 1: short
  Line 2: this is a much longer line
  Line 3: medium
</div>

/* max-content = 最长那行（Line 2）不换行时的宽度 */`, lang: 'html', caption: 'max-content 代表内容的理想宽度' },
      { type: 'heading', text: '固定布局算法详解' },
      { type: 'paragraph', text: 'table-layout: fixed 的算法非常简单：只看第一行单元格或 `<col>` 元素的 width 值，后续所有行都使用相同的列宽。这使得浏览器可以在接收到第一行后立即开始渲染。' },
      { type: 'example', title: '固定布局只看首行', code: `/* 固定布局算法 */
.table-fixed {
  display: table;
  table-layout: fixed;
  width: 600px;
}

/* HTML 第一行 */
<div class="table-fixed">
  <div style="display: table-row;">
    <div style="display: table-cell; width: 200px;">列1</div>
    <div style="display: table-cell; width: 150px;">列2</div>
    <div style="display: table-cell;">列3（auto）</div>
  </div>
  <!-- 后续行的内容完全不影响列宽 -->
  <div style="display: table-row;">
    <div style="display: table-cell;">这里有超级超级超级长的内容</div>
    <div style="display: table-cell;">内容</div>
    <div style="display: table-cell;">内容</div>
  </div>
</div>

/* 列1: 200px, 列2: 150px, 列3: 600-200-150=250px */
/* 第二行的长内容会被限制在 200px 宽度内 */`, lang: 'html', explanation: '固定布局完全忽略后续行的内容。无论后续单元格内容多长，列宽都不会改变。' },
      { type: 'warning', text: '固定布局下，如果首行没有指定列宽，浏览器会为所有列分配相等宽度。即使后续行有很长的内容，也不会影响列宽。' },
      { type: 'heading', text: '未指定宽度列的空间分配' },
      { type: 'paragraph', text: '在固定布局中，如果某些列没有指定 width，这些列会平均分配剩余空间。在自动布局中，未指定 width 的列会根据内容的 min-content 和 max-content 智能分配。' },
      { type: 'code', code: `/* 固定布局：平均分配 */
.table {
  table-layout: fixed;
  width: 600px;
}
/* 列1: 200px, 列2和列3未指定 */
/* 列2: (600-200)/2 = 200px */
/* 列3: (600-200)/2 = 200px */

/* 自动布局：按内容比例分配 */
.table {
  table-layout: auto;
  width: 600px;
}
/* 列1: 200px（指定）, 列2和列3未指定 */
/* 浏览器分析列2和列3的内容 */
/* 如果列2的 max-content = 300px, 列3的 max-content = 150px */
/* 则列2获得更多剩余空间：约 266px vs 133px */`, lang: 'css', caption: 'fixed 平均分配，auto 按内容比例分配' },
      { type: 'heading', text: 'colspan 跨列单元格的宽度分配' },
      { type: 'paragraph', text: '当单元格跨越多列时（colspan），自动布局算法需要将该单元格的宽度需求分配给被跨越的各列。分配策略是按各列的 max-content 比例分配。' },
      { type: 'example', title: 'colspan 宽度分配', code: `<div style="display: table; table-layout: auto;">
  <div style="display: table-row;">
    <div style="display: table-cell; colspan: 2;">
      这是一个跨越两列的超长内容单元格
    </div>
  </div>
  <div style="display: table-row;">
    <div style="display: table-cell;">列1短内容</div>
    <div style="display: table-cell;">列2也是短内容</div>
  </div>
</div>

/* 浏览器会计算第一行跨列单元格的 min-content */
/* 然后按列1和列2的现有 max-content 比例分配这个宽度 */
/* 如果列1:列2 = 1:2，则跨列单元格的宽度按 1:2 分配 */`, lang: 'html', explanation: 'colspan 单元格的宽度需求会影响所跨越的各列，但分配比例取决于各列原有的内容宽度。' },
      { type: 'heading', text: '表格高度算法' },
      { type: 'paragraph', text: '表格高度的计算相对简单：先确定每行的高度（由该行最高的单元格决定），然后将所有行高相加。单元格的 height 属性设置的是最小高度。' },
      { type: 'code', code: `/* 行高由最高单元格决定 */
<div style="display: table;">
  <div style="display: table-row;">
    <div style="display: table-cell; height: 50px;">A</div>
    <div style="display: table-cell; height: 100px;">B（最高）</div>
    <div style="display: table-cell;">C</div>
  </div>
</div>

/* 这一行的实际高度 = 100px */
/* 单元格 A 和 C 也会被拉伸到 100px */

/* 如果内容超过指定高度 */
<div style="display: table-cell; height: 50px;">
  <div style="height: 200px;">高内容</div>
</div>

/* 单元格的实际高度 = 200px（内容高度）*/
/* height 属性只是最小值约束 */`, lang: 'html', caption: '行高由最高单元格决定，height 是最小约束' },
      { type: 'heading', text: 'rowspan 跨行单元格的高度分配' },
      { type: 'paragraph', text: '当单元格跨越多行时（rowspan），该单元格的高度需求会分配给被跨越的各行。分配策略是优先满足各行自身的高度需求，剩余部分平均分配。' },
      { type: 'example', title: 'rowspan 高度分配', code: `<div style="display: table;">
  <div style="display: table-row;">
    <div style="display: table-cell; rowspan: 3; height: 300px;">
      跨3行单元格，最小高度 300px
    </div>
    <div style="display: table-cell;">行1内容</div>
  </div>
  <div style="display: table-row;">
    <div style="display: table-cell;">行2内容</div>
  </div>
  <div style="display: table-row;">
    <div style="display: table-cell;">行3内容</div>
  </div>
</div>

/* 如果行1、2、3的内容高度分别是 50px, 60px, 70px（总计 180px）*/
/* 跨行单元格需要 300px，剩余 300-180=120px 平均分配给3行 */
/* 最终：行1=50+40=90px, 行2=60+40=100px, 行3=70+40=110px */`, lang: 'html', explanation: 'rowspan 单元格的高度需求会推高所跨越的行，但会尽量按各行原有高度比例分配。' },
      { type: 'heading', text: '百分比宽度的处理' },
      { type: 'paragraph', text: '百分比宽度在固定布局和自动布局中的处理方式不同。固定布局中，百分比直接相对于表格宽度计算；自动布局中，百分比作为约束参与宽度分配。' },
      { type: 'code', code: `/* 固定布局：百分比直接计算 */
.table-fixed {
  table-layout: fixed;
  width: 600px;
}
.col1 { width: 30%; } /* = 180px */
.col2 { width: 50%; } /* = 300px */
.col3 { width: 20%; } /* = 120px */

/* 自动布局：百分比作为约束 */
.table-auto {
  table-layout: auto;
  width: 600px;
}
.col1 { width: 30%; } /* 至少 180px，但如果内容更宽可能会超过 */
.col2 { width: 50%; } /* 至少 300px */
/* 如果内容无法容纳在百分比宽度内，列宽会增大 */`, lang: 'css', caption: 'fixed 布局严格遵守百分比，auto 布局将其作为最小约束' },
      { type: 'heading', text: '实战：性能对比 auto vs fixed' },
      { type: 'paragraph', text: '通过一个实际场景来体会固定布局的性能优势。对于大型表格（100+ 行），固定布局的渲染速度可以快 10 倍以上，因为浏览器无需等待全部内容加载。' },
      { type: 'example', title: '大型表格的性能优化', code: `/* 性能测试场景：1000 行数据表格 */

/* 方案 A：自动布局（慢）*/
.slow-table {
  table-layout: auto;
  /* 浏览器必须：
     1. 加载全部 1000 行
     2. 遍历所有单元格计算 min/max-content
     3. 运行宽度分配算法
     4. 开始渲染
     耗时：可能 500ms+ */
}

/* 方案 B：固定布局（快）*/
.fast-table {
  table-layout: fixed;
  width: 100%;
}
.fast-table .col-id { width: 10%; }
.fast-table .col-name { width: 30%; }
.fast-table .col-email { width: 40%; }
.fast-table .col-actions { width: 20%; }

/* 浏览器只需：
   1. 读取第一行的列宽
   2. 立即开始渲染（流式渲染）
   耗时：可能 50ms */

/* 性能提升：10 倍+ */`, lang: 'css', explanation: '固定布局允许浏览器在接收数据流的同时逐行渲染，而自动布局必须等待全部内容加载完成。' },
      { type: 'tip', text: '实践建议：对于行数 >50 的数据表格，始终使用 table-layout: fixed 以获得更好的性能和用户体验。在首行或 `<col>` 元素中明确指定列宽，避免内容抖动。' },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {
  'tables': 'table-model',
  'table-display': 'table-model',
  'anonymous-boxes': 'table-model',
  'model': 'table-model',
  'caption': 'table-visual',
  'width-layout': 'table-visual',
  'height-layout': 'table-visual',
  'columns': 'table-visual',
  'borders': 'table-borders',
  'border-conflict-resolution': 'table-borders',
  'separated-borders': 'table-borders',
  'collapsing': 'table-borders',
  'fixed-table-layout': 'table-layout-algo',
  'auto-table-layout': 'table-layout-algo',
};

// ============================================================
// 属性定义
// ============================================================

const CSS2_TABLES = 'https://www.w3.org/TR/CSS22/tables.html';

export const propertyTerms: Record<string, PropertyEntry> = {
  'table-layout': {
    zh: '表格布局',
    value: 'auto | fixed',
    initial: 'auto',
    appliesTo: 'table 和 inline-table 元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: CSS2_TABLES,
    css3Url: undefined,
    sectionRef: 'tables#table-visual',
  },
  'border-collapse': {
    zh: '边框合并',
    value: 'collapse | separate',
    initial: 'separate',
    appliesTo: 'table 和 inline-table 元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: CSS2_TABLES,
    css3Url: undefined,
    sectionRef: 'tables#table-borders',
  },
  'border-spacing': {
    zh: '边框间距',
    value: '<length> <length>?',
    initial: '0',
    appliesTo: 'table 和 inline-table 元素',
    inherited: true,
    percentages: null,
    computedValue: '两个绝对长度值',
    css2Url: CSS2_TABLES,
    css3Url: undefined,
    sectionRef: 'tables#table-borders',
  },
  'empty-cells': {
    zh: '空单元格',
    value: 'show | hide',
    initial: 'show',
    appliesTo: 'table-cell 元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: CSS2_TABLES,
    css3Url: undefined,
    sectionRef: 'tables#table-borders',
  },
  'caption-side': {
    zh: '标题位置',
    value: 'top | bottom',
    initial: 'top',
    appliesTo: 'table-caption 元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: CSS2_TABLES,
    css3Url: undefined,
    sectionRef: 'tables#table-visual',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'table box': {
    zh: '表格盒',
    description:
      'display: table 生成的块级盒子，作为表格的主容器。表格盒建立新的块格式化上下文。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'inline table box': {
    zh: '内联表格盒',
    description:
      'display: inline-table 生成的内联级盒子，表现为内联元素但内部为表格格式化上下文。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'table row': {
    zh: '表格行',
    description:
      'display: table-row 的元素，包含一行表格单元格。行的高度由该行中最高的单元格决定。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'table row group': {
    zh: '表格行组',
    description:
      'display: table-row-group、table-header-group 或 table-footer-group 的元素，将多行分组。对应 HTML 的 tbody、thead、tfoot。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'table column': {
    zh: '表格列',
    description:
      'display: table-column 的元素，代表一列单元格。列元素不生成盒子，仅作为属性占位符（width、border、background、visibility）。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'table column group': {
    zh: '表格列组',
    description:
      'display: table-column-group 的元素，将多列分组。对应 HTML 的 colgroup 元素。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'table cell': {
    zh: '表格单元格',
    description:
      'display: table-cell 的元素，包含表格内容。单元格建立块格式化上下文，可包含块级内容。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'table caption': {
    zh: '表格标题',
    description:
      'display: table-caption 的元素，生成表格的标题盒。标题位置由 caption-side 属性控制（top 或 bottom）。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'anonymous table object': {
    zh: '匿名表格对象',
    description:
      '当表格元素的层次结构不完整时（如 table-cell 缺少 table-row 父元素），CSS 自动生成的匿名盒子以补全表格结构。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'separated borders model': {
    zh: '分离边框模型',
    description:
      'border-collapse: separate 时的边框模型。每个单元格有独立边框，单元格之间的间距由 border-spacing 控制。',
    sectionRef: 'tables#table-borders',
    css2Url: CSS2_TABLES,
  },
  'collapsed borders model': {
    zh: '合并边框模型',
    description:
      'border-collapse: collapse 时的边框模型。相邻单元格共享边框，边框冲突按优先级规则（hidden > 宽度 > 样式 > 来源）解决。',
    sectionRef: 'tables#table-borders',
    css2Url: CSS2_TABLES,
  },
  'fixed table layout': {
    zh: '固定表格布局',
    description:
      'table-layout: fixed 时的布局算法。列宽由首行单元格或 col 元素的 width 决定，性能优于自动布局，可在接收到首行后立即渲染。',
    sectionRef: 'tables#table-layout-algo',
    css2Url: CSS2_TABLES,
  },
  'auto table layout': {
    zh: '自动表格布局',
    description:
      'table-layout: auto 时的布局算法。列宽根据所有单元格内容动态计算，需分析最小宽度（min-content）和最大宽度（max-content）。',
    sectionRef: 'tables#table-layout-algo',
    css2Url: CSS2_TABLES,
  },
  'table layer': {
    zh: '表格层',
    description:
      '表格的渲染分为多个层次：表格 → 列组 → 列 → 行组 → 行 → 单元格。背景和边框按此顺序从下到上绘制。',
    sectionRef: 'tables#table-model',
    css2Url: CSS2_TABLES,
  },
  'min-content width': {
    zh: '最小内容宽度',
    description:
      '单元格内容不溢出的最小宽度。对于文本，按最长单词或不可断行片段计算。用于自动表格布局算法的第一步。',
    sectionRef: 'tables#table-layout-algo',
    css2Url: CSS2_TABLES,
  },
  'max-content width': {
    zh: '最大内容宽度',
    description:
      '单元格内容在不强制换行情况下的宽度。用于自动表格布局算法，表示单元格内容的"理想"宽度。',
    sectionRef: 'tables#table-layout-algo',
    css2Url: CSS2_TABLES,
  },
};
