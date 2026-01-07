# Daily Review Auto Open

一个简单的 Obsidian 插件，每次启动 Obsidian 时自动打开一篇过去的日记。

## 功能特性

- ✅ 启动时自动打开随机日记
- ✅ 可配置日记文件夹路径
- ✅ 可启用/禁用自动打开功能
- ✅ 遵循 Obsidian 插件开发最佳实践

## 安装步骤

### 1. 复制插件文件

找到你的 Obsidian vault（笔记库），然后在其中创建插件目录：

```bash
# 在你的 vault 目录下创建插件文件夹
mkdir -p .obsidian/plugins/daily-review-auto-open
```

### 2. 复制必要文件

将以下文件复制到 `.obsidian/plugins/daily-review-auto-open/` 目录：

```
daily-review-auto-open/
├── main.js        # 编译后的插件代码
├── manifest.json  # 插件元数据
```

复制命令示例：

```bash
# 假设你的 vault 路径是 /path/to/your/vault
cp main.js /path/to/your/vault/.obsidian/plugins/daily-review-auto-open/
cp manifest.json /path/to/your/vault/.obsidian/plugins/daily-review-auto-open/
```

### 3. 启用插件

1. 打开 Obsidian
2. 进入 **设置** → **第三方插件**
3. 找到 "Daily Review Auto Open"
4. 点击启用

## 配置

在插件设置中可以配置：

- **启用自动打开**：是否在启动时自动打开日记
- **日记文件夹路径**：存放日记的文件夹路径（默认：`日记`）

## 使用说明

### 首次使用

1. 在你的 vault 中创建一个存放日记的文件夹（默认名称：`日记`）
2. 在该文件夹中添加一些 markdown 日记文件
3. 启用插件
4. 重启 Obsidian，插件会自动随机打开一篇日记

### 自定义日记文件夹

如果使用不同的文件夹名称：

1. 打开插件设置
2. 修改 "Diary folder path" 为你的文件夹名称
3. 保存设置

## 开发

### 构建插件

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 生产构建
npm run build
```

## 项目结构

```
daily-review-auto-open/
├── src/
│   └── main.ts           # 插件源代码
├── main.js               # 编译后的代码
├── manifest.json         # 插件元数据
├── package.json          # npm 配置
├── tsconfig.json         # TypeScript 配置
└── esbuild.config.mjs    # 构建配置
```

## 技术细节

### MVP 版本功能

1. **启动监听**：使用 `app.workspace.onLayoutReady()` 在应用完全加载后触发
2. **文件扫描**：扫描指定文件夹中的所有 markdown 文件
3. **随机选择**：使用 `Math.random()` 随机选择一篇日记
4. **自动打开**：使用 `app.workspace.openLinkText()` 打开选中的文件

### 代码规范

遵循 Obsidian 插件开发最佳实践：
- ✅ 使用 `registerEvent` 自动管理资源清理
- ✅ 使用 `instanceof` 进行类型检查
- ✅ Sentence case UI 文本
- ✅ 不使用 `innerHTML`/`outerHTML`
- ✅ 适当的错误处理

## 后续改进方向

- [ ] 支持多个日记文件夹
- [ ] 添加日期范围过滤
- [ ] 支持标签过滤
- [ ] 添加打开历史记录
- [ ] 支持自定义打开策略（最近未打开的、特定时间范围的等）

## 许可证

MIT

## 作者

zack
