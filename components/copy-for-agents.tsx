'use client';

import { useState, useCallback } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

function useCopyPageContent() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const article =
      document.querySelector('article') ||
      document.querySelector('[role="main"]') ||
      document.querySelector('.prose');
    if (!article) return;

    const text = (article as HTMLElement).innerText || article.textContent || '';

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return { copied, handleCopy };
}

/** Desktop TOC footer button — hidden below md */
export function CopyForAgents() {
  const { copied, handleCopy } = useCopyPageContent();

  return (
    <div className="mt-4 hidden md:block">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full"
        style={{
          backgroundColor: copied
            ? 'rgba(34, 197, 94, 0.15)'
            : 'rgba(255, 105, 0, 0.1)',
          color: copied ? '#22c55e' : '#ff6900',
          border: `1px solid ${
            copied ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 105, 0, 0.25)'
          }`,
        }}
        title="Copy page content for LLM/agent use"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <ClipboardCopy className="h-4 w-4" />
            <span>Copy for Agents</span>
          </>
        )}
      </button>
    </div>
  );
}

/** Mobile floating action button — visible only below md */
export function CopyForAgentsFAB() {
  const { copied, handleCopy } = useCopyPageContent();

  return (
    <button
      onClick={handleCopy}
      className="fixed bottom-4 right-4 z-50 flex md:hidden items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200"
      style={{
        backgroundColor: copied ? '#22c55e' : '#ff6900',
        color: '#fff',
      }}
      title="Copy page content for LLM/agent use"
      aria-label={copied ? 'Copied!' : 'Copy for Agents'}
    >
      {copied ? (
        <Check className="h-5 w-5" />
      ) : (
        <ClipboardCopy className="h-5 w-5" />
      )}
    </button>
  );
}
