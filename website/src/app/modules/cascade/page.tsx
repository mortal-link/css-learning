import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  BookOpen,
  Lightbulb,
  Code,
  FileText
} from 'lucide-react';

// 章节数据
const sections = [
  {
    id: 'intro',
    number: '1',
    title: 'Introduction',
    titleZh: '简介',
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
    title: '@import',
    titleZh: '导入样式表',
    summary: '@import 规则允许从其他样式表导入规则。导入的样式表被视为在 @import 位置展开。',
    keyPoints: [
      '@import 必须在样式表最前面（除了 @charset）',
      '可以添加媒体查询条件',
      '支持 supports() 条件判断',
    ],
  },
  {
    id: 'shorthand',
    number: '3',
    title: 'Shorthand Properties',
    titleZh: '简写属性',
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
    title: 'Value Processing',
    titleZh: '值的处理',
    summary: '从声明值到实际值的完整流程：declared → cascaded → specified → computed → used → actual',
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
    title: 'Filtering',
    titleZh: '过滤',
    summary: '确定哪些声明适用于哪些元素。声明必须来自适用的样式表、匹配的选择器、有效的语法。',
    keyPoints: [
      '样式表必须当前适用于文档',
      '条件规则（@media, @supports）必须匹配',
      '选择器必须匹配元素',
      '声明语法必须有效',
    ],
  },
  {
    id: 'cascading',
    number: '6',
    title: 'Cascading',
    titleZh: '层叠',
    summary: '当多个声明作用于同一属性时，按来源、重要性、特异性、顺序决定最终值。',
    keyPoints: [
      '来源优先级：Transition > !important UA > !important User > !important Author > Animation > Author > User > UA',
      '特异性：(ID, Class, Type) 三元组比较',
      '顺序：后声明的优先',
    ],
  },
  {
    id: 'defaulting',
    number: '7',
    title: 'Defaulting',
    titleZh: '默认值',
    summary: '当层叠没有结果时，通过继承或初始值确定属性值。可以使用 initial、inherit、unset、revert 关键字。',
    keyPoints: [
      'initial: 使用属性的初始值',
      'inherit: 强制继承父元素的值',
      'unset: 继承属性用 inherit，否则用 initial',
      'revert: 回滚到上一个来源的值',
    ],
  },
];

export default function CascadePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground">Module 01 / 17</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">目录</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <nav className="space-y-1">
                      {sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                        >
                          <span className="text-muted-foreground w-4">{section.number}.</span>
                          <span>{section.titleZh}</span>
                        </a>
                      ))}
                    </nav>
                  </ScrollArea>
                  
                  <Separator className="my-4" />
                  
                  <a
                    href="https://www.w3.org/TR/css-cascade-4/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    查看原始规范
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-8">
            {/* Module Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline">Module 01</Badge>
                <Badge>当前学习</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">Cascade & Inheritance</h1>
              <p className="text-lg text-muted-foreground">
                层叠与继承 — CSS 的核心工作原理
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">
                  <FileText className="w-3 h-3 mr-1" />
                  css-cascade-4
                </Badge>
                <Badge variant="secondary">
                  <FileText className="w-3 h-3 mr-1" />
                  css-cascade-5
                </Badge>
              </div>
            </div>

            {/* Key Concept */}
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  核心概念
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  CSS 的 &quot;C&quot; 代表 <strong className="text-foreground">Cascading（层叠）</strong>。
                  当多条规则试图为同一个元素/属性设置值时，层叠机制决定哪条规则胜出。
                  理解层叠是掌握 CSS 的关键。
                </p>
              </CardContent>
            </Card>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <Card key={section.id} id={section.id} className="scroll-mt-20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {section.number}
                        </span>
                        <div>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                          <CardDescription>{section.titleZh}</CardDescription>
                        </div>
                      </div>
                      <a
                        href={`https://www.w3.org/TR/css-cascade-4/#${section.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title="查看规范原文"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{section.summary}</p>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="key-points" className="border-none">
                        <AccordionTrigger className="py-2 text-sm hover:no-underline">
                          <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            要点总结
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {section.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="demo" className="border-none">
                        <AccordionTrigger className="py-2 text-sm hover:no-underline">
                          <span className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            交互示例
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
                            交互示例开发中...
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t">
              <div className="text-muted-foreground text-sm">
                ← 上一模块
              </div>
              <Button asChild>
                <Link href="/modules/box-model">
                  下一模块：Box Model
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
