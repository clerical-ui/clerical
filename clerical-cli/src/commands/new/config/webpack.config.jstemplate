const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const prod = process.env.NODE_ENV === 'production' || process.argv.join().includes('--production');

module.exports = {
    entry: './src/main.ts',
    mode: prod ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
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
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 9000,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/assets', to: 'assets' }
        ]),
    ]
};
