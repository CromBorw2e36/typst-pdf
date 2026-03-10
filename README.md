# Typst PDF Generator & Editor

[![npm version](https://img.shields.io/npm/v/typst-pdf.svg)](https://www.npmjs.com/package/typst-pdf)
[![npm downloads](https://img.shields.io/npm/dm/typst-pdf.svg)](https://www.npmjs.com/package/typst-pdf)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**📦 npm:** [npmjs.com/package/typst-pdf](https://www.npmjs.com/package/typst-pdf)

Thư viện JavaScript độc lập để biên dịch file PDF từ Typst templates, kết hợp với Handlebars data binding trực tiếp trên trình duyệt. Không phụ thuộc vào các công cụ render HTML-to-PDF cũ kĩ, mang lại hiệu suất tạo file PDF siêu tốc và layout chính xác.

## 🌟 Tính năng nổi bật

- **Pure Typst Architecture**: Render file PDF trực tiếp từ mã nguồn Typst bằng WebAssembly (WASM).
- **Trình soạn thảo trực quan**: Tích hợp sẵn UI Editor để chỉnh sửa và Preview Typst realtime (Live SVG preview).
- **Data Binding mạnh mẽ**: Sử dụng engine Handlebars (`{{variable}}`, `{{#each loop}}`, `{{#if condition}}`) ngay bên trong syntax Typst.
- **Auto Remote Images**: Tự động fetch ảnh từ các URL ngoài (xuyên CORS) và đưa vào Virtual File System cho Typst xử lý.
- **Siêu nhẹ**: Hỗ trợ Tree-shaking tối đa, tách loader WASM để tối ưu thời gian tải trang.

## 📂 Cấu trúc dự án

```text
typst-pdf/
├── package.json              # Cấu hình dependency & build scripts
├── vite.config.js            # Cấu hình Vite build (Library / Standalone / Full mode)
├── index.html                # Demo Editor App
├── src/
│   ├── core/
│   │   ├── resolver.js       # Data binding engine (Handlebars)
│   │   ├── compiler.js       # Typst WASM Compiler & Image Fetcher
│   │   └── generator.js      # MASAX Typst Core (`MasaxTypstPDF`)
│   │
│   ├── ui/
│   │   ├── editor.js         # Text Editor (CodeMirror) wrapper
│   │   ├── preview.js        # SVG Live Preview renderer
│   │   └── layout.js         # Workspace Layout Manager
│   │
│   └── index.js              # Entry point xuất thư viện
```

## 🚀 Cài đặt & Sử dụng

### Cách 1: Cài qua npm (Dành cho dự án dùng Bundler như Vite, Webpack)

```bash
npm install typst-pdf
```

Sau đó import vào code của bạn:

```javascript
import { MasaxWorkspace, MasaxTypstPDF } from "typst-pdf";
```

> **Lưu ý:** Khi dùng npm, Vite sẽ tự xử lý việc load các file WASM từ `node_modules`. Không cần cấu hình thêm gì.

---

### Cách 2: Dùng trực tiếp qua `<script>` trong HTML (Không cần Node.js / Bundler)

Đây là cách dùng đơn giản nhất, chỉ cần thêm 2 thẻ `<script>` vào file HTML. Tất cả các file WASM và module phụ thuộc được tải tự động từ CDN jsDelivr.

**Bước 1:** Thêm `<script type="importmap">` vào phần `<head>` để khai báo các module Typst phụ thuộc:

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

**Bước 2:** Import thư viện và viết code của bạn bằng `<script type="module">`:

```html
<script type="module">
  import { MasaxWorkspace } from "https://cdn.jsdelivr.net/npm/typst-pdf@1.2.0/dist/masax-typst-pdf.full.js";

  const workspace = new MasaxWorkspace(document.getElementById("workspace"), {
    initialTemplate: `= Hóa đơn cho {{name}}`,
    initialData: { name: "Masax Studio" },
    onStatusChange: (msg) => console.log(msg),
  });

  document.getElementById("btn-export").onclick = async () => {
    const pdf = await workspace.exportPDF();
    window.open(URL.createObjectURL(pdf), "_blank");
  };
</script>
```

> **Lưu ý:** `<script type="importmap">` phải đặt **trước** thẻ `<script type="module">`. Import maps được hỗ trợ bởi mọi trình duyệt hiện đại (Chrome 89+, Firefox 108+, Safari 16.4+).

---

### Cách 3: Chạy Demo Editor tại Local (Development)

```bash
# 1. Cài đặt dependencies
npm install

# 2. Khởi chạy Dev Server
npm run dev

# Mở trình duyệt tại http://localhost:3000/
```

## 📂 Giải thích các file Build

| File                                      | Format         | Dùng khi nào                                                            |
| ----------------------------------------- | -------------- | ----------------------------------------------------------------------- |
| `dist/masax-typst-pdf.js`                 | ES Module      | Dùng với Bundler (Vite/Webpack), import trực tiếp                       |
| `dist/masax-typst-pdf.umd.cjs`            | UMD / CommonJS | Dùng với Node.js hoặc RequireJS, **không kèm** Handlebars/CodeMirror    |
| `dist/masax-typst-pdf.full.js`            | ES Module      | Dùng cho **CDN / HTML thuần**, bundle gộp cả Handlebars & CodeMirror    |
| `dist/masax-typst-pdf.standalone.umd.cjs` | UMD            | Dùng cho **Node.js / RequireJS**, bundle gộp cả Handlebars & CodeMirror |

> ✅ **Khuyến nghị cho HTML/CDN:** dùng `masax-typst-pdf.full.js` (ES Module, gộp toàn bộ dependency).  
> ✅ **Khuyến nghị cho Project Vite/Webpack:** dùng `masax-typst-pdf.js` + `npm install typst-pdf`.

## 📖 API Documentation

### 1. Sử dụng Core Generator (Headless)

Bạn có thể tự render PDF ngầm không cần giao diện Editor:

```javascript
import { MasaxTypstPDF } from "typst-pdf";

async function generateInvoice() {
  const engine = new MasaxTypstPDF();

  // 1. Template Typst có chứa Handlebars variables
  const template = `
    #set text(size: 12pt)
    = Hóa đơn cho {{customerName}}
    Tổng tiền: {{formatCurrency total}}
  `;

  engine.setBlueprint(template);

  // 2. Dữ liệu cần fill
  const data = {
    customerName: "Nguyễn Văn A",
    total: 15000000,
  };

  try {
    // 3. Biên dịch trực tiếp ra file PDF (Blob)
    const pdfBlob = await engine.genPDF(data);

    // Preview hoặc Tải xuống
    const objectUrl = URL.createObjectURL(pdfBlob);
    window.open(objectUrl, "_blank");
  } catch (err) {
    console.error("Lỗi xuất PDF:", err);
  }
}
```

### 2. Tích hợp UI Workspace (Có Live Preview)

Sử dụng thư viện `MasaxWorkspace` để nhúng toàn bộ trải nghiệm Editor vào web của bạn:

```javascript
import { MasaxWorkspace } from "typst-pdf";

// Container HTML
const workspaceEl = document.getElementById("workspace-container");

// Khởi tạo Editor
const workspace = new MasaxWorkspace(workspaceEl, {
  initialTemplate: "= Xin chào {{name}}",
  initialData: { name: "Thế Giới" },
  onStatusChange: (msg) => console.log("Status:", msg),
});

// Nút bấm xuất file PDF
document.getElementById("btn-export").onclick = async () => {
  const pdfBlob = await workspace.exportPDF();
  // Use the pdfBlob ...
};

// Cập nhật lại dữ liệu mẫu (Live Preview sẽ tự render lại)
workspace.updateData({ name: "Masax" });

// Lấy Blueprint (JSON) để lưu trữ
const blueprint = workspace.getBlueprint();

// Load Blueprint từ JSON đã lưu
workspace.loadBlueprint(blueprint);
```

## 🛠 Hướng dẫn Build

```bash
# Build tất cả các target cùng lúc (Cập nhật thư mục /dist)
npm run build

# Build và copy sang thư mục docs để deploy lên GitHub Pages
npm run build ; if ($?) { Copy-Item -Path ".\dist\*.js", ".\dist\*.cjs" -Destination ".\docs\lib\" -Force }
```

## 📝 License

MIT
