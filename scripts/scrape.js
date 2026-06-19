import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';

(async () => {
  console.log('Khởi động trình duyệt tự động...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Fake User Agent to avoid being blocked
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  console.log('Truy cập Facebook của SaintCons...');
  try {
    await page.goto('https://www.facebook.com/profile.php?id=100088512900754', { waitUntil: 'networkidle2', timeout: 30000 });
  } catch(e) {
    console.log("Mạng chậm, vẫn tiếp tục trích xuất...");
  }

  // Bỏ qua popup đăng nhập nếu có
  await page.evaluate(() => {
    const closeBtn = document.querySelector('[aria-label="Đóng"], [aria-label="Close"]');
    if (closeBtn) closeBtn.click();
  });

  // Cuộn trang để load ảnh
  console.log('Đang cuộn trang để tìm kiếm hình ảnh...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 300;
      let timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= 4000) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });

  // Chờ thêm 1 chút cho ảnh load
  await new Promise(r => setTimeout(r, 2000));

  // Lấy các ảnh
  const imageUrls = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'))
      .filter(img => img.width > 150 || img.height > 150)
      .map(img => img.src)
      .filter(src => src && (src.includes('scontent') || src.includes('fbcdn')));
    return [...new Set(images)];
  });

  console.log(`Tìm thấy ${imageUrls.length} ảnh nổi bật! Bắt đầu tải...`);

  // Tải tối đa 6 ảnh
  const downloadCount = Math.min(imageUrls.length, 6);
  for (let i = 0; i < downloadCount; i++) {
    const url = imageUrls[i];
    const filePath = path.join(process.cwd(), 'public', `fb_auto_${i + 1}.jpg`);
    
    await new Promise((resolve) => {
      https.get(url, (res) => {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`[+] Đã tải ảnh ${i + 1}: fb_auto_${i + 1}.jpg`);
          resolve();
        });
      }).on('error', (err) => {
        console.error(`[-] Lỗi tải ảnh ${i + 1}: `, err);
        resolve();
      });
    });
  }

  await browser.close();
  console.log('Hoàn tất tự động hóa! Các ảnh đã được lưu vào thư mục public.');
})();
