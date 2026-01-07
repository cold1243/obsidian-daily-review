#!/bin/bash

# Daily Review Auto Open 插件安装脚本

echo "🚀 Daily Review Auto Open 插件安装"
echo "======================================"
echo ""

# 检查是否提供了 vault 路径
if [ -z "$1" ]; then
    echo "❌ 错误：请提供你的 Obsidian vault 路径"
    echo ""
    echo "使用方法："
    echo "  bash install.sh /path/to/your/vault"
    echo ""
    echo "示例："
    echo "  bash install.sh ~/Documents/MyNotes"
    exit 1
fi

VAULT_PATH="$1"
PLUGIN_DIR="$VAULT_PATH/.obsidian/plugins/daily-review-auto-open"

# 检查 vault 路径是否存在
if [ ! -d "$VAULT_PATH" ]; then
    echo "❌ 错误：指定的路径不存在: $VAULT_PATH"
    exit 1
fi

echo "📁 Vault 路径: $VAULT_PATH"
echo ""

# 创建插件目录
echo "📦 创建插件目录..."
mkdir -p "$PLUGIN_DIR"

# 复制文件
echo "📋 复制插件文件..."
cp main.js "$PLUGIN_DIR/"
cp manifest.json "$PLUGIN_DIR/"

# 检查是否成功
if [ -f "$PLUGIN_DIR/main.js" ] && [ -f "$PLUGIN_DIR/manifest.json" ]; then
    echo ""
    echo "✅ 安装成功！"
    echo ""
    echo "📝 下一步："
    echo "   1. 打开 Obsidian"
    echo "   2. 进入 设置 → 第三方插件"
    echo "   3. 找到 'Daily Review Auto Open' 并启用"
    echo "   4. 在你的 vault 中创建一个名为 '日记' 的文件夹"
    echo "   5. 在文件夹中添加一些日记文件"
    echo "   6. 重启 Obsidian 测试插件"
    echo ""
else
    echo "❌ 安装失败：文件复制出错"
    exit 1
fi
