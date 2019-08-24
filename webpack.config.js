const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    devtool: 'source-map',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ["@babel/preset-env"] }
                    }
                ]
            },
            {
                test: /fancybox[\/\\]dist[\/\\]js[\/\\]jquery.fancybox.cjs.js/,
                use: "imports-loader?jQuery=jquery,$=jquery,this=>window"
            }


        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.ProvidePlugin({

            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })

    ]
};

module.exports = config;