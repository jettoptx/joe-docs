"use client";

import Link from "next/link";
import { useCallback } from "react";

/** Nav link that closes the Augment Space overlay before navigating */
export function NavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const handleClick = useCallback(() => {
    window.dispatchEvent(new CustomEvent("augment-space-close"));
  }, []);

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
