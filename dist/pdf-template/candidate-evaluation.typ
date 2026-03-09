
#set text(
  font: "Arial",
  size: 10pt,
  lang: "vi"
)

#set page(
  paper: "a4",
  margin: (top: 2cm, bottom: 2cm, left: 2cm, right: 1.5cm),
  header: context {
    // Top right text
    align(right)[
      #text(size: 9pt)[Số: {{documentCode}}]
    ]
    v(0.3cm)
  },
  footer: context {
    grid(
      columns: (1fr, 1fr, 1fr),
      align: (left, center, right),
      [#text(size: 8pt, fill: rgb("#666666"))[HDY-HRD-SOP01.F05 (01-01/10/2024)]],
      [#text(size: 8pt, fill: rgb("#000000"))[Trang #counter(page).display("1/1", both: true)]],
      []
    )
  }
)

// Macro logic for checkboxes
#let checkbox(checked) = {
  if checked {
    box(stroke: 1pt, width: 10pt, height: 10pt, align(center + horizon)[#text(size: 10pt)[✓]])
  } else {
    box(stroke: 1pt, width: 10pt, height: 10pt)[]
  }
}

// ----------------------------------------------------------------------
// HEADER SECTION
// ----------------------------------------------------------------------

#table(
  columns: (25%, 75%),
  align: (center + horizon, center + horizon),
  stroke: 1pt,
  [
    // Logo block
    // We try to show a logo, or fallback text
    #box(height: 1.5cm)[
      // Handlebars or direct image if available
      // Using typst directly:
      // #image(data.company_logo, width: 1.2cm)
      #text(size: 8pt)[LOGO]
    ]
  ],
  [
    #text(size: 16pt, weight: "bold")[BẢNG ĐÁNH GIÁ ỨNG VIÊN]
  ]
)
#v(0.5cm)

// ----------------------------------------------------------------------
// SECTION 1
// ----------------------------------------------------------------------
#text(size: 12pt, weight: "bold")[1. THÔNG TIN ỨNG VIÊN]
#v(0.2cm)

#table(
  columns: (30%, 35%, 15%, 20%),
  stroke: 1pt,
  align: left + horizon,
  
  [Họ tên ứng viên], table.cell(colspan: 3)[{{candidate.name}}],
  [Ngày tháng năm sinh], table.cell(colspan: 3)[{{candidate.dob}}],
  [Trình độ chuyên môn], [{{candidate.education}}], [Giới tính:], [{{candidate.gender}}],
  [Vị trí /chức danh ứng tuyển], table.cell(colspan: 3)[{{candidate.position}}],
  [Điểm Bài kiểm tra năng lực \n chuyên môn (nếu có):], table.cell(colspan: 3)[{{candidate.testScore}}]
)
#v(0.5cm)

// ----------------------------------------------------------------------
// SECTION 2
// ----------------------------------------------------------------------
#text(size: 12pt, weight: "bold")[2. ĐÁNH GIÁ ỨNG VIÊN]
#v(0.2cm)

#table(
  columns: (25%, 55%, 20%),
  stroke: 1pt,
  align: (left + horizon, left + horizon, center + horizon),
  
  // Headers
  table.header(
    [*Tiêu chí đánh giá*], [*Bằng chứng đánh giá*], [*Điểm đánh giá* \n *(Từ 0 đến 3 điểm)*]
  ),
  
  // Body - Mapped from handle-bars loop
  // {{#each evaluations}}
  [{{criteria}}], [{{evidence}}], [{{score}}],
  // {{/each}}
  
  table.cell(colspan: 2, align: center)[*Tổng kết*], [{{totalScore}}]
)

#v(0.1cm)
#text(size: 10pt)[
  {{eval_note_22_24}} \
  {{eval_note_14_21}} \
  {{eval_note_06_13}} \
  {{eval_note_under_06}}
]

#pagebreak()

// ----------------------------------------------------------------------
// INTERVIEWERS SECTION (Repeated)
// ----------------------------------------------------------------------

// {{#each interviewers}}
#box(
  stroke: 1pt,
  width: 100%,
  [
    #grid(
      columns: (25%, 75%),
      stroke: (x, y) => (
        right: if x == 0 { 1pt } else { 0pt }
      ),
      [
        #box(height: 100%, width: 100%, inset: 5pt)[
          #align(center + horizon)[*Phỏng vấn viên*]
        ]
      ],
      [
        #box(height: 100%, width: 100%, inset: 5pt)[
          #text(style: "italic")[Nội dung nhận xét: (kiến thức chuyên môn, kinh nghiệm, kỹ năng, thái độ...)] \
          {{comments}}
          
          #v(3cm) // Space for signature
          Ký tên: \
          Họ và tên: {{name}}
        ]
        #line(length: 100%, stroke: 0.5pt)
        #box(width: 100%, inset: 5pt)[
          #grid(
            columns: (20%, 30%, 50%),
            [Kết quả :],
            [#checkbox(true) Đạt/Phù hợp], // Logic to be handled via handlebars
            [#checkbox(false) Không đạt/Không phù hợp]
          )
        ]
      ]
    )
  ]
)
#v(0.3cm)
// {{/each}}

// ----------------------------------------------------------------------
// SECTION 3
// ----------------------------------------------------------------------
#v(0.5cm)
#text(size: 12pt, weight: "bold")[3. PHÊ DUYỆT KẾT QUẢ TUYỂN CHỌN VÀ CHẾ ĐỘ NHÂN SỰ]
#v(0.2cm)

#grid(
  columns: (50%, 50%),
  column-gutter: 0.5cm,
  
  // Left block
  [
    #box(stroke: 1pt, width: 100%, inset: 0pt)[
      #table(
        columns: (80%, 20%),
        stroke: (x, y) => (
          bottom: 1pt,
          right: if x == 0 { 0pt } else { 0pt }
        ),
        align: (left + horizon, right + horizon),
        [Đồng ý tuyển dụng:], [#checkbox(true)],
        [Trả hồ sơ (không đạt):], [#checkbox(false)]
      )
      #box(inset: 5pt)[
        Ngày nhận việc: {{approval.startDate}} \
        Cấp bậc nhân sự: {{approval.level}} \
        Nhóm chức danh: {{approval.roleGroup}} \
        Mức lương: {{approval.salary}} \
        Lương thử việc: {{approval.probationSalary}} \
        Lương sau thử việc: {{approval.postProbationSalary}}
      ]
      #line(length: 100%, stroke: 1pt)
      #box(inset: 5pt)[
        (Chọn 1 trong 2 lựa chọn) \
        #grid(
          columns: (10pt, 1fr),
          column-gutter: 5pt,
          [#checkbox(true)], [Ký HĐTV với thời gian: {{approval.contractDuration}}, từ ngày {{approval.contractFrom}} đến ngày {{approval.contractTo}}],
          [#checkbox(false)], [Ký HĐLĐ xác định thời hạn: {{approval.contractTempDuration}} tháng]
        )
      ]
      #line(length: 100%, stroke: 1pt)
      #box(inset: 5pt)[
        Chế độ khác (ngoài quy định của Công ty): \
        {{approval.otherModes}}
        #v(2cm)
      ]
    ]
  ],
  // Right block
  [
    #box(stroke: 1pt, width: 100%, height: 100%, inset: 10pt)[
      #align(center)[*CẤP THẨM QUYỀN PHÊ DUYỆT*]
      
      #v(0.5cm)
      Họ tên: {{approval.approverName}} \
      Ngày: {{approval.approvalDate}}
      
      #v(3cm)
      // Signature placeholder
    ]
  ]
)
