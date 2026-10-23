import fs from "node:fs";
import path from "node:path";

export type Buyer = {
  wallet: string;
  pairsBought: number;
};

export function getBuyers(): Buyer[] {
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
