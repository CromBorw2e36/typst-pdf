# Typst PDF Generator & Editor

Thư viện JavaScript/TypeScript độc lập để biên dịch file PDF từ Typst templates, kết hợp với Handlebars data binding trực tiếp trên trình duyệt. Không phụ thuộc vào các công cụ render HTML-to-PDF cũ kĩ, mang lại hiệu suất tạo file PDF siêu tốc và layout chính xác.

## 🌟 Tính năng nổi bật

- **Pure Typst Architecture**: Render file PDF trực tiếp từ mã nguồn Typst bằng WebAssembly (WASM).
- **Trình soạn thảo trực quan**: Tích hợp sẵn UI Editor để chỉnh sửa và Preview Typst realtime (Live SVG preview).
- **Data Binding mạnh mẽ**: Sử dụng engine Handlebars (`{{variable}}`, `{{#each loop}}`, `{{#if condition}}`) ngay bên trong syntax Typst.
- **Auto Remote Images**: Tự động fetch ảnh từ các URL ngoài (xuyên CORS) và đưa vào Virtual File System cho Typst xử lý.
- **Siêu nhẹ**: Hỗ trợ Tree-shaking tối đa, tách loader WASM để tối ưu thời gian tải trang.

## 📂 Cấu trúc dự án

```text
draw-pdf/
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

### Dùng trực tiếp qua CDN (Standalone)

```html
<!-- Load dạng module -->
<script type="module">
  import {
    MasaxWorkspace,
    MasaxTypstPDF,
  } from "https://unpkg.com/masax-drawpdf/dist/masax-typst-pdf.js";
</script>
```

### Chạy Demo Editor tại Local

```bash
# 1. Cài đặt dependencies
npm install

# 2. Khởi chạy Dev Server
npm run dev

# Mở trình duyệt tại http://localhost:3000/
```

## 📖 API Documentation

### 1. Sử dụng Core Generator (Headless)

Bạn có thể tự render PDF ngầm không cần giao diện Editor:

```javascript
import { MasaxTypstPDF } from "masax-drawpdf";

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
import { MasaxWorkspace } from "masax-drawpdf";

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
```

## 🛠 Hướng dẫn Build

Thư viện được đóng gói sẵn với độ tối đa cho mọi môi trường:

```bash
# Build tất cả các target cùng lúc (Cập nhật thư mục /dist)
npm run build
```

Các phiên bản sau khi build:

- `dist/masax-typst-pdf.js`: Bản build ES Module chuẩn.
- `dist/masax-typst-pdf.full.js`: Bản bundle tích hợp tất-cả-trong-một.
- `dist/masax-typst-pdf.standalone.umd.cjs`: Bản UMD dùng được cho Node.js hoặc RequireJS.

## 📝 License

MIT
