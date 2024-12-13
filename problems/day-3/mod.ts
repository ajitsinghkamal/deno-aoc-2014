import { getInput } from "../../packages/input_handler/mod.ts";
import { logModExecution } from "../../packages/logger.ts";
import { getCliArgs } from "../../packages/cli.ts";
import type { Result } from "../types.ts";

/**
 * @author Ajit
 * https://adventofcode.com/2024/day/3
 * @param {number} solvePart - Day 3 problem has 2 parts. Use this param to get the result of only a specific part.
 * 1: solve for only part 1
 * 2: solve for only part 2
 * ?: When not specified or undefined, solve for both parts in order.
 *
 * @returns Array of results for each part or Specific result if param solvePart was specified
 */

export function main(solvePart?: number): Result | Result[] {
	const data: string = getInput(import.meta.dirname, {
		afterRead(data) {
			return data;
		},
	});

	if (solvePart === 1) {
		return findMulResult(data);
	}

	return [
		findMulResult(data),
		// findSafeReports(reports, { useDampner: true }),
	];
}

if (import.meta.main) {
	const result = main(getCliArgs().part);
	logModExecution(result, import.meta.dirname);
}

function findMulResult(instructions: string): Result {
	const pickValidMulInputRegex = /\d{1,3}/g;
	const pickValidMulCallRegex = /(mul\(\d{1,3},\d{1,3}\))/g;
	const validInstructions = instructions.match(pickValidMulCallRegex);

	let mulSum = 0;

	if (validInstructions) {
		for (const instruction of validInstructions) {
			const inputs = instruction.match(pickValidMulInputRegex)?.map(Number);
			if (inputs) {
				mulSum += mul(inputs[0], inputs[1]);
			}
		}
	}

	return {
		value: mulSum,
		description: "Sum of valid multiplications",
	};
}

function mul(first: number, second: number) {
	return first * second;
}
