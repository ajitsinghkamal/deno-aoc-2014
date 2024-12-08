import { Result } from "../problems/types.ts";

export function logModExecution(
	result: Result | Result[],
	modPath: string | undefined = "",
) {
	const emStyle = "color:black; background-color:#55FF55; font-weight: bold;";

	const printResult = ({ description, value }: Result) => {
		const prefixText = description ?? "Solution";
		console.log("\n");
		console.log(
			prefixText + " >> %c " + value + " ",
			emStyle,
		);
		console.log("\n");
	};

	console.log("\n");
	console.log("Running: ", modPath);
	console.log("==================================");
	if (Array.isArray(result)) {
		result.forEach(printResult);
	} else {
		printResult(result);
	}
	console.log("==================================");
	console.log("\n");
}
