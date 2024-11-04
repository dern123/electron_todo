const path = require('path');

module.exports = [
  // Add support for native node modules
  {
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  {
    test: /\.css$/,
    include: [path.resolve(__dirname, 'app/src')],
    use: ['style-loader',  'css-loader', 'postcss-loader'],
  },
  // {
  //   test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
  //   use: [
  //     {
  //       loader: 'file-loader',
  //       options: {
  //         name: '[path][name].[ext]',
  //         context: 'src', // prevent display of src/ in filename
  //       },
  //     },
  //   ],
  // },
  // Alternatively, you can use ts-loader instead of babel-loader if you're only using TypeScript
  // {
  //   test: /\.tsx?$/,
  //   exclude: /(node_modules|.webpack)/,
  //   use: [
  //     {
  //       loader: 'ts-loader',
  //       options: {
  //         transpileOnly: true,
  //       },
  //     },
  //   ],
  // },
];
