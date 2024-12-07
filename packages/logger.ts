import { Result } from "../problems/types.ts";

export function logModExecution(
	result: Result,
	modPath: string | undefined = "",
) {
	console.log("Running: ", modPath);
	console.log("\n");
	console.log(`${result.description ?? "Solution"}: ${result.value}`);
}
