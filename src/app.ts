import path from "path";
import { AvifOption, CompressFile, CompressOption, GifOption, HeifOption, JpegOption, PngOption, WebpOption } from "./interface.js";
import { compressAvif, compressGif, compressHeif, compressJpeg, compressPng, compressWebp, defaultOption, getFiles, writeFile } from './utils.js'


export default class CompressImgs {
  config: CompressOption
  private files: CompressFile[] = []
  constructor(config: Partial<Pick<CompressOption, 'output'>> & Omit<CompressOption, 'output'> | string) {
    this.config = this.initConfig(config);
  }
  // 初始化配置
  private initConfig(config: Partial<Pick<CompressOption, 'output'>> & Omit<CompressOption, 'output'> | string): CompressOption {
    if(typeof config === 'string'){
      return Object.assign({input: path.join(process.cwd(), config)}, defaultOption)
    }
    const option = Object.assign({}, defaultOption, config);
    option.gif = Object.assign({}, defaultOption.gif, config.gif);
    option.png = Object.assign({}, defaultOption.png, config.png);
    option.webp = Object.assign({}, defaultOption.webp, config.webp);
    option.jpeg = Object.assign({}, defaultOption.jpeg, config.jpeg);
    return option;
  }
  // 获取文件
  private async initFiles():Promise<void>{
    const input = this.config.input;
    this.files = await getFiles(input);
  }
  // 开始压缩
  async start(): Promise<void> {
    await this.initFiles();
    console.log('[log] 获取目录文件完成');
    for(let index in this.files) {
      const file = this.files[index]
      
      console.log('[log] 开始压缩', file.name);
      const buffer = await this.compress(file);
      console.log('[log] 压缩完成', file.name);
      if(!buffer) continue;
      console.log('[log] 输出到文件', file.name);
      await this.toFile(file, buffer)
      console.log('[log] 输出到文件完成', file.name);
      
    }
  }
  // 压缩文件
  private async compress(file: CompressFile): Promise<Buffer | undefined> {
    if(!file.mime?.includes('image')) {
      return;
    }
    switch(file.mime) {
      case  'image/jpeg':
        return await this.jpeg(file.fullPath);
      case 'image/png':
        return await this.png(file.fullPath);
      case 'image/webp':
        return await this.webp(file.fullPath);
      case 'image/gif':
        return await this.gif(file.fullPath);
    }
  }
  // jpeg 处理
  private async jpeg(path: string): Promise<Buffer> {
    const option: JpegOption = {
      quality: this.config.jpeg?.quality ?? this.config.quality,
    }
    return compressJpeg(path, option);
  }
  // png 处理
  private async png(path: string): Promise<Buffer> {
    const option: PngOption = {
      quality: this.config.jpeg?.quality ?? this.config.quality,
    }
    return compressPng(path, option);
  }
  // webp 处理
  private async webp(path: string): Promise<Buffer> {
    const option: WebpOption = {
      quality: this.config.jpeg?.quality ?? this.config.quality,
    }
    return compressWebp(path, option);
  }
  // gif 处理
  private async gif(path: string): Promise<Buffer> {
    const option: GifOption = {
      quality: this.config.jpeg?.quality ?? this.config.quality,
    }
    return compressGif(path, option);
  }

  // avif 处理
  private async avif(path: string): Promise<Buffer> {
    const option: AvifOption = {
      quality: this.config.jpeg?.quality ?? this.config.quality,
    }
    return compressAvif(path, option);
  }

  // heif 处理
  private async heif(path: string): Promise<Buffer> {
    const option: HeifOption = {
      quality: this.config.jpeg?.quality ?? this.config.quality,
    }
    return compressHeif(path, option);
  }
  // 输出文件
  private async toFile(file: CompressFile, buffer: Buffer): Promise<boolean>{
    const output = this.config.output;
    const outputPath = path.join(output, file.path)
    return await writeFile(outputPath, buffer)
  }
}

(async () => {
  const app = new CompressImgs({
    input: './img',
    quality: 50,
  })
  await app.start()
})()