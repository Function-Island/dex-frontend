import { Currency, PULSE, Token } from '@functionisland-dex/sdk'

export function currencyId(currency: Currency): string {
  if (currency === PULSE) return 'PLS'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
