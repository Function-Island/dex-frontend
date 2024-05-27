import { ChainId, Currency, currencyEquals, JSBI, Price, WPLS } from '@functionisland-dex/sdk'
import { useMemo } from 'react'
import { USDC } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { useActiveWeb3React } from '../hooks'
import { wrappedCurrency } from './wrappedCurrency'

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WPLS[chainId], wrapped) ? undefined : currency,
        chainId ? WPLS[chainId] : undefined
      ],
      [wrapped?.equals(USDC) ? undefined : wrapped, chainId === ChainId.MAINNET ? USDC : undefined],
      [chainId ? WPLS[chainId] : undefined, chainId === ChainId.MAINNET ? USDC : undefined]
    ],
    [chainId, currency, wrapped]
  )
  const [[plsPairState, plsPair], [usdcPairState, usdcPair], [usdcPlsPairState, usdcPlsPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle wpls/pls
    if (wrapped.equals(WPLS[chainId])) {
      if (usdcPair) {
        const price = usdcPair.priceOf(WPLS[chainId])
        return new Price(currency, USDC, price.denominator, price.numerator)
      } else {
        return undefined
      }
    }
    // handle usdc
    if (wrapped.equals(USDC)) {
      return new Price(USDC, USDC, '1', '1')
    }

    const plsPairPLSAmount = plsPair?.reserveOf(WPLS[chainId])
    const plsPairPLSUSDCValue: JSBI =
      plsPairPLSAmount && usdcPlsPair ? usdcPlsPair.priceOf(WPLS[chainId]).quote(plsPairPLSAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the usdc pair
    if (usdcPairState === PairState.EXISTS && usdcPair && usdcPair.reserveOf(USDC).greaterThan(plsPairPLSUSDCValue)) {
      const price = usdcPair.priceOf(wrapped)
      return new Price(currency, USDC, price.denominator, price.numerator)
    }
    if (plsPairState === PairState.EXISTS && plsPair && usdcPlsPairState === PairState.EXISTS && usdcPlsPair) {
      if (usdcPlsPair.reserveOf(USDC).greaterThan('0') && plsPair.reserveOf(WPLS[chainId]).greaterThan('0')) {
        const plsUsdcPrice = usdcPlsPair.priceOf(USDC)
        const currencyPlsPrice = plsPair.priceOf(WPLS[chainId])
        const usdcPrice = plsUsdcPrice.multiply(currencyPlsPrice).invert()
        return new Price(currency, USDC, usdcPrice.denominator, usdcPrice.numerator)
      }
    }
    return undefined
  }, [chainId, currency, plsPair, plsPairState, usdcPlsPair, usdcPlsPairState, usdcPair, usdcPairState, wrapped])
}
