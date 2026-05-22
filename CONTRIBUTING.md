# 贡献指南

感谢你对 Cyberpunk UI 的关注！本指南将帮助你了解如何为项目做出贡献。

## 行为准则

- 尊重所有贡献者
- 建设性的代码审查
- 专注于赛博朋克美学和代码质量

## 开发环境设置

### 前置要求

- Node.js >= 18
- npm >= 9

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/cyberpunk-ui.git
cd cyberpunk-ui

# 安装依赖
npm install

# 启动组件开发服务器（端口 3000）
npm run dev

# 启动文档站点（端口 3001）
npm run site:dev
```

### 项目结构

```
cyberpunk-ui/
├── src/
│   ├── components/          # 组件源码
│   │   └── ComponentName/
│   │       ├── index.tsx    # 组件实现
│   │       └── style/
│   │           └── index.less  # 组件样式
│   ├── styles/
│   │   ├── variables.less   # Less 设计 token
│   │   ├── mixins.less      # 可复用 Less mixins
│   │   ├── tokens.css       # CSS 自定义属性（运行时换肤）
│   │   └── index.less       # 全局样式
│   ├── index.ts             # 库入口（导出所有组件）
│   └── vite-env.d.ts        # 类型声明
├── site/                    # 文档站点
│   ├── App.tsx
│   ├── main.tsx
│   └── vite.config.ts
├── public/static/           # 静态资源
│   ├── fonts/               # 本地字体
│   ├── icons/               # 图标资源
│   └── audio/               # 音效资源
├── docs/                    # 文档
├── AI_USAGE.md              # AI 助手使用手册
├── DESIGN_PROMPT.md         # AI 设计工具提示词
└── CONTRIBUTING.md          # 贡献指南（本文件）
```

## 添加新组件

### 1. 创建组件文件

```
src/components/NewComponent/
├── index.tsx          # 组件实现
└── style/
    └── index.less     # 组件样式
```

### 2. 组件模板

```tsx
import React from "react";
import "./style/index.less";

export interface NewComponentProps {
  // 定义 Props
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
}

const NewComponent: React.FC<NewComponentProps> = ({
  size = "medium",
  disabled = false,
  className = "",
}) => {
  const classes = [
    "cyberpunk-newcomponent",
    `nc-${size}`,
    disabled ? "nc-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>...</div>;
};

export default NewComponent;
```

### 3. 样式模板

```less
@import "@/styles/variables.less";
@import "@/styles/mixins.less";   // 如需使用 mixin

.cyberpunk-newcomponent {
  // 使用变量
  background: @bg-secondary;
  border: @border-width solid @border-color;
  border-radius: @border-radius-md;
  transition: all @animation-duration-normal @animation-timing-function;

  // 大小变体
  &.nc-sm { font-size: 12px; }
  &.nc-md { font-size: 14px; }
  &.nc-lg { font-size: 16px; }

  // 状态
  &.nc-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // 使用 mixin
  .cyberpunk-scrollbar();
}
```

### 4. 注册导出

在 `src/index.ts` 中添加：

```typescript
// 组件导出
export { default as NewComponent } from "./components/NewComponent";

// 类型导出
export type { NewComponentProps } from "./components/NewComponent";
```

### 5. 更新文档

- 在 `site/App.tsx` 中添加组件演示
- 在 `README.md` 中添加组件说明
- 在 `AI_USAGE.md` 中添加 API 速查

## 设计规范

### 配色

| 用途 | 颜色 | 色值 |
|------|------|------|
| 主色 | 霓虹蓝 | `#00f3ff` |
| 辅色 | 霓虹粉 | `#ff00ff` |
| 强调 | 霓虹绿 | `#00ff00` |
| 背景 | 深空黑 | `#0a0a0f` |
| 表面 | 深蓝黑 | `#1a1a2e` |

### 动画

- 快速交互：`0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- 标准过渡：`0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- 弹性动画：`cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### 组件约定

- **禁用态**：`opacity: 0.5; cursor: not-allowed;`
- **发光效果**：使用 `box-shadow` 配合主色调，多层叠加
- **hover 态**：增强发光，微调颜色
- **滚动条**：使用 `.cyberpunk-scrollbar()` mixin
- **Safari 兼容**：`-webkit-user-select` 前缀必须添加

## 代码规范

- 使用 TypeScript 严格模式
- 组件使用 `React.FC` 或 `React.forwardRef`
- Props 接口命名为 `{ComponentName}Props`
- 样式类名前缀：`cyberpunk-{componentname}`
- 使用 Less 变量，不硬编码颜色值
- CSS class 拼接使用 `filter(Boolean).join(" ")` 模式

## 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat(component): add new component
fix(style): fix safari compatibility
docs(readme): update component list
refactor(button): simplify ripple logic
```

## Pull Request 流程

1. Fork 项目
2. 创建功能分支：`git checkout -b feat/component-name`
3. 开发并测试
4. 确保 `npm run lint` 通过
5. 提交 PR，描述变更内容和原因
6. 等待代码审查

## 发布流程

1. 更新 `package.json` 版本号
2. 更新 `CHANGELOG.md`
3. 运行 `npm run build:lib` 构建
4. 提交并打标签：`git tag v0.2.0`
5. 发布到 npm：`npm publish`

## 问题反馈

- [GitHub Issues](https://github.com/your-username/cyberpunk-ui/issues)
- 请在 Issue 中提供：组件名、复现步骤、期望行为、截图

## 许可证

MIT License — 详见 [LICENSE](LICENSE)
