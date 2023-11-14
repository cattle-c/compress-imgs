export class CompressImgsError extends Error {
  constructor(message='compress imgs error') {
    super(message);
  };
}

export class NoFileOrDirectory extends CompressImgsError {
  constructor(message='no such file or directory') {
    super(message);
  };
}

export class NoImage extends CompressImgsError {
  constructor(message='no image') {
    super(message);
  };
}