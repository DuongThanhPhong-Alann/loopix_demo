const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(0|\+84)[0-9]{8,10}$/;

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return Response.json({ message: 'Dữ liệu gửi lên không hợp lệ.' }, { status: 400 });
  }

  const fullName = String(body.fullName || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();

  if (!fullName || !emailPattern.test(email) || !phonePattern.test(phone)) {
    return Response.json({ message: 'Vui lòng nhập đúng họ tên, email và số điện thoại.' }, { status: 422 });
  }

  return Response.json({
    ok: true,
    message: 'Đã nhận thông tin báo giá.',
  });
}
