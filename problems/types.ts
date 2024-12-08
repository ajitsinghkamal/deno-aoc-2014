export interface Result<Val = string | number> {
	description?: string;
	value: Val;
}

export interface SolutionModule {
	// deno-lint-ignore no-explicit-any
	main: <Val>(...args: any[]) => Result<Val>;
	default: unknown;
}
