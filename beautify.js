const exclude = ["vue.js", "bijou.js", "tailwind.css"]

function beautify() {
  var dirs = ["./", "./public"]
  dirs.forEach((dir) => {
    const prettier = require("prettier")
    const fs = require("fs")
    let files = fs.readdirSync(dir).filter((i) => i.endsWith(".js"))
    for (let file of files) {
      if (exclude.includes(file)) return
      console.log("Beautifying " + file)
      let beautified = prettier.format(
        fs.readFileSync(`${dir}/${file}`, "utf-8"),
        {
          semi: false,
          parser: "babel",
        }
      )
      fs.writeFileSync(`${dir}/${file}`, beautified)
      console.log("Done beautifying " + file)
    }
  })
}
module.exports = beautify
beautify()
