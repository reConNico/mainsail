import type { AnySchemaObject } from "ajv";

export const schemas: Record<"blockTag", AnySchemaObject> = {
	blockTag: {
		$id: "blockTag",
		anyOf: [
			{
				enum: ["latest", "safe", "finalized", "pending", "earliest"],
				type: "string",
			},
			{
				$ref: "prefixedQuantityHex",
			},
		],
	},
};
