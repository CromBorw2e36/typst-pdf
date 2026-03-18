# Typst PDF Generator & Editor

[![npm version](https://img.shields.io/npm/v/typst-pdf.svg)](https://www.npmjs.com/package/typst-pdf)
[![npm downloads](https://img.shields.io/npm/dm/typst-pdf.svg)](https://www.npmjs.com/package/typst-pdf)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**npm:** [npmjs.com/package/typst-pdf](https://www.npmjs.com/package/typst-pdf)

Thu vien JavaScript cross-platform de bien dich PDF tu Typst templates voi JSON data injection. Su dung Typst-native scripting, ho tro moi engine (Flutter, .NET, Java, Python...) chi can string replace.

## Tinh nang

- **Pure Typst Architecture**: Render PDF truc tiep tu Typst bang WebAssembly (WASM)
- **Cross-platform Data Injection**: Chi can `template.replace("{{DATA}}", escapedJson)` — bat ky engine nao cung lam duoc
- **Typst-native Scripting**: Su dung `#if`, `#for`, `#let`, phep tinh... truc tiep trong template
- **Trinh soan thao truc quan**: Tich hop san UI Editor voi Live SVG preview
- **Smart Image Resolution**: Local files doc tu disk, HTTPS images fetch tu extension host (khong bi CORS), tat ca preload vao Virtual File System
- **Fault-tolerant**: Image fetch that bai (HTTP 522, timeout...) chi bi skip, khong lam hong qua trinh bien dich
- **Detailed Logging**: Toan bo pipeline log chi tiet ra Output Channel (extension) va console (web)
- **Sieu nhe**: Zero dependencies, bundle chi ~605KB

## Cach hoat dong

Template dung Typst-native syntax voi placeholder `{{DATA}}`:

```typst
#let data = json(bytes("{{DATA}}"))

= Hoa don cho #data.name
Tong tien: #data.total

#for item in data.items [
  #item.name — #item.price \
]

#if data.total > 10000000 [
  *Khach hang VIP*
]
```

Moi engine chi can:
```js
// JavaScript
import { injectData } from 'typst-pdf';
const typst = injectData(template, { name: "A", total: 15000000 });
```
```dart
// Flutter
final typst = template.replaceAll('{{DATA}}', escape(jsonEncode(data)));
```
```csharp
// .NET
var typst = template.Replace("{{DATA}}", Escape(JsonSerializer.Serialize(data)));
```

## Cau truc du an

```text
typst-pdf/
├── src/
│   ├── core/
│   │   ├── resolver.js       # injectData() — JSON string replace
│   │   ├── compiler.js       # Typst WASM Compiler & Image Fetcher
│   │   └── generator.js      # MasaxTypstPDF class
│   ├── ui/
│   │   ├── editor.js         # CodeMirror editor wrapper
│   │   ├── preview.js        # SVG Live Preview renderer
│   │   └── layout.js         # Workspace Layout Manager
│   └── index.js              # Entry point
├── typst-pdf-vscode/         # VS Code extension
└── docs/                     # GitHub Pages demo
```

## Cai dat & Su dung

### Cach 1: npm (Vite, Webpack)

```bash
npm install typst-pdf
```

```javascript
import { MasaxTypstPDF, injectData } from "typst-pdf";
```

### Cach 2: CDN / HTML thuan

**Buoc 1:** Import Map cho Typst WASM:

```html
<script type="importmap">
  {
    "imports": {
      "@myriaddreamin/typst.ts": "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts@0.7.0-rc2/dist/esm/index.mjs",
      "@myriaddreamin/typst.ts/contrib/snippet": "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts@0.7.0-rc2/dist/esm/contrib/snippet.mjs",
      "@myriaddreamin/typst.ts/contrib/global-compiler": "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts@0.7.0-rc2/dist/esm/contrib/global-compiler.mjs",
      "@myriaddreamin/typst.ts/contrib/global-renderer": "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts@0.7.0-rc2/dist/esm/contrib/global-renderer.mjs",
      "@myriaddreamin/typst.ts/compiler": "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts@0.7.0-rc2/dist/esm/compiler.mjs",
      "@myriaddreamin/typst.ts/renderer": "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts@0.7.0-rc2/dist/esm/renderer.mjs",
      "@myriaddreamin/typst-ts-web-compiler": "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler@0.7.0-rc2/pkg/typst_ts_web_compiler.mjs",
      "@myriaddreamin/typst-ts-renderer": "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer@0.7.0-rc2/pkg/typst_ts_renderer.mjs"
    }
  }
</script>
```

**Buoc 2:** Import va su dung:

```html
<script type="module">
  import { MasaxWorkspace } from "https://cdn.jsdelivr.net/npm/typst-pdf/dist/masax-typst-pdf.full.js";

  const workspace = new MasaxWorkspace(document.getElementById("workspace"), {
    initialTemplate: `#let data = json(bytes("{{DATA}}"))
= Hoa don cho #data.name`,
    initialData: { name: "Masax Studio" },
    onStatusChange: (msg) => console.log(msg),
  });

  document.getElementById("btn-export").onclick = async () => {
    const pdf = await workspace.exportPDF();
    window.open(URL.createObjectURL(pdf), "_blank");
  };
</script>
```

### Cach 3: Dev Server

```bash
npm install
npm run dev
# Mo http://localhost:3000/
```

## Build Files

| File | Format | Muc dich |
|---|---|---|
| `dist/masax-typst-pdf.js` | ES Module | Dung voi Bundler (Vite/Webpack) |
| `dist/masax-typst-pdf.standalone.umd.cjs` | UMD | Dung voi Node.js / RequireJS |
| `dist/masax-typst-pdf.full.js` | ES Module | CDN / HTML thuan, bundle tat ca |

## API

### Core Generator (Headless)

```javascript
import { MasaxTypstPDF } from "typst-pdf";

const engine = new MasaxTypstPDF();

const template = `
#let data = json(bytes("{{DATA}}"))
#set text(size: 12pt)
= Hoa don cho #data.customerName
Tong tien: #data.total
`;

engine.setBlueprint(template);

const pdfBlob = await engine.genPDF({
  customerName: "Nguyen Van A",
  total: 15000000,
});

window.open(URL.createObjectURL(pdfBlob), "_blank");
```

### injectData() — Low-level

```javascript
import { injectData, compileTypstToPdf } from "typst-pdf";

// Truyen object hoac JSON string deu duoc
const typst = injectData(template, { name: "A" });
const typst2 = injectData(template, '{"name":"A"}');

const pdfBlob = await compileTypstToPdf(typst);
```

### UI Workspace (Live Preview)

```javascript
import { MasaxWorkspace } from "typst-pdf";

const workspace = new MasaxWorkspace(document.getElementById("workspace"), {
  initialTemplate: `#let data = json(bytes("{{DATA}}"))
= Xin chao #data.name`,
  initialData: { name: "Masax" },
  onStatusChange: (msg) => console.log(msg),
});

// Export PDF
const pdfBlob = await workspace.exportPDF();

// Cap nhat data (preview tu render lai)
workspace.updateData({ name: "World" });

// Blueprint save/load
const bp = workspace.getBlueprint();
workspace.loadBlueprint(bp);
```

## Image Resolution

### Web (browser)
- Local images: fetch tu URL tuong doi
- HTTPS images: fetch truc tiep, fallback qua CORS proxy (`allorigins.win`)
- Tat ca duoc map vao Typst Virtual File System

### VS Code Extension
- Local images: doc tu disk (`fs.readFile`), chuyen base64, preload vao webview VFS
- HTTPS images: fetch tu extension host (Node.js, khong bi CORS), chuyen base64, preload vao webview VFS
- Image loi → skip, khong break compilation

```typst
// Tat ca deu ho tro
#image("./logo.png")              // Local relative
#image("assets/photo.jpg")        // Local subfolder
#image("https://cdn.com/img.png") // Remote HTTPS
```

## Logging

### Web
Tat ca log ra `console` (DevTools):
```
MasaxTypst: Resolving images...
MasaxTypst: Image loaded -> ./logo.png (15234 bytes)
MasaxTypst: Compiling Typst → PDF...
MasaxTypst: PDF compilation complete.
```

### VS Code Extension
Tat ca log ra Output Channel **"Masax Typst"** (`Ctrl+Shift+U`):
```
[Masax] --- Update from editor: template.typ ---
[Masax] Template length: 5832 chars
[Masax] Resolving images from: K:\project
[Masax] Image fetched: https://cdn.com/logo.png (15234 bytes)
[Masax] Resolved 2 image(s) total.
[Masax] Resolving template... (JSON data: 1245 chars)
[Masax] → Sending to webview: 6890 chars, 2 image(s)
[Webview] [INFO] MasaxTypst: Compiling Typst → SVG...
[Webview] [INFO] MasaxTypst: SVG preview rendered successfully.
```

## VS Code Extension

Cai extension **Masax Typst PDF Editor** tu Marketplace hoac build tu source:

```bash
cd typst-pdf-vscode
npm run package
# Ctrl+Shift+P → "Install from VSIX"
```

Xem [typst-pdf-vscode/README.md](typst-pdf-vscode/README.md) de biet chi tiet.

## Build

```bash
# Build tat ca
npm run build

# Copy sang docs
cp dist/*.js docs/lib/
```

## License

MIT
