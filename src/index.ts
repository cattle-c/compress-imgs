import CompressImgs from "./app.js"

(async () => {
  const app = new CompressImgs({
    input: './img',
    quality: 80,
  })
  await app.start()
})()
