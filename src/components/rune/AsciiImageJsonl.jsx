import "./ascii-video.css";
import { useEffect, useRef, useState } from "react";
import pako from 'pako';
import { logger } from '../../utils/logger.js';

export default function AsciiImageJsonl({
  framesPath,
  preferGzip = true,
  fontSize = 13,
  scale = 1,
  invertMode = 0,
}) {
  const preRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!preRef.current) return;

    const loadStaticFrame = async () => {
      try {
        // Load manifest
        const manifestRes = await fetch(`${framesPath}/manifest.json`);
        const manifest = await manifestRes.json();

        const cols = manifest.cols;
        const rows = manifest.rows;
        const cellCount = rows * cols;

        let text;
        let res;

        if (preferGzip) {
          try {
            res = await fetch(`${framesPath}/frame.jsonl.gz`);

            if (res.ok) {
              const encoding = res.headers.get("content-encoding");

              if (encoding === "gzip") {
                logger.log("[AsciiImage] Browser auto-decompressed gzip");
                text = await res.text();
              } else {
                logger.log("[AsciiImage] Manual gzip decompress");
                const buf = await res.arrayBuffer();
                const decompressed = pako.ungzip(new Uint8Array(buf));
                text = new TextDecoder().decode(decompressed);
              }
            }
          } catch (fetchError) {
            logger.warn('[AsciiImage] Gzip fetch failed:', fetchError.message);
            res = null;
          }
        }

        if (!text) {
          logger.log('[AsciiImage] Loading uncompressed...');
          res = await fetch(`${framesPath}/frame.jsonl`);
          if (!res.ok) {
            logger.warn(`[AsciiImage] Failed to load frames from ${framesPath}`);
            return;
          }
          text = await res.text();
        }

        if (!text || text.trim().length === 0) {
          logger.warn(`[AsciiImage] Empty file at ${framesPath}`);
          return;
        }

        const firstLine = text.trim().split('\n')[0];
        if (!firstLine) {
          logger.warn(`[AsciiImage] No valid frame data in ${framesPath}`);
          return;
        }

        const frame = JSON.parse(firstLine);

        const container = preRef.current;
        container.innerHTML = '';

        frame.cells.forEach((cell, i) => {
          const span = document.createElement('span');
          span.textContent = cell.g;

          const h = cell.h || 0;
          const s = cell.s || 0;
          const l = cell.l || 0;
          span.style.color = `hsl(${h * 360 / 255}, ${s / 255 * 100}%, ${l / 255 * 100}%)`;

          container.appendChild(span);

          if ((i + 1) % cols === 0 && i < cellCount) {
            container.appendChild(document.createTextNode('\n'));
          }
        });

        setIsReady(true);
      } catch (error) {
        logger.error('[AsciiImage] Failed to load image:', error);
      }
    };

    loadStaticFrame();
  }, [framesPath, preferGzip]);

  const effectiveFontSize = fontSize * scale;

  const getInversionClass = () => {
    if (invertMode === 1) return "ascii-invert-on-light";
    if (invertMode === 2) return "ascii-invert-on-dark";
    return "";
  };

  return (
    <pre
      ref={preRef}
      className={`ascii-surface ${getInversionClass()}`}
      style={{
        opacity: isReady ? 1 : 0,
        fontSize: `${effectiveFontSize}px`
      }}
    />
  );
}
