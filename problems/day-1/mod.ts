/**
 * @author Ajit
 * https://adventofcode.com/2024/day/1
 */
import { getInput } from "../../packages/input_handler/mod.ts";
import { logModExecution } from "../../packages/logger.ts";
import type { Result } from "../types.ts";

function retrieveLists(input: string[]) {
	const leftList: number[] = [];
	const rightList: number[] = [];
	for (const value of input) {
		const [left, right] = value.trim().split(/\s+/);
		leftList.push(Number(left));
		rightList.push(Number(right));
	}
	return {
		leftList,
		rightList,
	};
}

function* generateSortedListInAscOrder(list: number[]) {
	const sorted = list.sort((num1, num2) => num1 - num2);
	yield* sorted;
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
		totalDistance + Math.abs((rightYield.value ?? 0) - (rightYield.value ?? 0)),
	);
}

export function main(): Result {
	const input = getInput(import.meta.dirname);
	const { leftList, rightList } = retrieveLists(input);
	const sortedLeftList = generateSortedListInAscOrder(leftList);
	const sortedRightList = generateSortedListInAscOrder(rightList);
	const result = traverseLists(sortedLeftList, sortedRightList);

	return {
		value: result,
		description: "Total distance between the lists",
	};
}

if (import.meta.main) {
	const result = main();
	logModExecution(result, import.meta.dirname);
}
