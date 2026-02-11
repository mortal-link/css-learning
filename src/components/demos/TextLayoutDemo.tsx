'use client'

import { useState } from 'react'

type TextAlign = 'left' | 'center' | 'right' | 'justify'
type TextDecoration = 'none' | 'underline' | 'line-through' | 'overline'
type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

interface TextLayoutState {
  textAlign: TextAlign
  textIndent: number
  letterSpacing: number
  wordSpacing: number
  lineHeight: number
  textDecoration: TextDecoration
  textTransform: TextTransform
}

export function TextLayoutDemo() {
  const [state, setState] = useState<TextLayoutState>({
    textAlign: 'left',
    textIndent: 0,
    letterSpacing: 0,
    wordSpacing: 0,
    lineHeight: 1.5,
    textDecoration: 'none',
    textTransform: 'none',
  })

  const sampleText = 'CSS 文本排版（Typography）是网页设计的核心。通过 text-align、letter-spacing 和 line-height 等属性，我们可以精确控制文本的视觉呈现。Good typography makes content readable and beautiful.'

  const presets = {
    default: {
      textAlign: 'left' as TextAlign,
      textIndent: 0,
      letterSpacing: 0,
      wordSpacing: 0,
      lineHeight: 1.5,
      textDecoration: 'none' as TextDecoration,
      textTransform: 'none' as TextTransform,
    },
    letter: {
      textAlign: 'left' as TextAlign,
      textIndent: 32,
      letterSpacing: 0,
      wordSpacing: 0,
      lineHeight: 1.8,
      textDecoration: 'none' as TextDecoration,
      textTransform: 'none' as TextTransform,
    },
    compact: {
      textAlign: 'left' as TextAlign,
      textIndent: 0,
      letterSpacing: -0.5,
      wordSpacing: -2,
      lineHeight: 1.2,
      textDecoration: 'none' as TextDecoration,
      textTransform: 'none' as TextTransform,
    },
    decorative: {
      textAlign: 'center' as TextAlign,
      textIndent: 0,
      letterSpacing: 3,
      wordSpacing: 5,
      lineHeight: 2,
      textDecoration: 'none' as TextDecoration,
      textTransform: 'uppercase' as TextTransform,
    },
  }

  const generateCSS = () => {
    const css: string[] = []
    if (state.textAlign !== 'left') css.push(`text-align: ${state.textAlign};`)
    if (state.textIndent !== 0) css.push(`text-indent: ${state.textIndent}px;`)
    if (state.letterSpacing !== 0) css.push(`letter-spacing: ${state.letterSpacing}px;`)
    if (state.wordSpacing !== 0) css.push(`word-spacing: ${state.wordSpacing}px;`)
    if (state.lineHeight !== 1.5) css.push(`line-height: ${state.lineHeight};`)
    if (state.textDecoration !== 'none') css.push(`text-decoration: ${state.textDecoration};`)
    if (state.textTransform !== 'none') css.push(`text-transform: ${state.textTransform};`)
    return css.join('\n')
  }

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setState(presets.default)}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          默认
        </button>
        <button
          onClick={() => setState(presets.letter)}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          书信
        </button>
        <button
          onClick={() => setState(presets.compact)}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          紧凑
        </button>
        <button
          onClick={() => setState(presets.decorative)}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          装饰
        </button>
      </div>

      {/* Text Preview */}
      <div
        className="w-full min-h-[200px] bg-background border border-border rounded-lg p-6"
        style={{
          textAlign: state.textAlign,
          textIndent: `${state.textIndent}px`,
          letterSpacing: `${state.letterSpacing}px`,
          wordSpacing: `${state.wordSpacing}px`,
          lineHeight: state.lineHeight,
          textDecoration: state.textDecoration,
          textTransform: state.textTransform,
        }}
      >
        {sampleText}
      </div>

      {/* Controls Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Sliders */}
        <div className="space-y-4">
          {/* Text Indent */}
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              首行缩进 (text-indent): {state.textIndent}px
            </label>
            <input
              type="range"
              min="0"
              max="80"
              step="1"
              value={state.textIndent}
              onChange={(e) => setState({ ...state, textIndent: Number(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              字母间距 (letter-spacing): {state.letterSpacing}px
            </label>
            <input
              type="range"
              min="-2"
              max="10"
              step="0.5"
              value={state.letterSpacing}
              onChange={(e) => setState({ ...state, letterSpacing: Number(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Word Spacing */}
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              单词间距 (word-spacing): {state.wordSpacing}px
            </label>
            <input
              type="range"
              min="-5"
              max="20"
              step="1"
              value={state.wordSpacing}
              onChange={(e) => setState({ ...state, wordSpacing: Number(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Line Height */}
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              行高 (line-height): {state.lineHeight.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={state.lineHeight}
              onChange={(e) => setState({ ...state, lineHeight: Number(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Right Column - Button Groups */}
        <div className="space-y-4">
          {/* Text Align */}
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              文本对齐 (text-align)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['left', 'center', 'right', 'justify'] as TextAlign[]).map((align) => (
                <button
                  key={align}
                  onClick={() => setState({ ...state, textAlign: align })}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    state.textAlign === align
                      ? 'bg-blue-500 dark:bg-blue-600 text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {align === 'left' ? '左' : align === 'center' ? '中' : align === 'right' ? '右' : '两端'}
                </button>
              ))}
            </div>
          </div>

          {/* Text Decoration */}
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              文本装饰 (text-decoration)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['none', 'underline', 'line-through', 'overline'] as TextDecoration[]).map((decoration) => (
                <button
                  key={decoration}
                  onClick={() => setState({ ...state, textDecoration: decoration })}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    state.textDecoration === decoration
                      ? 'bg-blue-500 dark:bg-blue-600 text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {decoration === 'none' ? '无' : decoration === 'underline' ? '下划线' : decoration === 'line-through' ? '删除线' : '上划线'}
                </button>
              ))}
            </div>
          </div>

          {/* Text Transform */}
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              文本转换 (text-transform)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['none', 'uppercase', 'lowercase', 'capitalize'] as TextTransform[]).map((transform) => (
                <button
                  key={transform}
                  onClick={() => setState({ ...state, textTransform: transform })}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    state.textTransform === transform
                      ? 'bg-blue-500 dark:bg-blue-600 text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {transform === 'none' ? '无' : transform === 'uppercase' ? '大写' : transform === 'lowercase' ? '小写' : '首字母'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div>
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
          生成的 CSS
        </label>
        <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 dark:text-green-300 p-4 rounded-lg overflow-x-auto text-sm">
          {generateCSS() || '/* 使用默认值 */'}
        </pre>
      </div>
    </div>
  )
}
