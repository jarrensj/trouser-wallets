import { getBuyers } from "./buyers";
import WalletActions from "./wallet-actions";

export default function Home() {
  const buyers = getBuyers();
  const pairs = buyers.reduce((total, buyer) => total + buyer.pairsBought, 0);
  const doubleBuyers = buyers.filter((buyer) => buyer.pairsBought === 2).length;

  return (
    <main>
      <header className="hero">
        <nav className="nav" aria-label="Primary navigation">
          <span className="wordmark">trouser wallets</span>
          <a className="nav-link" href="#wallets">
            The ledger <span aria-hidden="true">↓</span>
          </a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">A public record · Edition 001</p>
            <h1>
              The trouser
              <br />
              <em>wallets.</em>
            </h1>
            <p className="intro">
              The 79 collectors behind a sold-out run of 100 bespoke trousers,
              purchased on HyperCore for 2,000 USDC each.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#wallets">
                View all wallets
              </a>
              <a
                className="text-link"
                href="https://garments.papertrade.xyz/"
                target="_blank"
                rel="noreferrer"
              >
                Visit the collection ↗
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="facts" aria-label="Collection facts">
        <div className="fact">
          <span className="fact-number">{buyers.length}</span>
          <span className="fact-label">Unique wallets</span>
        </div>
        <div className="fact">
          <span className="fact-number">{pairs}</span>
          <span className="fact-label">Pairs sold</span>
        </div>
        <div className="fact">
          <span className="fact-number">{doubleBuyers}</span>
          <span className="fact-label">Double collectors</span>
        </div>
        <div className="fact">
          <span className="fact-number">$200K</span>
          <span className="fact-label">Edition value</span>
        </div>
      </section>

      <section className="edition" aria-labelledby="edition-heading">
        <div className="edition-heading">
          <p className="eyebrow">About the edition</p>
          <h2 id="edition-heading">One hundred, made to measure.</h2>
          <p className="edition-intro">
            A limited run of bespoke, British-tradition pleated trousers,
            offered in two Italian cloths and fitted individually for each
            buyer.
          </p>
        </div>

        <div className="edition-details">
          <article>
            <span className="detail-number">01</span>
            <h3>The cut</h3>
            <p>
              A high waist, side adjusters, an after-dinner split and turn-ups
              define the traditional silhouette.
            </p>
          </article>
          <article>
            <span className="detail-number">02</span>
            <h3>The cloth</h3>
            <p>
              Buyers chose Art du Lin II linen by Solbiati or Favola flannel by
              Loro Piana.
            </p>
          </article>
          <article>
            <span className="detail-number">03</span>
            <h3>The fitting</h3>
            <p>
              Each pair is made to measure, with the tailor contacting buyers
              via Telegram or email.
            </p>
          </article>
        </div>

        <div className="edition-sale">
          <p className="eyebrow">The on-chain sale</p>
          <p>
            All <strong>100 pairs sold out</strong> at 2,000 HyperCore USDC
            each—about $200K in total—across 79 unique wallets. Twenty-one
            wallets bought two pairs; no wallet bought more than two.
          </p>
          <p>
            Payments were sent to{" "}
            <a
              href="https://app.hyperliquid.xyz/explorer/address/0x8de06c06ab675bb0bc45644d41768b76869dd376"
              target="_blank"
              rel="noreferrer"
            >
              0x8de0…d376 ↗
            </a>
          </p>
        </div>
      </section>

      <section className="ledger" id="wallets">
        <div className="ledger-heading">
          <div>
            <p className="eyebrow">The complete ledger</p>
            <h2>Cut in order.</h2>
          </div>
          <div className="ledger-note">
            <p>
              Ordered by first purchase. Every address is shown in full; repeat
              collectors are marked with two pairs.
            </p>
            <WalletActions wallets={buyers.map((buyer) => buyer.wallet)} />
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Wallet</th>
                <th scope="col">Pairs</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, index) => (
                <tr key={buyer.wallet}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td>
                    <code>{buyer.wallet}</code>
                  </td>
                  <td>
                    <span
                      className={
                        buyer.pairsBought === 2
                          ? "pair-count double"
                          : "pair-count"
                      }
                    >
                      {buyer.pairsBought}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
