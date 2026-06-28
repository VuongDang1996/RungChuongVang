import { questions as nganhThieuQuestions } from "./questions.js";
import { questions as nganhDongQuestions } from "./nganhDongQuestions.js";

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
    subtitle: "20 câu hỏi mới",
    description: "Bộ câu hỏi Ngành Đồng đã nhập từ file Word, có ảnh minh họa và câu hỏi audio/video chờ bổ sung file.",
    questions: nganhDongQuestions
  }
];
