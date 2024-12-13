import { getInput } from "../../packages/input_handler/mod.ts";
import { logModExecution } from "../../packages/logger.ts";
import { getCliArgs } from "../../packages/cli.ts";
import { splitInListByWhitespace } from "../../packages/utilities/string.ts";
import type { Result } from "../types.ts";

/**
 * @author Ajit
 * https://adventofcode.com/2024/day/2
 * @param {number} solvePart - Day 2 problem has 2 parts. Use this param to get the result of only a specific part.
 * 1: solve for only part 1
 * 2: solve for only part 2
 * ?: When not specified or undefined, solve for both parts in order.
 *
 * @returns Array of results for each part or Specific result if param solvePart was specified
 */

const LEAST_DIFF = 1;
const MAX_DIFF = 3;

export function main(solvePart?: number): Result | Result[] {
	const reports: string[] = getInput(import.meta.dirname);

	if (solvePart) {
		return findSafeReports(reports, { useDampner: solvePart === 2 });
	}

	return [
		findSafeReports(reports),
		findSafeReports(reports, { useDampner: true }),
	];
}

if (import.meta.main) {
	const result = main(getCliArgs().part);
	logModExecution(result, import.meta.dirname);
}

function findSafeReports(
	reports: string[],
	options?: { useDampner: boolean },
): Result {
	let safeCount: number = 0;
	const checkSafety = options?.useDampner
		? isReportSafeAfterOneRemoval
		: isReportSafe;

	for (const report of reports) {
		const reportData: number[] = splitInListByWhitespace(report).map(Number);
		safeCount += Number(checkSafety(reportData));
	}

	return {
		description: options?.useDampner
			? "Number of safe reports with single fault dampner"
			: "Number of safe reports",
		value: safeCount,
	};
}

function isReportSafe(report: number[]) {
	const isInRange = (value: number) => value >= LEAST_DIFF && value <= MAX_DIFF;
	const isIncreasing = () =>
		report.every((item, level, list) => {
			if (level > 0) {
				return item > list[level - 1] && isInRange(item - list[level - 1]);
			}
			return true;
		});
	const isDecreasing = () =>
		report.every((item, level, list) => {
			if (level > 0) {
				return item < list[level - 1] && isInRange(list[level - 1] - item);
			}
			return true;
		});
	return isIncreasing() || isDecreasing();
}

function isReportSafeAfterOneRemoval(report: number[]) {
	for (let index = 0; index < report.length; index++) {
		const modifiedReport = report.slice(0, index).concat(
			report.slice(index + 1),
		);
		if (isReportSafe(modifiedReport)) {
			return true;
		}
	}
	return false;
}
