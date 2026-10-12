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
  const [showPlainList, setShowPlainList] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const plainListRef = useRef<HTMLTextAreaElement>(null);

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

    if (!copied) {
      setShowPlainList(true);
      requestAnimationFrame(() => {
        plainListRef.current?.focus();
        plainListRef.current?.select();
      });
    }
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
        <button
          type="button"
          aria-expanded={showPlainList}
          aria-controls="plain-wallet-list"
          onClick={() => setShowPlainList((isVisible) => !isVisible)}
        >
          {showPlainList ? "Hide plain list" : "View as plain list"}
        </button>
        <a href="/data/trouser-wallets.csv" download>
          Download CSV ↓
        </a>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {copyStatus === "copied"
          ? `${wallets.length} wallet addresses copied to the clipboard.`
          : copyStatus === "failed"
            ? "Clipboard access failed. The plain list is open and selected for manual copying."
            : ""}
      </span>
      {showPlainList && (
        <textarea
          ref={plainListRef}
          id="plain-wallet-list"
          className="plain-wallet-list"
          aria-label="Wallet addresses, one per line"
          readOnly
          rows={8}
          value={walletList}
        />
      )}
    </>
  );
}
