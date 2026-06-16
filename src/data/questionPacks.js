import { questions as nganhThieuQuestions } from "./questions.js";

export const questionPacks = [
  {
    id: "nganh-thieu",
    title: "Ngành Thiếu",
    subtitle: "Bộ câu hỏi hiện tại",
    description: "20 câu hỏi đã nhập, sẵn sàng sử dụng trong chương trình.",
    questions: nganhThieuQuestions
  },
  {
    id: "nganh-dong",
    title: "Ngành Đồng",
    subtitle: "Sẽ bổ sung sau",
    description: "Khu vực dành cho bộ câu hỏi Ngành Đồng. Chỉ cần thêm dữ liệu vào mảng questions này.",
    questions: []
  }
];
