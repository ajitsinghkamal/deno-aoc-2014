/**
 * @author Ajit
 * https://adventofcode.com/2024/day/1
 */
import { getInput } from "../../packages/input-handler.ts";

function retrieveLists(input: string[]) {
	const leftList: number[] = [];
	const rightList: number[] = [];
	for (const value of input) {
		const [left, right] = value.split(/\s+/);
		leftList.push(Number(left));
		rightList.push(Number(right));
	}
	return {
		leftList,
		rightList,
	};
}

function sortListInAscOrder(list: number[]) {
	return list.sort((num1, num2) => num1 - num2);
}

function main() {
	const input = getInput(import.meta.dirname);
	const { leftList, rightList } = retrieveLists(input);
	const sortedLeftList = sortListInAscOrder(leftList);
	const sortedRightList = sortListInAscOrder(rightList);
}

main();
