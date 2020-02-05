const path = require('path');

module.exports = {
    entry: './sample/sample.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000,
        historyApiFallback: {
          index: 'index.html'
        }
    }
};
