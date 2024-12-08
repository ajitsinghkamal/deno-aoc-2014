import { isTypeString } from "./packages/utilities/string.ts";
import { logModExecution } from "./packages/logger.ts";
import { getValidFilePathOrThrow } from "./packages/utilities/file.ts";
import { CLI_ERRORS, type CliArguments, getCliArgs } from "./packages/cli.ts";
import type { SolutionModule } from "./problems/types.ts";

function getModulePathToRunOrThrow(args: CliArguments): string {
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
	const args = getCliArgs();
	const modulePath = getModulePathToRunOrThrow(args);
	const mod: SolutionModule = await import(`./${modulePath}`);
	if (mod.main) {
		logModExecution(mod.main(args.part), modulePath);
	} else {
		throw new Error(CLI_ERRORS.undeterminedEntry, {
			cause: modulePath,
		});
	}
}

if (import.meta.main) {
	main();
}
