export interface CompressOption {
  // 需要压缩的图片文件或目录
  input: string;
  // 输出目录 默认 new_img
  output: string;
  // 图片质量，如果 图片的私有配置中没有声明则默认读取该字段
  quality?: number;
  // png 图片的私有配置
  png?: PngOption;
  // jpeg 图片的私有配置
  jpeg?: JpegOption;
  // webp 图片的私有配置
  webp?: WebpOption;
  // gif 图片的私有配置
  gif?: GifOption;
  // avif 图片的私有配置
  avif?: AvifOption;
  // heif 图片的私有配置
  heif?: HeifOption;
}

  // png 图片的私有配置
export interface PngOption {
  quality?: number;
}

  // jpeg 图片的私有配置
export interface JpegOption {
  quality?: number;
  
}

  // webp 图片的私有配置
export interface WebpOption{
  quality?: number;
  
}
  // gif 图片的私有配置
export interface GifOption {
}

// avif 图片的私有配置
export interface AvifOption {
  quality?: number
}

// heif 图片的私有配置
export interface HeifOption {
  quality?: number

}


// 文件属性
export interface CompressFile {
  name: string;
  path: string;
  size: number;
  fullPath: string;
  mime?: string;
}

