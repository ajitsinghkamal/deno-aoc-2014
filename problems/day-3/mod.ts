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

	if (solvePart === 2) {
		return findMulResultWithConditionals(data);
	}

	return [
		findMulResult(data),
		findMulResultWithConditionals(data),
	];
}

if (import.meta.main) {
	const result = main(getCliArgs().part);
	logModExecution(result, import.meta.dirname);
}

const VALID_INPUT_REGX = /\d{1,3}/g;
const MUL_CALL_REGEX = /(mul\(\d{1,3},\d{1,3}\))/g;
const DO_REGEX = /(do\(\))/g;
const DONT_REGEX = /(don\'t\(\))/g;

function findMulResult(instructions: string): Result {
	const pickValidMulInputRegex = /\d{1,3}/g;
	const validInstructions = instructions.match(MUL_CALL_REGEX);

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

function findMulResultWithConditionals(instructions: string): Result {
	const reg = new RegExp(
		`${MUL_CALL_REGEX.source}|${DO_REGEX.source}|${DONT_REGEX.source}`,
		"g",
	);
	const validInstructions = instructions.match(reg);

	let mulSum = 0;
	let shouldApply = true;

	if (validInstructions) {
		for (const instruction of validInstructions) {
			console.log(instruction, shouldApply);
			if (DO_REGEX.test(instruction)) {
				shouldApply = true;
				continue;
			}
			if (DONT_REGEX.test(instruction)) {
				shouldApply = false;
				continue;
			}
			if (shouldApply) {
				const inputs = getValidInput(instruction);
				if (inputs) {
					mulSum += mul(...inputs);
				}
			}
		}
	}

	return {
		value: mulSum,
		description: "Sum of valid multiplications with conditional",
	};
}

function mul(first: number, second: number) {
	return first * second;
}

function getValidInput(instruction: string): [number, number] | undefined {
	const args: string[] | null = instruction.match(VALID_INPUT_REGX);
	if (args) {
		return [Number(args[0]), Number(args[1])];
	}
}
