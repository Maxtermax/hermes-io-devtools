const path = require("path");

module.exports = {
  webpack: function (config) {
    config.devtool = "source-map";
    config.output = {
      ...config.output,
      filename: 'bundle.min.js',
      publicPath: '/build/',
    };
    config.resolve = {
      extensions: [".js", ".html"],
      alias: {
        "@observers": path.resolve(__dirname, "src/core/observers"),
        "@core": path.resolve(__dirname, "src/core"),
        "@views": path.resolve(__dirname, "src/core/views"),
        "@components": path.resolve(__dirname, "src/core/views/components"),
        "@contexts": path.resolve(__dirname, "src/core/contexts"),
        "@factory": path.resolve(__dirname, "src/core/factory"),
        "@hooks": path.resolve(__dirname, "src/core/views/hooks"),
        "@utils": path.resolve(__dirname, "src/core/utils"),
        "@libs": path.resolve(__dirname, "src/libs"),
        "@constants": path.resolve(__dirname, "src/core/constants"),
        "@translations": path.resolve(__dirname, "src/core/translations"),
        "@theme": path.resolve(__dirname, "src/core/theme"),
        "@routes": path.resolve(__dirname, "src/core/routes"),
      },
    };
    config.module.rules.push({
      test: /\.js$/,
      loader: "esbuild-loader",
      options: {
        loader: "jsx",
        target: "es2020",
      },
    });
    return config;
  },
};
