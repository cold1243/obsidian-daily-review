# 提交到 Obsidian 社区插件指南

## 前提条件

✅ 已完成步骤：
1. ✅ 插件符合Obsidian规范（README.md, LICENSE, manifest.json）
2. ✅ 代码已推送到GitHub：https://github.com/cold1243/obsidian-daily-review
3. ⏳ GitHub Release已创建（参见CREATE_RELEASE_GUIDE.md）

⚠️ **重要**：必须先创建GitHub Release，然后再提交到社区！

## 步骤1：创建GitHub Release

如果还没有创建，请先完成 `CREATE_RELEASE_GUIDE.md` 中的步骤。

## 步骤2：提交到Obsidian插件目录

### 2.1 访问 community-plugins.json

在浏览器中打开：
https://github.com/obsidianmd/obsidian-releases/edit/master/community-plugins.json

### 2.2 添加插件信息

在文件末尾的 `]` 之前，添加以下内容（注意逗号）：

```json
{
  "id": "daily-review-auto-open",
  "name": "Daily Review Auto Open",
  "author": "zack",
  "description": "Automatically opens a random past diary entry each time you launch the app. Now supports multiple folders, manual trigger, and smart history tracking.",
  "repo": "cold1243/obsidian-daily-review"
},
```

**重要提示**：
- 确保在前一个条目的 `}` 后面添加逗号 `,`
- `repo` 字段格式为：`username/repo-name`
- 所有字段必须与你的 manifest.json 一致

### 2.3 提交更改

1. 点击页面右上角的 **"Commit changes..."**
2. 在提交信息页面：
   - 选择 **"Propose changes"**（建议）
   - 或选择 **"Commit directly"**（直接提交）
3. 填写提交信息：
   - 标题：`Add plugin: Daily Review Auto Open`
   - 描述（可选）：
   ```
   Add Daily Review Auto Open plugin to the community plugin list.

   - Plugin ID: daily-review-auto-open
   - Repository: https://github.com/cold1243/obsidian-daily-review
   - Version: 1.1.0
   ```
4. 点击 **"Propose changes"** 按钮

### 2.4 创建 Pull Request

如果选择了"Propose changes"：

1. 系统会提示创建Pull Request
2. 点击 **"Create pull request"**
3. 选择 **"Preview"**，然后选择 **"Community Plugin"**
4. 确认PR标题：`Add plugin: Daily Review Auto Open`
5. 填写PR描述模板，确保勾选所有checkbox：
   - ✅ 插件已发布到公开的GitHub仓库
   - ✅ manifest.json已包含所有必需字段
   - ✅ README.md说明了插件的用途和使用方法
   - ✅ LICENSE文件已包含
   - ✅ GitHub Release已创建（包含main.js和manifest.json）
6. 点击 **"Create pull request"**

## 步骤3：等待审核

提交后，Obsidian的bot会自动验证你的插件：

### 自动验证检查
- ✅ GitHub Release是否存在
- ✅ Release中是否包含main.js和manifest.json
- ✅ manifest.json格式是否正确
- ✅ 所有必需字段是否存在

### 可能的结果

**通过验证**：
- PR会获得 "Ready for review" 标签
- 等待Obsidian团队人工审核
- 审核时间：不确定（取决于团队工作负载）

**验证失败**：
- PR会获得 "Validation failed" 标签
- bot会列出所有需要修复的问题
- 修复问题后，bot会自动重新验证

## 步骤4：审核通过后

一旦PR被合并，你的插件就会：
- ✅ 出现在Obsidian插件市场
- ✅ 用户可以直接在Obsidian中搜索安装
- ✅ 出现在 https://obsidian.md/plugins 插件目录

## 验证信息

### 插件信息（用于提交）

```json
{
  "id": "daily-review-auto-open",
  "name": "Daily Review Auto Open",
  "author": "zack",
  "description": "Automatically opens a random past diary entry each time you launch the app. Now supports multiple folders, manual trigger, and smart history tracking.",
  "repo": "cold1243/obsidian-daily-review"
}
```

### manifest.json 内容

```json
{
  "id": "daily-review-auto-open",
  "name": "Daily Review Auto Open",
  "version": "1.1.0",
  "minAppVersion": "0.15.0",
  "description": "Automatically opens a random past diary entry each time you launch the app. Now supports multiple folders, manual trigger, and smart history tracking.",
  "author": "zack",
  "authorUrl": "https://github.com/cold1243",
  "isDesktopOnly": false
}
```

### GitHub仓库
https://github.com/cold1243/obsidian-daily-review

## 快速链接

- GitHub Release页面：https://github.com/cold1243/obsidian-daily-review/releases
- community-plugins.json编辑：https://github.com/obsidianmd/obsidian-releases/edit/master/community-plugins.json
- Obsidian插件发布文档：https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin

## 注意事项

1. **不要创建多个PR**：如果审核需要修改，在原PR中修改，不要开新的PR
2. **保持耐心**：审核时间不确定，请耐心等待
3. **及时响应**：如果审核者提出建议或要求，请及时修改并回复
4. **版本更新**：插件发布后，更新只需在GitHub创建新Release即可

## 完成后

插件被接受后，可以在以下渠道宣布：
- Obsidian论坛 - Share & showcase版块
- Obsidian Discord - #updates频道（需要developer角色）

祝你的插件提交顺利！🎉
