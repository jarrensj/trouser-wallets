# Trouser wallets

The public ledger of the 79 unique wallets that bought
[papertrouser_](https://garments.papertrade.xyz/), a sold-out edition of 100
bespoke trousers priced at 2,000 HyperCore USDC each.

- **79** unique wallets
- **100** pairs sold
- **21** wallets bought two pairs
- No wallet bought more than two pairs
- Payments were sent to
  [`0x8de06c06ab675bb0bc45644d41768b76869dd376`](https://app.hyperliquid.xyz/explorer/address/0x8de06c06ab675bb0bc45644d41768b76869dd376)

The edition featured British-tradition pleated trousers with a high waist,
side adjusters, an after-dinner split and turn-ups. Buyers chose Art du Lin II
linen by Solbiati or Favola flannel by Loro Piana; each pair is made to measure,
with the tailor contacting buyers via Telegram or email.

The complete list is visible in the app and available as machine-readable CSV
at [`public/data/trouser-wallets.csv`](public/data/trouser-wallets.csv). Rows
are ordered by first purchase; `pairs_bought` records whether a wallet bought
one or two pairs.

## Development

```sh
npm install
npm run dev
```
