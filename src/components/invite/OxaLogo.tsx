"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the OXA POOL CLUB logo from the bundled PDF asset.
 * Client-side pdf.js keeps the vector artwork crisp at any size.
 */
export function OxaLogo({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderLogo() {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

      const pdf = await pdfjs.getDocument({ url: "/oxa-logo.pdf" }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2.5 });
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport, canvas }).promise;
      if (!cancelled) setReady(true);
    }

    renderLogo().catch(() => setReady(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {!ready && (
        <div
          className="font-serif text-xl tracking-[0.35em] text-[#1A4B7C] sm:text-2xl"
          aria-hidden
        >
          OXA POOL CLUB
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`mx-auto h-auto max-h-16 w-auto max-w-[220px] sm:max-h-20 sm:max-w-[280px] ${
          ready ? "opacity-100" : "absolute opacity-0"
        }`}
        aria-label="Oxa Pool Club logo"
      />
    </div>
  );
}