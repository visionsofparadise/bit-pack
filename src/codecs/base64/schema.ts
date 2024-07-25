export interface Base64JsonSchema {
	type: "string";
	contentEncoding: "base64";
	minLength?: number;
	maxLength?: number;
}
