import { ChainId } from '@functionisland-dex/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xB6cE71Fe5dA13f98f3b2688d50115E9222668E3F'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
