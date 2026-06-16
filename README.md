# Rung Chuông Vàng

Project web tương tác cho game show "Rung Chuông Vàng", viết bằng Vite + JavaScript thuần. Giao diện tối ưu cho trình chiếu 16:9, có 23 slide, 20 câu hỏi, timer 15 giây và hiệu ứng hiện đáp án.

## Cài đặt

```bash
npm install
```

## Chạy khi thiết kế hoặc trình chiếu thử

```bash
npm run dev
```

Mở địa chỉ mà terminal hiển thị, thường là:

```txt
http://127.0.0.1:5173
```

## Build bản phát hành

```bash
npm run build
```

Thư mục build sẽ nằm trong `dist/`.

## Chỉnh sửa câu hỏi

Các gói câu hỏi nằm trong:

```txt
src/data/questionPacks.js
```

Hiện có 2 gói:

- `Ngành Thiếu`: đang dùng 20 câu hỏi hiện tại.
- `Ngành Đồng`: đang để trống để bổ sung sau.

Toàn bộ câu hỏi Ngành Thiếu nằm trong:

```txt
src/data/questions.js
```

Mỗi câu có dạng:

```js
{
  id: 1,
  level: "Dễ",
  question: "...",
  options: {
    A: "...",
    B: "...",
    C: "...",
    D: "..."
  },
  correctAnswer: "C",
  explanation: "..."
}
```

Chỉ cần thêm, sửa hoặc xóa dữ liệu trong file này. Giao diện sẽ tự render theo dữ liệu.

Khi muốn bổ sung Ngành Đồng, thêm câu hỏi vào mảng `questions` của gói `nganh-dong` trong `src/data/questionPacks.js`, hoặc tách ra file riêng rồi import tương tự `questions.js`.

## Điều khiển game

- Dùng phím mũi tên trái/phải để chuyển slide.
- Bấm `Bắt đầu trò chơi` ở slide tiêu đề.
- Ở mỗi câu hỏi, bấm `Bắt đầu tính giờ` để chạy timer 15 giây.
- Bấm `Hiện đáp án` để highlight đáp án đúng.
- Bấm `Tiếp tục` để sang slide kế tiếp.

## Gợi ý trình chiếu

- Dùng trình duyệt Chrome hoặc Edge.
- Bật toàn màn hình bằng phím `F11`.
- Trình chiếu tốt nhất trên màn hình 16:9.
