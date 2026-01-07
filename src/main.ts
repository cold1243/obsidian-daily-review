import { App, Plugin, PluginSettingTab, Setting, TFile, TFolder } from 'obsidian';

interface DailyReviewSettings {
	diaryFolderPath: string;
	enabled: boolean;
}

const DEFAULT_SETTINGS: DailyReviewSettings = {
	diaryFolderPath: '日记',
	enabled: true
}

export default class DailyReviewAutoOpenPlugin extends Plugin {
	settings: DailyReviewSettings;

	async onload() {
		await this.loadSettings();

		// 添加设置选项卡
		this.addSettingTab(new DailyReviewSettingTab(this.app, this));

		// 在应用完全加载后打开随机日记
		this.app.workspace.onLayoutReady(() => {
			if (this.settings.enabled) {
				this.openRandomDiary();
			}
		});

		console.log('Daily Review Auto Open plugin loaded');
	}

	onunload() {
		console.log('Daily Review Auto Open plugin unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async openRandomDiary() {
		const { diaryFolderPath } = this.settings;

		// 获取日记文件夹
		const diaryFolder = this.app.vault.getAbstractFileByPath(diaryFolderPath);

		if (!(diaryFolder instanceof TFolder)) {
			console.warn(`Diary folder not found: ${diaryFolderPath}`);
			return;
		}

		// 获取文件夹中所有 markdown 文件
		const markdownFiles = diaryFolder.children.filter((file): file is TFile =>
			file instanceof TFile && file.extension === 'md'
		);

		if (markdownFiles.length === 0) {
			console.warn('No markdown files found in diary folder');
			return;
		}

		// 随机选择一个文件
		const randomFile = markdownFiles[Math.floor(Math.random() * markdownFiles.length)];

		// 打开文件
		await this.app.workspace.openLinkText(randomFile.path, '', true);
		console.log(`Opened random diary: ${randomFile.path}`);
	}
}

class DailyReviewSettingTab extends PluginSettingTab {
	plugin: DailyReviewAutoOpenPlugin;

	constructor(app: App, plugin: DailyReviewAutoOpenPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Enable auto open')
			.setDesc('Automatically open a random diary entry when Obsidian starts')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enabled)
				.onChange(async (value) => {
					this.plugin.settings.enabled = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Diary folder path')
			.setDesc('Path to the folder containing your diary entries')
			.addText(text => text
				.setPlaceholder('日记')
				.setValue(this.plugin.settings.diaryFolderPath)
				.onChange(async (value) => {
					this.plugin.settings.diaryFolderPath = value;
					await this.plugin.saveSettings();
				}));
	}
}
