function route(app, express) {
  app.use(express.static(`${__dirname}/minified`))
  app.use(express.static(`${__dirname}/public`))
  app.get("/:id/update", (req, res) => {
    res.sendFile(`${__dirname}/minified/update.html`)
  })
}
module.exports = route

/* 
var dir = `${__dirname}/public`
	app.get("/", (req, res) => res.sendFile(`${dir}/index.html`));
	
	app.get("/noscript", (req, res) => res.sendFile(`${dir}/noscript.html`));

	app.get("/favicon.png", (req, res) => res.sendFile(`${dir}/favicon.png`));

	app.get("/embed.json", (_, res) => res.sendFile(`${dir}/embed.json`));

	app.get("/iconify.js", (_, res) => res.sendFile(`${dir}/iconify.js`));

	app.get("/snackbar.css", (_, res) => res.sendFile(`${dir}/snackbar.css`));

	app.get("/snackbar.js", (_, res) => res.sendFile(`${dir}/snackbar.js`));

	app.get("/tailwind.css", (_, res) => res.sendFile(`${dir}/tailwind.css`));

	app.get("/vue.js", (_, res) => res.sendFile(`${dir}/vue.js`));
	
	app.get("/bijou.js", (_, res) => res.sendFile(`${dir}/bijou.js`));
 */
