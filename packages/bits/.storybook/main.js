const path = require('path');




module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../lib/**/*.stories.mdx",
    "../lib/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/preset-scss',
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {

    let rule = config.module.rules.find(r =>
      // it can be another rule with file loader 
      // we should get only svg related
      r.test && r.test.toString().includes('svg') &&
      // file-loader might be resolved to js file path so "endsWith" is not reliable enough
      r.loader && r.loader.includes('file-loader')
  );
  rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

  config.module.rules.push(
    {
        test: /\.svg$/,
        use: ['vue-svg-loader']
    }
  );

  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./'),
  ];

  // Return the altered config
  return config;
  },
}