const fs = require("fs");
const path = require("path");

// Kataloglar ro'yxati
const directories = [
"./watches",
"./radoWatches"
]; // Kataloglarni qo'shing

// Natijani yozish uchun HTML fayl
const outputFile = "./index.html";

// Har bir katalogdagi rasmlarni HTMLga qo'shish funksiyasi
const generateImagesHTML = (directory) => {
  const files = fs.readdirSync(directory);

  // Faqat PNG va WEBP formatdagi rasimlarni filtrlash
  const imageFiles = files.filter((file) => /\.(png|webp)$/i.test(file));

  // Har bir rasm uchun <img> taglar yaratish
  const imgTags = imageFiles
    .map(
      (file) =>
        `<img src="${directory}/${file}" alt="${path.parse(file).name}" />`
    )
    .join("\n");

  return `
    <div class="watchs">
      <div class="${path.basename(directory)}">
        <h1>${path.basename(directory)} Watches</h1>
        <div class="images">
          ${imgTags}
        </div>
      </div>
    </div>
  `;
};

// HTMLni yig'ish
let allHTMLContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Watch Outlet</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
`;

// Har bir katalogni ishlovdan o'tkazish
directories.forEach((dir) => {
  if (fs.existsSync(dir)) {
    allHTMLContent += generateImagesHTML(dir);
  } else {
    console.warn(`Katalog mavjud emas: ${dir}`);
  }
});

// HTML tugatish
allHTMLContent += `
</body>
</html>
`;

// HTML faylga yozish
fs.writeFile(outputFile, allHTMLContent, (err) => {
  if (err) {
    console.error("HTML faylni yozishda xatolik:", err);
    return;
  }
  console.log(`HTML fayl muvaffaqiyatli yaratildi: ${outputFile}`);
});