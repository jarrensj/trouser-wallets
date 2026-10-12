import fs from "node:fs";
import path from "node:path";

type Buyer = {
  wallet: string;
  pairsBought: number;
};

function getBuyers(): Buyer[] {
  const csv = fs.readFileSync(
    path.join(process.cwd(), "public/data/trouser-wallets.csv"),
    "utf8",
  );

  return csv
    .trim()
    .split("\n")
    .slice(1)
    .map((row) => {
      const [wallet, pairsBought] = row.split(",");
      return { wallet, pairsBought: Number(pairsBought) };
    });
}

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
          <span className="fact-label">Pairs made</span>
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
            <a href="/data/trouser-wallets.csv" download>
              Download CSV ↓
            </a>
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
