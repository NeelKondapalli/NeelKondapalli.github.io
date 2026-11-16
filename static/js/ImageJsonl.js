// @ts-nocheck
import pako from 'https://cdn.jsdelivr.net/npm/pako@2.1.0/+esm';
import { logger } from './logger.js';

export function createImageJsonl({
  container,
  framesPath,
  preferGzip = true,
  onReady = null,
}) {
  let cellSpans = [];

  // Typed arrays for efficient memory storage
  let glyphs = null;      // Uint16Array - character codes
  let hues = null;        // Uint16Array - hue values (0-360)
  let saturations = null; // Uint8Array - saturation (0-100)
  let lightness = null;   // Uint8Array - lightness (0-255)

  // Pre-allocated caches
  let glyphCache = null;     // Array of pre-allocated character strings
  let colorStrings = null;   // Pre-computed hsl() strings for all cells

  let cellCount = 0;
  let cols = 0;
  let rows = 0;

  // Build glyph cache once (all possible Unicode chars we might use)
  function initGlyphCache() {
    glyphCache = new Array(65536);
    for (let i = 0; i < 65536; i++) {
      glyphCache[i] = String.fromCodePoint(i);
    }
  }

  function hslToString(h, s, l) {
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  async function loadManifest() {
    const res = await fetch(`${framesPath}/manifest.json`);
    const manifest = await res.json();

    cols = manifest.cols;
    rows = manifest.rows;

    // Verify this is an image type
    if (manifest.type !== 'image') {
      logger.warn(`[ImageJsonl] Expected type "image" but got "${manifest.type}"`);
    }

    return manifest;
  }

  async function loadImage() {
    const startTime = performance.now();
    let text;
    let res;

    if (preferGzip) {
      try {
        res = await fetch(`${framesPath}/frames.jsonl.gz`);

        if (res.ok) {
          const encoding = res.headers.get("content-encoding");

          if (encoding === "gzip") {
            logger.log("[ImageJsonl] Browser auto-decompressed gzip");
            text = await res.text();
          } else {
            logger.log("[ImageJsonl] Manual gzip decompress");
            const buf = await res.arrayBuffer();
            const decompressed = pako.ungzip(new Uint8Array(buf));
            text = new TextDecoder().decode(decompressed);
          }
        }
      } catch (fetchError) {
        logger.warn('[ImageJsonl] Gzip fetch failed:', fetchError.message);
        logger.warn(fetchError);
        res = null;
      }
    }

    if (!text) {
      logger.log('[ImageJsonl] Loading uncompressed...');
      res = await fetch(`${framesPath}/frames.jsonl`);
      if (!res.ok) {
        throw new Error(`Failed to load image from ${framesPath}`);
      }
      text = await res.text();
    }

    const fetchTime = performance.now() - startTime;
    logger.log(`[ImageJsonl] Fetch took ${fetchTime.toFixed(0)}ms`);

    // Parse the single line (should only be one frame for images)
    const lines = text.trim().split('\n');
    if (lines.length !== 1) {
      logger.warn(`[ImageJsonl] Expected 1 frame but got ${lines.length}`);
    }

    cellCount = rows * cols;

    // Allocate memory for a single frame
    glyphs = new Uint16Array(cellCount);
    hues = new Uint16Array(cellCount);
    saturations = new Uint8Array(cellCount);
    lightness = new Uint8Array(cellCount);

    logger.log('[ImageJsonl] Parsing image frame...');
    const parseStartTime = performance.now();

    const frame = JSON.parse(lines[0]);
    frame.cells.forEach((cell, cellIdx) => {
      const glyphCode = cell.g.codePointAt(0) || 0;
      glyphs[cellIdx] = glyphCode;

      hues[cellIdx] = cell.h || 0;
      saturations[cellIdx] = cell.s || 0;
      lightness[cellIdx] = cell.l || 0;
    });

    const parseTime = performance.now() - parseStartTime;
    logger.log(`[ImageJsonl] Frame parsed in ${parseTime.toFixed(0)}ms`);

    // Pre-compute all color strings
    logger.log('[ImageJsonl] Pre-computing color strings...');
    const colorStartTime = performance.now();
    colorStrings = new Array(cellCount);
    for (let i = 0; i < cellCount; i++) {
      colorStrings[i] = hslToString(hues[i], saturations[i], lightness[i]);
    }
    const colorTime = performance.now() - colorStartTime;
    logger.log(`[ImageJsonl] Color strings computed in ${colorTime.toFixed(0)}ms`);

    // Initialize glyph cache
    initGlyphCache();

    const totalBytes = glyphs.byteLength + hues.byteLength +
                       saturations.byteLength + lightness.byteLength;
    logger.log(`[ImageJsonl] Loaded image with ${cellCount} cells (${cols}x${rows})`);
    logger.log(`[ImageJsonl] Memory: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);

    return cellCount;
  }

  function initializeDOMStructure(cellCount) {
    cellSpans = [];

    container.innerHTML = '';

    for (let i = 0; i < cellCount; i++) {
      const span = document.createElement('span');
      container.appendChild(span);
      cellSpans.push(span);

      if ((i + 1) % cols === 0 && i < cellCount - 1) {
        container.appendChild(document.createTextNode('\n'));
      }
    }
  }

  function renderImage() {
    logger.log('[ImageJsonl] Rendering image...');
    const startTime = performance.now();

    for (let i = 0; i < cellCount; i++) {
      const span = cellSpans[i];

      const glyphCode = glyphs[i];
      const glyphChar = glyphCache[glyphCode];
      span.textContent = glyphChar;
      span.style.color = colorStrings[i];
    }

    const renderTime = performance.now() - startTime;
    logger.log(`[ImageJsonl] Image rendered in ${renderTime.toFixed(0)}ms`);

    // Call onReady after rendering
    if (onReady) {
      onReady();
    }
  }

  async function load() {
    try {
      await loadManifest();
      const cellCount = await loadImage();
      initializeDOMStructure(cellCount);
      renderImage();
    } catch (error) {
      logger.error('[ImageJsonl] Failed to load:', error);
      throw error;
    }
  }

  return { load };
}
