let vitePreprocess;
try {
	// Use dynamic import to load the ESM module safely in all environments.
	const mod = await import("@astrojs/svelte");
	vitePreprocess = mod.vitePreprocess ?? (() => ({}));
} catch (err) {
	// eslint-disable-next-line no-console
	console.warn("@astrojs/svelte vitePreprocess not available, using noop preprocess.", err?.message ?? err);
	vitePreprocess = () => ({});
}

export default {
	preprocess: vitePreprocess(),
};
