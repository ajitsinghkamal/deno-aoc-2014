import { type Args, parseArgs } from "@std/cli/parse-args";

export type DefinedArgs = {
	day?: number;
	part?: number;
};

export type CliArguments = Args<DefinedArgs>;

export function getCliArgs(): CliArguments {
	return parseArgs(Deno.args);
}

export const CLI_ERRORS = {
	missingArgs:
		"Pass the argument --day to run that problem or directly pass the mod path",
	unknownDayArg: "The solution for the provided day do not exist!",
	undeterminedEntry: "Unable to determine entry point (main) for module",
};
