import { describe, expect, it } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Project Structure & Configuration", () => {
	const cwd = process.cwd();

	it("should have a strict tsconfig.json", () => {
		const tsconfigPath = join(cwd, "tsconfig.json");
		expect(existsSync(tsconfigPath)).toBe(true);
		const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf-8"));
		// Astro's strict template usually extends a strict config, or sets strict: true
		// We check if compilerOptions.strict is true OR it extends a strict config (which implies strict)
		// For simplicity, let's check if 'strict' is explicitly mentioned or part of the extends.
		// Actually, create-astro strict template extends "astro/tsconfigs/strict".
		const extendsConfig = tsconfig.extends;
		const isStrict =
			tsconfig.compilerOptions?.strict === true ||
			(typeof extendsConfig === "string" && extendsConfig.includes("strict"));
		expect(isStrict).toBe(true);
	});

	it("should have a src/components directory", () => {
		expect(existsSync(join(cwd, "src/components"))).toBe(true);
	});

	it("should have a src/lib directory", () => {
		expect(existsSync(join(cwd, "src/lib"))).toBe(true);
	});

	it("should have a src/layouts directory", () => {
		expect(existsSync(join(cwd, "src/layouts"))).toBe(true);
	});
});
