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


  // jpeg 图片的私有配置
export interface JpegOption {
   /** Quality, integer 1-100 (optional, default 80) */
   quality?: number;
   /** Use progressive (interlace) scan (optional, default false) */
   progressive?: boolean;
   /** Set to '4:4:4' to prevent chroma subsampling when quality <= 90 (optional, default '4:2:0') */
   chromaSubsampling?: string;
   /** Apply trellis quantisation (optional, default  false) */
   trellisQuantisation?: boolean;
   /** Apply overshoot deringing (optional, default  false) */
   overshootDeringing?: boolean;
   /** Optimise progressive scans, forces progressive (optional, default false) */
   optimiseScans?: boolean;
   /** Alternative spelling of optimiseScans (optional, default false) */
   optimizeScans?: boolean;
   /** Optimise Huffman coding tables (optional, default true) */
   optimiseCoding?: boolean;
   /** Alternative spelling of optimiseCoding (optional, default true) */
   optimizeCoding?: boolean;
   /** Quantization table to use, integer 0-8 (optional, default 0) */
   quantisationTable?: number;
   /** Alternative spelling of quantisationTable (optional, default 0) */
   quantizationTable?: number;
   /** Use mozjpeg defaults (optional, default false) */
   mozjpeg?: boolean;
  
}

// png 图片的私有配置
  export interface PngOption {
    /** Use the lowest number of colours needed to achieve given quality (optional, default `100`) */
    quality?: number | undefined;
     /** Use progressive (interlace) scan (optional, default false) */
    progressive?: boolean | undefined;
    /** zlib compression level, 0-9 (optional, default 6) */
    compressionLevel?: number | undefined;
    /** Use adaptive row filtering (optional, default false) */
    adaptiveFiltering?: boolean | undefined;
    /** Level of CPU effort to reduce file size, between 1 (fastest) and 10 (slowest), sets palette to true (optional, default 7) */
    effort?: number | undefined;
    /** Quantise to a palette-based image with alpha transparency support (optional, default false) */
    palette?: boolean | undefined;
    /** Maximum number of palette entries (optional, default 256) */
    colours?: number | undefined;
    /** Alternative Spelling of "colours". Maximum number of palette entries (optional, default 256) */
    colors?: number | undefined;
    /**  Level of Floyd-Steinberg error diffusion (optional, default 1.0) */
    dither?: number | undefined;
  }
  
  // webp 图片的私有配置
export interface WebpOption{
  /** Quality, integer 1-100 (optional, default 80) */
  quality?: number | undefined;
  /** Quality of alpha layer, number from 0-100 (optional, default 100) */
  alphaQuality?: number | undefined;
  /** Use lossless compression mode (optional, default false) */
  lossless?: boolean | undefined;
  /** Use near_lossless compression mode (optional, default false) */
  nearLossless?: boolean | undefined;
  /** Use high quality chroma subsampling (optional, default false) */
  smartSubsample?: boolean | undefined;
  /** Level of CPU effort to reduce file size, integer 0-6 (optional, default 4) */
  effort?: number | undefined;
  /** Prevent use of animation key frames to minimise file size (slow) (optional, default false) */
  minSize?: boolean;
  /** Allow mixture of lossy and lossless animation frames (slow) (optional, default false) */
  mixed?: boolean;
  /** Preset options: one of default, photo, picture, drawing, icon, text (optional, default 'default') */
  preset?: keyof PresetEnum | undefined;
  
}
  // gif 图片的私有配置
export interface GifOption {
   /** Re-use existing palette, otherwise generate new (slow) */
  reuse?: boolean | undefined;
   /** Use progressive (interlace) scan */
  progressive?: boolean | undefined;
   /** Maximum number of palette entries, including transparency, between 2 and 256 (optional, default 256) */
  colours?: number | undefined;
   /** Alternative spelling of "colours". Maximum number of palette entries, including transparency, between 2 and 256 (optional, default 256) */
  colors?: number | undefined;
   /** Level of CPU effort to reduce file size, between 1 (fastest) and 10 (slowest) (optional, default 7) */
  effort?: number | undefined;
   /** Level of Floyd-Steinberg error diffusion, between 0 (least) and 1 (most) (optional, default 1.0) */
  dither?: number | undefined;
   /** Maximum inter-frame error for transparency, between 0 (lossless) and 32 (optional, default 0) */
  interFrameMaxError?: number;
   /** Maximum inter-palette error for palette reuse, between 0 and 256 (optional, default 3) */
  interPaletteMaxError?: number;
   /** Number of animation iterations, a value between 0 and 65535. Use 0 for infinite animation. (optional, default 0) */
  loop?: number | undefined;
   /** delay(s) between animation frames (in milliseconds), each value between 0 and 65535. (optional) */
  delay?: number | number[] | undefined;
  /** Force format output, otherwise attempt to use input format (optional, default true) */
  force?: boolean | undefined;
}

// avif 图片的私有配置
export interface AvifOption {
  /** quality, integer 1-100 (optional, default 50) */
  quality?: number | undefined;
  /** use lossless compression (optional, default false) */
  lossless?: boolean | undefined;
  /** Level of CPU effort to reduce file size, between 0 (fastest) and 9 (slowest) (optional, default 4) */
  effort?: number | undefined;
  /** set to '4:2:0' to use chroma subsampling, requires libvips v8.11.0 (optional, default '4:4:4') */
  chromaSubsampling?: string | undefined;
}

// heif 图片的私有配置
export interface HeifOption {
   /** quality, integer 1-100 (optional, default 50) */
   quality?: number | undefined;
   /** compression format: av1, hevc (optional, default 'av1') */
   compression?: 'av1' | 'hevc' | undefined;
   /** use lossless compression (optional, default false) */
   lossless?: boolean | undefined;
   /** Level of CPU effort to reduce file size, between 0 (fastest) and 9 (slowest) (optional, default 4) */
   effort?: number | undefined;
   /** set to '4:2:0' to use chroma subsampling (optional, default '4:4:4') */
   chromaSubsampling?: string | undefined;

}


// 文件属性
export interface CompressFile {
  name: string;
  path: string;
  size: number;
  fullPath: string;
  mime?: string;
}



interface PresetEnum {
  default: 'default';
  picture: 'picture';
  photo: 'photo';
  drawing: 'drawing';
  icon: 'icon';
  text: 'text';
}