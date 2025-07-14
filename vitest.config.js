import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			exclude: [
				'node_modules/',
				'test/',
				'**/*.test.js',
				'**/*.spec.js',
				'.github/',
				'coverage/',
				'vitest.config.js'
			],
			include: ['lib/**/*.js', 'db/**/*.js', 'scrape/**/*.js', 'index.js'],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 70,
				statements: 80
			}
		}
	}
});
