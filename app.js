'use strict';

const ASSET = 'assets/';

function emptySlot() {
  return { key: '', overlay: '', module: '', frame: '' };
}

function makeWells(rects, cols) {
  return rects.map(([x0, y0, x1, y1], index) => ({
    index,
    x0, y0, x1, y1,
    cx: (x0 + x1) / 2,
    cy: (y0 + y1) / 2,
    col: index % cols,
    row: Math.floor(index / cols)
  }));
}

function previewKeys(cols, rows, originX, originY, pitchX, pitchY, width, height) {
  return Array.from({ length: cols * rows }, (_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x0 = originX + col * pitchX;
    const y0 = originY + row * pitchY;
    return { index, row, col, x0, y0, x1: x0 + width - 1, y1: y0 + height - 1 };
  });
}

/** Plus XL wells on Perfect Grid.png, 9 × 4. */
const PLUS_XL_WELLS = makeWells([
  [11, 30, 123, 143], [154, 30, 267, 143], [298, 30, 410, 143], [442, 30, 554, 143],
  [585, 30, 697, 143], [729, 30, 841, 143], [872, 30, 984, 143], [1016, 30, 1128, 143],
  [1159, 30, 1271, 143],
  [11, 174, 123, 286], [154, 174, 267, 286], [298, 174, 410, 286], [442, 174, 554, 286],
  [585, 174, 697, 286], [729, 174, 841, 286], [872, 174, 984, 286], [1016, 174, 1128, 286],
  [1159, 174, 1271, 286],
  [11, 318, 123, 430], [154, 318, 267, 430], [298, 318, 410, 430], [442, 318, 554, 430],
  [585, 318, 697, 430], [729, 318, 841, 430], [872, 318, 984, 430], [1016, 318, 1128, 430],
  [1159, 318, 1271, 430],
  [11, 462, 123, 574], [154, 462, 267, 574], [298, 462, 410, 574], [442, 462, 554, 574],
  [585, 462, 697, 574], [729, 462, 841, 574], [872, 462, 984, 574], [1016, 462, 1128, 574],
  [1159, 462, 1271, 574]
], 9);

/** XL wells on its Perfect Grid, 8 × 4, each 98 × 98. */
const XL_WELLS = makeWells([46, 181, 315, 450].flatMap((y) => (
  [11, 139, 268, 396, 525, 653, 781, 910].map((x) => [x, y, x + 97, y + 97])
)), 8);

/** Plus wells on its Perfect Grid, 4 × 2. */
const PLUS_WELLS = makeWells([
  [12, 11, 132, 131], [231, 11, 351, 131], [450, 11, 570, 131], [669, 11, 790, 131],
  [12, 171, 132, 292], [231, 171, 351, 292], [450, 171, 570, 292], [668, 171, 789, 292]
], 4);

/** MK.2 wells on its Perfect Grid, 5 × 3. */
const MK2_WELLS = makeWells([
  [21, 9, 166, 154], [215, 9, 360, 154], [409, 9, 554, 154], [603, 9, 749, 154], [797, 9, 943, 154],
  [21, 203, 166, 348], [215, 203, 360, 348], [409, 203, 554, 348], [603, 203, 749, 348], [797, 203, 943, 348],
  [21, 397, 166, 543], [215, 397, 360, 543], [409, 397, 554, 543], [603, 397, 749, 543], [797, 397, 943, 543]
], 5);

const LAYERS = [
  {
    id: 'key',
    label: 'Background key',
    applyAll: true,
    options: ['background_key_2.png', 'background_key_3.png']
  },
  {
    id: 'overlay',
    label: 'Overlay',
    applyAll: true,
    options: ['overlay_1.png', 'overlay_2.png']
  },
  {
    id: 'module',
    label: 'Module',
    options: [
      'module_t.png', 'module_b.png', 'module_l.png', 'module_r.png',
      'module_tl.png', 'module_tr.png', 'module_bl.png', 'module_br.png',
      'module_tbt.png', 'module_tbb.png', 'module_tbc.png',
      'module_lrl.png', 'module_lrr.png', 'module_lrc.png'
    ]
  },
  {
    id: 'frame',
    label: 'Frame',
    options: [
      'frame_t.png', 'frame_b.png', 'frame_l.png', 'frame_r.png',
      'frame_tl.png', 'frame_tr.png', 'frame_bl.png', 'frame_br.png',
      'frame_tbt.png', 'frame_tbb.png', 'frame_tbc.png',
      'frame_lrl.png', 'frame_lrr.png', 'frame_lrc.png'
    ]
  }
];

const DEVICES = [
  {
    id: 'mk2',
    label: 'Stream Deck MK.2',
    ready: true,
    art: 'devices/mk2.png',
    width: 960,
    height: 544,
    radius: 23,
    dir: 'mk2/',
    workBg: 'mk2/Background_working_space.png',
    exportBg: 'mk2/Background.png',
    grid: 'mk2/Perfect Grid.png',
    wells: MK2_WELLS,
    slots: MK2_WELLS.map(emptySlot),
    preview: {
      width: 780,
      height: 554,
      art: 'devices/mk2.png',
      keysOverlay: 'devices/mk2-key-area.png',
      keysAt: [68, 104],
      logo: { x: 252, y: 30, w: 275, h: 48 },
      radius: 16,
      keys: previewKeys(5, 3, 85, 116, 128, 128, 98, 98)
    }
  },
  {
    id: 'xl',
    label: 'Stream Deck XL',
    ready: true,
    art: 'devices/xl.png',
    width: 1024,
    height: 600,
    radius: 18,
    dir: '',
    workBg: 'xl/Background_working_space.png',
    exportBg: 'xl/Background.png',
    grid: 'xl/Perfect Grid.png',
    wells: XL_WELLS,
    slots: XL_WELLS.map(emptySlot),
    preview: {
      width: 2440,
      height: 1504,
      art: 'devices/xl.png',
      keysOverlay: 'devices/xl-key-area.png',
      keysAt: [193, 280],
      logo: { x: 933, y: 96, w: 574, h: 100 },
      scale: 2,
      radius: 32,
      keys: previewKeys(8, 4, 225, 302, 256, 256, 198, 198)
    }
  },
  {
    id: 'plus',
    label: 'Stream Deck +',
    ready: true,
    art: 'devices/plus.png',
    imgW: 1024,
    width: 800,
    height: 480,
    radius: 22,
    dir: '',
    workBg: 'plus/Background_working_space.png',
    exportBg: 'plus/Background.png',
    grid: 'plus/Perfect Grid.png',
    wells: PLUS_WELLS,
    slots: PLUS_WELLS.map(emptySlot),
    strip: true,
    stripEditor: { dials: 4, width: 800, height: 100 },
    preview: {
      width: 1024,
      height: 972,
      art: 'devices/plus.png',
      keysOverlay: 'devices/plus-key-area.png',
      keysAt: [64, 72],
      stripOverlay: 'devices/plus-strip-area.png',
      stripAt: [62, 409],
      stripContent: { x: 110, y: 457, w: 800, h: 100 },
      logo: { x: 403, y: 20, w: 218, h: 38 },
      radius: 18,
      keys: previewKeys(4, 2, 117, 84, 224, 152, 118, 118)
    },
    zones: {
      keys: { left: 10.74, top: 8.02, width: 78.52, height: 29.22, radius: 19 },
      strip: { left: 6.25, top: 41.98, width: 87.3, height: 19.86, radius: 0 }
    }
  },
  {
    id: 'plus_xl',
    label: 'Stream Deck + XL',
    ready: true,
    art: 'devices/plus-xl.png',
    imgW: 1472,
    width: 1280,
    height: 800,
    radius: 22,
    dir: '',
    workBg: 'Background_working_space.png',
    exportBg: 'Background.png',
    grid: 'Perfect Grid.png',
    wells: PLUS_XL_WELLS,
    slots: PLUS_XL_WELLS.map(emptySlot),
    strip: true,
    stripEditor: { dials: 6, width: 1200, height: 100 },
    preview: {
      width: 1472,
      height: 1320,
      art: 'devices/plus-xl.png',
      keysOverlay: 'devices/plus-xl-key-area.png',
      keysAt: [80, 88],
      stripOverlay: 'devices/plus-xl-strip-area.png',
      stripAt: [80, 685],
      stripContent: { x: 136, y: 725, w: 1200, h: 100 },
      logo: { x: 593, y: 23, w: 286, h: 50 },
      radius: 18,
      keys: Array.from({ length: 36 }, (_, index) => {
        const col = index % 9;
        const row = Math.floor(index / 9);
        const x0 = 121 + col * 140;
        const y0 = 99 + row * 140;
        return { index, row, col, x0, y0, x1: x0 + 109, y1: y0 + 111 };
      })
    },
    zones: {
      keys: { left: 7.74, top: 7.12, width: 84.51, height: 41.21, radius: 21 },
      strip: { left: 6.52, top: 51.82, width: 86.82, height: 13.41, radius: 0 }
    }
  }
];

const images = new Map();
let deviceId = 'plus_xl';
let deviceOpen = false;
let anchor = 0;
const picked = new Set([0]);
let painting = false;
let editSurface = 'keys';

const stripStudio = document.getElementById('strip-studio');
const stripStage = document.getElementById('strip-stage');
const stripCtx = stripStage.getContext('2d');
const stripLayersEl = document.getElementById('strip-layers');
const stripLabel = document.getElementById('strip-label');
const stripClear = document.getElementById('strip-clear');
const stripScroll = document.getElementById('strip-scroll');
const stripFade = document.getElementById('strip-fade');
const stage = document.getElementById('stage');
const ctx = stage.getContext('2d');
let paintCtx = ctx;
const stageWrap = document.querySelector('.stage-wrap');
const panelDock = document.getElementById('panel-dock');
let panelCollapsed = false;
const devicesEl = document.getElementById('devices');
const deviceMenu = document.getElementById('device-menu');
const deviceToggle = document.getElementById('device-toggle');
let deviceMenuTimer = 0;
const previewView = document.getElementById('preview-view');
const previewKeysCanvas = document.getElementById('preview-keys');
const previewStrip = document.getElementById('preview-strip');
const previewBack = document.getElementById('preview-back');
const viewBackgroundBtn = document.getElementById('view-background');
const welcome = document.getElementById('welcome');
const welcomeGrid = document.getElementById('welcome-grid');
const studio = document.getElementById('studio');
const picker = document.getElementById('picker');
const pickerArt = document.getElementById('picker-art');
const zoneKeys = document.getElementById('zone-keys');
const zoneStrip = document.getElementById('zone-strip');
const stripSoon = document.getElementById('strip-soon');
const empty = document.getElementById('empty');
const panel = document.getElementById('panel');
const stripPanel = document.getElementById('strip-panel');
const panelScroll = document.getElementById('panel-scroll');
const panelFade = document.getElementById('panel-fade');
const panelHint = document.getElementById('panel-hint');
const layersEl = document.getElementById('layers');
const keyLabel = document.getElementById('key-label');
const clearKey = document.getElementById('clear-key');
const exportBtn = document.getElementById('export');
const exportWrap = document.getElementById('export-wrap');
const exportMenu = document.getElementById('export-menu');
const stripTabBg = document.getElementById('strip-tab-bg');
const stripTabDial = document.getElementById('strip-tab-dial');
const stripHint = document.getElementById('strip-hint');
const stripView = document.getElementById('strip-view');
let stripTab = 'background';
const stripHide = { background: false, dial: false };
const STRIP_TAB_LAYERS = {
  background: ['frame', 'shadow'],
  dial: ['knob', 'module']
};
const STRIP_HINTS = {
  background: 'Strip background, frames and edge shadows export together. A frame stays on its dial and still casts its inner shadow onto the dial beside it. A shared edge joins into one piece.',
  dial: 'Knob shadows and modules export with the selected dial, on a transparent 200×100 image.'
};
const READY_HINT = 'Choices follow every selected key. Enclosure closes a solid block.';

function currentDevice() {
  return DEVICES.find((device) => device.id === deviceId);
}

function wells() {
  return currentDevice().wells || [];
}

function slots() {
  return currentDevice().slots || [];
}

function pieceKey(file) {
  return file ? currentDevice().dir + file : '';
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(file));
    img.src = ASSET + file + '?v=27';
  });
}

function paint(showSelection) {
  if (showSelection && currentDevice().preview) {
    paintDevice();
    return;
  }
  paintGrid(stage, showSelection);
}

function paintGrid(target, showSelection) {
  if (painting) return;
  const device = currentDevice();
  const width = device.width || 1280;
  const height = device.height || 800;
  if (target.width !== width || target.height !== height) {
    target.width = width;
    target.height = height;
  }
  paintCtx = target.getContext('2d');
  const ready = device.ready;
  const radius = device.radius || 22;
  paintCtx.clearRect(0, 0, width, height);
  const background = images.get(showSelection || target._workBg ? device.workBg : device.exportBg)
    || images.get(device.exportBg);
  const grid = images.get(device.grid);
  if (background) paintCtx.drawImage(background, 0, 0, width, height);
  if (!ready || !grid) {
    paintCtx = ctx;
    return;
  }
  if (showSelection) drawKeyShadows();
  paintCtx.drawImage(grid, 0, 0, width, height);
  wells().forEach((well, index) => {
    const slot = slots()[index];
    const wellW = well.x1 - well.x0 + 1;
    const wellH = well.y1 - well.y0 + 1;
    paintCtx.save();
    paintCtx.beginPath();
    roundRect(paintCtx, well.x0, well.y0, wellW, wellH, radius);
    paintCtx.clip();
    ['key', 'overlay', 'module', 'frame'].forEach((layer) => {
      const file = slot[layer];
      const img = file && images.get(pieceKey(file));
      if (!img) return;
      drawPiece(img, well, wellW, wellH);
    });
    paintCtx.restore();
    if (wellHasArt(slot)) sharpenWell(well, wellW, wellH);
    if (showSelection) drawKeyBevel(well, wellW, wellH);
  });
  if (showSelection) picked.forEach((index) => strokeWell(wells()[index], index === anchor));
  paintCtx = ctx;
}

function punchOverlay(img, mode) {
  if (!img) return null;
  const key = `${img.src}:${mode}`;
  if (punchOverlay.cache.has(key)) return punchOverlay.cache.get(key);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = image.data;
  for (let i = 0; i < data.length; i += 4) {
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (luma < 28) data[i + 3] = 0;
    else if (mode === 'strip' && luma < 48) data[i + 3] = Math.round(data[i + 3] * 0.45);
  }
  context.putImageData(image, 0, 0);
  punchOverlay.cache.set(key, canvas);
  return canvas;
}
punchOverlay.cache = new Map();

function paintDevice() {
  const device = currentDevice();
  const preview = device.preview;
  if (!preview) return;
  if (stage.width !== preview.width || stage.height !== preview.height) {
    stage.width = preview.width;
    stage.height = preview.height;
  }
  paintCtx = ctx;
  ctx.clearRect(0, 0, preview.width, preview.height);
  const shell = images.get(preview.art);
  if (shell) ctx.drawImage(shell, 0, 0);
  const radius = preview.radius;
  preview.keys.forEach((well) => {
    const slot = slots()[well.index];
    if (!slot || !wellHasArt(slot)) return;
    const wellW = well.x1 - well.x0 + 1;
    const wellH = well.y1 - well.y0 + 1;
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, well.x0, well.y0, wellW, wellH, radius);
    ctx.clip();
    ['key', 'overlay', 'module', 'frame'].forEach((layer) => {
      const file = slot[layer];
      const img = file && images.get(pieceKey(file));
      if (img) drawPiece(img, well, wellW, wellH);
    });
    ctx.restore();
  });
  const keysGlass = punchOverlay(images.get(preview.keysOverlay), 'keys');
  if (keysGlass) drawDeviceOverlay(keysGlass, preview.keysAt, preview.scale);
  if (preview.stripContent) {
    paintStrip(false);
    const strip = preview.stripContent;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(stripStage, strip.x, strip.y, strip.w, strip.h);
    ctx.imageSmoothingEnabled = false;
    const stripGlass = punchOverlay(images.get(preview.stripOverlay), 'strip');
    if (stripGlass) drawDeviceOverlay(stripGlass, preview.stripAt, preview.scale);
  }
  if (editSurface === 'keys' || !preview.stripContent) {
    picked.forEach((index) => strokePreviewKey(preview.keys[index], index === anchor, radius));
  } else {
    strokePreviewDials(preview);
  }
}

function strokePreviewKey(well, primary, radius) {
  if (!well) return;
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, well.x0 - 3, well.y0 - 3, well.x1 - well.x0 + 6, well.y1 - well.y0 + 6, radius + 2);
  const ring = ctx.createLinearGradient(well.x1, well.y0, well.x0, well.y1);
  ring.addColorStop(0, primary ? '#7fb85a' : 'rgba(127, 184, 90, 0.72)');
  ring.addColorStop(1, primary ? '#e07a4f' : 'rgba(224, 122, 79, 0.72)');
  ctx.strokeStyle = ring;
  ctx.lineWidth = primary ? 3 : 2;
  ctx.stroke();
  ctx.restore();
}

function strokePreviewDials(preview) {
  const board = stripBoard();
  if (!board) return;
  const strip = preview.stripContent;
  const dialW = strip.w / board.slots.length;
  board.picked.forEach((index) => {
    const x = strip.x + index * dialW;
    const primary = index === board.anchor;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + 2, strip.y + 2, dialW - 4, strip.h - 4);
    const ring = ctx.createLinearGradient(x + dialW, strip.y, x, strip.y + strip.h);
    ring.addColorStop(0, primary ? '#7fb85a' : 'rgba(127, 184, 90, 0.72)');
    ring.addColorStop(1, primary ? '#e07a4f' : 'rgba(224, 122, 79, 0.72)');
    ctx.strokeStyle = ring;
    ctx.lineWidth = primary ? 3 : 2;
    ctx.stroke();
    ctx.restore();
  });
}

function wellHasArt(slot) {
  return Boolean(slot.key || slot.overlay || slot.module || slot.frame);
}

function sharpenWell(well, width, height) {
  const radius = currentDevice().radius || 22;
  const margin = 3;
  const amount = 0.55;
  const image = paintCtx.getImageData(well.x0, well.y0, width, height);
  const src = image.data;
  const out = new Uint8ClampedArray(src);
  for (let py = 1; py < height - 1; py += 1) {
    for (let px = 1; px < width - 1; px += 1) {
      if (!deepInsideRound(px, py, width, height, radius, margin)) continue;
      const i = (py * width + px) * 4;
      const left = i - 4;
      const right = i + 4;
      const up = i - width * 4;
      const down = i + width * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        const center = src[i + channel];
        const blur = (src[left + channel] + src[right + channel] + src[up + channel] + src[down + channel]) / 4;
        out[i + channel] = center + amount * (center - blur);
      }
    }
  }
  image.data.set(out);
  paintCtx.putImageData(image, well.x0, well.y0);
}

function deepInsideRound(x, y, width, height, radius, margin) {
  const left = x < radius;
  const right = x >= width - radius;
  const top = y < radius;
  const bottom = y >= height - radius;
  if (!(left || right) || !(top || bottom)) {
    return x >= margin && y >= margin && x < width - margin && y < height - margin;
  }
  const cx = left ? radius : width - radius;
  const cy = top ? radius : height - radius;
  const dx = x - cx;
  const dy = y - cy;
  const inner = radius - margin;
  return dx * dx + dy * dy <= inner * inner;
}

function drawPiece(img, well, width, height) {
  const sw = img.naturalWidth;
  const sh = img.naturalHeight;
  if (Math.abs(sw - width) > 4 || Math.abs(sh - height) > 4) {
    paintCtx.imageSmoothingEnabled = true;
    paintCtx.drawImage(img, well.x0, well.y0, width, height);
    paintCtx.imageSmoothingEnabled = false;
    return;
  }
  const dx = Math.round(well.x0 + (width - sw) / 2);
  const dy = Math.round(well.y0 + (height - sh) / 2);
  paintCtx.imageSmoothingEnabled = false;
  paintCtx.drawImage(img, dx, dy);
}

function drawKeyShadows() {
  wells().forEach((well) => {
    const width = well.x1 - well.x0 + 1;
    const height = well.y1 - well.y0 + 1;
    const radius = currentDevice().radius || 22;
    paintCtx.save();
    paintCtx.beginPath();
    roundRect(paintCtx, well.x0, well.y0, width, height, radius);
    paintCtx.shadowColor = 'rgba(0, 0, 0, 0.55)';
    paintCtx.shadowBlur = 14;
    paintCtx.shadowOffsetY = 6;
    paintCtx.fillStyle = '#242426';
    paintCtx.fill();
    paintCtx.restore();
  });
}

function drawKeyBevel(well, width, height) {
  paintCtx.save();
  const radius = (currentDevice().radius || 22) - 1;
  paintCtx.beginPath();
  roundRect(paintCtx, well.x0 + 0.5, well.y0 + 0.5, width - 1, height - 1, radius);
  const edge = paintCtx.createLinearGradient(well.x0, well.y0, well.x0, well.y1);
  edge.addColorStop(0, 'rgba(255, 255, 255, 0.32)');
  edge.addColorStop(0.03, 'rgba(255, 255, 255, 0)');
  edge.addColorStop(0.97, 'rgba(0, 0, 0, 0)');
  edge.addColorStop(1, 'rgba(0, 0, 0, 0.32)');
  paintCtx.strokeStyle = edge;
  paintCtx.lineWidth = 1;
  paintCtx.stroke();
  paintCtx.restore();
}

function strokeWell(well, primary) {
  paintCtx.save();
  const radius = currentDevice().radius || 22;
  paintCtx.beginPath();
  roundRect(paintCtx, well.x0 - 3, well.y0 - 3, well.x1 - well.x0 + 6, well.y1 - well.y0 + 6, radius);
  const ring = paintCtx.createLinearGradient(well.x1, well.y0, well.x0, well.y1);
  ring.addColorStop(0, primary ? '#7fb85a' : 'rgba(127, 184, 90, 0.72)');
  ring.addColorStop(1, primary ? '#e07a4f' : 'rgba(224, 122, 79, 0.72)');
  paintCtx.strokeStyle = ring;
  paintCtx.lineWidth = primary ? 3 : 2;
  paintCtx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  paintCtx.shadowBlur = primary ? 10 : 6;
  paintCtx.stroke();
  paintCtx.restore();
}

function fitStudio() {
  syncZones();
  fitStrip();
  if (studio.hidden) return;
  const device = currentDevice();
  const preview = device.preview && stageWrap.classList.contains('device-face');
  let availW = stageWrap.clientWidth;
  let availH = stageWrap.clientHeight;
  if (preview) {
    const styles = getComputedStyle(studio);
    const padX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const slotW = 320;
    const gap = 22;
    availW = Math.max(0, studio.clientWidth - padX - gap - slotW);
    availH = Math.max(0, studio.clientHeight - padY);
  }
  if (availW <= 0 || availH <= 0) return;
  const xl = DEVICES.find((item) => item.id === 'xl');
  const xlFrame = (xl && xl.preview) || { width: 1024, height: 600 };
  const xlRatio = xlFrame.width / xlFrame.height;
  let boxH = availW / xlRatio;
  if (boxH > availH) boxH = availH;
  const frame = device.preview || { width: device.width || 1280, height: device.height || 800 };
  const ratio = frame.width / frame.height;
  let height = boxH;
  let width = height * ratio;
  if (width > availW) {
    width = availW;
    height = width / ratio;
  }
  stage.style.width = `${width}px`;
  stage.style.height = `${height}px`;
  const bevel = stageWrap.querySelector('.stage-bevel');
  if (bevel) {
    bevel.style.width = `${width}px`;
    bevel.style.height = `${height}px`;
  }
  panel.style.height = window.innerWidth <= 980 ? '100%' : `${height}px`;
  if (stripPanel) stripPanel.style.height = panel.style.height;
  placeInfo();
  syncPanelFade();
}

function placeInfo() {
  const info = document.querySelector('.stage-info');
  const onStripCanvas = !stripStudio.hidden;
  const editing = !studio.hidden || onStripCanvas;
  if (!info || !editing) {
    if (info) info.hidden = true;
    return;
  }
  const dials = onStripCanvas || editSurface === 'strip';
  const pop = info.querySelector('.hint-pop') || info._hintPop;
  if (dials) {
    info.setAttribute('aria-label', 'How to select dials');
    pop.textContent = 'Click a dial. Shift selects the dials between two dials. Command or Control adds or removes one. Click empty space to clear the selection.';
  } else {
    info.setAttribute('aria-label', 'How to select keys');
    pop.textContent = 'Click a key. Shift selects the block between two keys. Command or Control adds or removes one. Click empty space to clear the selection.';
  }
  const host = onStripCanvas ? stripStudio.querySelector('.stage-wrap') : stageWrap;
  const canvas = onStripCanvas ? stripStage : stage;
  if (info.parentElement !== host) host.appendChild(info);
  const hostRect = host.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();
  if (canvasRect.width < 2) {
    info.hidden = true;
    return;
  }
  info.hidden = false;
  info.style.right = 'auto';
  const logo = !onStripCanvas && currentDevice().preview && currentDevice().preview.logo;
  const scaleX = canvasRect.width / canvas.width;
  const scaleY = canvasRect.height / canvas.height;
  const originX = canvasRect.left - hostRect.left;
  const originY = canvasRect.top - hostRect.top;
  if (logo) {
    const size = 28;
    info.style.width = `${size}px`;
    info.style.height = `${size}px`;
    const gap = Math.max(8, logo.h * scaleX * 0.22);
    info.style.left = `${originX + (logo.x + logo.w) * scaleX + gap}px`;
    info.style.top = `${originY + (logo.y + logo.h / 2) * scaleY - size / 2}px`;
    return;
  }
  const size = 28;
  info.style.width = `${size}px`;
  info.style.height = `${size}px`;
  info.style.top = `${originY + 12}px`;
  info.style.left = `${originX + canvasRect.width - size - 12}px`;
}

function setScrollFade(scroller, fade) {
  if (!scroller || !fade) return;
  const extra = scroller.scrollHeight - scroller.clientHeight;
  if (extra <= 2) {
    fade.style.opacity = '0';
    return;
  }
  const remaining = Math.max(0, extra - scroller.scrollTop);
  fade.style.opacity = String(Math.max(0, Math.min(1, remaining / 80)));
}

function syncPanelFade() {
  setScrollFade(panelScroll, panelFade);
}

function roundRect(context, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  context.moveTo(x + radius, y);
  context.arcTo(x + w, y, x + w, y + h, radius);
  context.arcTo(x + w, y + h, x, y + h, radius);
  context.arcTo(x, y + h, x, y, radius);
  context.arcTo(x, y, x + w, y, radius);
  context.closePath();
}

function renderDevices() {
  devicesEl.innerHTML = '';
  DEVICES.forEach((device) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'device' + (deviceOpen && device.id === deviceId ? ' active' : '');
    const art = document.createElement('span');
    art.className = 'device-art';
    const img = document.createElement('img');
    img.src = ASSET + device.art;
    img.alt = '';
    art.appendChild(img);
    const name = document.createElement('span');
    name.className = 'device-name';
    name.textContent = device.label;
    button.append(name, art);
    button.addEventListener('click', () => {
      openDevice(device);
      closeDeviceMenu();
    });
    devicesEl.appendChild(button);
  });
  deviceToggle.setAttribute('aria-label', deviceOpen ? `Device, ${currentDevice().label}` : 'Device');
}

function renderWelcome() {
  welcomeGrid.innerHTML = '';
  DEVICES.forEach((device) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'welcome-card';
    button.setAttribute('aria-label', device.label);
    const art = document.createElement('span');
    art.className = 'welcome-art';
    const img = document.createElement('img');
    img.src = ASSET + device.art;
    img.alt = '';
    img.addEventListener('load', fitWelcomeDevices);
    art.appendChild(img);
    button.appendChild(art);
    button.addEventListener('click', () => openDevice(device));
    welcomeGrid.appendChild(button);
  });
}

function showWelcome() {
  deviceOpen = false;
  document.body.classList.remove('editor', 'docked');
  welcome.hidden = false;
  previewView.hidden = true;
  studio.hidden = true;
  picker.hidden = true;
  stripStudio.hidden = true;
  empty.hidden = true;
  stripSoon.hidden = true;
  exportBtn.disabled = true;
  exportMenu.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
  renderDevices();
  placeInfo();
  requestAnimationFrame(fitWelcomeDevices);
}

function fitWelcomeDevices() {
  if (!welcome || welcome.hidden) return;
  const imgs = [...welcomeGrid.querySelectorAll('.welcome-art img')];
  if (imgs.length < 2) return;
  const mk2 = imgs[0];
  const xl = imgs[1];
  mk2.style.height = '';
  mk2.style.width = '';
  const xlHeight = xl.getBoundingClientRect().height;
  const mk2Height = mk2.getBoundingClientRect().height;
  if (xlHeight > 2 && mk2Height > xlHeight + 0.5) {
    mk2.style.height = `${xlHeight}px`;
  }
}

function closeDeviceMenu() {
  clearTimeout(deviceMenuTimer);
  devicesEl.hidden = true;
  deviceToggle.setAttribute('aria-expanded', 'false');
}

function armDeviceMenu() {
  clearTimeout(deviceMenuTimer);
  deviceMenuTimer = setTimeout(closeDeviceMenu, 10000);
}

function toggleDeviceMenu() {
  exportMenu.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
  const open = devicesEl.hidden;
  devicesEl.hidden = !open;
  deviceToggle.setAttribute('aria-expanded', String(open));
  if (open) armDeviceMenu();
  else clearTimeout(deviceMenuTimer);
}

document.querySelector('.top').addEventListener('animationend', (event) => {
  if (event.animationName !== 'header-rise') return;
  document.body.classList.add('docked');
  fitStudio();
  fitPreview();
});

function measureHeader() {
  const header = document.querySelector('.top');
  const height = header.offsetHeight;
  if (height > 20 && height < 120) document.documentElement.style.setProperty('--header-h', `${height}px`);
}

function openDevice(device) {
  const viewing = previewView && !previewView.hidden;
  deviceOpen = true;
  measureHeader();
  document.body.classList.add('editor');
  welcome.hidden = true;
  deviceId = device.id;
  anchor = 0;
  picked.clear();
  picked.add(0);
  renderDevices();
  if (viewing) {
    showBackgroundView();
    return;
  }
  if (device.preview) showDevice();
  else if (device.strip) showPicker(device);
  else showStudio();
}

function placeZone(button, zone, scale) {
  button.style.left = `${zone.left}%`;
  button.style.top = `${zone.top}%`;
  button.style.width = `${zone.width}%`;
  button.style.height = `${zone.height}%`;
  button.style.borderRadius = `${(zone.radius || 0) * scale}px`;
}

function syncZones() {
  const device = currentDevice();
  if (!device.strip || picker.hidden || !pickerArt.clientWidth || !device.imgW) return;
  const scale = pickerArt.clientWidth / device.imgW;
  placeZone(zoneKeys, device.zones.keys, scale);
  placeZone(zoneStrip, device.zones.strip, scale);
}

function showPicker(device) {
  welcome.hidden = true;
  previewView.hidden = true;
  studio.hidden = true;
  stripStudio.hidden = true;
  empty.hidden = true;
  stripSoon.hidden = true;
  picker.hidden = false;
  exportBtn.disabled = true;
  exportMenu.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
  pickerArt.src = ASSET + device.art;
  pickerArt.alt = device.label;
  requestAnimationFrame(syncZones);
  placeInfo();
}

function showStudio() {
  welcome.hidden = true;
  previewView.hidden = true;
  picker.hidden = true;
  stripSoon.hidden = true;
  stripStudio.hidden = true;
  empty.hidden = true;
  studio.hidden = false;
  editSurface = 'keys';
  studio.classList.remove('device-face');
  stage.classList.remove('device-face');
  stageWrap.classList.remove('device-face');
  focusPanels();
  exportBtn.disabled = !currentDevice().ready;
  exportMenu.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
  requestAnimationFrame(() => {
    renderPanel();
    fitStudio();
    paint(true);
  });
}

function showDevice() {
  welcome.hidden = true;
  previewView.hidden = true;
  picker.hidden = true;
  stripSoon.hidden = true;
  empty.hidden = true;
  stripStudio.hidden = true;
  studio.hidden = false;
  editSurface = 'keys';
  studio.classList.add('device-face');
  stage.classList.add('device-face');
  stageWrap.classList.add('device-face');
  focusPanels();
  exportBtn.disabled = false;
  exportMenu.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
  placeInfo();
  requestAnimationFrame(() => {
    renderPanel();
    fitStudio();
    paint(true);
    requestAnimationFrame(fitStudio);
  });
}

function focusPanels() {
  const preview = Boolean(currentDevice().preview);
  const strip = editSurface === 'strip' && preview;
  if (preview) {
    let slot = studio.querySelector('.panel-slot');
    if (!slot) {
      slot = document.createElement('div');
      slot.className = 'panel-slot';
      studio.appendChild(slot);
    }
    if (viewBackgroundBtn.parentElement !== slot) slot.insertBefore(viewBackgroundBtn, slot.firstChild);
    if (panel.parentElement !== slot) slot.appendChild(panel);
    if (stripPanel.parentElement !== slot) slot.appendChild(stripPanel);
  } else if (panel.parentElement !== studio) {
    studio.appendChild(panel);
  }
  panel.hidden = strip;
  stripPanel.hidden = !strip;
}

function showStrip() {
  const device = currentDevice();
  welcome.hidden = true;
  previewView.hidden = true;
  if (!device.stripEditor) {
    picker.hidden = true;
    studio.hidden = true;
    stripStudio.hidden = true;
    empty.hidden = true;
    stripSoon.hidden = false;
    exportBtn.disabled = true;
    exportMenu.hidden = true;
    placeInfo();
    return;
  }
  picker.hidden = true;
  studio.hidden = true;
  empty.hidden = true;
  stripSoon.hidden = true;
  stripStudio.hidden = false;
  exportBtn.disabled = false;
  placeInfo();
  requestAnimationFrame(() => {
    renderStripPanel();
    fitStrip();
    refreshStrip();
  });
}

function showBackgroundView() {
  welcome.hidden = true;
  picker.hidden = true;
  stripSoon.hidden = true;
  empty.hidden = true;
  stripStudio.hidden = true;
  studio.hidden = true;
  previewView.hidden = false;
  exportMenu.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
  placeInfo();
  const device = currentDevice();
  const spec = device.stripEditor;
  previewStrip.hidden = !spec;
  previewKeysCanvas._workBg = true;
  paintGrid(previewKeysCanvas, false);
  previewKeysCanvas._workBg = false;
  if (spec) {
    paintStrip(false, 'background');
    if (previewStrip.width !== stripStage.width || previewStrip.height !== stripStage.height) {
      previewStrip.width = stripStage.width;
      previewStrip.height = stripStage.height;
    }
    const context = previewStrip.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, previewStrip.width, previewStrip.height);
    context.drawImage(stripStage, 0, 0);
  }
  requestAnimationFrame(fitPreview);
}

function fitPreview() {
  if (!previewView || previewView.hidden) return;
  const device = currentDevice();
  const spec = device.stripEditor;
  const availW = Math.max(0, previewView.clientWidth - 112);
  const availH = Math.max(0, previewView.clientHeight - 80);
  if (availW < 2 || availH < 2) return;
  const xl = DEVICES.find((item) => item.id === 'xl');
  const xlFrame = (xl && xl.preview) || { width: 1024, height: 600 };
  const xlRatio = xlFrame.width / xlFrame.height;
  const fitW = Math.max(0, previewView.clientWidth - 56 - 22 - 320);
  let boxH = fitW / xlRatio;
  if (boxH > availH) boxH = availH;
  if (boxH < 2) boxH = availH;
  const gap = spec && !previewStrip.hidden ? 14 : 0;
  const keysRatio = device.width / device.height;
  const stripRatio = spec && !previewStrip.hidden ? spec.height / spec.width : 0;
  let keysH = boxH;
  let keysW = keysH * keysRatio;
  if (keysW > availW) {
    keysW = availW;
    keysH = keysW / keysRatio;
  }
  let stripH = keysW * stripRatio;
  const total = keysH + gap + stripH;
  if (total > availH) {
    const scale = (availH - gap) / (keysH + stripH);
    keysW *= scale;
    keysH *= scale;
    stripH *= scale;
  }
  previewKeysCanvas.style.width = `${keysW}px`;
  previewKeysCanvas.style.height = `${keysH}px`;
  if (spec && !previewStrip.hidden) {
    previewStrip.style.width = `${keysW}px`;
    previewStrip.style.height = `${stripH}px`;
  }
}

function selectionIndexes() {
  return [...picked];
}

function clearSelection() {
  const board = stripBoard();
  const hadDials = Boolean(board && board.picked.size);
  if (!picked.size && !hadDials) return;
  picked.clear();
  if (board) board.picked.clear();
  renderPanel();
  if (board) renderStripPanel();
  paint(true);
  setPanelCollapsed(true);
}

function setPanelCollapsed(next) {
  if (panelCollapsed === next) return;
  panelCollapsed = next;
  const slot = studio.querySelector('.panel-slot');
  panelDock.setAttribute('aria-expanded', String(!next));
  panelDock.setAttribute('aria-label', next ? 'Show options' : 'Hide options');
  if (!slot) {
    studio.classList.toggle('panel-collapsed', next);
    return;
  }
  slot.style.overflow = '';
  slot.classList.add('view-motion');
  slot.classList.toggle('view-tucked', next);
  studio.classList.toggle('panel-collapsed', next);
}

function solidBlock() {
  const indexes = selectionIndexes();
  if (indexes.length < 2) return null;
  const rows = indexes.map((index) => wells()[index].row);
  const cols = indexes.map((index) => wells()[index].col);
  const row0 = Math.min(...rows);
  const row1 = Math.max(...rows);
  const col0 = Math.min(...cols);
  const col1 = Math.max(...cols);
  const area = (row1 - row0 + 1) * (col1 - col0 + 1);
  if (area !== indexes.length) return null;
  return { row0, row1, col0, col1 };
}

const FRAME_BY_EDGES = {
  T: 'frame_t.png',
  B: 'frame_b.png',
  L: 'frame_l.png',
  R: 'frame_r.png',
  TL: 'frame_tl.png',
  TR: 'frame_tr.png',
  BL: 'frame_bl.png',
  BR: 'frame_br.png',
  TLR: 'frame_tbt.png',
  BLR: 'frame_tbb.png',
  LR: 'frame_tbc.png',
  TBL: 'frame_lrl.png',
  TBR: 'frame_lrr.png',
  TB: 'frame_lrc.png'
};

function frameForWell(well, block) {
  const top = well.row === block.row0;
  const bottom = well.row === block.row1;
  const left = well.col === block.col0;
  const right = well.col === block.col1;
  if (!top && !bottom && !left && !right) return '';
  const key = `${top ? 'T' : ''}${bottom ? 'B' : ''}${left ? 'L' : ''}${right ? 'R' : ''}`;
  return FRAME_BY_EDGES[key] || '';
}

function encloseSelection() {
  const block = solidBlock();
  if (!block) return;
  selectionIndexes().forEach((index) => {
    slots()[index].frame = frameForWell(wells()[index], block);
  });
  renderPanel();
  paint(true);
}

function sharedValue(layerId) {
  const values = selectionIndexes().map((index) => slots()[index][layerId]);
  return values.every((value) => value === values[0]) ? values[0] : null;
}

function renderPanel() {
  const device = currentDevice();
  if (!device.ready) {
    panel.classList.remove('panel-blank');
    keyLabel.textContent = device.label;
    panelHint.textContent = 'This device is in the menu. Its grid and pieces are not in yet.';
    clearKey.disabled = true;
    layersEl.innerHTML = '';
    syncPanelFade();
    return;
  }
  if (!picked.size) {
    panel.classList.add('panel-blank');
    keyLabel.textContent = '';
    clearKey.disabled = true;
    layersEl.innerHTML = '';
    syncPanelFade();
    return;
  }
  panel.classList.remove('panel-blank');
  if (panelCollapsed) setPanelCollapsed(false);
  const well = wells()[anchor];
  panelHint.textContent = READY_HINT;
  keyLabel.textContent = picked.size > 1
    ? `${picked.size} keys`
    : `Row ${well.row + 1} · Column ${well.col + 1}`;
  clearKey.disabled = !selectionIndexes().some((index) => {
    const slot = slots()[index];
    return slot.key || slot.overlay || slot.module || slot.frame;
  });
  layersEl.innerHTML = '';
  LAYERS.forEach((layer) => {
    const block = document.createElement('section');
    block.className = 'layer';
    const head = document.createElement('div');
    head.className = 'layer-head';
    const title = document.createElement('h2');
    title.textContent = layer.label;
    head.appendChild(title);
    if (layer.applyAll) {
      const apply = document.createElement('button');
      apply.type = 'button';
      apply.className = 'apply';
      apply.textContent = 'Apply to all';
      apply.addEventListener('click', () => {
        const value = slots()[anchor][layer.id];
        slots().forEach((slot) => { slot[layer.id] = value; });
        renderPanel();
        paint(true);
      });
      head.appendChild(apply);
    }
    if (layer.id === 'frame') {
      const enclose = document.createElement('button');
      enclose.type = 'button';
      enclose.className = 'apply';
      enclose.textContent = 'Enclosure';
      enclose.disabled = !solidBlock();
      enclose.addEventListener('click', encloseSelection);
      head.appendChild(enclose);
    }
    block.appendChild(head);
    const row = document.createElement('div');
    row.className = 'choices' + (layer.options.length <= 2 ? ' fit' : '');
    const current = sharedValue(layer.id);
    row.appendChild(choiceButton(layer, '', null, current));
    layer.options.forEach((file) => {
      row.appendChild(choiceButton(layer, file, images.get(pieceKey(file)), current));
    });
    block.appendChild(row);
    layersEl.appendChild(block);
  });
  syncPanelFade();
}

function choiceButton(layer, file, img, current) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'choice' + (current === file ? ' on' : '');
  button.setAttribute('aria-label', file || 'None');
  if (img) {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.alt = '';
    button.appendChild(thumb);
  } else {
    const none = document.createElement('div');
    none.className = 'none';
    none.textContent = 'None';
    button.appendChild(none);
  }
  button.addEventListener('click', () => {
    selectionIndexes().forEach((index) => { slots()[index][layer.id] = file; });
    renderPanel();
    paint(true);
  });
  return button;
}

stage.addEventListener('click', (event) => {
  if (currentDevice().preview) {
    onDeviceClick(event);
    return;
  }
  if (!currentDevice().ready) return;
  const rect = stage.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (stage.width / rect.width);
  const y = (event.clientY - rect.top) * (stage.height / rect.height);
  const hit = wells().find((well) => x >= well.x0 && x <= well.x1 && y >= well.y0 && y <= well.y1);
  if (!hit) {
    clearSelection();
    return;
  }
  if (event.shiftKey && picked.size) {
    const start = wells()[anchor];
    const row0 = Math.min(start.row, hit.row);
    const row1 = Math.max(start.row, hit.row);
    const col0 = Math.min(start.col, hit.col);
    const col1 = Math.max(start.col, hit.col);
    picked.clear();
    wells().forEach((well) => {
      if (well.row >= row0 && well.row <= row1 && well.col >= col0 && well.col <= col1) {
        picked.add(well.index);
      }
    });
  } else if (event.metaKey || event.ctrlKey) {
    if (picked.has(hit.index) && picked.size > 1) picked.delete(hit.index);
    else picked.add(hit.index);
    anchor = hit.index;
  } else {
    picked.clear();
    picked.add(hit.index);
    anchor = hit.index;
  }
  renderPanel();
  paint(true);
});

function drawDeviceOverlay(canvas, at, scale) {
  const factor = scale || 1;
  ctx.imageSmoothingEnabled = factor !== 1;
  ctx.drawImage(canvas, at[0], at[1], canvas.width * factor, canvas.height * factor);
  ctx.imageSmoothingEnabled = false;
}

function hitStripContent(preview, x, y) {
  const strip = preview.stripContent;
  if (!strip) return false;
  return x >= strip.x && x <= strip.x + strip.w && y >= strip.y && y <= strip.y + strip.h;
}

function onDeviceClick(event) {
  const preview = currentDevice().preview;
  const rect = stage.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (stage.width / rect.width);
  const y = (event.clientY - rect.top) * (stage.height / rect.height);
  const hit = preview.keys.find((well) => x >= well.x0 && x <= well.x1 && y >= well.y0 && y <= well.y1);
  if (hit) {
    editSurface = 'keys';
    focusPanels();
    if (event.shiftKey && picked.size) {
      const start = preview.keys[anchor];
      const row0 = Math.min(start.row, hit.row);
      const row1 = Math.max(start.row, hit.row);
      const col0 = Math.min(start.col, hit.col);
      const col1 = Math.max(start.col, hit.col);
      picked.clear();
      preview.keys.forEach((well) => {
        if (well.row >= row0 && well.row <= row1 && well.col >= col0 && well.col <= col1) picked.add(well.index);
      });
    } else if (event.metaKey || event.ctrlKey) {
      if (picked.has(hit.index) && picked.size > 1) picked.delete(hit.index);
      else picked.add(hit.index);
      anchor = hit.index;
    } else {
      picked.clear();
      picked.add(hit.index);
      anchor = hit.index;
    }
    renderPanel();
    paint(true);
    return;
  }
  const strip = preview.stripContent;
  const board = stripBoard();
  const spec = currentDevice().stripEditor;
  if (!hitStripContent(preview, x, y) || !board || !spec) {
    clearSelection();
    return;
  }
  editSurface = 'strip';
  focusPanels();
  const index = Math.min(spec.dials - 1, Math.max(0, Math.floor((x - strip.x) / (strip.w / spec.dials))));
  if (event.shiftKey && board.picked.size) {
    const from = Math.min(board.anchor, index);
    const to = Math.max(board.anchor, index);
    board.picked.clear();
    for (let dial = from; dial <= to; dial += 1) board.picked.add(dial);
  } else if (event.metaKey || event.ctrlKey) {
    if (board.picked.has(index) && board.picked.size > 1) board.picked.delete(index);
    else board.picked.add(index);
    board.anchor = index;
  } else {
    board.picked.clear();
    board.picked.add(index);
    board.anchor = index;
  }
  renderStripPanel();
  paint(true);
}

clearKey.addEventListener('click', () => {
  selectionIndexes().forEach((index) => {
    slots()[index] = emptySlot();
  });
  renderPanel();
  paint(true);
});

function emptyStripBoard(dials) {
  return {
    bg: 'strip/Background.png',
    slots: Array.from({ length: dials }, () => ({ frame: '', shadow: '', knob: '', module: '' })),
    anchor: 0,
    picked: new Set([0])
  };
}

const stripBoards = {
  plus: emptyStripBoard(4),
  plus_xl: emptyStripBoard(6)
};

const STRIP_DIAL_LAYERS = [
  {
    id: 'frame',
    label: 'Frame',
    options: [
      { id: 'l', file: 'strip/strip_frame_l.png' },
      { id: 'r', file: 'strip/strip_frame_r.png' },
      { id: 'lr', file: 'strip/strip_frame_lr.png' }
    ]
  },
  {
    id: 'shadow',
    label: 'Shadow',
    options: [
      { id: 'l', file: 'strip/strip_shadow_l.png' },
      { id: 'r', file: 'strip/strip_shadow_r.png' },
      { id: 'lr', file: 'strip/strip_shadow_lr.png' }
    ]
  },
  {
    id: 'knob',
    label: 'Shadow Knobs',
    options: [
      { id: 'knob', file: 'strip/strip_shadow_knob.png' },
      { id: 'mod', file: 'strip/strip_shadow_knob_mod.png' },
      { id: 'panels', file: 'strip/strip_shadow_knob_panels.png' },
      { id: 'title', file: 'strip/strip_shadow_knob_title.png' }
    ]
  },
  {
    id: 'module',
    label: 'Module',
    options: [
      { id: 'l', file: 'strip/strip_module_l.png' },
      { id: 'l2', file: 'strip/strip_module_l2.png' },
      { id: 'c', file: 'strip/strip_module_c.png' },
      { id: 'r', file: 'strip/strip_module_r.png' },
      { id: 'single', file: 'strip/strip_module_single.png' },
      { id: 'single1', file: 'strip/strip_module_single1.png' },
      { id: 'single2', file: 'strip/strip_module_single2.png' },
      { id: 'dual', file: 'strip/strip_module_dual.png' }
    ]
  }
];

function stripBoard() {
  return stripBoards[currentDevice().id];
}

function stripWants(choice, side) {
  return choice === 'lr' || choice === side;
}

function stripSelection() {
  const board = stripBoard();
  return [...board.picked];
}

function fitStrip() {
  if (stripStudio.hidden) return;
  const spec = currentDevice().stripEditor;
  const wrap = stripStudio.querySelector('.stage-wrap');
  if (!spec || !wrap || wrap.clientWidth <= 0) return;
  const width = wrap.clientWidth;
  const height = width * (spec.height / spec.width);
  stripStage.style.width = `${width}px`;
  stripStage.style.height = `${height}px`;
  syncStripFade();
  placeInfo();
}

function stripPreviewMode() {
  const hideDials = stripHide.background;
  const hideBackground = stripHide.dial;
  if (hideDials && hideBackground) return 'empty';
  if (hideDials) return 'background';
  if (hideBackground) return 'dials';
  return 'full';
}

function refreshStrip() {
  if (currentDevice().preview && !studio.hidden) paint(true);
  else paintStrip(true);
}

function syncStripFade() {
  setScrollFade(stripScroll, stripFade);
}

function paintStrip(showSelection, mode) {
  const board = stripBoard();
  const spec = currentDevice().stripEditor;
  if (!board || !spec) return;
  if (stripStage.width !== spec.width || stripStage.height !== spec.height) {
    stripStage.width = spec.width;
    stripStage.height = spec.height;
  }
  const paintMode = mode || stripPreviewMode();
  stripCtx.imageSmoothingEnabled = false;
  stripCtx.clearRect(0, 0, spec.width, spec.height);
  const bg = board.bg && images.get(board.bg);
  const background = paintMode === 'full' || paintMode === 'background';
  const dials = paintMode === 'full' || paintMode === 'dials';
  if (background && bg) stripCtx.drawImage(bg, 0, 0);
  if (dials) {
    drawStripPiece(board, 'knob');
    drawStripPiece(board, 'module');
  }
  if (background) {
    drawStripShadows(board);
    drawStripFrames(board);
  }
  if (!showSelection) return;
  stripCtx.save();
  stripCtx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  stripCtx.lineWidth = 1;
  for (let index = 1; index < spec.dials; index += 1) {
    const x = index * 200 + 0.5;
    stripCtx.beginPath();
    stripCtx.moveTo(x, 0);
    stripCtx.lineTo(x, spec.height);
    stripCtx.stroke();
  }
  stripCtx.restore();
  board.picked.forEach((index) => strokeDial(index, index === board.anchor, spec));
}

const STRIP_DIAL_W = 200;
const FRAME_JOIN = 6;
// Left frame: wood at x 0–8, inward shadow at x 9–12. Right frame mirrors it.
const FRAME_INNER_X = 9;
const FRAME_INNER_W = 4;

function stripLayerFile(layerId, value) {
  if (!value) return '';
  const layer = STRIP_DIAL_LAYERS.find((item) => item.id === layerId);
  const option = layer && layer.options.find((item) => item.id === value);
  return option ? option.file : '';
}

function drawStripPiece(board, layerId) {
  board.slots.forEach((slot, index) => {
    const img = images.get(stripLayerFile(layerId, slot[layerId]));
    if (img) stripCtx.drawImage(img, index * STRIP_DIAL_W, 0);
  });
}

function drawStripShadows(board) {
  board.slots.forEach((slot, index) => {
    const x = index * STRIP_DIAL_W;
    if (stripWants(slot.shadow, 'l')) {
      const img = images.get('strip/strip_shadow_l.png');
      if (img) stripCtx.drawImage(img, x, 0);
    }
    if (stripWants(slot.shadow, 'r')) {
      const img = images.get('strip/strip_shadow_r.png');
      if (img) stripCtx.drawImage(img, x, 0);
    }
  });
}

function drawStripFrames(board) {
  const dials = board.slots.length;
  board.slots.forEach((slot, index) => {
    const choice = slot.frame;
    const x = index * STRIP_DIAL_W;
    const joinLeft = index > 0 && stripWants(board.slots[index - 1].frame, 'r');
    const joinRight = index < dials - 1 && stripWants(board.slots[index + 1].frame, 'l');
    if (stripWants(choice, 'l') && !joinLeft) {
      const img = images.get('strip/strip_frame_l.png');
      if (img) stripCtx.drawImage(img, x, 0);
      if (index > 0) drawNeighborInnerShadow('l', x);
    }
    if (stripWants(choice, 'r')) {
      const img = images.get('strip/strip_frame_r.png');
      if (img) stripCtx.drawImage(img, x + (joinRight ? FRAME_JOIN : 0), 0);
      if (joinRight) drawJoinedInnerShadow(x);
      else if (index < dials - 1) drawNeighborInnerShadow('r', x);
    }
  });
}

function drawJoinedInnerShadow(leftX) {
  const inner = images.get('strip/strip_frame_l.png');
  if (!inner) return;
  const destX = leftX + FRAME_JOIN + STRIP_DIAL_W;
  stripCtx.drawImage(inner, FRAME_INNER_X, 0, FRAME_INNER_W, inner.height, destX, 0, FRAME_INNER_W, inner.height);
}

// Frame wood stays in its own dial. The exported spill shadow is drawn on the neighbor.
function drawNeighborInnerShadow(side, x) {
  if (side === 'r') {
    const img = images.get('strip/strip_frame_shadow_spill_l.png');
    if (img) stripCtx.drawImage(img, x + STRIP_DIAL_W, 0);
    return;
  }
  const img = images.get('strip/strip_frame_shadow_spill_r.png');
  if (img) stripCtx.drawImage(img, x - STRIP_DIAL_W, 0);
}

function strokeDial(index, primary, spec) {
  const x = index * 200;
  stripCtx.save();
  stripCtx.beginPath();
  stripCtx.rect(x + 1, 1, 198, spec.height - 2);
  const ring = stripCtx.createLinearGradient(x + 200, 0, x, spec.height);
  ring.addColorStop(0, primary ? '#7fb85a' : 'rgba(127, 184, 90, 0.72)');
  ring.addColorStop(1, primary ? '#e07a4f' : 'rgba(224, 122, 79, 0.72)');
  stripCtx.strokeStyle = ring;
  stripCtx.lineWidth = primary ? 3 : 2;
  stripCtx.stroke();
  stripCtx.restore();
}

function renderStripPanel() {
  const board = stripBoard();
  const selected = stripSelection();
  const fields = STRIP_TAB_LAYERS[stripTab];
  stripTabBg.setAttribute('aria-selected', String(stripTab === 'background'));
  stripTabDial.setAttribute('aria-selected', String(stripTab === 'dial'));
  if (!selected.length) {
    stripPanel.classList.add('panel-blank');
    stripLabel.textContent = '';
    stripClear.disabled = true;
    stripLayersEl.innerHTML = '';
    syncStripFade();
    return;
  }
  stripPanel.classList.remove('panel-blank');
  if (panelCollapsed) setPanelCollapsed(false);
  stripLabel.textContent = selected.length > 1 ? `${selected.length} dials` : `Dial ${board.anchor + 1}`;
  stripHint.textContent = STRIP_HINTS[stripTab];
  const hidden = stripHide[stripTab];
  stripView.setAttribute('aria-pressed', String(hidden));
  stripView.setAttribute('aria-label', stripTab === 'background'
    ? (hidden ? 'Show dial layers' : 'Hide dial layers')
    : (hidden ? 'Show background' : 'Hide background'));
  stripClear.disabled = !selected.some((index) => fields.some((field) => board.slots[index][field]));
  stripLayersEl.classList.toggle('dial-gap', stripTab === 'dial');
  stripLayersEl.innerHTML = '';
  if (stripTab === 'background') stripLayersEl.appendChild(stripBackgroundBlock(board));
  STRIP_DIAL_LAYERS
    .filter((layer) => fields.includes(layer.id))
    .forEach((layer) => stripLayersEl.appendChild(stripDialBlock(board, layer, selected)));
  syncStripFade();
}

function stripBackgroundBlock(board) {
  const block = document.createElement('section');
  block.className = 'layer';
  const head = document.createElement('div');
  head.className = 'layer-head';
  const title = document.createElement('h2');
  title.textContent = 'Strip background';
  head.appendChild(title);
  block.appendChild(head);
  const row = document.createElement('div');
  row.className = 'choices fit';
  row.appendChild(stripChoice('strip/Background.png', images.get('strip/Background.png'), board.bg === 'strip/Background.png', () => {
    board.bg = 'strip/Background.png';
    renderStripPanel();
    refreshStrip();
  }));
  block.appendChild(row);
  return block;
}

function stripDialBlock(board, layer, selected) {
  const values = selected.map((index) => board.slots[index][layer.id]);
  const current = values.every((value) => value === values[0]) ? values[0] : null;
  const block = document.createElement('section');
  block.className = 'layer';
  const head = document.createElement('div');
  head.className = 'layer-head';
  const title = document.createElement('h2');
  title.textContent = layer.label;
  head.appendChild(title);
  const apply = document.createElement('button');
  apply.type = 'button';
  apply.className = 'apply';
  apply.textContent = 'Apply to all';
  apply.addEventListener('click', () => {
    const value = board.slots[board.anchor][layer.id];
    board.slots.forEach((slot) => { slot[layer.id] = value; });
    renderStripPanel();
    refreshStrip();
  });
  head.appendChild(apply);
  block.appendChild(head);
  const row = document.createElement('div');
  row.className = 'choices' + (layer.options.length <= 2 ? ' fit' : '');
  row.appendChild(stripChoice('', null, current === '', () => setStripLayer(layer.id, '')));
  const edge = layer.id === 'frame' || layer.id === 'shadow';
  layer.options.forEach((option) => {
    row.appendChild(stripChoice(option.file, images.get(option.file), current === option.id, () => setStripLayer(layer.id, option.id), edge ? option.id : ''));
  });
  block.appendChild(row);
  return block;
}

function stripChoice(file, img, on, action, anchor) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'choice' + (on ? ' on' : '');
  button.setAttribute('aria-label', file || 'None');
  if (img) {
    button.appendChild(anchor === 'lr' ? stripEdgePair(img.src) : stripThumb(img.src, anchor));
  } else {
    const none = document.createElement('div');
    none.className = 'none';
    none.textContent = 'None';
    button.appendChild(none);
  }
  button.addEventListener('click', action);
  return button;
}

function stripThumb(src, anchor) {
  const thumb = document.createElement('img');
  thumb.src = src;
  thumb.alt = '';
  if (anchor === 'l' || anchor === 'r') thumb.className = `thumb-${anchor}`;
  return thumb;
}

function stripEdgePair(src) {
  const pair = document.createElement('span');
  pair.className = 'thumb-pair';
  pair.appendChild(stripThumb(src, 'l'));
  pair.appendChild(stripThumb(src, 'r'));
  return pair;
}

function setStripLayer(layerId, value) {
  const board = stripBoard();
  stripSelection().forEach((index) => { board.slots[index][layerId] = value; });
  renderStripPanel();
  refreshStrip();
}

stripStage.addEventListener('click', (event) => {
  const board = stripBoard();
  const spec = currentDevice().stripEditor;
  if (!board || !spec) return;
  const rect = stripStage.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (spec.width / rect.width);
  const index = Math.min(spec.dials - 1, Math.max(0, Math.floor(x / 200)));
  if (event.shiftKey) {
    const from = Math.min(board.anchor, index);
    const to = Math.max(board.anchor, index);
    board.picked.clear();
    for (let dial = from; dial <= to; dial += 1) board.picked.add(dial);
  } else if (event.metaKey || event.ctrlKey) {
    if (board.picked.has(index) && board.picked.size > 1) board.picked.delete(index);
    else board.picked.add(index);
    board.anchor = index;
  } else {
    board.picked.clear();
    board.picked.add(index);
    board.anchor = index;
  }
  renderStripPanel();
  refreshStrip();
});

stripClear.addEventListener('click', () => {
  const board = stripBoard();
  const fields = STRIP_TAB_LAYERS[stripTab];
  stripSelection().forEach((index) => {
    fields.forEach((field) => { board.slots[index][field] = ''; });
  });
  renderStripPanel();
  refreshStrip();
});

stripTabBg.addEventListener('click', () => setStripTab('background'));
stripTabDial.addEventListener('click', () => setStripTab('dial'));

stripView.addEventListener('click', () => {
  stripHide[stripTab] = !stripHide[stripTab];
  renderStripPanel();
  refreshStrip();
});

function setStripTab(tab) {
  if (stripTab === tab) return;
  stripTab = tab;
  renderStripPanel();
  refreshStrip();
}

stripScroll.addEventListener('scroll', syncStripFade);

function canvasBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = name;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

async function savePng(canvas, suggestedName) {
  const blob = await canvasBlob(canvas);
  try {
    if (!window.showSaveFilePicker) throw new Error('unsupported');
    const handle = await window.showSaveFilePicker({
      suggestedName,
      types: [{ description: 'PNG image', accept: { 'image/png': ['.png'] } }]
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } catch (err) {
    if (err && err.name === 'AbortError') return;
    downloadBlob(blob, suggestedName);
  }
}

function dialCanvas(index) {
  const spec = currentDevice().stripEditor;
  const canvas = document.createElement('canvas');
  canvas.width = STRIP_DIAL_W;
  canvas.height = spec.height;
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  const slot = stripBoard().slots[index];
  ['knob', 'module'].forEach((layerId) => {
    const img = images.get(stripLayerFile(layerId, slot[layerId]));
    if (img) context.drawImage(img, 0, 0);
  });
  return canvas;
}

async function exportStrip(mode, name) {
  paintStrip(false, mode);
  try {
    await savePng(stripStage, name);
  } finally {
    refreshStrip();
  }
}

async function exportSelectedDials() {
  const label = currentDevice().label;
  const indexes = [...stripSelection()].sort((a, b) => a - b);
  for (const index of indexes) {
    await savePng(dialCanvas(index), `${label} strip dial ${index + 1}.png`);
  }
}

exportWrap.addEventListener('click', (event) => {
  event.stopPropagation();
  closeDeviceMenu();
});

deviceMenu.addEventListener('click', (event) => event.stopPropagation());
deviceMenu.addEventListener('pointermove', () => {
  if (!devicesEl.hidden) armDeviceMenu();
});
deviceToggle.addEventListener('click', toggleDeviceMenu);

document.addEventListener('click', () => {
  exportMenu.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
  closeDeviceMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDeviceMenu();
});

viewBackgroundBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  closeDeviceMenu();
  showBackgroundView();
});

previewBack.addEventListener('click', () => {
  if (currentDevice().preview) showDevice();
  else if (currentDevice().strip) showPicker(currentDevice());
  else showStudio();
});

exportBtn.addEventListener('click', () => {
  if (exportBtn.disabled) return;
  const stripExport = (!stripStudio.hidden) || (editSurface === 'strip' && currentDevice().preview);
  if (stripExport) {
    const open = exportMenu.hidden;
    exportMenu.hidden = !open;
    exportBtn.setAttribute('aria-expanded', String(open));
    return;
  }
  const grid = document.createElement('canvas');
  paintGrid(grid, false);
  savePng(grid, `${currentDevice().label}.png`);
});

exportMenu.addEventListener('click', (event) => {
  const kind = event.target.closest('[data-export]');
  if (!kind) return;
  exportMenu.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
  const label = currentDevice().label;
  if (kind.dataset.export === 'full') exportStrip('full', `${label} strip.png`);
  else if (kind.dataset.export === 'background') exportStrip('background', `${label} strip background.png`);
  else exportSelectedDials();
});

function showHint(button) {
  const pop = button.querySelector('.hint-pop') || button._hintPop;
  if (!pop) return;
  button._hintPop = pop;
  document.body.appendChild(pop);
  const rect = button.getBoundingClientRect();
  const width = 240;
  const left = Math.min(Math.max(12, rect.right - width), window.innerWidth - width - 12);
  pop.style.position = 'fixed';
  pop.style.left = `${left}px`;
  pop.style.top = `${rect.bottom + 8}px`;
  pop.style.right = 'auto';
  pop.style.zIndex = '50';
  pop.style.display = 'block';
}

function hideHint(button) {
  const pop = button._hintPop;
  if (!pop) return;
  pop.style.display = '';
  button.appendChild(pop);
}

document.querySelectorAll('.hint-info, .stage-info').forEach((button) => {
  button.addEventListener('mouseenter', () => showHint(button));
  button.addEventListener('mouseleave', () => hideHint(button));
  button.addEventListener('focus', () => showHint(button));
  button.addEventListener('blur', () => hideHint(button));
});

panelDock.addEventListener('click', (event) => {
  event.stopPropagation();
  setPanelCollapsed(!panelCollapsed);
});

studio.addEventListener('click', (event) => {
  if (studio.hidden) return;
  if (event.target.closest('canvas, .panel, .panel-slot, .panel-dock, .stage-info, button')) return;
  clearSelection();
});

zoneKeys.addEventListener('click', showStudio);
zoneStrip.addEventListener('click', showStrip);
pickerArt.addEventListener('load', syncZones);

measureHeader();
renderWelcome();
showWelcome();

const files = [...new Set(DEVICES.flatMap((device) => {
  const list = [device.art];
  if (!device.ready) return list;
  list.push(device.workBg, device.exportBg, device.grid);
  LAYERS.forEach((layer) => layer.options.forEach((file) => list.push(device.dir + file)));
  return list;
}).concat([
  'strip/Background.png',
  'strip/strip_frame_l.png', 'strip/strip_frame_r.png', 'strip/strip_frame_lr.png',
  'strip/strip_frame_shadow_spill_l.png', 'strip/strip_frame_shadow_spill_r.png',
  'strip/strip_shadow_l.png', 'strip/strip_shadow_r.png', 'strip/strip_shadow_lr.png',
  'strip/strip_shadow_knob.png', 'strip/strip_shadow_knob_mod.png', 'strip/strip_shadow_knob_panels.png', 'strip/strip_shadow_knob_title.png',
  'strip/strip_module_l.png', 'strip/strip_module_l2.png', 'strip/strip_module_c.png', 'strip/strip_module_r.png',
  'strip/strip_module_single.png', 'strip/strip_module_single1.png', 'strip/strip_module_single2.png', 'strip/strip_module_dual.png',
  'devices/plus-xl.png', 'devices/plus-xl-key-area.png', 'devices/plus-xl-strip-area.png',
  'devices/plus-key-area.png', 'devices/plus-strip-area.png',
  'devices/xl-key-area.png', 'devices/mk2-key-area.png'
]))];
Promise.all(files.map((file) => loadImage(file).then((img) => images.set(file, img))))
  .then(() => {
    if (!deviceOpen) return;
    if (!previewView.hidden) {
      showBackgroundView();
      return;
    }
    renderPanel();
    fitStudio();
    paint(true);
    if (!stripStudio.hidden) {
      renderStripPanel();
      fitStrip();
      refreshStrip();
    }
  })
  .catch((err) => {
    keyLabel.textContent = 'Could not load pieces';
    console.error(err);
  });

panelScroll.addEventListener('scroll', syncPanelFade);
window.addEventListener('resize', () => {
  fitStudio();
  fitWelcomeDevices();
  fitPreview();
});
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(() => {
    fitStudio();
    fitPreview();
  }).observe(document.getElementById('work'));
}
