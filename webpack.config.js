const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.export = {
    mode: "development",
    entry: "./src/index.tsx", // точка входа в приложение
    output: {
        filename: "main.js", // название бандла (куда собираем)
        path: path.resolve(__dirname, "dist"), // путь к папке (куда собираем), dist -название папки
        clear : true,
    }, // что и куда собирается
    devtool: "inline-source-map", // для дебага,
    devServer: {
        contentBase: "./dist" // путь к бандлу
    },  // для автоматической сборки и перезагрузки страницы при сохранении
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "test webpack",
            template: path.join(__dirname, "src", "index.html")
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node-modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node-modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-typescript"]
                    }
                }
            },
            {
                test: /\.css$/i,
                exclude: /node-modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|svg|jpeg|jgp|gif)$/i,
                type: "asset/resourse"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resourse"
            }
        ]
    }
}
