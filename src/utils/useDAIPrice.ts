import { ChainId, Currency, currencyEquals, JSBI, Price, WPLS } from '@functionisland-dex/sdk'
import { useMemo } from 'react'
import { DAI, IDAI } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { useActiveWeb3React } from '../hooks'
import { wrappedCurrency } from './wrappedCurrency'

/**
 * Returns the price in DAI of the input currency
 * @param currency currency to compute the DAI price of
 */
export default function useDAIPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WPLS[chainId], wrapped) ? undefined : currency,
        chainId ? WPLS[chainId] : undefined
      ],
      [wrapped?.equals(DAI) ? undefined : wrapped, chainId === ChainId.MAINNET ? DAI : undefined],
      [chainId ? WPLS[chainId] : undefined, chainId === ChainId.MAINNET ? DAI : undefined]
    ],
    [chainId, currency, wrapped]
  )
  const [[plsPairState, plsPair], [daiPairState, daiPair], [daiPlsPairState, daiPlsPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle wpls/pls
    if (wrapped.equals(WPLS[chainId])) {
      if (daiPair) {
        const price = daiPair.priceOf(WPLS[chainId])
        return new Price(currency, DAI, price.denominator, price.numerator)
      } else {
        return undefined
      }
    }

    // handle DAI
    if (wrapped.equals(DAI)) {
      return new Price(DAI, DAI, '1', '1')
    }

    if (wrapped.equals(IDAI)) {
      return new Price(IDAI, DAI, '1', '1')
    }

    const plsPairPLSAmount = plsPair?.reserveOf(WPLS[chainId])
    const plsPairPLSDAIValue: JSBI =
      plsPairPLSAmount && daiPlsPair ? daiPlsPair.priceOf(WPLS[chainId]).quote(plsPairPLSAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the dai pair
    if (daiPairState === PairState.EXISTS && daiPair && daiPair.reserveOf(DAI).greaterThan(plsPairPLSDAIValue)) {
      const price = daiPair.priceOf(wrapped)
      return new Price(currency, DAI, price.denominator, price.numerator)
    }
    if (plsPairState === PairState.EXISTS && plsPair && daiPlsPairState === PairState.EXISTS && daiPlsPair) {
      if (daiPlsPair.reserveOf(DAI).greaterThan('0') && plsPair.reserveOf(WPLS[chainId]).greaterThan('0')) {
        const plsUsdcPrice = daiPlsPair.priceOf(DAI)
        const currencyPlsPrice = plsPair.priceOf(WPLS[chainId])
        const daiPrice = plsUsdcPrice.multiply(currencyPlsPrice).invert()
        return new Price(currency, DAI, daiPrice.denominator, daiPrice.numerator)
      }
    }
    return undefined
  }, [chainId, currency, plsPair, plsPairState, daiPlsPair, daiPlsPairState, daiPair, daiPairState, wrapped])
}
