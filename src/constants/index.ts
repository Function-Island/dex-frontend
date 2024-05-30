import { ChainId, JSBI, Percent, Token, WPLS } from '@functionisland-dex/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected } from '../connectors'

export const ROUTER_ADDRESS = '0xec4A5B43e5Aa40D3b2a28810219046693B1F4D97'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MAINNET, '0xefD766cCb38EaF1dfd701853BFCe31359239F305', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f', 6, 'USDT', 'Tether USD')
export const WBTC = new Token(ChainId.MAINNET, '0xb17D901469B9208B17d916112988A3FeD19b5cA1', 8, 'WBTC', 'Wrapped BTC')
export const ISLAND = new Token(
  ChainId.MAINNET,
  '0xDFB10795E6fE7D0Db68F9778Ba4C575a28E8Cd4c',
  18,
  'ISLAND',
  'Function Island'
)
export const FARM = new Token(
  ChainId.MAINNET,
  '0xfd4d3A2fd12C7f3146428a2ebDCb489550Ae9bea',
  18,
  'FARM',
  'Function Island Farm'
)

const IDAI_ADDRESS = '0x32A12Bdbeb8280d38292e6491070Ebadf826EE50'

export const IDAI: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, IDAI_ADDRESS, 18, 'iDAI', 'Function Island DAI')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [IDAI_ADDRESS]: 'iDAI'
}

const WPLS_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WPLS[ChainId.MAINNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WPLS_ONLY,
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC, ISLAND, FARM]
}

export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    '0x32A12Bdbeb8280d38292e6491070Ebadf826EE50': [
      new Token(ChainId.MAINNET, IDAI_ADDRESS, 18, 'iDAI', 'Function Island DAI')
    ]
  }
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {}
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WPLS_ONLY,
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WPLS_ONLY,
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [USDC, USDT],
    [DAI, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much PLS so they end up with < 1k PLS
export const MIN_PLS: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(21)) // 1000 PLS
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')
