const path=require('path');
const HtmlWebPackPlugin=require('html-webpack-plugin');

module.exports={
      output:{
            path:path.join(__dirname,'Frontend','public','webpack'),
            filename:"bundle.js"
      },
      entry: {serverEntry: ['./Frontend/public/react/App.js']},
      devServer: {
            port: 3030, // you can change the port
      },
      module: {
            rules: [
              {
                test: /\.(js|jsx)$/, // .js and .jsx files
                exclude: /node_modules/, // excluding the node_modules folder
                use: {
                  loader: "babel-loader",
                },
              },
              {
                test: /\.(sa|sc|c)ss$/, // styles files
                use: ["style-loader", "css-loader", "sass-loader"],
              },
              {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                loader: "url-loader",
                options: { limit: false },
              },
            ],
      },
      performance:{
          hints:false
      }

}