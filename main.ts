import { type Args, parseArgs } from "@std/cli/parse-args";
import { isTypeString } from "./packages/type_utils.ts";
import { logModExecution } from "./packages/logger.ts";
import { getValidFilePathOrThrow } from "./packages/helpers.ts";

type CliArguments = {
	day?: number;
};

function getModulePathToRunOrThrow(args: Args<CliArguments>): string {
	if (args.day) {
		return getValidFilePathOrThrow(
			{
				path: `./problems/day-${args}/mod.ts`,
				exceptionMsg: "The solution for the provided day do not exist!",
			},
		);
	}

	if (args._) {
		return getValidFilePathOrThrow(args._.find(isTypeString));
	}

	throw Error(
		"Pass the argument --day to run that problem or directly pass the mod path",
	);
}

async function main() {
	const args: Args<CliArguments> = parseArgs(Deno.args);
	const modulePath = getModulePathToRunOrThrow(args);
	const mod = await import(`./${modulePath}`);
	if (mod.main) {
		logModExecution(mod.main(), modulePath);
	} else {
		throw Error(
			`Unable to determine entry point (main) for module: ${modulePath}`,
		);
	}
}

if (import.meta.main) {
	main();
}
