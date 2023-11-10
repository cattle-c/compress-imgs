export class NoFileOrDirectory extends Error {
  constructor(message='no such file or directory') {
    super(message);
  };
}