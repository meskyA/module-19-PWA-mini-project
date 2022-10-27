const path = require('path');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js'
    },

    // TODO: Add the correct output
    // output our bundles.
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // TODO: Add the correct plugins
    plugins: [
    //  webpack plugin that generates our html file and injects our bundles.
    new HTMLWebpackPlugin({
      template: './index.html',
      title: 'Contact Cards'
    }),
    // Injects our custom service worker
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),
    // Creates a manifest.json file.
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Contact Cards',
      short_name: 'Contact',
      description: 'Never forget your contacts!',
      backgroung_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),

        },
      ],
 
    }),
    ],

    // TODO: Add the correct modules
    module: {
      // css loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // we use bable-loader in order to use ES6
        }
      ]

    }
  };
};
