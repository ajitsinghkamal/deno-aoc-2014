import { Result } from "../../problems/types.ts";

export function logModExecution(
	result: Result,
	modPath: string | undefined = "",
) {
	console.log("\n");
	console.log("Running: ", modPath);
	console.log("==================================");
	const style = "color:black; background-color:#55FF55; font-weight: bold;";
	const description = result.description ?? "Solution";
	console.log(
		description + " >> %c " + result.value + " ",
		style,
	);
	console.log("==================================");
	console.log("\n");
}
