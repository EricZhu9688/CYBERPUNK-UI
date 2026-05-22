# Cyberpunk UI — 一键复刻提示词

> 将以下提示词发送给 AI 设计工具（v0、Figma AI、DALL-E、Midjourney 等），即可生成 Cyberpunk UI 风格的界面和组件。

## 设计系统提示词（中文）

```
你是赛博朋克风格 UI 设计专家。请根据以下设计规范创建界面：

【配色方案】
- 主色调：霓虹蓝 #00f3ff，用于聚焦元素、边框、发光
- 次要色：霓虹粉 #ff00ff，用于强调、图标、装饰
- 强调色：霓虹绿 #00ff00，用于成功状态、代码、数据
- 背景色：深空黑 #0a0a0f → 深蓝黑 #1a1a2e → 中灰蓝 #2a2a3e（自深至浅）
- 文字色：白色 #ffffff → 浅紫 #b0b0ff → 灰紫 #8080cc

【字体系统】
- 标题字体：Orbitron（几何无衬线，全大写，宽字距）
- 正文字体：Courier New / Consolas（等宽字体）
- 代码字体：JetBrains Mono / Consolas

【边框与阴影】
- 边框：1px 实线，默认 #00f3ff，使用 rgba(0,243,255,0.3) 做弱化
- 发光：box-shadow 使用主色调，多层叠加（5px → 10px+20px → 15px+30px+45px）
- 所有发光边框带 pulse 动画

【动画系统】
- 缓动函数：cubic-bezier(0.4, 0, 0.2, 1)（标准）/ cubic-bezier(0.68, -0.55, 0.265, 1.55)（弹性）
- 过渡时长：0.15s（快速）/ 0.3s（标准）/ 0.5s（慢速）
- 关键帧：glow（发光脉冲）、scan（扫描线）、flicker（闪烁）、spinner-rotate（旋转）

【组件特征】
- 所有交互元素有 hover 时霓虹发光增强效果
- 禁用状态使用 opacity: 0.5
- 卡片使用半透明深色背景 + 霓虹边框
- 输入框使用深色背景 + 聚焦时发光边框
- 开关/复选框使用霓虹渐变色填充
- 代码块有红/绿/蓝三色窗口装饰点
- 所有可滚动区域使用霓虹渐变色滚动条

【氛围】
- 科技感、未来感、反乌托邦
- 暗色模式为主，霓虹色点缀
- 扫描线纹理叠加（可选）
- 终端/命令行美学
```

## Design System Prompt (English)

```
You are a cyberpunk UI design expert. Create interfaces following this design specification:

[Color Palette]
- Primary: Neon Cyan #00f3ff — focus elements, borders, glows
- Secondary: Neon Magenta #ff00ff — accents, icons, decorations  
- Accent: Neon Green #00ff00 — success states, code, data
- Backgrounds: Deep Space Black #0a0a0f → Dark Navy #1a1a2e → Gray Blue #2a2a3e
- Text: White #ffffff → Light Purple #b0b0ff → Gray Purple #8080cc

[Typography]
- Headings: Orbitron (geometric sans-serif, uppercase, wide letter-spacing)
- Body: Courier New / Consolas (monospace)
- Code: JetBrains Mono / Consolas

[Borders & Shadows]
- 1px solid borders, default #00f3ff, faded variant rgba(0,243,255,0.3)
- Multi-layer neon glow shadows (5px → 10px+20px → 15px+30px+45px)
- Pulse animation on glow elements

[Animation]
- Easing: cubic-bezier(0.4, 0, 0.2, 1) for standard, cubic-bezier(0.68, -0.55, 0.265, 1.55) for bouncy
- Duration: 0.15s fast / 0.3s normal / 0.5s slow
- Keyframes: glow (pulse), scan (sweep line), flicker, spinner-rotate

[Component Characteristics]
- Enhanced neon glow on hover for all interactive elements
- Disabled state: opacity 0.5
- Cards: semi-transparent dark background + neon border
- Inputs: dark background + glow border on focus
- Switches/Checkboxes: neon gradient fill when active
- Code blocks: red/green/blue window dots
- Scrollbars: neon gradient styling

[Atmosphere]
- High-tech, futuristic, dystopian
- Dark mode primary, neon accents
- Scanline texture overlay (optional)
- Terminal/command-line aesthetic
```

## 组件生成提示词

### 生成赛博朋克按钮
```
Create a cyberpunk neon button with the following variants:
1. Primary: gradient from #0080ff to #00f3ff, glow shadow
2. Secondary: gradient from #cc00cc to #ff00ff  
3. Ghost: transparent with #00f3ff border
4. Disabled: reduced opacity
Each variant should have: hover glow enhancement, optional scan line animation, ripple click effect.
```

### 生成赛博朋克表格
```
Create a dark-themed cyberpunk data table:
- Header: dark navy background, neon cyan text, uppercase
- Rows: alternating subtle background, hover: neon cyan tint
- Borders: 1px solid with fading neon cyan
- Sort arrows: neon accent
- Selected row: left neon border + background highlight
- Empty state: centered muted text
- Scrollbar: neon gradient
```

### 生成赛博朋克弹窗
```
Create a cyberpunk modal dialog:
- Dark overlay background with scanline texture
- Panel: dark navy background, neon cyan border, glow shadow
- Header: uppercase Orbitron font, neon cyan
- Close button: "×" with hover glow
- Slide-in animation with bouncy easing
- Footer: top border, right-aligned actions
```
