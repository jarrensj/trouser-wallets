"use client";

import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

type WalletActionsProps = {
  wallets: string[];
};

function copyWithFallback(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export default function WalletActions({ wallets }: WalletActionsProps) {
  const walletList = wallets.join("\n");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  function resetStatusAfterDelay() {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    resetTimer.current = setTimeout(() => setCopyStatus("idle"), 2500);
  }

  async function copyWallets() {
    let copied = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(walletList);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      copied = copyWithFallback(walletList);
    }

    setCopyStatus(copied ? "copied" : "failed");
    resetStatusAfterDelay();
  }

  return (
    <>
      <div className="ledger-actions">
        <button type="button" onClick={copyWallets}>
          {copyStatus === "copied"
            ? "Copied"
            : copyStatus === "failed"
              ? "Copy failed"
              : "Copy all wallets"}
        </button>
        <a href="/wallets.txt" target="_blank" rel="noreferrer">
          View as plain list ↗
        </a>
        <a href="/data/trouser-wallets.csv" download>
          Download CSV ↓
        </a>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {copyStatus === "copied"
          ? `${wallets.length} wallet addresses copied to the clipboard.`
          : copyStatus === "failed"
            ? "Clipboard access failed. Open the plain list to copy the addresses manually."
            : ""}
      </span>
    </>
  );
}
