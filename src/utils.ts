import path from "path";
import fs from 'fs';
import { readdir } from 'node:fs/promises'
import { CompressOption, CompressFile, JpegOption, PngOption, WebpOption, GifOption, AvifOption, HeifOption } from "./interface.js";
import { NoFileOrDirectory } from "./errors.js";
import { fileTypeFromFile } from "file-type";
import sharp from "sharp";

// 默认配置
export const defaultOption: Omit<CompressOption, 'input'> = {
  quality: 90,
  output: path.join(process.cwd(), 'new_img'),
}

// 获取文件
export async function getFiles(dir: string, base?: string): Promise<CompressFile[]>{
  const files: CompressFile[] = [];
  // 如果目录不存在
  if(!fs.existsSync(dir)){
    throw new NoFileOrDirectory()
  }

  // 如果是文件
  const dirStat = fs.statSync(dir);
  if(dirStat.isFile()) {
    files.push({
      name: path.basename(dir),
      path: dir,
      fullPath: path.join(process.cwd(), dir),
      size: dirStat.size,
      mime: (await fileTypeFromFile(dir))?.mime,
    })
    return files;
  }
  // 不是文件也不是目录
  if(!dirStat.isDirectory()) {
    throw new NoFileOrDirectory()
  }
  // 读取目录下的内容
  const fileList = await readdir(dir);
  for(let index in fileList) {
    const file = fileList[index]
    const fullPath = path.join(dir, file)
    // 如果不存在
    if(!fs.existsSync(fullPath)){
      continue;
    }

    // 如果是文件
    const fileStat = fs.statSync(fullPath);
    if(fileStat.isFile()) {
      files.push({
        name: path.basename(fullPath),
        fullPath: fullPath,
        path: base ? path.relative(base, fullPath) : path.basename(fullPath),
        size: fileStat.size,
        mime: (await fileTypeFromFile(fullPath))?.mime,
      })
      continue;
    }
    // 如果是目录
    if(fileStat.isDirectory()){
      const fileList = await getFiles(fullPath, base ?? dir)
      files.push(...fileList)
      continue;
    }
  }
  

  return files;
}

// 输出文件
export async function writeFile(filePath: string, buffer: Buffer): Promise<boolean> {

  return new Promise((resolve, reject) => {
    const dir = path.dirname(filePath);
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir, {recursive: true})
    }
    const stream = fs.createWriteStream(filePath, {flags: 'w'})
    stream.on('error', (err) => {
      reject(err);
    })
    stream.on('close', () => {
      resolve(true)
    })
    stream.write(buffer);
    stream.end()
  })
}

// jpeg压缩
export async function compressJpeg(path: string, option: JpegOption): Promise<Buffer> {
  return await sharp(path).jpeg({
    ...option,
  }).toBuffer();
}

// png 压缩
export async function compressPng(path: string, option: PngOption): Promise<Buffer> {
  return await sharp(path).png({
    ...option,
  }).toBuffer();
}

// webp 压缩
export async function compressWebp(path: string, option: WebpOption): Promise<Buffer> {
  return await sharp(path, { animated: true }).webp({
    ...option,
  }).toBuffer();
}

// gif 压缩
export async function compressGif(path: string, option: GifOption): Promise<Buffer> {

  return await sharp(path, { animated: true }).gif({ ...option,}).toBuffer();
}

// avif 压缩
export async function compressAvif(path: string, option: AvifOption): Promise<Buffer>{
  return await sharp(path).avif({
    ...option,
  }).toBuffer();
}

// heif 压缩
export async function compressHeif(path: string, option: HeifOption): Promise<Buffer>{
  return await sharp(path).heif({
    ...option,
  }).toBuffer();
}
