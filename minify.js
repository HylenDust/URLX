const exclude = ["vue.js", "bijou.js", "tailwind.css"]
async function init() {
  const fs = require("fs")
  let files = fs
    .readdirSync("./public")
    .filter((i) => /\.(?:js|css|html)$/.test(i))
  console.log("Files: ")
  console.log(files)
  if (!fs.existsSync("minified")) {
    fs.mkdirSync("minified")
  }
  for (let file of files) {
    if (exclude.includes(file)) {
      console.log("Copying excluded file " + file)
      fs.writeFileSync(
        `./minified/${file}`,
        fs.readFileSync(`./public/${file}`)
      )
      console.log("Finished copying " + file)
    } else {
      console.log("Minifying " + file)
      let minified = await minify(`./public/${file}`)
      fs.writeFileSync(`./minified/${file}`, minified)
      console.log("Done minifying " + file)
    }
  }
}
async function minify(file) {
  const { minify: jsMinify } = require("terser")
  var { minify: htmlMinify } = require("html-minifier")
  const fs = require("fs")
  let code = fs.readFileSync(file, "utf8")
  let minified
  if (/\.js$/.test(file)) {
    minified = (await jsMinify(code)).code
  }
  if (/\.css$/.test(file)) {
    var request = require("request")
    var CleanCSS = require("clean-css")
    let opts = {
      level: 2,
      fetch: function (uri, inlineRequest, inlineTimeout, callback) {
        request(uri, function (error, response, body) {
          if (error) {
            callback(error, null)
          } else if (response && response.statusCode != 200) {
            callback(response.statusCode, null)
          } else {
            callback(null, body)
          }
        })
      },
    }
    minified = new CleanCSS(opts).minify(code)
    minified = minified.styles
  }
  if (/\.html$/.test(file)) {
    minified = await htmlMinify(code, {
      customAttrSurround: [
        [/@/, new RegExp("")],
        [/:/, new RegExp("")],
      ],
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      preventAttributesEscaping: true,
      removeComments: true,
      useShortDoctype: true,
    })
  }
  return minified
}

module.exports = init
