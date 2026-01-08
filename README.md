# Daily Review Auto Open

一个简单的 Obsidian 插件，每次启动 Obsidian 时自动打开一篇过去的日记，帮助你回顾过去。

## 功能特性

### 核心功能
- ✅ **启动时自动打开随机日记** - 每次 Obsidian 启动时自动随机打开一篇日记
- ✅ **命令面板手动触发** - 通过 `Ctrl+P` (Windows/Linux) 或 `Cmd+P` (Mac) 随时手动打开随机日记
- ✅ **多文件夹支持** - 可从多个文件夹中随机选择，使用简单的 checkbox 列表管理
- ✅ **智能防重复** - 记住最近打开的日记，避免短期重复打开相同内容

### 配置选项
- ✅ 启用/禁用自动打开功能
- ✅ 选择多个日记文件夹（自动显示根目录文件夹）
- ✅ 配置历史记录大小（0-15篇，默认3篇）
- ✅ 查看和清空历史记录

### 技术特点
- ✅ 向后兼容旧版本配置
- ✅ 遵循 Obsidian 插件开发最佳实践
- ✅ 代码清晰，注释详细，易于维护

## 安装步骤

### 方法1：手动安装

1. 在你的 Obsidian vault 中创建插件目录：
```bash
mkdir -p .obsidian/plugins/daily-review-auto-open
```

2. 复制以下文件到插件目录：
```bash
cp main.js .obsidian/plugins/daily-review-auto-open/
cp manifest.json .obsidian/plugins/daily-review-auto-open/
```

3. 在 Obsidian 中启用插件：
   - 打开 **设置** → **第三方插件**
   - 找到 "Daily Review Auto Open"
   - 点击启用

### 方法2：使用 BRAT 插件（推荐）

1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 在 Obsidian 中打开命令面板 (`Ctrl+P` / `Cmd+P`)
3. 输入 `BRAT: Add a plugin for beta testing`
4. 输入仓库地址：`https://github.com/cold1243/obsidian-daily-review`
5. 等待安装完成

## 使用说明

### 基础使用

1. **配置日记文件夹**
   - 打开插件设置
   - 在 "Diary folders" 部分勾选你想要包含的文件夹
   - 支持多个文件夹，插件会从中随机选择

2. **自动打开**
   - 启动 Obsidian 时，插件会自动打开一篇随机日记
   - 如果不想要自动打开，可以在设置中关闭

3. **手动触发**
   - 按 `Ctrl+P` (Windows/Linux) 或 `Cmd+P` (Mac)
   - 输入 "打开随机日记"
   - 按回车即可随时打开随机日记

### 高级功能

**防止短期重复**
- 插件会记住最近打开的日记（默认3篇）
- 下次打开时自动排除这些日记
- 可以在设置中调整历史记录大小（0-15篇）

**查看历史记录**
- 在设置页面可以看到最近打开的日记列表
- 点击 "Clear" 按钮可以清空历史记录

## 配置详解

### Enable auto open
- 启用后，每次 Obsidian 启动时会自动打开随机日记
- 关闭后，只能通过命令面板手动触发

### Diary folders
- 勾选要包含在随机选择中的文件夹
- 自动显示根目录下的所有用户文件夹
- 排除系统文件夹（如 `.obsidian`、`.trash`）
- 按字母顺序排序

### Recent history size
- 控制记住多少篇最近打开的日记
- 设置为 0 表示不启用防重复功能
- 默认值：3

## 开发

### 环境要求
- Node.js 16+
- npm

### 构建步骤

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 生产构建
npm run build
```

### 项目结构
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

### 核心算法
1. **多文件夹随机** - 先随机选择一个文件夹，再从中随机选择文件
2. **防重复逻辑** - 维护最近打开列表，每次选择时自动排除
3. **智能迁移** - 自动检测并迁移旧版本的配置

### 代码规范
遵循 Obsidian 插件开发最佳实践：
- 使用 `registerEvent` 自动管理资源清理
- 使用 `instanceof` 进行类型检查
- Sentence case UI 文本
- 不使用 `innerHTML`/`outerHTML`
- 适当的错误处理和边界情况处理

## 未来计划

- [ ] 通知提示功能
- [ ] "去年的今天"回顾模式
- [ ] 时间范围过滤
- [ ] 智能权重算法
- [ ] 子文件夹扫描
- [ ] 打开方式选择
- [ ] 文件名模式匹配
- [ ] 打开统计面板

## 许可证

MIT License

## 作者

zack - [GitHub](https://github.com/cold1243)
