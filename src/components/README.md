# Hướng Dẫn Chi Tiết Các Trò Chơi Toán Học

## 1. Trò Chơi Phân Số Với Bánh (CakeFractions)

### Cấu Trúc Dữ Liệu
```jsx
interface CakeFractionState {
  numerator: number;      // Tử số
  denominator: number;    // Mẫu số
  currentPieces: number;  // Số mảnh bánh hiện tại
  isCorrect: boolean;     // Trạng thái đáp án
}
```

### Luồng Hoạt Động
1. **Khởi tạo dữ liệu**
   - Sinh ngẫu nhiên phân số đơn giản (1/2, 1/3, 1/4, v.v.)
   - Tạo hình ảnh bánh tròn SVG với số phần chia tương ứng

2. **Tương tác người dùng**
   - Kéo thả để chia bánh thành các phần bằng nhau
   - Click vào phần bánh để chọn/bỏ chọn
   - Nút kiểm tra đáp án

3. **Xử lý logic**
   - Kiểm tra tính chính xác của việc chia bánh
   - Tính toán tỷ lệ phần được chọn/tổng số phần
   - Hiển thị phản hồi trực quan (màu xanh/đỏ)

### Vấn Đề Hiện Tại
- Chức năng kéo thả chưa hoạt động tốt trên máy tính
- Cần cải thiện độ chính xác của việc chia bánh
- Hiệu ứng animation khi chia bánh còn giật

## 2. Trò Chơi Chia Táo (AppleDivision)

### Cấu Trúc Dữ Liệu
```jsx
interface AppleDivisionState {
  totalApples: number;     // Tổng số táo
  groupCount: number;      // Số nhóm cần chia
  currentGroups: Group[];  // Mảng các nhóm táo
  remainingApples: number; // Số táo chưa chia
}

interface Group {
  id: number;
  appleCount: number;
}
```

### Luồng Hoạt Động
1. **Khởi tạo trò chơi**
   - Tạo số táo ngẫu nhiên (dựa vào cấp độ)
   - Thiết lập số nhóm cần chia
   - Render hình ảnh táo và vùng chứa

2. **Xử lý tương tác**
   - Kéo thả táo vào các nhóm
   - Tự động tính số táo trong mỗi nhóm
   - Kiểm tra tính đồng đều giữa các nhóm

3. **Kiểm tra kết quả**
   - Xác nhận số táo trong mỗi nhóm bằng nhau
   - Tính phép chia: tổng số táo / số nhóm
   - Hiển thị phép tính và kết quả

### Vấn Đề Hiện Tại
- Cần tối ưu hiệu suất khi số lượng táo lớn
- Animation kéo thả cần mượt mà hơn
- Thêm chế độ chơi nâng cao với số dư

## 3. Trò Chơi Biểu Thức Dấu Ngoặc (BracketExpressions)

### Cấu Trúc Dữ Liệu
```jsx
interface BracketExpression {
  expression: string;        // Biểu thức gốc
  correctAnswer: number;     // Kết quả đúng
  userAnswer: number | null; // Câu trả lời của người chơi
  brackets: BracketPair[];   // Các cặp dấu ngoặc
}

interface BracketPair {
  start: number;
  end: number;
  value: number;
}
```

### Luồng Hoạt Động
1. **Tạo biểu thức**
   - Sinh biểu thức toán học với độ khó tăng dần
   - Thêm dấu ngoặc vào các vị trí hợp lệ
   - Tính toán kết quả đúng theo thứ tự ưu tiên

2. **Xử lý tương tác**
   - Cho phép người chơi thêm/xóa dấu ngoặc
   - Tự động tính toán kết quả theo thời gian thực
   - Hiển thị gợi ý về thứ tự tính toán

3. **Đánh giá kết quả**
   - So sánh kết quả với đáp án đúng
   - Kiểm tra tính hợp lệ của cách đặt dấu ngoặc
   - Cung cấp giải thích cho đáp án sai

### Vấn Đề Hiện Tại
- Cần xử lý tốt hơn các trường hợp chia cho 0
- Thêm nhiều loại biểu thức đa dạng hơn
- Cải thiện thuật toán sinh biểu thức ngẫu nhiên

## Cấu Trúc Thư Mục
```
src/
├── components/
│   ├── games/
│   │   ├── CakeFractions/
│   │   ├── AppleDivision/
│   │   └── BracketExpressions/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── Score.tsx
│   └── GameHub.tsx
├── hooks/
│   ├── useGameState.ts
│   └── useAnimation.ts
└── utils/
    ├── mathOperations.ts
    └── gameHelpers.ts
```

## Hướng Dẫn Cài Đặt và Chạy

1. **Cài đặt dependencies**
```bash
npm install
```

2. **Chạy ứng dụng trong môi trường development**
```bash
npm run dev
```

3. **Build cho production**
```bash
npm run build
```

## Công Nghệ Sử Dụng
- React + Vite
- TailwindCSS cho styling
- Framer Motion cho animation
- React DnD cho kéo thả
- ESLint cho kiểm tra code

## Hướng Phát Triển
1. **Tối ưu hóa hiệu suất**
   - Implement React.memo cho components
   - Lazy loading cho các trò chơi
   - Tối ưu assets và animations

2. **Cải thiện UX/UI**
   - Thêm hướng dẫn chi tiết cho người mới
   - Cải thiện responsive design
   - Thêm hiệu ứng âm thanh

3. **Tính năng mới**
   - Chế độ multiplayer
   - Bảng xếp hạng
   - Hệ thống achievements

## Đóng Góp
Vui lòng tạo issue hoặc pull request nếu bạn muốn đóng góp cho dự án.

## Giấy Phép
Dự án này được phân phối dưới giấy phép MIT. 