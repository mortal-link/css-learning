'use client';

import { useState, useCallback } from 'react';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

// RGB to HSL conversion
function rgbToHsl(r: number, g: number, b: number): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6;
    } else if (max === gNorm) {
      h = ((bNorm - rNorm) / delta + 2) / 6;
    } else {
      h = ((rNorm - gNorm) / delta + 4) / 6;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// HSL to RGB conversion
function hslToRgb(h: number, s: number, l: number): RGB {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const hNorm = h / 360;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (sNorm === 0) {
    r = g = b = lNorm;
  } else {
    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;
    r = hue2rgb(p, q, hNorm + 1 / 3);
    g = hue2rgb(p, q, hNorm);
    b = hue2rgb(p, q, hNorm - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// RGB to HEX
function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0').toUpperCase()).join('')}`;
}

// Presets
const PRESETS = [
  { name: '番茄红', hex: '#FF6347' },
  { name: '海洋蓝', hex: '#0077BE' },
  { name: '森林绿', hex: '#228B22' },
  { name: '日落橙', hex: '#FF7F50' },
  { name: '薰衣草', hex: '#E6E6FA' },
  { name: '珊瑚粉', hex: '#FF7F7F' },
];

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

interface ColorSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  color: string;
}

function ColorSlider({ label, value, onChange, min, max, color }: ColorSliderProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-10 text-right font-mono tabular-nums">
        {value}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`flex-1 h-1.5 rounded-full appearance-none cursor-pointer ${color}`}
      />
      <span className="text-xs w-8 font-medium">{label}</span>
    </div>
  );
}

export function ColorSpaceExplorer() {
  const [rgb, setRgb] = useState<RGB>({ r: 255, g: 99, b: 71 }); // Tomato red
  const [hsl, setHsl] = useState<HSL>(rgbToHsl(255, 99, 71));

  const updateFromRgb = useCallback((newRgb: RGB) => {
    setRgb(newRgb);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  }, []);

  const updateFromHsl = useCallback((newHsl: HSL) => {
    setHsl(newHsl);
    setRgb(hslToRgb(newHsl.h, newHsl.s, newHsl.l));
  }, []);

  const applyPreset = useCallback(
    (hex: string) => {
      const newRgb = hexToRgb(hex);
      updateFromRgb(newRgb);
    },
    [updateFromRgb]
  );

  const currentColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const complementaryHue = (hsl.h + 180) % 360;
  const complementaryColor = `hsl(${complementaryHue}, ${hsl.s}%, ${hsl.l}%)`;
  const hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6 bg-background/50 rounded-lg border border-border">
      {/* Color Swatches */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div
            className="w-full h-32 rounded-lg border-2 border-border shadow-inner"
            style={{ backgroundColor: currentColor }}
          />
          <p className="text-xs text-center text-muted-foreground font-medium">当前颜色</p>
        </div>
        <div className="space-y-2">
          <div
            className="w-full h-32 rounded-lg border-2 border-border shadow-inner"
            style={{ backgroundColor: complementaryColor }}
          />
          <p className="text-xs text-center text-muted-foreground font-medium">互补色</p>
        </div>
      </div>

      {/* Text Contrast Preview */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg border border-border flex items-center justify-center"
          style={{ backgroundColor: currentColor, color: '#000000' }}
        >
          <span className="font-medium text-lg">示例文本</span>
        </div>
        <div
          className="p-4 rounded-lg border border-border flex items-center justify-center"
          style={{ backgroundColor: currentColor, color: '#FFFFFF' }}
        >
          <span className="font-medium text-lg">示例文本</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* RGB Sliders */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">RGB 色彩空间</h3>
          <ColorSlider
            label="R"
            value={rgb.r}
            onChange={(r) => updateFromRgb({ ...rgb, r })}
            min={0}
            max={255}
            color="bg-gradient-to-r from-black via-red-500 to-red-600"
          />
          <ColorSlider
            label="G"
            value={rgb.g}
            onChange={(g) => updateFromRgb({ ...rgb, g })}
            min={0}
            max={255}
            color="bg-gradient-to-r from-black via-green-500 to-green-600"
          />
          <ColorSlider
            label="B"
            value={rgb.b}
            onChange={(b) => updateFromRgb({ ...rgb, b })}
            min={0}
            max={255}
            color="bg-gradient-to-r from-black via-blue-500 to-blue-600"
          />
        </div>

        {/* HSL Sliders */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">HSL 色彩空间</h3>
          <ColorSlider
            label="H"
            value={hsl.h}
            onChange={(h) => updateFromHsl({ ...hsl, h })}
            min={0}
            max={360}
            color="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500"
          />
          <ColorSlider
            label="S"
            value={hsl.s}
            onChange={(s) => updateFromHsl({ ...hsl, s })}
            min={0}
            max={100}
            color="bg-gradient-to-r from-muted to-purple-500"
          />
          <ColorSlider
            label="L"
            value={hsl.l}
            onChange={(l) => updateFromHsl({ ...hsl, l })}
            min={0}
            max={100}
            color="bg-gradient-to-r from-black via-muted to-white"
          />
        </div>
      </div>

      {/* Format Display */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">颜色格式</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <p className="text-xs text-muted-foreground mb-1">HEX</p>
            <code className="text-sm font-mono font-semibold">{hexColor}</code>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <p className="text-xs text-muted-foreground mb-1">RGB</p>
            <code className="text-sm font-mono font-semibold">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</code>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <p className="text-xs text-muted-foreground mb-1">HSL</p>
            <code className="text-sm font-mono font-semibold">{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</code>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <p className="text-xs text-muted-foreground mb-1">OKLCH</p>
            <code className="text-sm font-mono font-semibold">{`oklch(${(hsl.l / 100).toFixed(
              2
            )} ${(hsl.s / 100).toFixed(2)} ${hsl.h})`}</code>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">CSS 代码</h3>
        <div className="p-4 bg-muted/50 rounded-md border border-border font-mono text-sm">
          <div className="space-y-1">
            <div>
              <span className="text-muted-foreground">color:</span>{' '}
              <span className="text-foreground font-semibold">{hexColor}</span>;
            </div>
            <div>
              <span className="text-muted-foreground">color:</span>{' '}
              <span className="text-foreground font-semibold">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span>
              ;
            </div>
            <div>
              <span className="text-muted-foreground">color:</span>{' '}
              <span className="text-foreground font-semibold">{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</span>
              ;
            </div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">预设颜色</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.hex)}
              className="group relative flex flex-col items-center gap-2 p-2 rounded-lg border border-border hover:border-foreground/50 transition-colors"
            >
              <div
                className="w-full h-12 rounded-md border border-border group-hover:scale-105 transition-transform"
                style={{ backgroundColor: preset.hex }}
              />
              <span className="text-xs text-muted-foreground font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
