import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';

export const sections: Section[] = [
  {
    id: 'intro',
    number: '1',
    title: { zh: '简介', en: 'Introduction' },
    summary: { zh: 'CSS 通过属性来控制文档的渲染。每个属性有名称、值域和行为定义。', en: 'CSS controls document rendering through properties. Each property has a name, value domain, and behavior definition.' },
    keyPoints: [
      'CSS 属性定义了元素的视觉表现',
      '层叠机制解决多个规则冲突的问题',
      '继承机制让某些属性值从父元素传递到子元素',
    ],
  },
  {
    id: 'at-import',
    number: '2',
    title: { zh: '导入样式表', en: '@import' },
    summary: { zh: '@import 规则允许从其他样式表导入规则。导入的样式表被视为在 @import 位置展开。', en: 'The @import rule allows importing rules from other stylesheets. Imported stylesheets are treated as expanded at the @import position.' },
    keyPoints: [
      '@import 必须在样式表最前面(除了 @charset)',
      '可以添加媒体查询条件',
      '支持 supports() 条件判断',
    ],
  },
  {
    id: 'shorthand',
    number: '3',
    title: { zh: '简写属性', en: 'Shorthand Properties' },
    summary: { zh: '简写属性允许同时设置多个相关属性的值。未指定的子属性会被重置为初始值。', en: 'Shorthand properties allow setting multiple related property values simultaneously. Unspecified sub-properties are reset to initial values.' },
    keyPoints: [
      '简写属性会重置所有子属性',
      'all 属性可以重置几乎所有属性',
      '使用简写时要注意意外重置',
    ],
  },
  {
    id: 'value-stages',
    number: '4',
    title: { zh: '值的处理', en: 'Value Processing' },
    summary: { zh: '从声明值到实际值的完整流程:declared → cascaded → specified → computed → used → actual', en: 'The complete process from declared value to actual value: declared → cascaded → specified → computed → used → actual' },
    keyPoints: [
      'Declared Value: 所有适用的声明值',
      'Cascaded Value: 层叠后的获胜值',
      'Specified Value: 默认处理后的值',
      'Computed Value: 继承传递的值',
      'Used Value: 布局计算后的值',
      'Actual Value: 渲染时的最终值',
    ],
  },
  {
    id: 'filtering',
    number: '5',
    title: { zh: '过滤', en: 'Filtering' },
    summary: { zh: '确定哪些声明适用于哪些元素。声明必须来自适用的样式表、匹配的选择器、有效的语法。', en: 'Determines which declarations apply to which elements. Declarations must come from applicable stylesheets, matching selectors, and valid syntax.' },
    keyPoints: [
      '样式表必须当前适用于文档',
      '条件规则(@media, @supports)必须匹配',
      '选择器必须匹配元素',
      '声明语法必须有效',
    ],
  },
  {
    id: 'cascading',
    number: '6',
    title: { zh: '层叠', en: 'Cascading' },
    summary: { zh: '当多个声明作用于同一属性时,按来源、重要性、特异性、顺序决定最终值。', en: 'When multiple declarations affect the same property, the final value is determined by origin, importance, specificity, and order.' },
    keyPoints: [
      '来源优先级:Transition > !important UA > !important User > !important Author > Animation > Author > User > UA',
      '特异性:(ID, Class, Type) 三元组比较',
      '顺序:后声明的优先',
    ],
  },
  {
    id: 'defaulting',
    number: '7',
    title: { zh: '默认值', en: 'Defaulting' },
    summary: { zh: '当层叠没有结果时,通过继承或初始值确定属性值。可以使用 initial、inherit、unset、revert 关键字。', en: 'When cascading yields no result, property values are determined through inheritance or initial values. Keywords initial, inherit, unset, and revert can be used.' },
    keyPoints: [
      'initial: 使用属性的初始值',
      'inherit: 强制继承父元素的值',
      'unset: 继承属性用 inherit,否则用 initial',
      'revert: 回滚到上一个来源的值',
    ],
  },
];

export const anchors: Record<string, string> = {
  'cascade': 'cascading',
  'specificity': 'cascading',
  'important-rules': 'cascading',
  'inheritance': 'defaulting',
  'initial-value': 'value-stages',
  'specified-value': 'value-stages',
  'computed-value': 'value-stages',
  'computed-values': 'value-stages',
  'actual-value': 'value-stages',
  'usedValue': 'value-stages',
  'used-value': 'value-stages',
  'at-import': 'at-import',
};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'cascading': {
    zh: '层叠',
    description: '当多条规则试图设置同一元素的同一属性时,层叠机制按来源、重要性、特异性和顺序决定最终值。',
    sectionRef: 'cascade#cascading',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#cascade',
    specUrl: 'https://www.w3.org/TR/css-cascade-4/#cascading',
  },
  'specificity': {
    zh: '特异性(优先级)',
    description: '选择器的权重三元组 (ID, Class, Type),用于在层叠中比较同一来源、同一重要性的声明的优先级。',
    sectionRef: 'cascade#cascading',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#specificity',
    specUrl: 'https://www.w3.org/TR/selectors-4/#specificity',
  },
  'inheritance': {
    zh: '继承',
    description: '某些 CSS 属性(如 color、font-size)会自动从父元素传递到子元素,无需显式声明。',
    sectionRef: 'cascade#defaulting',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#inheritance',
    specUrl: 'https://www.w3.org/TR/css-cascade-4/#inheriting',
  },
  'specified value': {
    zh: '指定值',
    description: '经过层叠和默认处理后确定的属性值。如果层叠有结果就用层叠值,否则用继承值或初始值。',
    sectionRef: 'cascade#value-stages',
  },
  'computed value': {
    zh: '计算值',
    description: '将指定值中的相对值(如 em、百分比)转换为绝对值的结果。计算值是继承时传递给子元素的值。',
    sectionRef: 'cascade#value-stages',
  },
  'used value': {
    zh: '使用值',
    description: '将计算值应用到布局后的最终值。例如 width: 50% 在包含块宽度 800px 时,使用值为 400px。',
    sectionRef: 'cascade#value-stages',
  },
  'shorthand property': {
    zh: '简写属性',
    description: '同时设置多个相关属性的简写形式,如 margin、background、border。注意简写会重置所有子属性。',
    sectionRef: 'cascade#shorthand',
  },
  'declared value': {
    zh: '声明值',
    description: '对某元素的某个属性,所有匹配该元素的声明中给出的值的集合。是层叠处理的输入。',
    sectionRef: 'cascade#value-stages',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#value-def-declared',
  },
  'cascaded value': {
    zh: '层叠值',
    description: '经过层叠排序后胜出的那个声明值。如果没有声明,则该属性没有层叠值。',
    sectionRef: 'cascade#value-stages',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#value-def-cascaded',
  },
  'actual value': {
    zh: '实际值',
    description: '使用值经过最终环境限制(如屏幕分辨率、可用字体)调整后的值。浏览器实际用于渲染的最终值。',
    sectionRef: 'cascade#value-stages',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#actual-value',
  },
  'cascade origin': {
    zh: '层叠来源',
    description: '声明的来源分类:User-Agent(浏览器默认)、User(用户样式)、Author(开发者样式)。不同来源有不同的优先级。',
    sectionRef: 'cascade#cascading',
    specUrl: 'https://www.w3.org/TR/css-cascade-4/#origin',
  },
  'author origin': {
    zh: '作者来源',
    description: '开发者编写的样式表的层叠来源,包括 <style> 标签、外部 CSS 文件和行内样式。',
    sectionRef: 'cascade#cascading',
  },
  'user origin': {
    zh: '用户来源',
    description: '用户通过浏览器设置自定义的样式表的层叠来源。优先级低于作者来源(非 !important 时)。',
    sectionRef: 'cascade#cascading',
  },
  'user-agent origin': {
    zh: '用户代理来源',
    description: '浏览器内置的默认样式表的层叠来源。优先级最低(非 !important 时),定义了元素的默认外观。',
    sectionRef: 'cascade#cascading',
  },
  'important': {
    zh: '重要声明',
    description: '用 !important 标记的声明。重要声明的层叠优先级顺序与普通声明相反:UA > User > Author。',
    sectionRef: 'cascade#cascading',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#important-rules',
  },
  'shorthand properties': {
    zh: '简写属性',
    description: '一次性设置多个相关子属性的属性,如 margin、background、font。简写会重置所有子属性,包括未显式指定的。',
    sectionRef: 'cascade#shorthand',
    css2Url: 'https://www.w3.org/TR/CSS22/about.html#shorthand',
  },
  'longhand sub-properties': {
    zh: '子属性',
    description: '简写属性展开后对应的各个独立属性。如 border 的子属性包括 border-width、border-style、border-color。',
    sectionRef: 'cascade#shorthand',
  },
};
