import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Valentine Theme Configuration", () => {
	it("should define the Lavender Blush background color", () => {
		const cssContent = readFileSync(
			join(process.cwd(), "src/styles/global.css"),
			"utf-8",
		);
		expect(cssContent).toContain("--color-lavender-blush: #fff0f5;");
	});

	it("should define the Vivid Pink highlight color", () => {
		const cssContent = readFileSync(
			join(process.cwd(), "src/styles/global.css"),
			"utf-8",
		);
		expect(cssContent).toContain("--color-vivid-pink: #ff1493;");
	});

	it("should define the Deep Raspberry text color", () => {
		const cssContent = readFileSync(
			join(process.cwd(), "src/styles/global.css"),
			"utf-8",
		);
		expect(cssContent).toContain("--color-deep-raspberry: #872657;");
	});
});
