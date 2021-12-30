module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // setting 'compileType' to "icss" sovled my problem without side effect.
            options: { modules: { compileType: 'icss' } },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
