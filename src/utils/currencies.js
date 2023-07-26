import usdtFlag from '../img/usdt-flag.svg'
import bitcoinFlag from '../img/bitcoin-flag.svg'
import lightningFlag from '../img/bitcoin-lightning-flag.svg'

const currencies = {
  usdc: {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    flag: usdtFlag
  },
  'lightning-btc': {
    symbol: 'BTC',
    id: 'lightning-btc',
    name: 'BTC Lightning',
    flag: lightningFlag
  },
  btc: {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    flag: bitcoinFlag
  }
}

export default currencies
