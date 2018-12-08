export default function log(...args) {
  // 判断环境，如果是开发环境就打印，生产环境不打印
  if (process.env.NODE_ENV === 'development') {
    console.log.apply(console, args);
  }
}
