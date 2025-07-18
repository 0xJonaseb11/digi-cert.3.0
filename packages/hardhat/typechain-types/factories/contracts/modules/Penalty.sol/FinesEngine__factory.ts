/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  FinesEngine,
  FinesEngineInterface,
} from "../../../../contracts/modules/Penalty.sol/FinesEngine";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "enterprise",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FineImposedERC20",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "enterprise",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FineImposedETH",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "enterprise",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FinePaidERC20",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "enterprise",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FinePaidETH",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "finesERC20",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "finesETH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_enterprise",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "string",
        name: "_tier",
        type: "string",
      },
    ],
    name: "imposeFineERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_enterprise",
        type: "address",
      },
      {
        internalType: "string",
        name: "_tier",
        type: "string",
      },
    ],
    name: "imposeFineETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "payFineERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payFineETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "penaltyTiers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610b87380380610b8783398101604081905261002f916100bc565b60008054336001600160a01b031991821617909155600180549091166001600160a01b0383161790556040516436b4b737b960d91b815268056bc75e2d6310000090600490600501908152604051908190036020018120919091556436b0b537b960d91b8152683635c9adc5dea000009060049060050190815260405190819003602001902055506100ec565b6000602082840312156100ce57600080fd5b81516001600160a01b03811681146100e557600080fd5b9392505050565b610a8c806100fb6000396000f3fe60806040526004361061009c5760003560e01c8063dd43bf6811610064578063dd43bf6814610148578063e086e5ec14610183578063e30ab01a14610198578063e4a36636146101d0578063f4f3b20014610208578063f851a4401461022857600080fd5b80631a0ebb4b146100a1578063413edd46146100c357806350977b09146100cb57806361d027b3146100eb578063b10b4b8e14610128575b600080fd5b3480156100ad57600080fd5b506100c16100bc36600461085f565b610248565b005b6100c1610325565b3480156100d757600080fd5b506100c16100e63660046108bd565b610418565b3480156100f757600080fd5b5060015461010b906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561013457600080fd5b506100c161014336600461090b565b6104e2565b34801561015457600080fd5b5061017561016336600461090b565b60026020526000908152604090205481565b60405190815260200161011f565b34801561018f57600080fd5b506100c1610621565b3480156101a457600080fd5b506101756101b336600461092d565b805160208183018101805160048252928201919093012091525481565b3480156101dc57600080fd5b506101756101eb36600461096a565b600360209081526000928352604080842090915290825290205481565b34801561021457600080fd5b506100c161022336600461090b565b610687565b34801561023457600080fd5b5060005461010b906001600160a01b031681565b6000546001600160a01b0316331461027b5760405162461bcd60e51b81526004016102729061099d565b60405180910390fd5b600060048260405161028d91906109c5565b9081526040805160209281900383019020546001600160a01b03878116600090815260038552838120918816815293529082208054919350839290916102d49084906109f4565b9091555050604080516001600160a01b038581168252602082018490528616917f61efb6777eb2a23886fc08ef0ef59f116b7a2c61683d51d587b2272b6ead8b7f910160405180910390a250505050565b336000908152600260205260409020546103745760405162461bcd60e51b815260206004820152601060248201526f4e6f2066696e65732070656e64696e6760801b6044820152606401610272565b336000908152600260205260409020543410156103ca5760405162461bcd60e51b8152602060048201526014602482015273125b9cdd59999a58da595b9d081c185e5b595b9d60621b6044820152606401610272565b3360008181526002602052604080822091909155517f703baed5ddd4ed2ed37c2b28b09cfed39063f27d9818b086145125a838ce50f69061040e9034815260200190565b60405180910390a2565b6000546001600160a01b031633146104425760405162461bcd60e51b81526004016102729061099d565b600060048260405161045491906109c5565b90815260200160405180910390205490508060026000856001600160a01b03166001600160a01b03168152602001908152602001600020600082825461049a91906109f4565b90915550506040518181526001600160a01b038416907f723e5b24ab75bab64a13461868442b72c63590bd2e1c99e8b34c2fe3d741d61f9060200160405180910390a2505050565b3360009081526003602090815260408083206001600160a01b0385168452909152902054806105465760405162461bcd60e51b815260206004820152601060248201526f4e6f2066696e65732070656e64696e6760801b6044820152606401610272565b6040516323b872dd60e01b8152336004820152306024820152604481018290526001600160a01b038316906323b872dd906064016020604051808303816000875af1158015610599573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bd9190610a1b565b503360008181526003602090815260408083206001600160a01b0387168085529083528184209390935580519283529082018490527f657870f986f5e229eee6db93ebd6023c86924b022fbe241343c82c62ea4afd1c910160405180910390a25050565b6000546001600160a01b0316331461064b5760405162461bcd60e51b81526004016102729061099d565b6001546040516001600160a01b03909116904780156108fc02916000818181858888f19350505050158015610684573d6000803e3d6000fd5b50565b6000546001600160a01b031633146106b15760405162461bcd60e51b81526004016102729061099d565b6001546040516370a0823160e01b815230600482015282916001600160a01b038084169263a9059cbb92919091169083906370a0823190602401602060405180830381865afa158015610708573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072c9190610a3d565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015610777573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061079b9190610a1b565b505050565b80356001600160a01b03811681146107b757600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126107e357600080fd5b813567ffffffffffffffff808211156107fe576107fe6107bc565b604051601f8301601f19908116603f01168101908282118183101715610826576108266107bc565b8160405283815286602085880101111561083f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060006060848603121561087457600080fd5b61087d846107a0565b925061088b602085016107a0565b9150604084013567ffffffffffffffff8111156108a757600080fd5b6108b3868287016107d2565b9150509250925092565b600080604083850312156108d057600080fd5b6108d9836107a0565b9150602083013567ffffffffffffffff8111156108f557600080fd5b610901858286016107d2565b9150509250929050565b60006020828403121561091d57600080fd5b610926826107a0565b9392505050565b60006020828403121561093f57600080fd5b813567ffffffffffffffff81111561095657600080fd5b610962848285016107d2565b949350505050565b6000806040838503121561097d57600080fd5b610986836107a0565b9150610994602084016107a0565b90509250929050565b6020808252600e908201526d139bdd08185d5d1a1bdc9a5e995960921b604082015260600190565b6000825160005b818110156109e657602081860181015185830152016109cc565b506000920191825250919050565b80820180821115610a1557634e487b7160e01b600052601160045260246000fd5b92915050565b600060208284031215610a2d57600080fd5b8151801515811461092657600080fd5b600060208284031215610a4f57600080fd5b505191905056fea264697066735822122021f5c35025c338258536eddbf9a8b9135fb7ea1062b1c9a6a9c01a607788d68164736f6c63430008140033";

type FinesEngineConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FinesEngineConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FinesEngine__factory extends ContractFactory {
  constructor(...args: FinesEngineConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _treasury: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_treasury, overrides || {});
  }
  override deploy(
    _treasury: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_treasury, overrides || {}) as Promise<
      FinesEngine & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FinesEngine__factory {
    return super.connect(runner) as FinesEngine__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FinesEngineInterface {
    return new Interface(_abi) as FinesEngineInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): FinesEngine {
    return new Contract(address, _abi, runner) as unknown as FinesEngine;
  }
}
