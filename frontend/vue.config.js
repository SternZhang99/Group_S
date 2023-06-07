module.exports = {
    devServer: {
      proxy: {
        '/upload': {
          target: 'https://grrjeekrpgweiuqlipz6gnlrmi0iqcfq.lambda-url.us-east-2.on.aws/', // 目标服务器地址
          changeOrigin: true, // 允许跨域
          pathRewrite: {
            '^/upload': '' // 将URL中的/api前缀替换为空字符串
          }
        },
        '/getAllimages': {
            target: 'https://ofcmzsch7h6ytbiujjdbw2cwdm0xcpyv.lambda-url.us-east-2.on.aws/', // 目标服务器地址
            changeOrigin: true, // 允许跨域
            pathRewrite: {
              '^/getAllimages': '' // 将URL中的/api前缀替换为空字符串
            }
        },
        '/query': {
            target: 'https://3kxhloq5gznl3pusrzmwhlbipe0qfihz.lambda-url.us-east-2.on.aws/', // 目标服务器地址
            changeOrigin: true, // 允许跨域
            pathRewrite: {
              '^/query': '' // 将URL中的/api前缀替换为空字符串
            }
        },
        '/findByImage': {
            target: 'https://oaavzpnruswhl66xqps5ktybxm0ewgpk.lambda-url.us-east-2.on.aws/', // 目标服务器地址
            changeOrigin: true, // 允许跨域
            pathRewrite: {
              '^/findByImage': '' // 将URL中的/api前缀替换为空字符串
            }
        },
        '/deleteImage': {
            target: 'https://z33qhgh4jra6xfodn5k5fmpx2u0tsheg.lambda-url.us-east-2.on.aws/', // 目标服务器地址
            changeOrigin: true, // 允许跨域
            pathRewrite: {
              '^/deleteImage': '' // 将URL中的/api前缀替换为空字符串
            }
        },
      },
      port: 80
    }
  }