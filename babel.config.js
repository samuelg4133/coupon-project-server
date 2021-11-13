module.exports = {
  presets: [
    ["@babel/preset-env", {
      target: {
        node: "current"
      }
    }], 
    "@babel/preset-typescript"
  ],
  plugin: [
    ["module-resolver", {
      alias: {
        "@modules": [
          "./src/modules"
        ],
        "@config": [
          "./src/config"
        ],
        "@shared": [
          "./src/shared"
        ]
      }
    }],
    "babel-plugin-transform-typescript-metada",
    ["@babel/plugin-proposal-class-properties", {loose: true}],
    ["@babel/plugin-proposal-decorators", {legacy: true}]
  ]
}