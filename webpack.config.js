const path = require('path');

module.exports = {
    entry: [
        './app.js'
    ],
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './assets/dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ] 
            },
            {
                test: /\.s[ac]ss$/, 
                use: [
                    { loader : "style-loader" },
                    { loader : "css-loader" },
                    { loader: "sass-loader" }
                ] 
            },
            {
                test: /\.tsx?$/, 
                use: [
                    { loader: "ts-loader" },
                ],
                exclude: /node_modules/,
            }
        ]
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    }
}