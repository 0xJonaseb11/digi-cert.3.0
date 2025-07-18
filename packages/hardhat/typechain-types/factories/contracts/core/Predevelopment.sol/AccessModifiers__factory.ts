/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  AccessModifiers,
  AccessModifiersInterface,
} from "../../../../contracts/core/Predevelopment.sol/AccessModifiers";

const _abi = [
  {
    inputs: [],
    name: "rolesManager",
    outputs: [
      {
        internalType: "contract RolesManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class AccessModifiers__factory {
  static readonly abi = _abi;
  static createInterface(): AccessModifiersInterface {
    return new Interface(_abi) as AccessModifiersInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AccessModifiers {
    return new Contract(address, _abi, runner) as unknown as AccessModifiers;
  }
}
