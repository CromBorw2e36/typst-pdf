// Data injection — any engine just replaces {{DATA}} with escaped JSON string
#let data = json(bytes("{{DATA}}"))
#let candidate = data.at("candidate", default: (:))
#let evaluations = data.at("evaluations", default: ())
#let interviewers = data.at("interviewers", default: ())
#let approval = data.at("approval", default: (:))

// Helper functions
#let fmt-currency(value) = {
  if value == none { "0 ₫" }
  else {
    let n = int(value)
    let s = str(n)
    let parts = ()
    let i = s.len()
    while i > 0 {
      let start = calc.max(0, i - 3)
      parts.push(s.slice(start, i))
      i = start
    }
    parts.rev().join(".") + " ₫"
  }
}

#let checkbox(checked) = {
  if checked {
    box(stroke: 1pt, width: 10pt, height: 10pt, align(center + horizon)[#text(size: 10pt)[✓]])
  } else {
    box(stroke: 1pt, width: 10pt, height: 10pt)[]
  }
}

#set text(
  font: "Arial",
  size: 10pt,
  lang: "vi"
)

#set page(
  paper: "a4",
  margin: (top: 2cm, bottom: 2cm, left: 2cm, right: 1.5cm),
  header: context {
    align(right)[
      #text(size: 9pt)[Số: #data.at("documentCode", default: "")]
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

// ----------------------------------------------------------------------
// HEADER SECTION
// ----------------------------------------------------------------------

#table(
  columns: (25%, 75%),
  align: (center + horizon, center + horizon),
  stroke: 1pt,
  [
    #box(height: 1.5cm)[
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

  [Họ tên ứng viên], table.cell(colspan: 3)[#candidate.at("name", default: "")],
  [Ngày tháng năm sinh], table.cell(colspan: 3)[#candidate.at("dob", default: "")],
  [Trình độ chuyên môn], [#candidate.at("education", default: "")], [Giới tính:], [#candidate.at("gender", default: "")],
  [Vị trí /chức danh ứng tuyển], table.cell(colspan: 3)[#candidate.at("position", default: "")],
  [Điểm Bài kiểm tra năng lực \ chuyên môn (nếu có):], table.cell(colspan: 3)[#candidate.at("testScore", default: "")]
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
    [*Tiêu chí đánh giá*], [*Bằng chứng đánh giá*], [*Điểm đánh giá* \ *(Từ 0 đến 3 điểm)*]
  ),

  // Body — Typst native loop
  ..evaluations.map(eval => (
    [#eval.at("criteria", default: "")],
    [#eval.at("evidence", default: "")],
    [#eval.at("score", default: "")],
  )).flatten(),

  table.cell(colspan: 2, align: center)[*Tổng kết*], [#data.at("totalScore", default: "")]
)

#v(0.1cm)
#text(size: 10pt)[
  #data.at("eval_note_22_24", default: "") \
  #data.at("eval_note_14_21", default: "") \
  #data.at("eval_note_06_13", default: "") \
  #data.at("eval_note_under_06", default: "")
]

#pagebreak()

// ----------------------------------------------------------------------
// INTERVIEWERS SECTION
// ----------------------------------------------------------------------

#for interviewer in interviewers [
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
            #interviewer.at("comments", default: "")

            #v(3cm)
            Ký tên: \
            Họ và tên: #interviewer.at("name", default: "")
          ]
          #line(length: 100%, stroke: 0.5pt)
          #box(width: 100%, inset: 5pt)[
            #grid(
              columns: (20%, 30%, 50%),
              [Kết quả :],
              [#checkbox(interviewer.at("passed", default: false)) Đạt/Phù hợp],
              [#checkbox(not interviewer.at("passed", default: false)) Không đạt/Không phù hợp]
            )
          ]
        ]
      )
    ]
  )
  #v(0.3cm)
]

// ----------------------------------------------------------------------
// SECTION 3
// ----------------------------------------------------------------------
#v(0.5cm)
#text(size: 12pt, weight: "bold")[3. PHÊ DUYỆT KẾT QUẢ TUYỂN CHỌN VÀ CHẾ ĐỘ NHÂN SỰ]
#v(0.2cm)
#grid(
  columns: (1fr, 1fr),
  column-gutter: 0.5cm,

  // Left block
  grid.cell(stroke: 1pt, inset: 0pt)[
    #table(
      columns: (80%, 20%),
      stroke: (x, y) => (
        bottom: 1pt,
        right: 0pt
      ),
      align: (left + horizon, right + horizon),
      [Đồng ý tuyển dụng:], [#checkbox(approval.at("approved", default: false))],
      [Trả hồ sơ (không đạt):], [#checkbox(not approval.at("approved", default: false))]
    )
    #box(inset: 5pt)[
      Ngày nhận việc: #approval.at("startDate", default: "") \
      Cấp bậc nhân sự: #approval.at("level", default: "") \
      Nhóm chức danh: #approval.at("roleGroup", default: "") \
      Mức lương: #approval.at("salary", default: "") \
      Lương thử việc: #approval.at("probationSalary", default: "") \
      Lương sau thử việc: #approval.at("postProbationSalary", default: "")
    ]
    #line(length: 100%, stroke: 1pt)
    #box(inset: 5pt)[
      (Chọn 1 trong 2 lựa chọn) \
      #grid(
        columns: (10pt, 1fr),
        column-gutter: 5pt,
        [#checkbox(true)], [Ký HĐTV với thời gian: #approval.at("contractDuration", default: ""), từ ngày #approval.at("contractFrom", default: "") đến ngày #approval.at("contractTo", default: "")],
        [#checkbox(false)], [Ký HĐLĐ xác định thời hạn: #approval.at("contractTempDuration", default: "") tháng]
      )
    ]
    #line(length: 100%, stroke: 1pt)
    #box(inset: 5pt)[
      Chế độ khác (ngoài quy định của Công ty): \
      #approval.at("otherModes", default: "")
      #v(2cm)
    ]
  ],

  // Right block
  grid.cell(stroke: 1pt, inset: 10pt)[
    #align(center)[*CẤP THẨM QUYỀN PHÊ DUYỆT*]

    #v(0.5cm)
    Họ tên: #approval.at("approverName", default: "") \
    Ngày: #approval.at("approvalDate", default: "")

    #v(3cm)
  ]
)
