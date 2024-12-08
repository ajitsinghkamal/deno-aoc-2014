import { getInput } from "../../packages/input_handler/mod.ts";
import { logModExecution } from "../../packages/logger.ts";
import { getCliArgs } from "../../packages/cli.ts";
import { splitInListByWhitespace } from "../../packages/utilities/string.ts";
import type { Result } from "../types.ts";

/**
 * @author Ajit
 * https://adventofcode.com/2024/day/1
 * @param {number} solvePart - Day 1 problem has 2 parts. Use this param to get the result of only a specific part.
 * 1: solve for only part 1
 * 2: solve for only part 2
 * ?: When not specified or undefined, solve for both parts in order.
 *
 * @returns Array of results for each part or Specific result if param solvePart was specified
 */
export function main(solvePart?: number): Result | Result[] {
	const input = getInput(import.meta.dirname);
	const { leftList, rightList } = retrieveLists(input);
	const sortedLeftList = getSortedListInAscOrder(leftList);
	const sortedRightList = getSortedListInAscOrder(rightList);

	if (solvePart === 1) {
		return findTotalDistanceBetweenLists(sortedLeftList, sortedRightList);
	}

	if (solvePart === 2) {
		return findSimilarityScoreBetweenLists(sortedLeftList, sortedRightList);
	}

	return [
		findTotalDistanceBetweenLists(sortedLeftList, sortedRightList),
		findSimilarityScoreBetweenLists(sortedLeftList, sortedRightList),
	];
}

if (import.meta.main) {
	const { part } = getCliArgs();
	const result = main(part);
	logModExecution(result, import.meta.dirname);
}

function retrieveLists(input: string[]) {
	const leftList: number[] = [];
	const rightList: number[] = [];
	for (const value of input) {
		const [left, right] = splitInListByWhitespace(value);
		leftList.push(Number(left));
		rightList.push(Number(right));
	}
	return {
		leftList,
		rightList,
	};
}

function getSortedListInAscOrder(list: number[]) {
	return list.sort((num1, num2) => num1 - num2);
}

function* makeListGenerator(list: number[]) {
	yield* list;
}

function traverseLists(
	leftList: Generator,
	rightList: Generator,
	totalDistance: number = 0,
) {
	const leftYield = leftList.next();
	const rightYield = rightList.next();
	if (leftYield.done && rightYield.done) {
		return totalDistance;
	}

	return traverseLists(
		leftList,
		rightList,
		totalDistance + Math.abs((leftYield.value ?? 0) - (rightYield.value ?? 0)),
	);
}

function findTotalDistanceBetweenLists(
	leftList: number[],
	rightList: number[],
): Result {
	const description = "Total distance between the lists";
	const leftListGenerator = makeListGenerator(leftList);
	const rightListGenerator = makeListGenerator(rightList);
	const value = traverseLists(leftListGenerator, rightListGenerator);
	return {
		value,
		description,
	};
}

function findSimilarityScoreBetweenLists(
	leftList: number[],
	rightList: number[],
): Result {
	const description = "Similarity score for the lists";
	const occuranceMap = new Map<number, number>();
	for (const item of rightList) {
		occuranceMap.set(item, (occuranceMap.get(item) ?? 0) + 1);
	}
	let similarityScore = 0;
	for (const item of leftList) {
		const itemScoreInRightList = occuranceMap.get(item);
		if (itemScoreInRightList) {
			similarityScore += item * itemScoreInRightList;
		}
	}
	return {
		description,
		value: similarityScore,
	};
}
