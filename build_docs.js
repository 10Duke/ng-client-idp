var docgen = require('dgeni-alive/src/docgen')();

docgen.Package().config(function(log) {
    log.level = 'info';
});
docgen.src(["dist/*.js"]);
docgen.dest("docs");
docgen.generate().then(function(){
  console.log("Documentation generated");
});
