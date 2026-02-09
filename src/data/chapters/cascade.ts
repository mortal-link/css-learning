import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';

export const sections: Section[] = [
  {
    id: 'intro',
    number: '1',
    title: { zh: '简介', en: 'Introduction' },
    summary: 'CSS 通过属性来控制文档的渲染。每个属性有名称、值域和行为定义。',
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
    summary:
      '@import 规则允许从其他样式表导入规则。导入的样式表被视为在 @import 位置展开。',
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
    summary: '简写属性允许同时设置多个相关属性的值。未指定的子属性会被重置为初始值。',
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
    summary:
      '从声明值到实际值的完整流程:declared → cascaded → specified → computed → used → actual',
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
    summary:
      '确定哪些声明适用于哪些元素。声明必须来自适用的样式表、匹配的选择器、有效的语法。',
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
    summary: '当多个声明作用于同一属性时,按来源、重要性、特异性、顺序决定最终值。',
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
    summary:
      '当层叠没有结果时,通过继承或初始值确定属性值。可以使用 initial、inherit、unset、revert 关键字。',
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
};
