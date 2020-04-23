const express = require('express');
const path = require('path')
const app = express();

const port = 3000;
const host = '0.0.0.0';
const angularResources = [
    "ner-annotation-suite"
];


angularResources.forEach(resource => {
    // Build URI under "projects" route
    let uri = '/projects/' + resource;
    // host angular application as static page
    app.use(uri, express.static(__dirname + uri));
    // direct any sub routes to this application
    app.get(uri + '/*', (req, res, next) => {
        res.sendFile(path.join(__dirname, uri, 'index.html'))
    })
});

// Host hub site after all others
app.use('/', express.static(__dirname + '/portfolio-site'));
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/portfolio-site', 'index.html'))
})

app.listen(port, host, () => {
    console.log(__dirname)
    console.log(`Project Running on port ${port}`);
});
