import React from "react";

export interface IconDef {
  name: string;
  label: string;
  keywords: string[];
  svg: React.ReactNode;
}

export type IconCategory = "general" | "tech" | "security" | "navigation" | "media" | "cyber";

export interface IconCategoryDef {
  key: IconCategory;
  label: string;
  icons: string[];
}

const S = (d: string) =>
  React.createElement("path", { d, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" });

const viewBox = "0 0 24 24";
const w = "1em";
const h = "1em";

function icon(d: string) {
  return React.createElement("svg", { viewBox, width: w, height: h }, S(d));
}

function iconFilled(paths: string[]) {
  return React.createElement("svg", { viewBox, width: w, height: h },
    ...paths.map((d, i) =>
      React.createElement("path", {
        key: i,
        d,
        fill: i === 0 ? "none" : "currentColor",
        stroke: i === 0 ? "currentColor" : "none",
        strokeWidth: i === 0 ? "2" : undefined,
        strokeLinecap: i === 0 ? "round" : undefined,
        strokeLinejoin: i === 0 ? "round" : undefined,
      })
    )
  );
}

// Helper for filled icons (first path is outline, rest are filled)
function F(ds: string[]) {
  return React.createElement("svg", { viewBox, width: w, height: h },
    ...ds.map((d, i) => React.createElement("path", {
      key: i, d,
      fill: i === 0 ? "none" : "currentColor",
      stroke: i === 0 ? "currentColor" : "none",
      strokeWidth: i === 0 ? "2" : undefined,
      strokeLinecap: i === 0 ? "round" : undefined,
      strokeLinejoin: i === 0 ? "round" : undefined,
    }))
  );
}

export const iconDefs: Record<string, IconDef> = {
  // ============ 通用 General ============
  home: {
    name: "home", label: "首页", keywords: ["house", "主页"],
    svg: icon("M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"),
  },
  user: {
    name: "user", label: "用户", keywords: ["person", "profile", "账户"],
    svg: icon("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"),
  },
  settings: {
    name: "settings", label: "设置", keywords: ["gear", "cog", "配置"],
    svg: icon("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"),
  },
  search: {
    name: "search", label: "搜索", keywords: ["find", "magnify", "查找"],
    svg: icon("M21 21l-6-6 M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"),
  },
  menu: {
    name: "menu", label: "菜单", keywords: ["hamburger", "nav", "导航"],
    svg: icon("M3 12h18 M3 6h18 M3 18h18"),
  },
  close: {
    name: "close", label: "关闭", keywords: ["x", "cancel", "删除"],
    svg: icon("M18 6L6 18 M6 6l12 12"),
  },
  check: {
    name: "check", label: "勾选", keywords: ["tick", "ok", "确认"],
    svg: icon("M5 13l4 4L19 7"),
  },
  plus: {
    name: "plus", label: "新增", keywords: ["add", "create", "添加"],
    svg: icon("M12 5v14 M5 12h14"),
  },
  minus: {
    name: "minus", label: "减少", keywords: ["remove", "delete", "减去"],
    svg: icon("M5 12h14"),
  },
  heart: {
    name: "heart", label: "喜欢", keywords: ["like", "love", "收藏"],
    svg: icon("M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"),
  },
  star: {
    name: "star", label: "星标", keywords: ["favorite", "rating", "评分"],
    svg: icon("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"),
  },
  bookmark: {
    name: "bookmark", label: "书签", keywords: ["save", "标记", "保存"],
    svg: icon("M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"),
  },
  share: {
    name: "share", label: "分享", keywords: ["send", "forward", "转发"],
    svg: icon("M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13"),
  },
  download: {
    name: "download", label: "下载", keywords: ["save", "get", "获取"],
    svg: icon("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3"),
  },
  upload: {
    name: "upload", label: "上传", keywords: ["send", "push", "提交"],
    svg: icon("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12"),
  },
  refresh: {
    name: "refresh", label: "刷新", keywords: ["reload", "sync", "同步"],
    svg: icon("M1 4v6h6 M23 20v-6h-6 M20.49 9A9 9 0 0 0 5.64 5.64L1 10 M3.51 15A9 9 0 0 0 18.36 18.36L23 14"),
  },
  moreHorizontal: {
    name: "moreHorizontal", label: "更多", keywords: ["dots", "menu", "选项"],
    svg: icon("M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"),
  },
  copy: {
    name: "copy", label: "复制", keywords: ["duplicate", "clone", "拷贝"],
    svg: icon("M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"),
  },

  // ============ 技术 Tech ============
  terminal: {
    name: "terminal", label: "终端", keywords: ["console", "cmd", "命令行"],
    svg: icon("M4 17l6-6-6-6 M12 19h8"),
  },
  code: {
    name: "code", label: "代码", keywords: ["programming", "dev", "开发"],
    svg: icon("M16 18l6-6-6-6 M8 6l-6 6 6 6"),
  },
  cpu: {
    name: "cpu", label: "处理器", keywords: ["chip", "processor", "芯片"],
    svg: icon("M6 4h12v16H6z M2 9v6 M22 9v6 M9 2v4 M15 2v4 M9 22v-4 M15 22v-4 M9 9h6v6H9z"),
  },
  chip: {
    name: "chip", label: "芯片", keywords: ["microchip", "circuit", "集成电路"],
    svg: icon("M4 4h16v16H4z M8 8h8v8H8z M8 4V2 M16 4V2 M8 20v2 M16 20v2 M4 8H2 M22 8h-2 M4 16H2 M22 16h-2"),
  },
  database: {
    name: "database", label: "数据库", keywords: ["storage", "data", "存储"],
    svg: icon("M4 6c0 1.657 3.582 3 8 3s8-1.343 8-3 M4 6v12c0 1.657 3.582 3 8 3s8-1.343 8-3V6 M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3"),
  },
  server: {
    name: "server", label: "服务器", keywords: ["host", "rack", "主机"],
    svg: icon("M4 2h16v6H4z M4 16h16v6H4z M8 5h.01 M8 19h.01 M8 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M8 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"),
  },
  cloud: {
    name: "cloud", label: "云端", keywords: ["cloud", "online", "云存储"],
    svg: icon("M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"),
  },
  wifi: {
    name: "wifi", label: "无线", keywords: ["network", "signal", "网络"],
    svg: icon("M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01"),
  },
  bluetooth: {
    name: "bluetooth", label: "蓝牙", keywords: ["bt", "connect", "连接"],
    svg: icon("M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"),
  },
  monitor: {
    name: "monitor", label: "显示器", keywords: ["screen", "display", "屏幕"],
    svg: icon("M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 21h8 M12 17v4"),
  },
  laptop: {
    name: "laptop", label: "笔记本", keywords: ["computer", "pc", "电脑"],
    svg: icon("M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l1.72 1.72A1 1 0 0 1 21 20H3a1 1 0 0 1-.72-1.72L4 16"),
  },
  phone: {
    name: "phone", label: "手机", keywords: ["mobile", "smartphone", "电话"],
    svg: icon("M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z M12 18h.01"),
  },
  keyboard: {
    name: "keyboard", label: "键盘", keywords: ["input", "type", "输入"],
    svg: icon("M2 6h20v12H2z M6 10h2 M10 10h4 M16 10h2 M6 14h2 M10 14h4 M16 14h2 M7 6V4 M17 6V4 M12 6V3"),
  },

  // ============ 安全 Security ============
  shield: {
    name: "shield", label: "盾牌", keywords: ["security", "protect", "保护"],
    svg: icon("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"),
  },
  lock: {
    name: "lock", label: "锁定", keywords: ["secure", "password", "加密"],
    svg: icon("M7 11V7a5 5 0 0 1 10 0v4 M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M12 15v3"),
  },
  unlock: {
    name: "unlock", label: "解锁", keywords: ["open", "access", "开启"],
    svg: icon("M7 11V7a5 5 0 0 1 9.9-1 M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M12 15v3"),
  },
  key: {
    name: "key", label: "密钥", keywords: ["password", "access", "钥匙"],
    svg: icon("M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777z M15.5 7.5l-5 5 M19 4l-3 3 M22 7l-3 3"),
  },
  eye: {
    name: "eye", label: "可见", keywords: ["view", "show", "查看"],
    svg: icon("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"),
  },
  eyeOff: {
    name: "eyeOff", label: "隐藏", keywords: ["hide", "private", "不可见"],
    svg: icon("M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94 M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19 M14.12 14.12a3 3 0 1 1-4.24-4.24 M1 1l22 22"),
  },
  fingerprint: {
    name: "fingerprint", label: "指纹", keywords: ["biometric", "scan", "生物"],
    svg: icon("M12 22v-4 M6.34 21.66A10 10 0 0 1 2 12.52M2.93 5.93a10 10 0 0 1 18.14 0 M17.66 21.66A10 10 0 0 0 22 12.52 M12 18v-2a4 4 0 0 0-4-4 M12 10V6a2 2 0 0 1 4 0v1"),
  },
  scan: {
    name: "scan", label: "扫描", keywords: ["qr", "read", "读取"],
    svg: icon("M3 7V5a2 2 0 0 1 2-2h2 M15 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M7 12h10"),
  },
  bug: {
    name: "bug", label: "漏洞", keywords: ["error", "debug", "调试"],
    svg: icon("M8 2l1.88 1.88 M14.12 3.88L16 2 M9 7.13v-1a3.003 3.003 0 1 1 6 0v1 M12 20a3 3 0 0 1-3-3v-3m6 0v3a3 3 0 0 1-3 3 M6 13h2 M16 13h2 M3 21l6-6 M21 3l-6 6"),
  },
  alert: {
    name: "alert", label: "警报", keywords: ["warning", "danger", "危险"],
    svg: icon("M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01"),
  },

  // ============ 导航 Navigation ============
  arrowRight: {
    name: "arrowRight", label: "右箭头", keywords: ["next", "forward", "前进"],
    svg: icon("M5 12h14 M12 5l7 7-7 7"),
  },
  arrowLeft: {
    name: "arrowLeft", label: "左箭头", keywords: ["prev", "back", "后退"],
    svg: icon("M19 12H5 M12 19l-7-7 7-7"),
  },
  arrowUp: {
    name: "arrowUp", label: "上箭头", keywords: ["top", "scroll", "向上"],
    svg: icon("M12 19V5 M5 12l7-7 7 7"),
  },
  arrowDown: {
    name: "arrowDown", label: "下箭头", keywords: ["bottom", "scroll", "向下"],
    svg: icon("M12 5v14 M19 12l-7 7-7-7"),
  },
  chevronRight: {
    name: "chevronRight", label: "右翻页", keywords: ["next", "page", "翻页"],
    svg: icon("M9 18l6-6-6-6"),
  },
  chevronLeft: {
    name: "chevronLeft", label: "左翻页", keywords: ["prev", "page", "回退"],
    svg: icon("M15 18l-6-6 6-6"),
  },
  chevronUp: {
    name: "chevronUp", label: "上翻页", keywords: ["expand", "collapse", "收起"],
    svg: icon("M18 15l-6-6-6 6"),
  },
  chevronDown: {
    name: "chevronDown", label: "下翻页", keywords: ["expand", "open", "展开"],
    svg: icon("M6 9l6 6 6-6"),
  },
  compass: {
    name: "compass", label: "指南针", keywords: ["direction", "nav", "方向"],
    svg: icon("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"),
  },
  map: {
    name: "map", label: "地图", keywords: ["location", "nav", "位置"],
    svg: icon("M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z M8 2v16 M16 6v16"),
  },
  location: {
    name: "location", label: "定位", keywords: ["pin", "marker", "标记"],
    svg: icon("M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"),
  },
  globe: {
    name: "globe", label: "全球", keywords: ["world", "internet", "网络"],
    svg: icon("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12 15.3 15.3 0 0 1 12 2z"),
  },

  // ============ 媒体 Media ============
  play: {
    name: "play", label: "播放", keywords: ["start", "run", "开始"],
    svg: icon("M5 3l14 9-14 9V3z"),
  },
  pause: {
    name: "pause", label: "暂停", keywords: ["stop", "wait", "等待"],
    svg: icon("M6 4h4v16H6z M14 4h4v16h-4z"),
  },
  stop: {
    name: "stop", label: "停止", keywords: ["end", "halt", "结束"],
    svg: icon("M4 4h16v16H4z"),
  },
  camera: {
    name: "camera", label: "相机", keywords: ["photo", "picture", "拍照"],
    svg: icon("M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"),
  },
  mic: {
    name: "mic", label: "麦克风", keywords: ["audio", "voice", "录音"],
    svg: icon("M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8"),
  },
  volume: {
    name: "volume", label: "音量", keywords: ["sound", "audio", "声音"],
    svg: icon("M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 0 1 0 14.14 M15.54 8.46a5 5 0 0 1 0 7.07"),
  },
  music: {
    name: "music", label: "音乐", keywords: ["song", "audio", "歌曲"],
    svg: icon("M9 18V5l12-2v13 M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"),
  },
  video: {
    name: "video", label: "视频", keywords: ["movie", "film", "录像"],
    svg: icon("M23 7l-7 5 7 5V7z M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"),
  },
  image: {
    name: "image", label: "图片", keywords: ["photo", "picture", "照片"],
    svg: icon("M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21"),
  },

  // ============ 赛博朋克 Cyber ============
  skull: {
    name: "skull", label: "头骨", keywords: ["death", "danger", "骷髅"],
    svg: icon("M12 2C8 2 4 5 4 9c0 3 2 6 2 7v4h12v-4c0-1 2-4 2-7 0-4-4-7-8-7z M9 13h6 M9 17h6 M10 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z M14 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"),
  },
  crosshair: {
    name: "crosshair", label: "准星", keywords: ["aim", "target", "瞄准"],
    svg: icon("M12 22v-4 M12 6V2 M22 12h-4 M6 12H2 M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"),
  },
  target: {
    name: "target", label: "目标", keywords: ["aim", "focus", "聚焦"],
    svg: icon("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"),
  },
  power: {
    name: "power", label: "电源", keywords: ["on", "off", "开关"],
    svg: icon("M18.36 5.64a9 9 0 1 1-12.72 0 M12 2v10"),
  },
  zap: {
    name: "zap", label: "闪电", keywords: ["bolt", "energy", "电能"],
    svg: icon("M13 2L3 14h9l-1 8 10-12h-9l1-8z"),
  },
  pulse: {
    name: "pulse", label: "脉冲", keywords: ["wave", "signal", "信号"],
    svg: icon("M2 12h2.5L7 4l3 16 2-8 2 4h8"),
  },
  activity: {
    name: "activity", label: "活动", keywords: ["heartbeat", "monitor", "监测"],
    svg: icon("M22 12h-4l-3 9L9 3l-3 9H2"),
  },
  hexagon: {
    name: "hexagon", label: "六边形", keywords: ["shape", "geometry", "几何"],
    svg: icon("M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z"),
  },
  triangle: {
    name: "triangle", label: "三角形", keywords: ["shape", "delta", "三角"],
    svg: icon("M12 2L2 22h20L12 2z"),
  },
  diamond: {
    name: "diamond", label: "菱形", keywords: ["shape", "rhombus", "宝石"],
    svg: icon("M12 2l10 10-10 10L2 12 12 2z"),
  },
  grid: {
    name: "grid", label: "网格", keywords: ["layout", "matrix", "矩阵"],
    svg: icon("M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z"),
  },
  layers: {
    name: "layers", label: "层级", keywords: ["stack", "overlap", "叠加"],
    svg: icon("M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5"),
  },
  aperture: {
    name: "aperture", label: "光圈", keywords: ["lens", "camera", "镜头"],
    svg: icon("M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M14.31 8l5.74 9.94 M9.69 8h11.48 M7.38 12l5.74-9.94 M9.69 16L3.95 6.06 M14.31 16H2.83 M16.62 12l-5.74 9.94"),
  },
  loader: {
    name: "loader", label: "加载", keywords: ["spinner", "loading", "等待"],
    svg: icon("M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83"),
  },
  glitch: {
    name: "glitch", label: "故障", keywords: ["error", "distort", "扭曲"],
    svg: icon("M4 4h6l-1 3h3l-2 6h4l-1 3h7 M2 2l20 20"),
  },
  biohazard: {
    name: "biohazard", label: "生化", keywords: ["toxic", "danger", "毒害"],
    svg: icon("M12 2a3 3 0 0 0-3 3c0 .67.23 1.28.6 1.77L5.5 9C4.33 9 3 10.33 3 12s1.33 3 2.5 3c.45 0 .85-.15 1.18-.39l-.58 3.39h11.8l-.58-3.39c.33.24.73.39 1.18.39 1.17 0 2.5-1.33 2.5-3s-1.33-3-2.5-3l-4.1-2.23c.37-.49.6-1.1.6-1.77a3 3 0 0 0-3-3z M8 12h.01 M16 12h.01"),
  },
  radiation: {
    name: "radiation", label: "辐射", keywords: ["nuclear", "danger", "核"],
    svg: icon("M12 12h.01 M7.5 4.2c-.3.5-.5 1.1-.5 1.8C7 8.5 8.5 10 10.5 10c.4 0 .8-.1 1.1-.3 M4.93 10.5c.2-.2.5-.3.8-.3.8 0 1.5.6 1.7 1.4 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M14 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"),
  },
  fingerprint2: {
    name: "fingerprint2", label: "认证", keywords: ["identity", "auth", "验证"],
    svg: icon("M6.34 18.34A8 8 0 0 1 4 12.5M3.51 7.51a12 12 0 0 1 16.98 0 M17.66 18.34A8 8 0 0 0 20 12.5 M12 19v-3a4 4 0 0 0-4-4 M12 12V8a2 2 0 0 1 4 0v2"),
  },
  circuit: {
    name: "circuit", label: "电路", keywords: ["board", "pcb", "线路"],
    svg: icon("M2 7h4v3H2z M8 7h4v3H8z M18 7h4v3h-4z M12 4V2 M6 10v4 M18 10v4 M12 10v4 M12 14h6 M14 10v4 M6 14h4 M10 14v3 M14 14v3 M14 17h4v3h-4z M2 17h4v3H2z"),
  },
};

export const iconCategories: IconCategoryDef[] = [
  {
    key: "general",
    label: "通用 General",
    icons: ["home", "user", "settings", "search", "menu", "close", "check", "plus", "minus", "heart", "star", "bookmark", "share", "download", "upload", "refresh", "moreHorizontal", "copy"],
  },
  {
    key: "tech",
    label: "技术 Tech",
    icons: ["terminal", "code", "cpu", "chip", "database", "server", "cloud", "wifi", "bluetooth", "monitor", "laptop", "phone", "keyboard"],
  },
  {
    key: "security",
    label: "安全 Security",
    icons: ["shield", "lock", "unlock", "key", "eye", "eyeOff", "fingerprint", "scan", "bug", "alert"],
  },
  {
    key: "navigation",
    label: "导航 Navigation",
    icons: ["arrowRight", "arrowLeft", "arrowUp", "arrowDown", "chevronRight", "chevronLeft", "chevronUp", "chevronDown", "compass", "map", "location", "globe"],
  },
  {
    key: "media",
    label: "媒体 Media",
    icons: ["play", "pause", "stop", "camera", "mic", "volume", "music", "video", "image"],
  },
  {
    key: "cyber",
    label: "赛博 Cyber",
    icons: ["skull", "crosshair", "target", "power", "zap", "pulse", "activity", "hexagon", "triangle", "diamond", "grid", "layers", "aperture", "loader", "glitch", "biohazard", "radiation", "fingerprint2", "circuit"],
  },
];
