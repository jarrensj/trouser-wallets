import { getBuyers } from "../buyers";

export function GET() {
  const wallets = getBuyers().map((buyer) => buyer.wallet);

  return new Response(`${wallets.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
