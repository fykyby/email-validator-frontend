import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()]
};

// DEV HTTPS
import mkcert from 'vite-plugin-mkcert';
config.server = {
	https: true,
	proxy: {},
	port: 443,
	hmr: {
		host: 'client.test'
	}
};
config.plugins?.push(
	mkcert({
		hosts: ['client.test']
	})
);

export default defineConfig(config);
