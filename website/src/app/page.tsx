import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  BookOpen, 
  Layers, 
  Layout, 
  Palette, 
  Sparkles, 
  Zap,
  FileText,
  ArrowRight,
  Github,
  ExternalLink
} from 'lucide-react';

// 学习模块数据
const stages = [
  {
    id: 'foundation',
    title: '核心基础',
    icon: BookOpen,
    description: '理解 CSS 的底层原理',
    modules: [
      { id: 'cascade', title: 'Cascade & Inheritance', desc: '层叠与继承', status: 'current', specs: 2 },
      { id: 'box-model', title: 'Box Model', desc: '盒模型', status: 'locked', specs: 2 },
      { id: 'display', title: 'Display', desc: '显示类型与格式化上下文', status: 'locked', specs: 2 },
      { id: 'values', title: 'Values & Units', desc: '值与单位', status: 'locked', specs: 2 },
      { id: 'selectors', title: 'Selectors', desc: '选择器', status: 'locked', specs: 2 },
    ],
  },
  {
    id: 'layout',
    title: '布局系统',
    icon: Layout,
    description: '掌握现代布局技术',
    modules: [
      { id: 'flexbox', title: 'Flexbox', desc: '弹性布局', status: 'locked', specs: 1 },
      { id: 'grid', title: 'Grid', desc: '网格布局', status: 'locked', specs: 2 },
      { id: 'position', title: 'Positioning', desc: '定位', status: 'locked', specs: 1 },
      { id: 'alignment', title: 'Box Alignment', desc: '对齐', status: 'locked', specs: 1 },
    ],
  },
  {
    id: 'visual',
    title: '视觉样式',
    icon: Palette,
    description: '让页面更美观',
    modules: [
      { id: 'colors', title: 'Colors', desc: '颜色系统', status: 'locked', specs: 2 },
      { id: 'backgrounds', title: 'Backgrounds & Borders', desc: '背景与边框', status: 'locked', specs: 1 },
      { id: 'typography', title: 'Typography', desc: '字体与文本', status: 'locked', specs: 2 },
    ],
  },
  {
    id: 'motion',
    title: '动画与变换',
    icon: Sparkles,
    description: '让页面动起来',
    modules: [
      { id: 'transforms', title: 'Transforms', desc: '变换', status: 'locked', specs: 2 },
      { id: 'transitions', title: 'Transitions', desc: '过渡', status: 'locked', specs: 2 },
      { id: 'animations', title: 'Animations', desc: '动画', status: 'locked', specs: 1 },
    ],
  },
  {
    id: 'advanced',
    title: '高级特性',
    icon: Zap,
    description: '现代 CSS 新特性',
    modules: [
      { id: 'variables', title: 'Custom Properties', desc: 'CSS 变量', status: 'locked', specs: 1 },
      { id: 'layers', title: 'Cascade Layers', desc: '层叠层', status: 'locked', specs: 1 },
      { id: 'container', title: 'Container Queries', desc: '容器查询', status: 'locked', specs: 1 },
    ],
  },
];

const stats = [
  { label: '规范文档', value: '32', icon: FileText },
  { label: '学习模块', value: '17', icon: BookOpen },
  { label: '交互示例', value: '100+', icon: Layers },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CSS</span>
            </div>
            <span className="font-semibold">CSS Quest</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/playground" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              演练场
            </Link>
            <Link href="https://www.w3.org/Style/CSS/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              W3C 规范 <ExternalLink className="w-3 h-3" />
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            基于 W3C 官方规范
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            系统化学习 CSS
            <br />
            <span className="text-primary">理解原理，而非死记规则</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            CSS 规则太多记不住？那是因为只记住了「是什么」，却没理解「为什么」。
            这个项目直接从 W3C 官方规范入手，帮你建立完整的 CSS 知识体系。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/modules/cascade">
                开始学习 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Learning Path */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">学习路线</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            按照 CSS 规范的逻辑顺序，从核心概念到高级特性，循序渐进
          </p>
        </div>

        <div className="space-y-12">
          {stages.map((stage, stageIndex) => (
            <div key={stage.id}>
              {/* Stage Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stage.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    阶段 {stageIndex + 1}: {stage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              </div>

              {/* Module Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-[52px]">
                {stage.modules.map((module) => {
                  const isLocked = module.status === 'locked';
                  const isCurrent = module.status === 'current';
                  
                  return (
                    <Card 
                      key={module.id}
                      className={`group transition-all ${
                        isLocked 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'hover:shadow-md hover:border-primary/50 cursor-pointer'
                      } ${isCurrent ? 'border-primary ring-1 ring-primary/20' : ''}`}
                    >
                      {isLocked ? (
                        <div className="p-6">
                          <CardHeader className="p-0 mb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{module.title}</CardTitle>
                              <Badge variant="secondary" className="text-xs">即将推出</Badge>
                            </div>
                            <CardDescription>{module.desc}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-0">
                            <div className="text-xs text-muted-foreground">
                              {module.specs} 个规范文档
                            </div>
                          </CardContent>
                        </div>
                      ) : (
                        <Link href={`/modules/${module.id}`}>
                          <div className="p-6">
                            <CardHeader className="p-0 mb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base group-hover:text-primary transition-colors">
                                  {module.title}
                                </CardTitle>
                                {isCurrent && <Badge>当前</Badge>}
                              </div>
                              <CardDescription>{module.desc}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                              <div className="text-xs text-muted-foreground flex items-center justify-between">
                                <span>{module.specs} 个规范文档</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </CardContent>
                          </div>
                        </Link>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30">
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            从 Cascade & Inheritance 开始，理解 CSS 最核心的工作原理
          </p>
          <Button asChild size="lg">
            <Link href="/modules/cascade">
              开始第一个模块 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            基于 W3C CSS 规范 · 持续更新中
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href="https://www.w3.org/Style/CSS/" 
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              W3C CSS
            </Link>
            <Link 
              href="https://developer.mozilla.org/en-US/docs/Web/CSS" 
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              MDN
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
