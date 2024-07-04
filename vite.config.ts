import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	server: {
		// https: true,
		// proxy: {},
		// port: 443,
		// hmr: {
		// 	host: 'client.test'
		// }
	},
	plugins: [
		sveltekit()
		// mkcert({
		// 	hosts: ['client.test']
		// })
	]
});
