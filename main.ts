import { type Args, parseArgs } from "@std/cli/parse-args";
import { isTypeString } from "./packages/utilities/string.ts";
import { logModExecution } from "./packages/logger/mod.ts";
import { getValidFilePathOrThrow } from "./packages/utilities/file.ts";
import type { SolutionModule } from "./problems/types.ts";

type CliArguments = {
	day?: number;
};

function getModulePathToRunOrThrow(args: Args<CliArguments>): string {
	if (args.day) {
		try {
			return getValidFilePathOrThrow(`./problems/day-${args.day}/mod.ts`);
		} catch (err) {
			throw new Error(CLI_ERRORS.unknownDayArg, {
				cause: err,
			});
		}
	}

	if (args._) {
		return getValidFilePathOrThrow(args._.find(isTypeString));
	}

	throw new Error(CLI_ERRORS.missingArgs);
}

async function main() {
	const args: Args<CliArguments> = parseArgs(Deno.args);
	const modulePath = getModulePathToRunOrThrow(args);
	const mod: SolutionModule = await import(`./${modulePath}`);
	if (mod.main) {
		logModExecution(mod.main(), modulePath);
	} else {
		throw new Error(CLI_ERRORS.undeterminedEntry, {
			cause: modulePath,
		});
	}
}

if (import.meta.main) {
	main();
}

const CLI_ERRORS = {
	missingArgs:
		"Pass the argument --day to run that problem or directly pass the mod path",
	unknownDayArg: "The solution for the provided day do not exist!",
	undeterminedEntry: "Unable to determine entry point (main) for module",
};
