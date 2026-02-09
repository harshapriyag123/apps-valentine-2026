import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("CardDisplay Component Font Sizes", () => {
	const componentPath = join(
		process.cwd(),
		"src/components/CardDisplay.svelte",
	);
	const content = readFileSync(componentPath, "utf-8");

	it('should have a larger "To" label', () => {
		// Expecting larger than text-sm
		expect(content).not.toContain(
			'class="text-vivid-pink font-medium tracking-widest uppercase text-sm"',
		);
		expect(content).toContain(
			'class="text-vivid-pink font-medium tracking-widest uppercase text-lg"',
		);
	});

	it('should have a larger "Will you be my Valentine?" header', () => {
		// Expecting larger than text-4xl
		expect(content).not.toContain(
			'class="text-4xl font-bold text-deep-raspberry"',
		);
		expect(content).toContain('class="text-5xl font-bold text-deep-raspberry"');
	});

	it("should have a larger message body", () => {
		// Expecting larger than text-lg
		expect(content).not.toContain(
			'class="text-lg text-deep-raspberry/80 italic leading-relaxed py-4"',
		);
		expect(content).toContain(
			'class="text-2xl text-deep-raspberry/80 italic leading-relaxed py-4"',
		);
	});

	it('should have a larger "From" label', () => {
		// Expecting larger than text-xs
		expect(content).not.toContain(
			'class="text-xs text-deep-raspberry/40 mt-4"',
		);
		expect(content).toContain('class="text-sm text-deep-raspberry/40 mt-4"');
	});
});
