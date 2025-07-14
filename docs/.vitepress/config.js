import { defineConfig } from 'vitepress';

export default defineConfig({
	title: '@mhkeller/utils',
	description: 'A collection of utility functions',
	base: '/utils/', // This should match your GitHub repo name

	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'API Reference', link: '/api/' },
			{ text: 'GitHub', link: 'https://github.com/mhkeller/utils' }
		],

		sidebar: [
			{
				text: 'Getting Started',
				items: [
					{ text: 'Introduction', link: '/' },
					{ text: 'Installation', link: '/installation' }
				]
			},
			{
				text: 'Core Functions',
				items: [
					{ text: 'Array & Object Utils', link: '/api/array-object' },
					{ text: 'String Utils', link: '/api/string' },
					{ text: 'Number Utils', link: '/api/number' },
					{ text: 'Time & Progress', link: '/api/time-progress' },
					{ text: 'File & Data', link: '/api/file-data' },
					{ text: 'General Utilities', link: '/api/utilities' }
				]
			},
			{
				text: 'Database Functions',
				items: [
					{ text: 'PostgreSQL', link: '/api/database' },
					{ text: 'SQLite', link: '/api/sqlite' }
				]
			},
			{
				text: 'Web Scraping',
				items: [{ text: 'Browser Utils', link: '/api/scraping' }]
			}
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/mhkeller/utils' }],

		footer: {
			message: 'Released under the ISC License.',
			copyright: 'Copyright © 2025 mhkeller'
		}
	}
});
