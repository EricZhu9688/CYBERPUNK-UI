# Cyberpunk UI — AI 代码助手使用手册

> 本文件专为 AI 编程助手（Claude Code、Cursor、Copilot、v0、Bolt 等）编写，确保 AI 准确调用 Cyberpunk UI 的组件和 API，杜绝臆造属性。

## 快速索引

| 组件 | 导入路径 | 类别 |
|------|---------|------|
| Cursor | `import { Cursor } from "cyberpunk-ui"` | 特效 |
| Typewriter | `import { Typewriter } from "cyberpunk-ui"` | 特效 |
| Button | `import { Button } from "cyberpunk-ui"` | 通用 |
| Icon | `import { Icon } from "cyberpunk-ui"` | 通用 |
| Divider | `import { Divider } from "cyberpunk-ui"` | 通用 |
| Card | `import { Card } from "cyberpunk-ui"` | 布局 |
| Footer | `import { Footer } from "cyberpunk-ui"` | 布局 |
| Tabs | `import { Tabs } from "cyberpunk-ui"` | 导航 |
| Input | `import { Input, TextArea } from "cyberpunk-ui"` | 表单 |
| Switch | `import { Switch } from "cyberpunk-ui"` | 表单 |
| Select | `import { Select } from "cyberpunk-ui"` | 表单 |
| Checkbox | `import { Checkbox, CheckboxGroup } from "cyberpunk-ui"` | 表单 |
| Modal | `import { Modal } from "cyberpunk-ui"` | 反馈 |
| Loading | `import { Loading } from "cyberpunk-ui"` | 反馈 |
| Table | `import { Table } from "cyberpunk-ui"` | 数据展示 |
| CodeBlock | `import { CodeBlock } from "cyberpunk-ui"` | 数据展示 |
| Collapse | `import { Collapse } from "cyberpunk-ui"` | 数据展示 |

## 组件 API 速查

### Cursor — 自定义光标
```tsx
<Cursor
  color="#00f3ff"          // 光标颜色，默认 #00f3ff
  size={20}                // 光标大小(px)，默认 20
  animated                 // 跟随动画，默认 true
  animationSpeed={100}     // 动画速度(ms)，默认 100
  showTrail                // 鼠标轨迹
  trailLength={10}         // 轨迹长度，默认 10
  clickEffect              // 点击波纹效果
  clickEffectColor="#ff00ff"
/>
```

### Button — 按钮
```tsx
<Button
  type="primary"           // "primary" | "secondary" | "accent" | "ghost" | "danger"
  size="medium"            // "small" | "medium" | "large"
  shape="default"          // "default" | "round" | "square"
  disabled                 // 禁用
  loading                  // 加载中
  block                    // 块级宽度
  glow                     // 发光效果，默认 true
  scanEffect               // 扫描线效果
  ripple                   // 点击波纹，默认 true
  icon={<Icon name="star" />}  // 图标
  iconPosition="left"      // "left" | "right"
  onClick={() => {}}
>
  按钮文字
</Button>
```

### Input — 输入框
```tsx
<Input
  size="medium"            // "small" | "medium" | "large"
  label="标签"
  required                 // 必填标记
  placeholder="请输入..."
  prefix={<Icon name="search" />}   // 前缀图标
  suffix={<span>.com</span>}        // 后缀
  clearable                // 可清除
  glow                     // 发光效果
  scanEffect               // 扫描线
  error="错误提示"
  helperText="帮助文字"
  showCount                // 字数统计
  maxLength={100}
  onChange={(e) => {}}
/>

// 多行文本
<TextArea
  rows={4}
  placeholder="请输入..."
  glow
/>
```

### Switch — 开关
```tsx
<Switch
  checked={value}          // 受控
  defaultChecked={false}   // 非受控
  disabled
  size="medium"            // "small" | "medium" | "large"
  color="primary"          // "primary" | "secondary" | "accent"
  glow
  label="开关标签"
  onChange={(checked) => {}}
/>
```

### Select — 选择器
```tsx
<Select
  options={[
    { label: "选项A", value: "a" },
    { label: "选项B", value: "b", disabled: true },
  ]}
  value={value}            // 受控
  defaultValue="a"         // 非受控
  placeholder="请选择"
  label="选择器标签"
  size="medium"
  clearable
  glow
  onChange={(value) => {}}
/>
```

### Checkbox — 多选框
```tsx
<Checkbox
  checked={checked}        // 受控
  defaultChecked={false}   // 非受控
  disabled
  indeterminate             // 半选状态
  color="primary"           // "primary" | "secondary" | "accent"
  glow
  label="选项文字"
  onChange={(checked) => {}}
/>

// 多选框组
<CheckboxGroup
  options={["选项A", "选项B", { label: "选项C", value: "c", disabled: true }]}
  value={selectedValues}   // (string | number)[]
  defaultValue={[]}
  direction="vertical"     // "vertical" | "horizontal"
  onChange={(values) => {}}
/>
```

### Modal — 弹窗
```tsx
<Modal
  open={visible}
  title="弹窗标题"
  size="medium"            // "small" | "medium" | "large" | "full"
  closable                 // 显示关闭按钮
  maskClosable             // 点击遮罩关闭
  glow                     // 发光边框
  scanLine                 // 扫描线覆盖
  footer={<Button onClick={close}>关闭</Button>}
  onClose={() => setVisible(false)}
>
  弹窗内容
</Modal>
```

### Card — 卡片
```tsx
<Card
  title="卡片标题"
  extra={<span>更多</span>}
  cover="图片URL"
  bordered
  glow
  color="primary"          // "primary" | "secondary" | "accent"
  hoverable                // 悬浮动效
  size="medium"            // "small" | "medium"
  footer={<span>底部</span>}
>
  卡片内容
</Card>
```

### Collapse — 折叠面板
```tsx
<Collapse
  items={[
    { key: "1", label: "面板1", children: "内容1" },
    { key: "2", label: "面板2", children: "内容2", disabled: true, extra: "附加信息" },
  ]}
  activeKeys={["1"]}       // 受控
  defaultActiveKeys={["1"]}// 非受控
  accordion                // 手风琴模式
  bordered
  glow
  size="medium"
  onChange={(keys) => {}}
/>
```

### Tabs — 标签页
```tsx
<Tabs
  items={[
    { key: "1", label: "Tab1", children: "内容1", icon: <Icon name="home" />, badge: 5, dot: true },
    { key: "2", label: "Tab2", children: "内容2", disabled: true },
  ]}
  activeKey="1"            // 受控
  defaultActiveKey="1"     // 非受控
  tabPosition="top"        // "top" | "bottom" | "left" | "right"
  type="line"              // "line" | "card"
  size="medium"
  centered
  bordered
  animated
  glowEffect
  scanLine
  onChange={(key) => {}}
/>
```

### Table — 表格
```tsx
<Table
  columns={[
    { key: "name", title: "名称", dataIndex: "name", sortable: true, ellipsis: true },
    { key: "age", title: "年龄", dataIndex: "age", sortable: true, width: 80 },
    { key: "action", title: "操作", render: (_, record) => <Button size="small">编辑</Button> },
  ]}
  dataSource={data}
  rowKey="id"
  size="medium"
  bordered
  striped
  glow
  loading
  emptyText="无数据"
  onRow={(record) => ({ onClick: () => handleClick(record) })}
/>
```

### CodeBlock — 代码块
```tsx
<CodeBlock
  code={`const hello = "cyberpunk";`}
  language="typescript"
  showLineNumbers
  glow
  showHeader               // 显示窗口装饰点
/>
```

### Typewriter — 打字机
```tsx
<Typewriter
  text="赛博朋克世界欢迎你..."
  speed={60}               // 打字速度(ms)
  startDelay={0}           // 开始延迟
  cursor                   // 显示光标，默认 true
  cursorColor="primary"    // "primary" | "secondary" | "accent"
  size="medium"            // "small" | "medium" | "large"
  loop                     // 循环打字
  loopDelay={2000}         // 循环间隔
  onComplete={() => {}}
/>
```

### Divider — 分割线
```tsx
<Divider
  type="horizontal"        // "horizontal" | "vertical"
  variant="gradient"       // "solid" | "dashed" | "gradient"
  glow
  color="primary"          // "primary" | "secondary" | "accent"
  orientation="center"     // "center" | "left" | "right"
>
  文字内容（可选）
</Divider>
```

### Footer — 页脚
```tsx
<Footer
  columns={[
    { title: "产品", links: [{ label: "关于", href: "#" }, { label: "文档" }] },
  ]}
  copyright="© 2026 Cyberpunk UI"
  socialLinks={[{ label: "GitHub", href: "#", icon: "<svg>...</svg>" }]}
  theme="default"          // "default" | "dark" | "glow"
/>
```

### Loading — 加载
```tsx
<Loading
  type="spinner"           // "spinner" | "dots" | "skeleton"
  size="medium"            // "small" | "medium" | "large"
  fullscreen               // 全屏遮罩
  text="加载中..."
  skeletonWidth="100%"
  skeletonHeight={16}
/>
```

### Icon — 图标
```tsx
import { Icon, PresetIcon, icons } from "cyberpunk-ui";

// 使用内置图标
<PresetIcon name="github" size="large" glow spin />

// 使用预设图标名: close, check, menu, search, star, arrowDown/Up/Left/Right,
//   home, github, sun, moon, code, copy, loading, user, settings, info, warning

// 自定义 SVG
<Icon size="medium" color="#00f3ff" spin pulse glow>
  <svg>...</svg>
</Icon>
```

## 设计 Token（CSS 自定义属性）

所有组件支持通过 CSS 变量运行时换肤：

```css
:root {
  --cp-color-primary: #00f3ff;
  --cp-bg-primary: #0a0a0f;
  --cp-text-primary: #ffffff;
  /* ... 共 40+ 个 token，详见 src/styles/tokens.css */
}
```

## 注意事项

1. **所有组件已完全实现** — 不要用其他 UI 库替代缺失组件
2. **不要臆造 Props** — 以上 API 速查即为完整 API，不存在未列出的属性
3. **样式通过 className 传入** — 所有组件接受 `className` 进行样式覆盖
4. **CSS 变量优先** — 主题定制优先使用 CSS 变量而非 Less 变量
5. **React 18+** — 所有组件基于 React 18 开发
