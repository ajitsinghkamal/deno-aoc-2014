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

const MAX_DAMPNER_TOLERANCE = 1;
const LEAST_DIFF = 1;
const MAX_DIFF = 3;

export function main(solvePart?: number): Result | Result[] {
	const reports: string[] = getInput(import.meta.dirname);

	if (solvePart === 1) {
		return findSafeReports(reports);
	}

	if (solvePart === 2) {
		return findSafeReports(reports, { useDampner: true });
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
	const dampnerTolerance: number = options?.useDampner
		? MAX_DAMPNER_TOLERANCE
		: 0;
	for (const report of reports) {
		const levels = splitInListByWhitespace(report);
		const isReportSafe: boolean = checkReportSafety(levels, dampnerTolerance);
		safeCount += Number(isReportSafe);
	}
	return {
		description: "Number of safe reports",
		value: safeCount,
	};
}

type DiffDirection = -1 | 1 | 0;

/**
 * @param reportLevels
 * @returns
 */
function checkReportSafety(
	reportLevels: string[],
	canTolerate: number = 0,
) {
	if (reportLevels.length < 2) {
		// Just assuming this case when levels are either only 1 or 0
		return false;
	}

	// bit flag to check if levels are supposed to be in increasing or decreasing direction
	// -1 = increasing
	// +1 = decreasing
	// 0 = direction has not been determined
	let expectedDiffDirection: DiffDirection = 0;

	for (let level = 1; level < reportLevels.length; level++) {
		const prev = Number(reportLevels[level - 1]);
		const current = Number(reportLevels[level]);
		const diff = prev - current;
		if (!expectedDiffDirection && diff) {
			// set only when differnece is non-zero and
			// expectedDiffDirection has not been updated
			expectedDiffDirection = Math.sign(diff) as DiffDirection;
		}
		if (isSafe(diff, expectedDiffDirection)) {
			continue;
		} else if (canTolerate) {
			canTolerate -= 1;
		} else {
			return false;
		}
	}
	return true;
}

/**
 * @param diff
 * @param expectedDiffDirection
 * @returns
 */
function isSafe(diff: number, expectedDiffDirection: DiffDirection) {
	if (expectedDiffDirection !== Math.sign(diff)) {
		return false;
	}
	if (Math.abs(diff) < LEAST_DIFF || Math.abs(diff) > MAX_DIFF) {
		return false;
	}
	return true;
}
