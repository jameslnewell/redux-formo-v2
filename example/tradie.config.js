var livereload = require('tradie-plugin-livereload').default;
var serve = require('tradie-plugin-serve').default;
var copy = require('tradie-plugin-copy').default;

module.exports = {
  script: {
    bundles: ['./index.jsx'],
    vendors: ['react', 'react-dom', 'redux', 'react-redux'],
    extensions: ['.js', '.jsx']
  },
  webpack: {
    devtool: 'eval'
  },
  plugins: [livereload(), serve(), copy({files: ['index.html']})]
};
