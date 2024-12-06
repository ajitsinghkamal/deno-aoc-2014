import type { Maybe } from "./type-utils.ts";

const defaultInputFileName = Deno.env.get(
	"DEFAULT_INPUT_FILE_NAME",
);

type FileTextParserFn = (fileText: string) => unknown;

type Config<ParserFn> = {
	fileName?: string;
	afterRead?: ParserFn;
};

function defaultParser(fileText: string): string[] {
	return fileText.trim().split("\n");
}

export function getInput<
	Fn extends FileTextParserFn,
>(dir: Maybe<string>, config: Config<Fn>): ReturnType<Fn>;

export function getInput(
	dir: Maybe<string>,
	config?: Config<never>,
): ReturnType<typeof defaultParser>;

export function getInput(
	dir: Maybe<string>,
	config?: Config<FileTextParserFn>,
) {
	if (!dir) {
		throw new Error("No input directory provided to get the solution!");
	}
	const path = `${dir}/${config?.fileName ?? defaultInputFileName}`;
	const fileText = Deno.readTextFileSync(path);

	if (config?.afterRead) {
		return config.afterRead(fileText);
	}

	return defaultParser(fileText);
}
