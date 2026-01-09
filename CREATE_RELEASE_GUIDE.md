# GitHub Release 创建指南

## 步骤说明

请按照以下步骤在GitHub上创建Release：

### 1. 访问Releases页面
打开浏览器，访问：https://github.com/cold1243/obsidian-daily-review/releases

### 2. 创建新Release
- 点击 **"Create a new release"** 按钮
- 或者点击 **"Draft a new release"**

### 3. 填写Release信息

**Tag version**: `1.1.0`
- 选择标签：1.1.0（如果不存在，会自动创建）

**Release title**: `v1.1.0`

**Description**:
```
Daily Review Auto Open v1.1.0

## 🎉 Features

- ✅ Auto-open random diary on startup
- ✅ Multi-folder support
- ✅ Manual trigger via command palette (Ctrl+P / Cmd+P)
- ✅ Smart history tracking to avoid recent duplicates
- ✅ Configurable settings

## 📦 Installation

This release requires Obsidian 0.15.0 or later.

## 📝 Full Changelog

See RELEASE_NOTES.md for complete details.
```

### 4. 上传二进制文件
在 **"Binary packages"** 或 **"Attach binaries"** 部分，上传以下文件：

- `main.js` (从插件目录)
- `manifest.json` (从插件目录)

这两个文件必须从 `/Users/zack/vibe_coding/daily_review_auto_open/` 目录上传。

### 5. 发布
- 勾选 **"Set as the latest release"**（如果出现）
- 点击 **"Publish release"** 按钮

## ✅ 完成后

Release创建完成后，您的插件就可以提交到Obsidian社区插件列表了！

下一步：提交到 https://github.com/obsidianmd/obsidian-releases
