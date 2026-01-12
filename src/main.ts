import { App, Plugin, PluginSettingTab, Setting, TFile, TFolder } from 'obsidian';

interface DailyReviewSettings {
	diaryFolderPath: string;          // 保留旧字段用于向后兼容
	diaryFolderPaths: string[];       // 支持多个文件夹路径
	enabled: boolean;
	recentHistorySize: number;        // 记住最近打开的日记数量
	recentlyOpened: string[];         // 最近打开的日记路径列表
}

const DEFAULT_SETTINGS: DailyReviewSettings = {
	diaryFolderPath: '日记',
	diaryFolderPaths: ['日记'],       // 默认包含日记文件夹
	enabled: true,
	recentHistorySize: 3,              // 默认记住最近3篇日记
	recentlyOpened: []                 // 默认为空数组
}

export default class DailyReviewAutoOpenPlugin extends Plugin {
	settings: DailyReviewSettings;

	async onload() {
		await this.loadSettings();

		// 添加设置选项卡
		this.addSettingTab(new DailyReviewSettingTab(this.app, this));

		// 添加命令：手动打开随机日记
		this.addCommand({
			id: 'open-random-diary',
			name: '打开随机日记',
			callback: () => {
				void this.openRandomDiary();
			}
		});

		// 在应用完全加载后打开随机日记
		this.app.workspace.onLayoutReady(() => {
			if (this.settings.enabled) {
				void this.openRandomDiary();
			}
		});

		console.debug('Daily Review Auto Open plugin loaded');
	}

	onunload() {
		console.debug('Daily Review Auto Open plugin unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

		// 向后兼容：如果用户使用旧版本，自动迁移单个路径到数组
		if (this.settings.diaryFolderPaths.length === 1 &&
			this.settings.diaryFolderPaths[0] === '日记' &&
			this.settings.diaryFolderPath !== '日记') {
			// 如果用户修改了旧的 diaryFolderPath，迁移到新数组
			this.settings.diaryFolderPaths = [this.settings.diaryFolderPath];
			await this.saveSettings();
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async openRandomDiary() {
		const { diaryFolderPaths, recentlyOpened, recentHistorySize } = this.settings;

		// 如果没有配置任何文件夹，提示用户
		if (!diaryFolderPaths || diaryFolderPaths.length === 0) {
			console.warn('No diary folders configured');
			return;
		}

		// 从配置的路径列表中获取所有有效的文件夹
		const validFolders: TFolder[] = [];
		for (const path of diaryFolderPaths) {
			const folder = this.app.vault.getAbstractFileByPath(path);
			if (folder instanceof TFolder) {
				validFolders.push(folder);
			} else {
				console.warn(`Diary folder not found: ${path}`);
			}
		}

		// 如果没有有效的文件夹，直接返回
		if (validFolders.length === 0) {
			console.warn('No valid diary folders found');
			return;
		}

		// 策略A：先随机选择一个文件夹
		const selectedFolder = validFolders[Math.floor(Math.random() * validFolders.length)];
		console.debug(`Selected folder: ${selectedFolder.path}`);

		// 从选中的文件夹中获取所有 markdown 文件
		const markdownFiles = selectedFolder.children.filter((file): file is TFile =>
			file instanceof TFile && file.extension === 'md'
		);

		if (markdownFiles.length === 0) {
			console.warn(`No markdown files found in folder: ${selectedFolder.path}`);
			return;
		}

		// 过滤掉最近打开的日记，防止短期重复
		const availableFiles = markdownFiles.filter(file =>
			!recentlyOpened.includes(file.path)
		);

		// 如果所有文件都在最近打开列表中，则清空历史记录，重新开始
		if (availableFiles.length === 0) {
			console.debug('All diaries have been opened recently, clearing history');
			this.settings.recentlyOpened = [];
		}

		// 重新获取可用文件列表
		const finalFiles = availableFiles.length > 0
			? availableFiles
			: markdownFiles;

		// 从可用文件中随机选择一个
		const randomFile = finalFiles[Math.floor(Math.random() * finalFiles.length)];

		// 打开文件
		await this.app.workspace.openLinkText(randomFile.path, '', true);
		console.debug(`Opened random diary: ${randomFile.path}`);

		// 记录到最近打开列表
		await this.addToRecentlyOpened(randomFile.path);
	}

	/**
	 * 将日记路径添加到最近打开列表
	 * 保持列表长度不超过 recentHistorySize
	 */
	async addToRecentlyOpened(filePath: string) {
		const { recentlyOpened, recentHistorySize } = this.settings;

		// 如果已经存在，先移除（避免重复）
		const index = recentlyOpened.indexOf(filePath);
		if (index > -1) {
			recentlyOpened.splice(index, 1);
		}

		// 添加到列表开头
		recentlyOpened.unshift(filePath);

		// 保持列表长度不超过设定值
		if (recentlyOpened.length > recentHistorySize) {
			recentlyOpened.length = recentHistorySize;
		}

		// 保存设置
		await this.saveSettings();
	}
}

class DailyReviewSettingTab extends PluginSettingTab {
	plugin: DailyReviewAutoOpenPlugin;

	constructor(app: App, plugin: DailyReviewAutoOpenPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 * 获取根目录下的所有用户文件夹（排除系统文件夹）
	 * 按字母顺序排序
	 */
	getRootFolders(): string[] {
		const allFiles = this.app.vault.getAllLoadedFiles();
		const configDir = this.app.vault.configDir;

		// 过滤出文件夹，且只保留根目录（路径中不包含斜杠）
		const rootFolders = allFiles
			.filter((file): file is TFolder => file instanceof TFolder)
			.filter(folder => {
				// 只保留根目录文件夹（路径不包含 /）
				const isRootFolder = !folder.path.includes('/');
				// 排除系统文件夹
				const isSystemFolder = folder.path.startsWith(configDir) ||
				                       folder.path.startsWith('.trash') ||
				                       folder.path.startsWith('.git');
				return isRootFolder && !isSystemFolder;
			})
			.map(folder => folder.path)
			.sort(); // 按字母顺序排序

		return rootFolders;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// ========== 基础设置 ==========
		new Setting(containerEl)
			.setName('Enable auto open')
			.setDesc('Automatically open a random diary entry when Obsidian starts')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enabled)
				.onChange(async (value) => {
					this.plugin.settings.enabled = value;
					await this.plugin.saveSettings();
				}));

		// ========== 多文件夹管理 ==========
		new Setting(containerEl)
			.setName('Diary folders')
			.setHeading();

		// 获取根目录文件夹列表
		const rootFolders = this.getRootFolders();

		// 如果没有找到文件夹，显示提示信息
		if (rootFolders.length === 0) {
			new Setting(containerEl)
				.setName('No folders found')
				.setDesc('No user folders found in the root directory');
		} else {
			// 为每个文件夹创建一个checkbox设置项
			rootFolders.forEach(folderPath => {
				new Setting(containerEl)
					.setName(folderPath)
					.setDesc('Include this folder in random selection')
					.addToggle(toggle => toggle
						.setValue(this.plugin.settings.diaryFolderPaths.includes(folderPath))
						.onChange(async (value) => {
							if (value) {
								// 勾选：添加到列表
								if (!this.plugin.settings.diaryFolderPaths.includes(folderPath)) {
									this.plugin.settings.diaryFolderPaths.push(folderPath);
								}
							} else {
								// 取消勾选：从列表移除
								this.plugin.settings.diaryFolderPaths =
									this.plugin.settings.diaryFolderPaths.filter(p => p !== folderPath);
							}
							await this.plugin.saveSettings();
						})
					);
			});
		}

		// ========== 历史记录设置 ==========
		new Setting(containerEl)
			.setName('History')
			.setHeading();

		new Setting(containerEl)
			.setName('Recent history size')
			.setDesc('Remember recently opened diaries to avoid repetition')
			.addSlider(slider => slider
				.setLimits(0, 15, 1)
				.setValue(this.plugin.settings.recentHistorySize)
				.setDynamicTooltip()
				.onChange(async (value) => {
					this.plugin.settings.recentHistorySize = value;
					await this.plugin.saveSettings();
				}));

		// 显示当前历史记录（仅用于查看）
		if (this.plugin.settings.recentlyOpened.length > 0) {
			new Setting(containerEl)
				.setName('Recently opened diaries')
				.setDesc('Diaries opened in recent sessions')
				.then(setting => {
					const historyText = this.plugin.settings.recentlyOpened
						.map(path => {
							// 从路径中提取文件名
							const parts = path.split('/');
							return parts[parts.length - 1];
						})
						.join(', ');
					setting.descEl.createEl('div', {
						text: historyText || 'No recent history',
						cls: 'setting-item-description'
					});
				});

			// 添加清空历史记录的按钮
			new Setting(containerEl)
				.setName('Clear history')
				.setDesc('Clear the history of recently opened diaries')
				.addButton(button => button
					.setButtonText('Clear')
					.setClass('mod-warning')
					.onClick(async () => {
						this.plugin.settings.recentlyOpened = [];
						await this.plugin.saveSettings();
						// 刷新设置页面
						this.display();
					}));
		}
	}
}
