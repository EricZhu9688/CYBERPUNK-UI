import React, { useState, useRef, useEffect } from "react";
import {
  Cursor, Button, Tabs, Input, TextArea, Switch, Card, Collapse,
  Modal, Typewriter, Divider, Select, Checkbox, CheckboxGroup,
  Footer, CodeBlock, Loading, Table, Icon, PresetIcon,
  Time, TimePicker, DatePicker,
  IconLibrary, BorderBeam, BorderFlow, beamPresets,
} from "../src";
import type { BeamGradient } from "../src";
import type { TabItem, CollapseItem, TableColumn, SelectOption, FooterColumn } from "../src";
import "./style.less";

/* ── 分类定义 ── */
const categories = [
  {
    title: "特效 Effects",
    items: ["cursor", "typewriter", "borderflow"],
  },
  {
    title: "通用 Basic",
    items: ["button", "icon", "divider"],
  },
  {
    title: "布局 Layout",
    items: ["card", "footer"],
  },
  {
    title: "表单 Form",
    items: ["input", "switch", "select", "checkbox"],
  },
  {
    title: "数据展示 Data",
    items: ["collapse", "table", "codeblock", "time", "iconlibrary"],
  },
  {
    title: "导航 Nav",
    items: ["tabs"],
  },
  {
    title: "反馈 Feedback",
    items: ["modal", "loading"],
  },
];

const labelMap: Record<string, string> = {
  cursor: "Cursor 光标",
  typewriter: "Typewriter 打字机",
  borderflow: "BorderFlow 边框流光",
  button: "Button 按钮",
  icon: "Icon 图标",
  divider: "Divider 分割线",
  card: "Card 卡片",
  footer: "Footer 页脚",
  input: "Input 输入框",
  switch: "Switch 开关",
  select: "Select 选择器",
  checkbox: "Checkbox 多选框",
  collapse: "Collapse 折叠面板",
  table: "Table 表格",
  codeblock: "CodeBlock 代码块",
  tabs: "Tabs 标签页",
  modal: "Modal 弹窗",
  loading: "Loading 加载",
  time: "Time 时间",
  iconlibrary: "IconLibrary 图标库",
};

/* ── 小型组件演示包装器 ── */

const CursorDemo: React.FC = () => (
  <div>
    <p className="demo-label">移动鼠标查看光标效果（本页全局已启用）</p>
    <div className="demo-code">
      <pre><code>{`import { Cursor } from "cyberpunk-ui";

<Cursor
  color="#ff00ff"
  size={12}
  animated
  showTrail
  trailLength={20}
  clickEffect
/>`}</code></pre>
    </div>
    <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
    <table className="demo-api">
      <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
      <tbody>
        <tr><td>color</td><td>光标颜色</td><td>string</td><td>#00f3ff</td></tr>
        <tr><td>size</td><td>光标大小(px)</td><td>number</td><td>20</td></tr>
        <tr><td>animated</td><td>跟随动画</td><td>boolean</td><td>true</td></tr>
        <tr><td>animationSpeed</td><td>动画速度(ms)</td><td>number</td><td>100</td></tr>
        <tr><td>showTrail</td><td>显示轨迹</td><td>boolean</td><td>false</td></tr>
        <tr><td>trailLength</td><td>轨迹长度</td><td>number</td><td>10</td></tr>
        <tr><td>clickEffect</td><td>点击波纹</td><td>boolean</td><td>true</td></tr>
        <tr><td>clickEffectColor</td><td>点击效果颜色</td><td>string</td><td>-</td></tr>
      </tbody>
    </table>
  </div>
);

const TypewriterDemo: React.FC = () => (
  <div>
    <div className="demo-preview">
      <div className="demo-col" style={{ gap: 16 }}>
        <Typewriter text="欢迎来到赛博朋克世界..." speed={60} cursor cursorColor="primary" />
        <Typewriter text="Access Granted: //ROOT" speed={40} cursor cursorColor="accent" size="large" />
        <Typewriter text="循环播放中..." speed={80} loop loopDelay={1500} cursorColor="secondary" size="small" />
      </div>
    </div>
    <div className="demo-code">
      <pre><code>{`import { Typewriter } from "cyberpunk-ui";

<Typewriter text="欢迎来到赛博朋克世界..." speed={60} cursor />
<Typewriter text="Access Granted: //ROOT" speed={40} cursorColor="accent" size="large" />
<Typewriter text="循环播放中..." speed={80} loop loopDelay={1500} cursorColor="secondary" />`}</code></pre>
    </div>
    <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
    <table className="demo-api">
      <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
      <tbody>
        <tr><td>text</td><td>显示文本</td><td>string</td><td>-</td></tr>
        <tr><td>speed</td><td>打字速度(ms)</td><td>number</td><td>60</td></tr>
        <tr><td>startDelay</td><td>开始延迟</td><td>number</td><td>0</td></tr>
        <tr><td>cursor</td><td>显示光标</td><td>boolean</td><td>true</td></tr>
        <tr><td>cursorColor</td><td>光标颜色</td><td>primary | secondary | accent</td><td>primary</td></tr>
        <tr><td>size</td><td>字号</td><td>small | medium | large</td><td>medium</td></tr>
        <tr><td>loop</td><td>循环播放</td><td>boolean</td><td>false</td></tr>
        <tr><td>loopDelay</td><td>循环间隔(ms)</td><td>number</td><td>2000</td></tr>
      </tbody>
    </table>
  </div>
);

const ButtonDemo: React.FC = () => (
  <div>
    <p className="demo-label">类型变体</p>
    <div className="demo-preview">
      <div className="demo-row">
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="accent">Accent</Button>
        <Button type="ghost">Ghost</Button>
        <Button type="danger">Danger</Button>
      </div>
    </div>
    <p className="demo-label">尺寸 & 特效</p>
    <div className="demo-preview">
      <div className="demo-row">
        <Button type="primary" size="small">Small</Button>
        <Button type="primary" size="medium">Medium</Button>
        <Button type="primary" size="large">Large</Button>
      </div>
      <div className="demo-row">
        <Button type="secondary" loading>Loading</Button>
        <Button type="primary" scanEffect>Scan Line</Button>
        <Button type="primary" shape="round" icon={<PresetIcon name="star" />}>Round</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
    <div className="demo-code">
      <pre><code>{`<Button type="primary">Primary</Button>
<Button type="secondary">Secondary</Button>
<Button type="accent">Accent</Button>
<Button type="ghost">Ghost</Button>
<Button type="danger">Danger</Button>
<Button type="secondary" loading>Loading</Button>
<Button type="primary" scanEffect>Scan Line</Button>
<Button type="primary" shape="round" icon={<Icon />}>Round</Button>`}</code></pre>
    </div>
    <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
    <table className="demo-api">
      <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
      <tbody>
        <tr><td>type</td><td>按钮类型</td><td>primary | secondary | accent | ghost | danger</td><td>primary</td></tr>
        <tr><td>size</td><td>尺寸</td><td>small | medium | large</td><td>medium</td></tr>
        <tr><td>shape</td><td>形状</td><td>default | round | square</td><td>default</td></tr>
        <tr><td>disabled</td><td>禁用</td><td>boolean</td><td>false</td></tr>
        <tr><td>loading</td><td>加载中</td><td>boolean</td><td>false</td></tr>
        <tr><td>block</td><td>块级宽度</td><td>boolean</td><td>false</td></tr>
        <tr><td>glow</td><td>发光效果</td><td>boolean</td><td>true</td></tr>
        <tr><td>scanEffect</td><td>扫描线</td><td>boolean</td><td>false</td></tr>
        <tr><td>ripple</td><td>点击波纹</td><td>boolean</td><td>true</td></tr>
        <tr><td>icon</td><td>图标</td><td>ReactNode</td><td>-</td></tr>
        <tr><td>iconPosition</td><td>图标位置</td><td>left | right</td><td>left</td></tr>
      </tbody>
    </table>
  </div>
);

const IconDemo: React.FC = () => (
  <div>
    <div className="demo-preview">
      <div className="demo-row">
        <PresetIcon name="github" size="large" glow />
        <PresetIcon name="star" size="large" glow color="#ff00ff" />
        <PresetIcon name="home" size="large" glow color="#00ff00" />
        <PresetIcon name="code" size="large" glow />
        <PresetIcon name="settings" size="large" spin glow color="#ff00ff" />
        <PresetIcon name="loading" size="large" spin glow color="#00ff00" />
      </div>
      <div className="demo-row" style={{ marginTop: 12 }}>
        <PresetIcon name="search" size="medium" />
        <PresetIcon name="check" size="medium" color="#00ff00" />
        <PresetIcon name="close" size="medium" color="#ff0066" />
        <PresetIcon name="info" size="medium" />
        <PresetIcon name="warning" size="medium" color="#ffcc00" />
        <PresetIcon name="user" size="medium" />
        <PresetIcon name="menu" size="medium" />
        <PresetIcon name="copy" size="medium" />
        <PresetIcon name="sun" size="medium" />
        <PresetIcon name="moon" size="medium" />
        <PresetIcon name="arrowDown" size="medium" />
        <PresetIcon name="arrowRight" size="medium" />
      </div>
    </div>
    <div className="demo-code">
      <pre><code>{`import { Icon, PresetIcon } from "cyberpunk-ui";

{/* 预设图标 */}
<PresetIcon name="github" size="large" glow />
<PresetIcon name="star" glow color="#ff00ff" />
<PresetIcon name="settings" spin glow />
<PresetIcon name="check" size="medium" color="#00ff00" />

{/* 自定义 SVG */}
<Icon size="medium" spin pulse glow color="#00f3ff">
  <svg viewBox="0 0 24 24">...</svg>
</Icon>`}</code></pre>
    </div>
    <p style={{ color: "#b0b0ff", fontSize: 13, marginTop: 12 }}>
      内置图标名：close, check, menu, search, star, arrowDown/Up/Left/Right,
      home, github, sun, moon, code, copy, loading, user, settings, info, warning
    </p>
    <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
    <table className="demo-api">
      <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
      <tbody>
        <tr><td>size</td><td>尺寸</td><td>small | medium | large | xlarge</td><td>medium</td></tr>
        <tr><td>spin</td><td>旋转动画</td><td>boolean</td><td>false</td></tr>
        <tr><td>pulse</td><td>脉冲动画</td><td>boolean</td><td>false</td></tr>
        <tr><td>glow</td><td>发光滤镜</td><td>boolean</td><td>false</td></tr>
        <tr><td>color</td><td>颜色</td><td>string</td><td>inherit</td></tr>
      </tbody>
    </table>
  </div>
);

const DividerDemo: React.FC = () => (
  <div>
    <div className="demo-preview">
      <p style={{ color: "#b0b0ff", fontSize: 13 }}>默认渐变</p>
      <Divider />
      <p style={{ color: "#b0b0ff", fontSize: 13 }}>发光 + 文字居中</p>
      <Divider glow>NEON</Divider>
      <p style={{ color: "#b0b0ff", fontSize: 13 }}>虚线 + 文字居左</p>
      <Divider variant="dashed" orientation="left" color="secondary">LEFT</Divider>
      <p style={{ color: "#b0b0ff", fontSize: 13 }}>实线 + 绿色</p>
      <Divider variant="solid" color="accent">ACCENT</Divider>
    </div>
    <div className="demo-code">
      <pre><code>{`<Divider />
<Divider glow>NEON</Divider>
<Divider variant="dashed" orientation="left" color="secondary">LEFT</Divider>
<Divider variant="solid" color="accent">ACCENT</Divider>`}</code></pre>
    </div>
    <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
    <table className="demo-api">
      <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
      <tbody>
        <tr><td>type</td><td>方向</td><td>horizontal | vertical</td><td>horizontal</td></tr>
        <tr><td>variant</td><td>样式</td><td>solid | dashed | gradient</td><td>gradient</td></tr>
        <tr><td>glow</td><td>发光效果</td><td>boolean</td><td>false</td></tr>
        <tr><td>color</td><td>颜色</td><td>primary | secondary | accent</td><td>primary</td></tr>
        <tr><td>orientation</td><td>文字位置</td><td>center | left | right</td><td>center</td></tr>
      </tbody>
    </table>
  </div>
);

const CardDemo: React.FC = () => (
  <div>
    <div className="demo-preview">
      <div className="demo-row" style={{ alignItems: "stretch", flexWrap: "wrap" }}>
        <Card title="系统状态" glow size="small" style={{ flex: "1 1 200px" }}>
          <p style={{ color: "#00ff00", margin: 0 }}>ONLINE</p>
          <p style={{ color: "#8080cc", fontSize: 12, margin: "4px 0 0" }}>CPU: 42%</p>
        </Card>
        <Card
          title="数据面板"
          color="secondary"
          hoverable
          extra={<span style={{ fontSize: 11, color: "#8080cc" }}>实时</span>}
          style={{ flex: "1 1 200px" }}
        >
          <p style={{ margin: 0, color: "#b0b0ff" }}>存储: 2.1 TB</p>
          <p style={{ color: "#ff00ff", margin: "4px 0 0" }}>带宽: 1.2 Gbps</p>
        </Card>
        <Card
          title="快捷操作"
          color="accent"
          bordered
          footer={<Button type="accent" size="small">执行</Button>}
          style={{ flex: "1 1 200px" }}
        >
          <p style={{ margin: 0, color: "#b0b0ff", fontSize: 13 }}>运行系统诊断</p>
        </Card>
      </div>
    </div>
    <div className="demo-code">
      <pre><code>{`<Card title="系统状态" glow size="small">
  <p>ONLINE</p>
</Card>

<Card title="数据面板" color="secondary" hoverable extra={<span>实时</span>}>
  <p>存储: 2.1 TB</p>
</Card>

<Card title="快捷操作" color="accent" bordered footer={<Button>执行</Button>}>
  <p>运行系统诊断</p>
</Card>`}</code></pre>
    </div>
    <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
    <table className="demo-api">
      <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
      <tbody>
        <tr><td>title</td><td>标题</td><td>ReactNode</td><td>-</td></tr>
        <tr><td>extra</td><td>右上角内容</td><td>ReactNode</td><td>-</td></tr>
        <tr><td>cover</td><td>封面图URL</td><td>string</td><td>-</td></tr>
        <tr><td>bordered</td><td>加粗边框</td><td>boolean</td><td>false</td></tr>
        <tr><td>glow</td><td>发光效果</td><td>boolean</td><td>false</td></tr>
        <tr><td>color</td><td>颜色主题</td><td>primary | secondary | accent</td><td>primary</td></tr>
        <tr><td>hoverable</td><td>悬浮动效</td><td>boolean</td><td>false</td></tr>
        <tr><td>size</td><td>尺寸</td><td>small | medium</td><td>medium</td></tr>
        <tr><td>footer</td><td>底部内容</td><td>ReactNode</td><td>-</td></tr>
      </tbody>
    </table>
  </div>
);

const FooterDemo: React.FC = () => {
  const footerColumns: FooterColumn[] = [
    {
      title: "产品",
      links: [{ label: "组件库", href: "#" }, { label: "设计系统", href: "#" }, { label: "更新日志" }],
    },
    {
      title: "资源",
      links: [{ label: "文档", href: "#" }, { label: "GitHub" }, { label: "NPM" }],
    },
    {
      title: "更多",
      links: [{ label: "关于", href: "#" }, { label: "贡献指南", href: "#" }, { label: "许可证" }],
    },
  ];

  return (
    <div>
      <div className="demo-preview" style={{ padding: 0 }}>
        <Footer
          columns={footerColumns}
          copyright="© 2026 Cyberpunk UI. All rights reserved."
          theme="glow"
          socialLinks={[
            { label: "GitHub", href: "#", icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>' },
          ]}
        />
      </div>
      <div className="demo-code">
        <pre><code>{`<Footer
  columns={[
    { title: "产品", links: [{ label: "组件库" }, { label: "设计系统" }] },
  ]}
  copyright="© 2026 Cyberpunk UI"
  theme="glow"
  socialLinks={[{ label: "GitHub", href: "#", icon: "<svg>...</svg>" }]}
/>`}</code></pre>
      </div>
    </div>
  );
};

const InputDemo: React.FC = () => {
  const [inputVal, setInputVal] = useState("cyberpunk");

  return (
    <div>
      <div className="demo-preview">
        <div className="demo-col" style={{ gap: 16, maxWidth: 400 }}>
          <Input
            label="用户名"
            placeholder="请输入用户名"
            prefix={<PresetIcon name="user" />}
            clearable
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            showCount
            maxLength={20}
          />
          <Input label="密码" type="password" placeholder="请输入密码" glow scanEffect />
          <Input label="邮箱" placeholder="请输入邮箱" error="格式不正确" />
          <Input label="禁用" value="不可编辑" disabled />
          <TextArea label="备注" placeholder="请输入备注信息" rows={3} glow showCount maxLength={200} />
        </div>
      </div>
      <div className="demo-code">
        <pre><code>{`<Input label="用户名" placeholder="请输入" prefix={<Icon />} clearable showCount maxLength={20} />
<Input label="密码" type="password" glow scanEffect />
<Input label="邮箱" error="格式不正确" />
<TextArea label="备注" rows={3} glow showCount maxLength={200} />`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>Input API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>size</td><td>尺寸</td><td>small | medium | large</td><td>medium</td></tr>
          <tr><td>label</td><td>标签</td><td>string</td><td>-</td></tr>
          <tr><td>required</td><td>必填</td><td>boolean</td><td>false</td></tr>
          <tr><td>error</td><td>错误信息</td><td>string</td><td>-</td></tr>
          <tr><td>helperText</td><td>帮助文字</td><td>string</td><td>-</td></tr>
          <tr><td>prefix</td><td>前缀</td><td>ReactNode</td><td>-</td></tr>
          <tr><td>suffix</td><td>后缀</td><td>ReactNode</td><td>-</td></tr>
          <tr><td>clearable</td><td>可清除</td><td>boolean</td><td>false</td></tr>
          <tr><td>glow</td><td>发光</td><td>boolean</td><td>false</td></tr>
          <tr><td>scanEffect</td><td>扫描线</td><td>boolean</td><td>false</td></tr>
          <tr><td>showCount</td><td>字数统计</td><td>boolean</td><td>false</td></tr>
          <tr><td>maxLength</td><td>最大长度</td><td>number</td><td>-</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const SwitchDemo: React.FC = () => {
  const [s1, setS1] = useState(true);
  const [s2, setS2] = useState(false);

  return (
    <div>
      <div className="demo-preview">
        <div className="demo-col" style={{ gap: 12 }}>
          <Switch checked={s1} onChange={setS1} label="启用通知" glow />
          <Switch checked={s2} onChange={setS2} label="暗黑模式" color="secondary" />
          <Switch defaultChecked disabled label="系统锁定" />
          <Switch defaultChecked color="accent" label="AI 助手" size="small" />
          <Switch defaultChecked size="large" label="全频段" glow />
        </div>
      </div>
      <div className="demo-code">
        <pre><code>{`<Switch checked={value} onChange={setValue} label="启用通知" glow />
<Switch color="secondary" label="暗黑模式" />
<Switch disabled label="系统锁定" />
<Switch color="accent" size="small" label="AI 助手" />
<Switch size="large" glow label="全频段" />`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>checked</td><td>受控选中</td><td>boolean</td><td>-</td></tr>
          <tr><td>defaultChecked</td><td>默认选中</td><td>boolean</td><td>false</td></tr>
          <tr><td>disabled</td><td>禁用</td><td>boolean</td><td>false</td></tr>
          <tr><td>size</td><td>尺寸</td><td>small | medium | large</td><td>medium</td></tr>
          <tr><td>color</td><td>颜色</td><td>primary | secondary | accent</td><td>primary</td></tr>
          <tr><td>glow</td><td>发光</td><td>boolean</td><td>false</td></tr>
          <tr><td>label</td><td>标签文字</td><td>ReactNode</td><td>-</td></tr>
          <tr><td>onChange</td><td>变化回调</td><td>(checked: boolean) =&gt; void</td><td>-</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const SelectDemo: React.FC = () => {
  const options: SelectOption[] = [
    { label: "霓虹蓝 Cyan", value: "cyan" },
    { label: "霓虹粉 Magenta", value: "magenta" },
    { label: "霓虹绿 Green", value: "green" },
    { label: "禁用项", value: "disabled", disabled: true },
  ];

  return (
    <div>
      <div className="demo-preview">
        <div className="demo-col" style={{ gap: 16, maxWidth: 300 }}>
          <Select options={options} placeholder="请选择主题色" label="主题色" clearable glow />
          <Select options={options} defaultValue="cyan" label="默认选中" />
          <Select options={options} value="green" label="受控" disabled />
          <Select options={options} placeholder="小尺寸" size="small" />
        </div>
      </div>
      <div className="demo-code">
        <pre><code>{`const options = [
  { label: "霓虹蓝", value: "cyan" },
  { label: "霓虹粉", value: "magenta" },
  { label: "禁用项", value: "disabled", disabled: true },
];

<Select options={options} placeholder="请选择" label="主题色" clearable glow />
<Select options={options} defaultValue="cyan" />
<Select options={options} disabled />`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>options</td><td>选项列表</td><td>SelectOption[]</td><td>[]</td></tr>
          <tr><td>value</td><td>受控值</td><td>string | number</td><td>-</td></tr>
          <tr><td>defaultValue</td><td>默认值</td><td>string | number</td><td>-</td></tr>
          <tr><td>placeholder</td><td>占位文字</td><td>string</td><td>请选择</td></tr>
          <tr><td>label</td><td>标签</td><td>string</td><td>-</td></tr>
          <tr><td>size</td><td>尺寸</td><td>small | medium | large</td><td>medium</td></tr>
          <tr><td>clearable</td><td>可清除</td><td>boolean</td><td>false</td></tr>
          <tr><td>glow</td><td>发光</td><td>boolean</td><td>false</td></tr>
          <tr><td>onChange</td><td>变化回调</td><td>(value) =&gt; void</td><td>-</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const CheckboxDemo: React.FC = () => {
  const ckOptions = ["终端模式", "扫描线", "AI 增强", { label: "禁用项", value: "disabled", disabled: true }];

  return (
    <div>
      <div className="demo-preview">
        <div className="demo-col" style={{ gap: 16 }}>
          <div className="demo-row">
            <Checkbox defaultChecked label="同意协议" />
            <Checkbox defaultChecked glow label="开启通知" />
            <Checkbox color="secondary" label="暗黑模式" />
            <Checkbox color="accent" label="AI 辅助" />
            <Checkbox disabled label="不可选" />
            <Checkbox indeterminate label="半选状态" />
          </div>
          <Divider />
          <CheckboxGroup
            options={ckOptions}
            defaultValue={["终端模式"]}
            direction="horizontal"
          />
        </div>
      </div>
      <div className="demo-code">
        <pre><code>{`<Checkbox defaultChecked label="同意协议" />
<Checkbox glow label="开启通知" />
<Checkbox indeterminate label="半选状态" />
<Checkbox disabled label="不可选" />

<CheckboxGroup
  options={["终端模式", "扫描线", "AI 增强"]}
  defaultValue={["终端模式"]}
  direction="horizontal"
/>`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>checked</td><td>受控选中</td><td>boolean</td><td>-</td></tr>
          <tr><td>defaultChecked</td><td>默认选中</td><td>boolean</td><td>false</td></tr>
          <tr><td>disabled</td><td>禁用</td><td>boolean</td><td>false</td></tr>
          <tr><td>indeterminate</td><td>半选状态</td><td>boolean</td><td>false</td></tr>
          <tr><td>color</td><td>颜色</td><td>primary | secondary | accent</td><td>primary</td></tr>
          <tr><td>glow</td><td>发光</td><td>boolean</td><td>false</td></tr>
          <tr><td>label</td><td>标签</td><td>ReactNode</td><td>-</td></tr>
          <tr><td>onChange</td><td>变化回调</td><td>(checked: boolean) =&gt; void</td><td>-</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const CollapseDemo: React.FC = () => {
  const collapseItems: CollapseItem[] = [
    { key: "1", label: "系统信息", children: <p style={{ margin: 0 }}>CPU: 8核 · RAM: 32GB · OS: CYBER-OS v4.2</p> },
    { key: "2", label: "安全日志", children: <p style={{ margin: 0 }}>[OK] 防火墙 · [OK] 入侵检测 · [WARN] 异常流量: 10/min</p>, extra: "3条" },
    { key: "3", label: "锁定项", children: <p style={{ margin: 0 }}>需要管理员权限</p>, disabled: true },
  ];

  return (
    <div>
      <div className="demo-preview">
        <Collapse items={collapseItems} defaultActiveKeys={["1"]} glow />
        <div style={{ marginTop: 16 }}>
          <Collapse items={collapseItems.slice(0, 2)} accordion bordered />
        </div>
      </div>
      <div className="demo-code">
        <pre><code>{`const items = [
  { key: "1", label: "系统信息", children: <p>...</p> },
  { key: "2", label: "安全日志", children: <p>...</p>, extra: "3条" },
  { key: "3", label: "锁定项", children: <p>...</p>, disabled: true },
];

<Collapse items={items} defaultActiveKeys={["1"]} glow />
<Collapse items={items} accordion bordered />`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>items</td><td>面板列表</td><td>CollapseItem[]</td><td>[]</td></tr>
          <tr><td>activeKeys</td><td>受控展开 keys</td><td>(string | number)[]</td><td>-</td></tr>
          <tr><td>defaultActiveKeys</td><td>默认展开 keys</td><td>(string | number)[]</td><td>[]</td></tr>
          <tr><td>accordion</td><td>手风琴模式</td><td>boolean</td><td>false</td></tr>
          <tr><td>bordered</td><td>边框</td><td>boolean</td><td>false</td></tr>
          <tr><td>glow</td><td>发光</td><td>boolean</td><td>false</td></tr>
          <tr><td>size</td><td>尺寸</td><td>small | medium</td><td>medium</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const TableDemo: React.FC = () => {
  const columns: TableColumn<{ id: string; name: string; status: string; cpu: string }>[] = [
    { key: "name", title: "节点", dataIndex: "name", sortable: true },
    { key: "status", title: "状态", dataIndex: "status" },
    { key: "cpu", title: "CPU", dataIndex: "cpu", sortable: true },
  ];

  const data = [
    { id: "1", name: "NODE-01", status: "ONLINE", cpu: "42%" },
    { id: "2", name: "NODE-02", status: "ONLINE", cpu: "67%" },
    { id: "3", name: "NODE-03", status: "OFFLINE", cpu: "0%" },
    { id: "4", name: "NODE-04", status: "ONLINE", cpu: "23%" },
  ];

  return (
    <div>
      <div className="demo-preview" style={{ padding: 0 }}>
        <Table columns={columns} dataSource={data} rowKey="id" striped glow size="small" />
      </div>
      <div className="demo-code">
        <pre><code>{`const columns = [
  { key: "name", title: "节点", dataIndex: "name", sortable: true },
  { key: "status", title: "状态", dataIndex: "status" },
  { key: "cpu", title: "CPU", dataIndex: "cpu", sortable: true },
];

<Table columns={columns} dataSource={data} rowKey="id" striped glow />`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>columns</td><td>列定义</td><td>TableColumn[]</td><td>[]</td></tr>
          <tr><td>dataSource</td><td>数据源</td><td>T[]</td><td>[]</td></tr>
          <tr><td>rowKey</td><td>行 key</td><td>string | function</td><td>index</td></tr>
          <tr><td>size</td><td>尺寸</td><td>small | medium</td><td>medium</td></tr>
          <tr><td>bordered</td><td>单元格边框</td><td>boolean</td><td>false</td></tr>
          <tr><td>striped</td><td>斑马纹</td><td>boolean</td><td>false</td></tr>
          <tr><td>glow</td><td>发光</td><td>boolean</td><td>false</td></tr>
          <tr><td>loading</td><td>加载中</td><td>boolean</td><td>false</td></tr>
          <tr><td>emptyText</td><td>空状态文字</td><td>ReactNode</td><td>— 无数据 —</td></tr>
          <tr><td>onRow</td><td>行事件</td><td>(record, index) =&gt; object</td><td>-</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const CodeBlockDemo: React.FC = () => (
  <div>
    <div className="demo-preview">
      <CodeBlock
        language="typescript"
        code={`import { CyberpunkUI } from "cyberpunk-ui";

// 初始化赛博朋克界面
const app = new CyberpunkUI({
  theme: "neon-dark",
  scanLine: true,
  glow: "primary",
});

app.mount("#root");
console.log("System online // NEON_CITY v4.2");`}
        showLineNumbers
        glow
      />
    </div>
    <div className="demo-code">
      <pre><code>{`<CodeBlock
  language="typescript"
  code={\`const app = new CyberpunkUI({ theme: "neon-dark" });\`}
  showLineNumbers
  glow
/>`}</code></pre>
    </div>
    <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
    <table className="demo-api">
      <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
      <tbody>
        <tr><td>code</td><td>代码字符串</td><td>string</td><td>""</td></tr>
        <tr><td>language</td><td>语言标注</td><td>string</td><td>-</td></tr>
        <tr><td>showLineNumbers</td><td>行号</td><td>boolean</td><td>false</td></tr>
        <tr><td>glow</td><td>发光边框</td><td>boolean</td><td>false</td></tr>
        <tr><td>showHeader</td><td>显示顶部栏</td><td>boolean</td><td>true</td></tr>
      </tbody>
    </table>
  </div>
);

const TabsDemo: React.FC = () => {
  const tabItems: TabItem[] = [
    {
      key: "a",
      label: "终端",
      icon: <PresetIcon name="code" size="small" />,
      children: <div style={{ padding: 24, textAlign: "center", color: "#b0b0ff" }}>TERMINAL OUTPUT: Connection established.</div>,
    },
    {
      key: "b",
      label: "日志",
      dot: true,
      children: <div style={{ padding: 24, textAlign: "center", color: "#b0b0ff" }}>LOG: System running smoothly.</div>,
    },
    {
      key: "c",
      label: "监控",
      badge: 5,
      children: <div style={{ padding: 24, textAlign: "center", color: "#b0b0ff" }}>MONITOR: 5 alerts pending.</div>,
    },
    {
      key: "d",
      label: "禁用",
      disabled: true,
      children: null,
    },
  ];

  return (
    <div>
      <div className="demo-preview">
        <Tabs items={tabItems} defaultActiveKey="a" type="line" glowEffect scanLine />
        <div style={{ marginTop: 16 }}>
          <Tabs items={tabItems.slice(0, 3)} defaultActiveKey="a" type="card" centered />
        </div>
      </div>
      <div className="demo-code">
        <pre><code>{`const items = [
  { key: "a", label: "终端", icon: <Icon />, children: <div>...</div> },
  { key: "b", label: "日志", dot: true, children: <div>...</div> },
  { key: "c", label: "监控", badge: 5, children: <div>...</div> },
];

<Tabs items={items} defaultActiveKey="a" type="line" glowEffect scanLine />
<Tabs items={items} type="card" centered />`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>items</td><td>Tab 项数组</td><td>TabItem[]</td><td>-</td></tr>
          <tr><td>activeKey</td><td>当前激活 key</td><td>string</td><td>-</td></tr>
          <tr><td>defaultActiveKey</td><td>默认激活 key</td><td>string</td><td>-</td></tr>
          <tr><td>tabPosition</td><td>标签位置</td><td>top | bottom | left | right</td><td>top</td></tr>
          <tr><td>type</td><td>类型</td><td>line | card</td><td>line</td></tr>
          <tr><td>size</td><td>尺寸</td><td>small | medium | large</td><td>medium</td></tr>
          <tr><td>centered</td><td>居中</td><td>boolean</td><td>false</td></tr>
          <tr><td>animated</td><td>动画指示器</td><td>boolean</td><td>true</td></tr>
          <tr><td>glowEffect</td><td>发光</td><td>boolean</td><td>true</td></tr>
          <tr><td>scanLine</td><td>扫描线</td><td>boolean</td><td>true</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const ModalDemo: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="demo-preview">
        <Button type="primary" onClick={() => setVisible(true)}>打开弹窗</Button>
        <Modal
          open={visible}
          title="系统确认"
          onClose={() => setVisible(false)}
          glow
          scanLine
          footer={
            <>
              <Button type="ghost" size="small" onClick={() => setVisible(false)}>取消</Button>
              <Button type="primary" size="small" onClick={() => setVisible(false)}>确认</Button>
            </>
          }
        >
          <p style={{ margin: 0, lineHeight: 1.8 }}>
            确认执行此操作？<br />
            此操作将触发系统级变更，请确认您有相应权限。
          </p>
        </Modal>
      </div>
      <div className="demo-code">
        <pre><code>{`const [visible, setVisible] = useState(false);

<Button onClick={() => setVisible(true)}>打开弹窗</Button>

<Modal
  open={visible}
  title="系统确认"
  onClose={() => setVisible(false)}
  glow
  scanLine
  footer={<><Button type="ghost">取消</Button><Button type="primary">确认</Button></>}
>
  <p>确认执行此操作？</p>
</Modal>`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>open</td><td>是否显示</td><td>boolean</td><td>false</td></tr>
          <tr><td>title</td><td>标题</td><td>ReactNode</td><td>-</td></tr>
          <tr><td>size</td><td>尺寸</td><td>small | medium | large | full</td><td>medium</td></tr>
          <tr><td>closable</td><td>显示关闭按钮</td><td>boolean</td><td>true</td></tr>
          <tr><td>maskClosable</td><td>点击遮罩关闭</td><td>boolean</td><td>true</td></tr>
          <tr><td>glow</td><td>发光边框</td><td>boolean</td><td>false</td></tr>
          <tr><td>scanLine</td><td>扫描线遮罩</td><td>boolean</td><td>false</td></tr>
          <tr><td>footer</td><td>底部内容</td><td>ReactNode</td><td>-</td></tr>
          <tr><td>destroyOnClose</td><td>关闭时销毁</td><td>boolean</td><td>false</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const LoadingDemo: React.FC = () => (
  <div>
    <div className="demo-preview">
      <div className="demo-row" style={{ gap: 32 }}>
        <div style={{ textAlign: "center" }}>
          <p className="demo-label">Spinner</p>
          <Loading type="spinner" size="medium" text="LOADING" />
        </div>
        <div style={{ textAlign: "center" }}>
          <p className="demo-label">Dots</p>
          <Loading type="dots" size="medium" text="处理中" />
        </div>
        <div style={{ textAlign: "center" }}>
          <p className="demo-label">Small</p>
          <Loading type="spinner" size="small" />
        </div>
        <div style={{ textAlign: "center" }}>
          <p className="demo-label">Large</p>
          <Loading type="spinner" size="large" />
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <p className="demo-label">Skeleton</p>
        <div className="demo-col" style={{ gap: 8 }}>
          <Loading type="skeleton" skeletonWidth="60%" skeletonHeight={16} />
          <Loading type="skeleton" skeletonWidth="100%" skeletonHeight={14} />
          <Loading type="skeleton" skeletonWidth="80%" skeletonHeight={14} />
        </div>
      </div>
    </div>
    <div className="demo-code">
      <pre><code>{`<Loading type="spinner" size="medium" text="LOADING" />
<Loading type="dots" text="处理中" />
<Loading type="spinner" size="small" />
<Loading type="skeleton" skeletonWidth="60%" skeletonHeight={16} />
<Loading fullscreen text="系统加载中..." />`}</code></pre>
    </div>
    <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
    <table className="demo-api">
      <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
      <tbody>
        <tr><td>type</td><td>类型</td><td>spinner | dots | skeleton</td><td>spinner</td></tr>
        <tr><td>size</td><td>尺寸</td><td>small | medium | large</td><td>medium</td></tr>
        <tr><td>fullscreen</td><td>全屏遮罩</td><td>boolean</td><td>false</td></tr>
        <tr><td>text</td><td>加载文字</td><td>string</td><td>-</td></tr>
        <tr><td>skeletonWidth</td><td>骨架宽度</td><td>number | string</td><td>100%</td></tr>
        <tr><td>skeletonHeight</td><td>骨架高度</td><td>number</td><td>16</td></tr>
      </tbody>
    </table>
  </div>
);

const TimeDemo: React.FC = () => {
  const [tpVal, setTpVal] = useState("14:30");
  const [dpVal, setDpVal] = useState("2087-05-22");

  return (
    <div>
      <div className="demo-preview">
        <div className="demo-col" style={{ gap: 20 }}>
          <div>
            <p className="demo-label">Time 实时时钟</p>
            <div className="demo-row" style={{ gap: 16, flexWrap: "wrap" }}>
              <Time format="full" color="primary" glow scanEffect />
              <Time format="compact" color="secondary" glow size="small" />
              <Time format="date" color="accent" glow />
            </div>
            <div className="demo-row" style={{ gap: 16, marginTop: 12 }}>
              <Time format="full" color="primary" size="small" />
              <Time format="compact" color="secondary" size="large" glow hour12 />
              <Time format="compact" color="accent" showSeconds={false} />
            </div>
          </div>
          <Divider />
          <div>
            <p className="demo-label">TimePicker 时间选择器</p>
            <div className="demo-row" style={{ gap: 16, flexWrap: "wrap" }}>
              <TimePicker onChange={setTpVal} glow />
              <TimePicker defaultValue="09:15:30" format="HH:mm:ss" color="secondary" glow />
              <TimePicker value={tpVal} onChange={setTpVal} color="accent" size="small" />
              <TimePicker placeholder="禁用状态" disabled />
            </div>
          </div>
          <Divider />
          <div>
            <p className="demo-label">DatePicker 日期选择器</p>
            <div className="demo-row" style={{ gap: 16, flexWrap: "wrap" }}>
              <DatePicker onChange={setDpVal} glow />
              <DatePicker value={dpVal} onChange={setDpVal} color="secondary" glow />
              <DatePicker defaultValue="2087-01-01" color="accent" size="small" />
              <DatePicker placeholder="禁用状态" disabled />
            </div>
          </div>
        </div>
      </div>
      <div className="demo-code">
        <pre><code>{`import { Time, TimePicker, DatePicker } from "cyberpunk-ui";

{/* Time — 实时时钟 */}
<Time format="full" color="primary" glow scanEffect />
<Time format="compact" color="secondary" glow size="small" />
<Time format="compact" hour12 showSeconds={false} />

{/* TimePicker — 时间选择器 */}
<TimePicker onChange={setVal} glow />
<TimePicker defaultValue="09:15:30" format="HH:mm:ss" color="secondary" glow />
<TimePicker value={val} onChange={setVal} color="accent" size="small" />

{/* DatePicker — 日期选择器 */}
<DatePicker onChange={setVal} glow />
<DatePicker value={val} onChange={setVal} color="secondary" glow />
<DatePicker defaultValue="2087-01-01" color="accent" size="small" />`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>Time API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>format</td><td>显示格式</td><td>full | compact | date</td><td>full</td></tr>
          <tr><td>hour12</td><td>12小时制</td><td>boolean</td><td>false</td></tr>
          <tr><td>showSeconds</td><td>显示秒</td><td>boolean</td><td>true</td></tr>
          <tr><td>showWeekday</td><td>显示星期</td><td>boolean</td><td>true</td></tr>
          <tr><td>showDate</td><td>显示日期</td><td>boolean</td><td>true</td></tr>
          <tr><td>color</td><td>颜色</td><td>primary | secondary | accent</td><td>primary</td></tr>
          <tr><td>size</td><td>尺寸</td><td>small | medium | large</td><td>medium</td></tr>
          <tr><td>glow</td><td>发光效果</td><td>boolean</td><td>true</td></tr>
          <tr><td>scanEffect</td><td>扫描线</td><td>boolean</td><td>false</td></tr>
        </tbody>
      </table>

      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>TimePicker / DatePicker API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>value</td><td>受控值</td><td>string</td><td>-</td></tr>
          <tr><td>defaultValue</td><td>默认值</td><td>string</td><td>""</td></tr>
          <tr><td>onChange</td><td>变化回调</td><td>(value: string) =&gt; void</td><td>-</td></tr>
          <tr><td>placeholder</td><td>占位文字</td><td>string</td><td>选择时间/选择日期</td></tr>
          <tr><td>disabled</td><td>禁用</td><td>boolean</td><td>false</td></tr>
          <tr><td>color</td><td>颜色</td><td>primary | secondary | accent</td><td>primary</td></tr>
          <tr><td>size</td><td>尺寸</td><td>small | medium | large</td><td>medium</td></tr>
          <tr><td>glow</td><td>发光边框</td><td>boolean</td><td>false</td></tr>
          <tr><td>format</td><td>时间格式 (TimePicker)</td><td>HH:mm | HH:mm:ss</td><td>HH:mm</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const IconLibraryDemo: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("");

  return (
    <div>
      <div className="demo-preview" style={{ padding: 0 }}>
        <IconLibrary
          color="primary"
          defaultSize={24}
          downloadable
          defaultFormat="webp"
          onIconClick={(icon) => setSelectedIcon(icon.name)}
        />
        {selectedIcon && (
          <div style={{ padding: "8px 16px", color: "#00f3ff", fontSize: 13, fontFamily: "Orbitron", letterSpacing: 2 }}>
            {'>'} 选中: {selectedIcon}
          </div>
        )}
      </div>
      <div className="demo-code">
        <pre><code>{`import { IconLibrary } from "cyberpunk-ui";

<IconLibrary
  color="primary"
  defaultSize={24}
  downloadable
  defaultFormat="webp"
  onIconClick={(icon) => console.log(icon.name)}
/>`}</code></pre>
      </div>
      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>color</td><td>颜色主题</td><td>primary | secondary | accent</td><td>primary</td></tr>
          <tr><td>defaultSize</td><td>图标默认尺寸(px)</td><td>number</td><td>24</td></tr>
          <tr><td>downloadable</td><td>可下载</td><td>boolean</td><td>true</td></tr>
          <tr><td>defaultFormat</td><td>下载格式</td><td>webp | png</td><td>webp</td></tr>
          <tr><td>columns</td><td>网格列数</td><td>number</td><td>6</td></tr>
          <tr><td>showSearch</td><td>搜索框</td><td>boolean</td><td>true</td></tr>
          <tr><td>showCategories</td><td>分类标签</td><td>boolean</td><td>true</td></tr>
          <tr><td>showToolbar</td><td>工具栏</td><td>boolean</td><td>true</td></tr>
          <tr><td>onIconClick</td><td>点击图标回调</td><td>(icon: IconDef) =&gt; void</td><td>-</td></tr>
        </tbody>
      </table>
      <p style={{ color: "#b0b0ff", fontSize: 13, marginTop: 12 }}>
        内置 68 个赛博朋克风格图标，分 6 大类：通用、技术、安全、导航、媒体、赛博。
        每个图标支持 WebP/PNG 下载，悬浮弹动效果。
      </p>
    </div>
  );
};

const BorderFlowDemo: React.FC = () => {
  const [presetKey, setPresetKey] = useState("neon");
  const [bfModalOpen, setBfModalOpen] = useState(false);
  const [beamCount, setBeamCount] = useState(1);
  const presetKeys = Object.keys(beamPresets);
  const currentPreset = beamPresets[presetKey] ?? beamPresets.neon;

  return (
    <div>
      <div className="demo-preview">
        <div className="demo-col" style={{ gap: 20 }}>
          {/* 预设选择器 */}
          <div>
            <p className="demo-label">预设渐变</p>
            <div className="demo-row" style={{ gap: 6, flexWrap: "wrap" }}>
              {presetKeys.map((k) => {
                const p = beamPresets[k];
                const active = k === presetKey;
                return (
                  <button
                    key={k}
                    onClick={() => setPresetKey(k)}
                    style={{
                      padding: "6px 14px",
                      border: active ? `2px solid ${p.colors[0].color}` : "1px solid #333",
                      background: active ? "rgba(0,243,255,0.08)" : "transparent",
                      color: active ? p.colors[0].color : "#8080cc",
                      cursor: "pointer",
                      fontFamily: "Orbitron",
                      fontSize: 11,
                      letterSpacing: 1,
                      transition: "all 0.2s",
                    }}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 色标预览 */}
          <div className="demo-row" style={{ gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "#8080cc", fontSize: 11, fontFamily: "Orbitron", letterSpacing: 1 }}>
              色标:
            </span>
            {currentPreset.colors.map((s, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 8px",
                  border: `1px solid ${s.color}`,
                  color: s.color,
                  fontSize: 11,
                  fontFamily: "Courier New",
                }}
              >
                <span style={{ width: 8, height: 8, background: s.color, display: "inline-block" }} />
                {s.color} {s.percent}%
              </span>
            ))}
          </div>

          <Divider />

          {/* 光束数 & 速度控制 */}
          <div className="demo-row" style={{ gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ color: "#8080cc", fontSize: 11 }}>光束数:</span>
            {[1, 2, 3, 4].map((n) => (
              <Button
                key={n}
                type={beamCount === n ? "primary" : "ghost"}
                size="small"
                onClick={() => setBeamCount(n)}
              >
                {n}
              </Button>
            ))}
          </div>

          <Divider />

          {/* 演示区 */}
          <div>
            <p className="demo-label">包裹 Card</p>
            <BorderBeam
              color={currentPreset.colors}
              beams={beamCount}
              beamSize={0.2}
              duration={3}
              borderWidth={2}
            >
              <Card
                title={currentPreset.name}
                extra={
                  <span style={{ fontSize: 11, color: currentPreset.colors[0].color, fontFamily: "Orbitron" }}>
                    {presetKey.toUpperCase()}
                  </span>
                }
                style={{ minWidth: 280 }}
              >
                <p style={{ margin: 0, color: "#b0b0ff", fontSize: 13 }}>
                  光束段沿边框持续流动，光束数 {beamCount}，支持多色标渐变。
                </p>
              </Card>
            </BorderBeam>
          </div>

          <div>
            <p className="demo-label">包裹其他组件</p>
            <div className="demo-row" style={{ gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <BorderBeam color="sunset" beamSize={0.3} duration={2} borderWidth={2}>
                <Button type="primary">Sunset 按钮</Button>
              </BorderBeam>
              <BorderBeam color="aurora" beamSize={0.25} duration={3} borderWidth={2}>
                <Input placeholder="Aurora 输入框" />
              </BorderBeam>
              <BorderBeam color="matrix" beamSize={0.3} duration={2.5} borderWidth={2}>
                <div style={{ padding: "8px 16px", background: "#1a1a2e", color: "#00ff00", fontFamily: "Orbitron", fontSize: 13 }}>
                  MATRIX
                </div>
              </BorderBeam>
            </div>
          </div>

          <Divider />

          <div>
            <p className="demo-label">弹窗 (BorderFlow 别名)</p>
            <Button type="primary" onClick={() => setBfModalOpen(true)}>打开流光弹窗</Button>
            <Modal
              open={bfModalOpen}
              title="SYNTHWAVE FLOW"
              onClose={() => setBfModalOpen(false)}
              glow
              footer={
                <>
                  <Button type="ghost" size="small" onClick={() => setBfModalOpen(false)}>取消</Button>
                  <Button type="primary" size="small" onClick={() => setBfModalOpen(false)}>确认</Button>
                </>
              }
            >
              <BorderFlow color="synthwave" beamSize={0.2} duration={2} borderWidth={2} borderRadius={4}>
                <div style={{ padding: 16, background: "#1a1a2e" }}>
                  <p style={{ margin: 0, lineHeight: 1.8, color: "#b0b0ff" }}>
                    弹窗内容也用 BorderFlow 包裹，<br />
                    多层嵌套流光效果。
                  </p>
                </div>
              </BorderFlow>
            </Modal>
          </div>
        </div>
      </div>

      <div className="demo-code">
        <pre><code>{`import { BorderBeam, beamPresets } from "cyberpunk-ui";

{/* 使用预设 */}
<BorderBeam color="neon" beamSize={0.2} beams={2} duration={3}>
  <Card title="标题">内容</Card>
</BorderBeam>

{/* 自定义色标 */}
<BorderBeam
  color={[
    { color: "#ff00ff", percent: 0 },
    { color: "#ff6600", percent: 50 },
    { color: "#00f3ff", percent: 100 },
  ]}
  beamSize={0.3}
>
  <Button>按钮</Button>
</BorderBeam>

{/* 预设: ocean, sunset, aurora, forest, ember, nebula, neon, matrix, synthwave */}`}</code></pre>
      </div>

      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>BorderBeam API</h3>
      <table className="demo-api">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          <tr><td>color</td><td>预设名 / 自定义色标</td><td>string | BeamGradient</td><td>"neon"</td></tr>
          <tr><td>beamSize</td><td>光束长度占比 (0~1)</td><td>number</td><td>0.25</td></tr>
          <tr><td>beams</td><td>光束条数</td><td>number</td><td>1</td></tr>
          <tr><td>duration</td><td>绕一圈的秒数</td><td>number</td><td>3</td></tr>
          <tr><td>borderWidth</td><td>边框宽度(px)</td><td>number</td><td>2</td></tr>
          <tr><td>borderRadius</td><td>圆角(px)</td><td>number</td><td>4</td></tr>
          <tr><td>background</td><td>内容区背景色</td><td>string</td><td>"#1a1a2e"</td></tr>
          <tr><td>reverse</td><td>反转方向</td><td>boolean</td><td>false</td></tr>
          <tr><td>children</td><td>被包裹的内容</td><td>ReactNode</td><td>-</td></tr>
        </tbody>
      </table>

      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>预设渐变</h3>
      <table className="demo-api">
        <thead><tr><th>名称</th><th>色标</th><th>适用场景</th></tr></thead>
        <tbody>
          <tr><td>ocean</td><td>#1677ff → #36cfc9 → #95de64</td><td>Dashboard / 数据面板</td></tr>
          <tr><td>sunset</td><td>#ff7a45 → #ff4d4f → #ff85c0</td><td>升级提示 / 营销卡片</td></tr>
          <tr><td>aurora</td><td>#7c3aed → #06b6d4 → #67e8f9</td><td>AI 助手 / 自动化</td></tr>
          <tr><td>forest</td><td>#22c55e → #a3e635 → #facc15</td><td>推荐 / 增长面板</td></tr>
          <tr><td>ember</td><td>#fa541c → #ff7875 → #ffd666</td><td>告警 / 高能提示</td></tr>
          <tr><td>nebula</td><td>#2f54eb → #722ed1 → #ff85c0</td><td>实验模块 / Labs</td></tr>
          <tr><td>neon 🌐</td><td>#00f3ff → #ff00ff → #00f3ff</td><td>赛博朋克默认</td></tr>
          <tr><td>matrix 🌐</td><td>#00ff00 → #00cc00 → #80ff80</td><td>矩阵/终端</td></tr>
          <tr><td>synthwave 🌐</td><td>#ff00ff → #ff6600 → #00f3ff</td><td>合成波/复古</td></tr>
        </tbody>
      </table>

      <h3 style={{ fontFamily: "Orbitron", color: "#ff00ff", marginTop: 24, marginBottom: 8, fontSize: 14 }}>实现原理</h3>
      <p style={{ color: "#b0b0ff", fontSize: 13, lineHeight: 1.8 }}>
        SVG 叠加层绘制圆角矩形路径 → stroke-dasharray 创建可见光束段 →
        CSS @keyframes 驱动 stroke-dashoffset 沿边框流动 →
        ResizeObserver 自适应容器尺寸 → 周长 = 四直边 + 四圆角弧段
      </p>
    </div>
  );
};

/* ── 组件演示映射 ── */
const demoMap: Record<string, React.FC> = {
  cursor: CursorDemo,
  typewriter: TypewriterDemo,
  button: ButtonDemo,
  icon: IconDemo,
  divider: DividerDemo,
  card: CardDemo,
  footer: FooterDemo,
  input: InputDemo,
  switch: SwitchDemo,
  select: SelectDemo,
  checkbox: CheckboxDemo,
  collapse: CollapseDemo,
  table: TableDemo,
  codeblock: CodeBlockDemo,
  tabs: TabsDemo,
  modal: ModalDemo,
  loading: LoadingDemo,
  time: TimeDemo,
  iconlibrary: IconLibraryDemo,
  borderflow: BorderFlowDemo,
};

/* ── App ── */
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("cursor");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    Object.keys(demoMap).forEach((key) => {
      const el = sectionRefs.current[key];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (key: string) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  };

  return (
    <div className="site-app">
      <Cursor color="#ff00ff" size={12} animated showTrail trailLength={20} clickEffect />

      {/* Mobile menu toggle */}
      <button className="site-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`site-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <h1 className="sidebar-logo">CYBERPUNK UI</h1>
          <div className="sidebar-version">v0.1.0</div>
        </div>
        <ul className="sidebar-nav">
          {categories.map((cat) => (
            <li key={cat.title} className="nav-group">
              <div className="nav-group-title">{cat.title}</div>
              {cat.items.map((key) => (
                <button
                  key={key}
                  className={`nav-item ${activeSection === key ? "nav-item-active" : ""}`}
                  onClick={() => scrollTo(key)}
                >
                  {labelMap[key]}
                </button>
              ))}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="site-main">
        {Object.entries(demoMap).map(([key, Demo]) => (
          <section
            key={key}
            id={key}
            ref={(el) => { sectionRefs.current[key] = el; }}
            className="site-section"
          >
            <h2 className="section-title">{labelMap[key]}</h2>
            <p className="section-desc">
              Cyberpunk UI {labelMap[key]} — 赛博朋克风格组件，支持多种主题变体和动画效果。
            </p>
            <Demo />
          </section>
        ))}

        <footer className="site-footer">
          <p>Cyberpunk UI &copy; 2026 — Built with React + TypeScript + Less</p>
          <p style={{ marginTop: 4 }}>赛博朋克风格 React 组件库 · 17 个组件 · MIT License</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
