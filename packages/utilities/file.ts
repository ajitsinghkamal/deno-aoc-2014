import { existsSync } from "@std/fs";
import { type Maybe, type SupportedFileExtensions } from "../../types.ts";

export function appendFileExt(
	path: Maybe<string>,
	ext: SupportedFileExtensions = ".ts",
): Maybe<string> {
	return path && !path.endsWith(ext) ? `${path}${ext}` : path;
}

export function getValidFilePathOrThrow(
	path: Maybe<string>,
	ext?: SupportedFileExtensions,
): string {
	const pathWithExt = appendFileExt(path, ext);

	if (pathWithExt && existsSync(pathWithExt)) {
		return pathWithExt;
	}
	throw new Error(`Invalid file path: ${path}`);
}
