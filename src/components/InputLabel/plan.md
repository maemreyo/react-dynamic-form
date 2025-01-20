# DEMO InputLabel

Để xây dựng một InputLabel component hoàn chỉnh, bạn cần đảm bảo các tiêu chí sau:

### 1. Props & Cấu hình cơ bản

**Thuộc tính cần thiết:**
- `htmlFor`: ID của input field mà label này liên kết tới. **Bắt buộc**.
- `label`: Nội dung text của label. **Bắt buộc**.
- `required`:  (boolean) Đánh dấu label là bắt buộc (thường hiển thị dấu *). Mặc định: `false`.
- `optional`: (boolean) Đánh dấu label là tùy chọn (thường hiển thị "(optional)"). Mặc định: `false`.
- `disabled`: (boolean) Vô hiệu hóa label (thường làm mờ đi). Mặc định: `false`.
- `position`: (string) Vị trí của label so với input (`"top"`, `"left"`). Mặc định: `"top"`.
- `tooltip`: (string | React.ReactNode) Nội dung hiển thị khi di chuột qua label (dùng để hiển thị help text).
- `tooltipPlacement`: (string) Vị trí hiển thị tooltip (`"top"`, `"right"`, `"bottom"`, `"left"`, `"top-start"`, `"top-end"`, `"bottom-start"`, `"bottom-end"`, `"right-start"`, `"right-end"`, `"left-start"`, `"left-end"`). Mặc định: `"top"`.
- `className/style`: Custom styling cho label.
- `ref`: React ref cho DOM access.

### 2. Typography & Màu sắc

**Typography:**
- `font-family`: Nên sử dụng font-family phù hợp với toàn bộ design system.
- `font-size`:  Kích thước font chữ dễ đọc, thường nhỏ hơn font chữ nội dung chính một chút (ví dụ: 14px - 16px).
- `font-weight`: Thường sử dụng font-weight `normal` hoặc `medium`.
- `line-height`:  Đảm bảo line-height đủ thoáng để dễ đọc (ví dụ: 1.5).

**Màu sắc:**
- `color`: Màu sắc của label cần có độ tương phản tốt với nền. Nên sử dụng màu sắc từ design system.
- `disabledColor`: Màu sắc khi label bị `disabled`, thường là màu xám nhạt.
- Màu sắc cho `required` indicator (thường là màu đỏ).
- Màu sắc cho `optional` indicator (thường là màu xám).

### 3. Hiển thị & Bố cục

**Indicators:**
- `required`: Hiển thị dấu `*` màu đỏ cạnh label text.
- `optional`: Hiển thị `(optional)` màu xám cạnh label text.
- Ưu tiên `required` hơn `optional`. Chỉ hiển thị 1 trong 2.

**Căn chỉnh (position):**
- `top`: Label nằm phía trên input.
- `left`: Label nằm bên trái input. Khi dùng `left`, nên có chiều rộng cố định cho label để các label trên cùng form được căn gióng thẳng hàng.
- Canh giữa nội dung label theo chiều dọc (vertical-align: middle) khi `position` là `left`.

**Khoảng cách:**
- `marginBottom` (khi `position="top"`): Khoảng cách giữa label và input. Nên có khoảng cách hợp lý để phân biệt rõ ràng label và input, nhưng không quá xa (ví dụ: 4px - 8px).
- `marginRight` (khi `position="left"`): Khoảng cách giữa label và input (ví dụ: 8px - 16px).

### 4. Accessibility (A11y)

**Liên kết với input:**
- Sử dụng thuộc tính `htmlFor` để liên kết label với input field tương ứng. Điều này giúp cho screen reader đọc được label khi focus vào input.
- `htmlFor` phải khớp với `id` của input.

**ARIA Attributes:**
- Khi `disabled`, thêm `aria-disabled="true"`.
- `role="label"` có thể thêm vào để hỗ trợ tốt hơn, nhưng thường không bắt buộc vì đã có `<label>`.

### 5. Tooltip

**Hiển thị:**
- Khi di chuột (hover) qua label và `tooltip` prop được cung cấp, hiển thị tooltip chứa nội dung từ `tooltip`.
- Tooltip cần có giao diện dễ nhìn, nền tương phản với chữ.
- `tooltipPlacement` quyết định vị trí của tooltip so với label.

**Hành vi:**
- Hiển thị tooltip khi di chuột vào label.
- Ẩn tooltip khi di chuột ra khỏi label hoặc khi bấm vào label.
- Có độ trễ nhỏ (delay) trước khi hiển thị tooltip để tránh hiển thị tooltip ngay lập tức khi di chuột nhanh qua label.

### 6. Error Handling & Documentation

**Error Management:**
- Nên có kiểm tra prop `htmlFor` bắt buộc phải có giá trị.
- Kiểm tra prop `position` có thuộc tập giá trị hợp lệ (`"top"`, `"left"`) hay không.
- Kiểm tra `tooltipPlacement` hợp lệ nếu `tooltip` được cung cấp.

**Documentation:**
- PropTypes/TypeScript definitions cho các props.
- Ví dụ sử dụng component trong các trường hợp khác nhau.
- Mô tả chi tiết các props, đặc biệt là `htmlFor`, `required`, `optional`, `position`, `tooltip`, `tooltipPlacement`.

### 7. Testing

**Test Coverage:**
- Unit tests cho các logic của component (hiển thị indicators, tooltip, xử lý props...).
- Snapshot tests để đảm bảo UI không thay đổi ngoài ý muốn.
- Accessibility tests để đảm bảo label liên kết đúng với input và screen reader hoạt động tốt.

### 8. Browser & Device Support

**Compatibility:**
- Test trên các trình duyệt và thiết bị khác nhau để đảm bảo label hiển thị đúng và tương thích.
- Chú ý responsive khi `position` là `"left"` trên màn hình nhỏ.

Bản thiết kế này cung cấp một hướng dẫn chi tiết để xây dựng InputLabel component đảm bảo chất lượng và accessibility. Hãy sử dụng nó làm kim chỉ nam trong quá trình phát triển!