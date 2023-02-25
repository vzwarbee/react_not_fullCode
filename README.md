Hướng dẫn sử dụng React với các package react-firebase/auth, react-dom, react-router-dom, firebase và bootstrap

React là một thư viện JavaScript phổ biến cho phép bạn xây dựng các ứng dụng web động. Với React, bạn có thể tạo các thành phần độc lập và sử dụng chúng trong các ứng dụng của mình.

Trong hướng dẫn này, chúng ta sẽ tập trung vào cách sử dụng React với các package sau:

`react-firebase/auth`: là một package giúp bạn đăng nhập và xác thực người dùng bằng Firebase.
`react-dom`: là một package giúp hiển thị các thành phần React trên trình duyệt.
`react-router-dom`: là một package giúp bạn quản lý định tuyến trong ứng dụng của mình.
`firebase`: là một platform dịch vụ đám mây, cung cấp các dịch vụ cho phép lưu trữ dữ liệu, xác thực người dùng, phân tích, đăng nhập và đăng ký từ xa.
`bootstrap`: là một framework CSS phổ biến giúp bạn thiết kế các giao diện web đẹp và đáp ứng.
Bước 1: Tạo một ứng dụng React mới

Để bắt đầu, bạn cần tạo một ứng dụng React mới. Bạn có thể làm điều này bằng cách sử dụng lệnh sau:

###  `npx create-react-app my-app`
Trong đó "my-app" là tên của ứng dụng mới của bạn. Sau khi tạo xong, bạn có thể chạy ứng dụng của mình bằng lệnh:

###  `cd my-app`
npm start
Bước 2: Cài đặt các package cần thiết

Để sử dụng các package đã nêu ở trên, bạn cần cài đặt chúng vào ứng dụng của mình. Bạn có thể làm điều này bằng cách sử dụng lệnh sau:

###    `npm install --save firebase react-firebase/auth react-router-dom bootstrap`
Bước 3: Cấu hình Firebase

Bạn cần cấu hình Firebase cho ứng dụng của mình để sử dụng các tính năng xác thực người dùng. Để làm điều này, truy cập vào trang Firebase Console, đăng nhập vào tài khoản của mình và tạo một dự án mới.

Sau đó, bạn cần tạo một ứng dụng mới và lấy các thông tin cấu hình của nó, bao gồm cả "API Key", "Auth Domain", "Database URL", "Project ID", "Storage Bucket" và "Messaging Sender ID".

Sau khi đã cài đặt các package cần thiết, để chạy ứng dụng React bằng lệnh npm start, bạn có thể thực hiện các bước sau:

Mở terminal hoặc command prompt và di chuyển đến thư mục chứa project của bạn.

Chạy lệnh 

### `npm start`.

Đợi một vài giây để ứng dụng được khởi động và trình duyệt web của bạn sẽ tự động mở và hiển thị ứng dụng.

Lưu ý: Trong quá trình chạy ứng dụng, nếu bạn có thay đổi code, trình duyệt sẽ tự động reload lại trang để hiển thị các thay đổi đó.