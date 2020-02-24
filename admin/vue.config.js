module.exports={
  outPutDir:__dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'
  ? '/admin/'
  : '/'
}