import { BigNumber } from "bignumber.js";
import { shortString, num, uint256 } from "starknet";

export function bigintToShortStr(bigintstr) {
  try {
    if (!bigintstr) return "";
    const bn = BigNumber(bigintstr);
    const hex_sentence = `0x` + bn.toString(16);
    return shortString.decodeShortString(hex_sentence);
  } catch (error) {
    return bigintstr;
  }
}

export function bigintToLongAddress(bigintstr) {
  try {
    if (!bigintstr) return "";
    const bn = BigNumber(bigintstr);
    const hex_sentence = `0x` + bn.toString(16);
    return hex_sentence;
  } catch (error) {
    return bigintstr;
  }
}