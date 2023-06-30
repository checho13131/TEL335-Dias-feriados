module.exports = {
    resolve: {
      fallback :{
        "url": require.resolve("url/") ,
        "querystring": require.resolve("querystring-es3") ,
        "path" : require.resolve("path-browserify") ,
        "buffer" : require.resolve("buffer/") ,
        "util" : require.resolve("util/") ,
        "stream" : require.resolve("stream-browserify") ,
        "http" : require.resolve("stream-http") ,
        "crypto" : require.resolve("crypto-browserify"),
        "zlib": require.resolve("browserify-zlib")
      } 
    }
  };