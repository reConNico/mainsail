import type { Contracts } from "@mainsail/contracts";

const GENESIS_BLOCK_NUMBER = 0;

export const resolveBlockTag = async (stateStore: Contracts.State.Store, tag: string): Promise<number> => {
	if (tag.startsWith("0x")) {
		return Number.parseInt(tag);
	}

	switch (tag as Contracts.Crypto.BlockTag) {
		case "earliest": {
			return GENESIS_BLOCK_NUMBER;
		}
		// Committed blocks are final, so there is no pending block to serve.
		case "pending":
		case "finalized":
		case "latest":
		case "safe": {
			return stateStore.getBlockNumber();
		}
		default: {
			throw new Error("invalid blockTag:" + tag);
		}
	}
};

export const getHistoryHeightFromBlockTag = async (tag: string): Promise<bigint | undefined> => {
	if (tag.startsWith("0x")) {
		return BigInt(Number.parseInt(tag));
	}

	switch (tag as Contracts.Crypto.BlockTag) {
		case "earliest": {
			return BigInt(GENESIS_BLOCK_NUMBER);
		}
		case "pending":
		case "finalized":
		case "latest":
		case "safe": {
			return undefined; // do not use history
		}
		default: {
			throw new Error("invalid blockTag:" + tag);
		}
	}
};
