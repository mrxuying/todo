/* craco.config.js */
const CracoLessPlugin = require('craco-less');
module.exports = {
  webpack: {},
  babel: {},
  //配置craco提供的plugin
  plugins: [
        {   // 修改antd主题
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        math: 'always',
                        modifyVars: {
                            '@primary-color': '#1890ff', //主题颜色
                        }, 
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
