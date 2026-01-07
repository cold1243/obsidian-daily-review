# Obsidian 插件发布与更新指南

## 📤 第一部分：发布到 Obsidian 插件市场

### 步骤 1：创建 GitHub Release

1. **访问你的 GitHub 仓库**
   - 打开：https://github.com/cold1243/obsidian-daily-review

2. **创建 Release**
   - 点击右侧的 **"Releases"** 链接
   - 点击 **"Create a new release"**
   - 或直接访问：https://github.com/cold1243/obsidian-daily-review/releases/new

3. **填写 Release 信息**
   - **Tag**: 选择 `v1.0.0`（已经推送）
   - **Title**: `v1.0.0: Daily Review Auto Open - Initial Release`
   - **Description**: 复制 `RELEASE_NOTES.md` 的内容
   - 勾选 **"Set as the latest release"**
   - 点击 **"Publish release"**

### 步骤 2：提交到 Obsidian 插件市场

1. **Fork Obsidian Releases 仓库**
   - 访问：https://github.com/obsidianmd/obsidian-releases
   - 点击右上角的 **"Fork"** 按钮

2. **克隆你 fork 的仓库**
   ```bash
   cd ~/  # 或任意目录
   git clone https://github.com/cold1243/obsidian-releases.git
   cd obsidian-releases
   ```

3. **创建插件发布文件**
   - 进入插件目录：`cd plugins`
   - 创建你的插件目录：`mkdir daily-review-auto-open`
   - 进入目录：`cd daily-review-auto-open`

4. **创建 manifest.json**
   ```bash
   nano manifest.json  # 或使用任何文本编辑器
   ```

   添加以下内容：
   ```json
   {
     "id": "daily-review-auto-open",
     "name": "Daily Review Auto Open",
     "version": "1.0.0",
     "minAppVersion": "0.15.0",
     "description": "Automatically opens a random past diary entry each time you launch Obsidian.",
     "author": "zack",
     "authorUrl": "https://github.com/cold1243",
     "isDesktopOnly": false
   }
   ```

5. **下载 main.js 和 manifest.json**
   ```bash
   # 从你的插件仓库下载
   curl -o main.js https://raw.githubusercontent.com/cold1243/obsidian-daily-review/main/main.js
   curl -o manifest.json https://raw.githubusercontent.com/cold1243/obsidian-daily-review/main/manifest.json
   ```

6. **提交更改**
   ```bash
   cd ../../  # 回到 obsidian-releases 根目录
   git add .
   git commit -m "Add daily-review-auto-open plugin"
   git push origin main
   ```

7. **创建 Pull Request**
   - 访问你 fork 的仓库：https://github.com/cold1243/obsidian-releases
   - 点击 **"Pull request"** 按钮
   - 点击 **"New pull request"**
   - 填写 PR 信息：
     - **Title**: `Add plugin: Daily Review Auto Open`
     - **Description**: 简单描述插件功能
   - 点击 **"Create pull request"**

8. **等待审核**
   - Obsidian 团队会审核你的 PR
   - 通常需要几天时间
   - 审核通过后，你的插件就会出现在插件市场中！

---

## 🔄 第二部分：更新插件

### 步骤 1：修改代码并测试

1. **在本地修改代码**
   ```bash
   cd /Users/zack/vibe_coding/daily_review_auto_open
   ```

2. **修改功能**
   - 编辑 `src/main.ts` 添加新功能
   - 运行 `npm run build` 编译

3. **本地测试**
   - 复制 `main.js` 到测试 vault
   - 重启 Obsidian 测试新功能

### 步骤 2：更新版本号

1. **更新 manifest.json**
   ```json
   {
     "version": "1.1.0",  // 修改版本号
     // ...
   }
   ```

2. **更新 package.json**
   ```json
   {
     "version": "1.1.0",  // 修改版本号
     // ...
   }
   ```

3. **提交到 GitHub**
   ```bash
   git add .
   git commit -m "feat: Add new feature"
   git push
   ```

### 步骤 3：创建新的 Release

1. **创建版本标签**
   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0: Add new feature"
   git push origin v1.1.0
   ```

2. **在 GitHub 上创建 Release**
   - 访问：https://github.com/cold1243/obsidian-daily-review/releases/new
   - 选择新的 tag `v1.1.0`
   - 填写更新说明
   - 发布

### 步骤 4：同步到插件市场

1. **更新 obsidian-releases**
   ```bash
   cd ~/obsidian-releases
   git pull origin main
   ```

2. **更新插件文件**
   ```bash
   cd plugins/daily-review-auto-open
   curl -o main.js https://raw.githubusercontent.com/cold1243/obsidian-daily-review/main/main.js
   curl -o manifest.json https://raw.githubusercontent.com/cold1243/obsidian-daily-review/main/manifest.json
   ```

3. **提交并创建 PR**
   ```bash
   git add .
   git commit -m "Update daily-review-auto-open to v1.1.0"
   git push origin main
   ```

4. **创建新的 Pull Request**
   - 访问你的 fork：https://github.com/cold1243/obsidian-releases
   - 创建 PR
   - Obsidian 团队审核后，新版本就会上线！

---

## 📝 版本号规范

使用语义化版本号（Semantic Versioning）：

- **1.0.0** → **1.0.1**：Bug 修复（Patch）
- **1.0.0** → **1.1.0**：新功能，向后兼容（Minor）
- **1.0.0** → **2.0.0**：重大变更，可能不兼容（Major）

示例：
- `1.0.1` - 修复启动时偶尔不打开日记的 bug
- `1.1.0` - 添加多个日记文件夹支持
- `2.0.0` - 完全重写插件架构

---

## 🎯 快速更新流程总结

每次更新插件的完整流程：

```bash
# 1. 修改代码
vim src/main.ts

# 2. 编译
npm run build

# 3. 更新版本号（manifest.json 和 package.json）
# 4. 本地测试

# 5. 提交到 GitHub
git add .
git commit -m "feat: Add new feature"
git push

# 6. 创建版本标签并推送
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0

# 7. 在 GitHub 网站上创建 Release

# 8. 更新 obsidian-releases 仓库
cd ~/obsidian-releases
git pull
cd plugins/daily-review-auto-open
curl -o main.js https://raw.githubusercontent.com/cold1243/obsidian-daily-review/main/main.js
curl -o manifest.json https://raw.githubusercontent.com/cold1243/obsidian-daily-review/main/manifest.json
cd ../../
git add .
git commit -m "Update daily-review-auto-open to v1.1.0"
git push

# 9. 创建 PR 到 Obsidian 官方仓库
```

---

## 💡 提示

1. **测试很重要**：每次更新前都要充分测试
2. **版本号要同步**：manifest.json 和 package.json 的版本号必须一致
3. **Release 说明**：每次更新都要写清楚改了什么
4. **PR 审核**：通常需要 1-3 天，耐心等待
5. **用户反馈**：关注 Issues，及时修复 bug

---

## 🔗 有用的链接

- Obsidian 插件发布指南：https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines
- Obsidian Releases 仓库：https://github.com/obsidianmd/obsidian-releases
- 你的插件仓库：https://github.com/cold1243/obsidian-daily-review
