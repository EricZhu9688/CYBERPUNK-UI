# Cyberpunk UI

赛博朋克风格 React UI 组件库 · React + TypeScript + Less · 21 个组件

## 特性

- **赛博朋克美学** — 霓虹蓝/紫/粉配色、发光边框、扫描线动画
- **TypeScript 全覆盖** — 完整类型定义，智能 IDE 提示
- **BorderBeam 边框流光** — SVG 动效，9 种预设渐变、多光束、可调速
- **IconLibrary 图标库** — 68 个赛博 SVG 图标，WebP/PNG 下载
- **CSS 变量换肤** — 40+ 设计 token，支持运行时主题切换
- **Tree Shaking** — ESM 优先，按需引入
- **AI 友好** — 内置 AI_USAGE.md 防止 API 臆造

## 快速开始

```bash
npm install cyberpunk-ui
```

```tsx
import { Cursor, Button, Card, Table, Time, IconLibrary, BorderBeam } from "cyberpunk-ui";
import "cyberpunk-ui/dist/style.css";

function App() {
  return (
    <>
      <Cursor color="#ff00ff" animated showTrail />
      <Button type="primary" glow scanEffect>赛博按钮</Button>
      <BorderBeam color="neon" beamSize={0.2}>
        <Card title="系统状态">ONLINE</Card>
      </BorderBeam>
      <Time format="full" color="primary" glow scanEffect />
      <Table columns={columns} dataSource={data} striped glow />
    </>
  );
}
```

## 组件列表

### 特效 Effects
| 组件 | 说明 |
|------|------|
| **Cursor** | 自定义光标，支持轨迹、点击波纹、霓虹发光 |
| **Typewriter** | 打字机效果，逐字显示文本，支持循环播放 |
| **BorderBeam** | SVG 边框流光，9 种预设渐变、多光束、可调速宽 |
| **BorderFlow** | BorderBeam 别名，向后兼容 |

### 通用 Basic
| 组件 | 说明 |
|------|------|
| **Button** | 按钮，5 种类型、3 种尺寸、发光/扫描线/波纹特效 |
| **Icon** | 图标，18 个内置 SVG 图标，支持旋转/脉冲/发光动画 |
| **Divider** | 分割线，水平/垂直/虚线/发光/带文字 |

### 布局 Layout
| 组件 | 说明 |
|------|------|
| **Card** | 卡片，支持标题/封面/底部/悬浮动效/颜色主题 |
| **Footer** | 页脚，多列链接、社交图标、dark/glow 主题 |

### 表单 Form
| 组件 | 说明 |
|------|------|
| **Input** | 输入框，prefix/suffix/clearable/TextArea/字数统计/发光 |
| **Switch** | 开关，3 种颜色主题、3 种尺寸、发光效果 |
| **Select** | 选择器，点击外部关闭、清除、禁用选项 |
| **Checkbox** | 多选框 + CheckboxGroup，半选/横向布局/颜色主题 |

### 数据展示 Data Display
| 组件 | 说明 |
|------|------|
| **Collapse** | 折叠面板，手风琴模式、禁用项、自定义 extra |
| **Table** | 表格，排序/斑马纹/行选中/加载态/空状态 |
| **CodeBlock** | 代码块，语法高亮、一键复制、行号、窗口装饰点 |
| **Time** | HUD 实时时钟，星期/日期/时间、12h/24h、扫描线、3 尺寸 |
| **TimePicker** | 时间选择器，时/分/秒列、HH:mm/HH:mm:ss、此刻快捷 |
| **DatePicker** | 日期选择器，月导航日历、今天/选中高亮、可控/非受控 |
| **IconLibrary** | 图标库，68 个赛博 SVG 图标、6 分类、搜索、WebP/PNG 下载 |

### 导航 Navigation
| 组件 | 说明 |
|------|------|
| **Tabs** | 标签页，4 向布局、line/card 类型、徽标/红点/发光 |

### 反馈 Feedback
| 组件 | 说明 |
|------|------|
| **Modal** | 弹窗，Portal 渲染、扫描线遮罩、ESC 关闭 |
| **Loading** | 加载，spinner/dots/skeleton 三种样式、全屏遮罩 |

## BorderBeam 边框流光

```tsx
import { BorderBeam, beamPresets } from "cyberpunk-ui";

// 预设渐变
<BorderBeam color="neon" beamSize={0.2} beams={2} duration={3}>
  <Card title="系统状态">ONLINE</Card>
</BorderBeam>

// 自定义色标
<BorderBeam
  color={[
    { color: "#ff00ff", percent: 0 },
    { color: "#00f3ff", percent: 100 },
  ]}
  borderWidth={3}
>
  <Button>按钮</Button>
</BorderBeam>
```

**9 种预设:** ocean / sunset / aurora / forest / ember / nebula / neon / matrix / synthwave

## IconLibrary 图标库

```tsx
import { IconLibrary } from "cyberpunk-ui";

<IconLibrary
  color="primary"
  defaultSize={24}
  downloadable
  defaultFormat="webp"
  onIconClick={(icon) => console.log(icon.name)}
/>
```

内置 68 个赛博朋克 SVG 图标，6 大分类：通用、技术、安全、导航、媒体、赛博。悬浮弹动效果，支持 WebP/PNG 下载。

## 主题定制

### CSS 变量（运行时换肤）

```css
:root {
  --cp-color-primary: #00f3ff;
  --cp-bg-primary: #0a0a0f;
  --cp-text-primary: #ffffff;
  /* 40+ token，详见 src/styles/tokens.css */
}
```

```html
<!-- 预设主题 -->
<body data-theme="dark">       <!-- 默认暗夜 -->
<body data-theme="light">      <!-- 亮色模式 -->
<body data-theme="blood-moon"> <!-- 血月模式 -->
```

### Less 变量（编译时定制）

```less
@primary-color: #00f3ff;
@secondary-color: #ff00ff;
@accent-color: #00ff00;
@bg-primary: #0a0a0f;
```

## 开发

```bash
git clone https://github.com/your-username/cyberpunk-ui.git
cd cyberpunk-ui
npm install
npm run dev         # 组件开发服务器 (port 3000)
npm run site:dev    # 文档站点 (port 3001)
npm run build:lib   # 构建组件库
npm run lint        # 代码检查
```

## 项目结构

```
cyberpunk-ui/
├── src/
│   ├── components/        # 21 个组件
│   ├── styles/            # 主题变量、mixins、CSS tokens
│   └── index.ts           # 库入口
├── site/                  # 文档站点
├── public/static/         # 静态资源 (fonts/icons/audio)
├── AI_USAGE.md            # AI 助手 API 速查
├── DESIGN_PROMPT.md       # AI 设计工具提示词
├── CONTRIBUTING.md        # 贡献指南
└── README.md
```

## AI 集成

本项目为 AI 编程助手提供完整支持：

- **AI_USAGE.md** — 组件 API 速查表，防止 AI 臆造不存在的属性
- **DESIGN_PROMPT.md** — 一键复刻提示词，适用于 v0/Figma AI/DALL-E/Bolt 等工具
- **CSS 变量文档** — 所有 token 带 `--cp-` 前缀，清晰可识别

## 许可证

MIT License © 2026 Cyberpunk UI
