import { ChainId, JSBI, Percent, Token, WPLS } from '@functionisland-dex/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected } from '../connectors'

export const ROUTER_ADDRESS = '0xec4A5B43e5Aa40D3b2a28810219046693B1F4D97'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const WrappedPLS = new Token(
  ChainId.MAINNET,
  '0xA1077a294dDE1B09bB078844df40758a5D0f9a27',
  18,
  'DAI',
  'Wrapped PLS'
)
export const DAI = new Token(ChainId.MAINNET, '0xefD766cCb38EaF1dfd701853BFCe31359239F305', 18, 'DAI', 'Dai Stablecoin')
export const USDT = new Token(ChainId.MAINNET, '0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f', 6, 'USDT', 'Tether USD')
export const WBTC = new Token(ChainId.MAINNET, '0xb17D901469B9208B17d916112988A3FeD19b5cA1', 8, 'WBTC', 'Wrapped BTC')
export const DRPINU = new Token(
  ChainId.MAINNET,
  '0xD39Ad77ba6DbB8837F2AD75b2b66c6f3fEBfc20e',
  18,
  'DRPINU',
  'Drippy Inu'
)
export const E626 = new Token(
  ChainId.MAINNET,
  '0x25B4163f23e1F546fE509D7cE955E8411c1bD330',
  18,
  'E626',
  'Experiment 626'
)
export const GOAT = new Token(
  ChainId.MAINNET,
  '0xF5D0140B4d53c9476DC1488BC6d8597d7393f074',
  18,
  'GOAT',
  'Degen Protocol GOAT'
)
export const LUSD = new Token(ChainId.MAINNET, '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0', 18, 'pLUSD', 'Liquity USD')
export const IDAI = new Token(ChainId.MAINNET, '0x32A12Bdbeb8280d38292e6491070Ebadf826EE50', 18, 'iDAI', 'Island DAI')
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

const WPLS_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WPLS[ChainId.MAINNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WPLS_ONLY,
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], DAI, USDT, WBTC, ISLAND, FARM]
}

export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {}
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
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], DAI, USDT, WBTC]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WPLS_ONLY,
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], DAI, USDT, WBTC]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [DAI, IDAI],
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
