//importing express
var express = require('express'),
    // we will need both the express-framework and the app
    // so we put them in different variables.
    app = express();
// we now want to set up our view engine. We choose handlebars!

/* define where out website will run locally.
 * the process.env is an object created by nodejs to mirror the enviroment
 * i.e. the computer or server, where it is beeing executed. 
 */
app.set('port', process.env.PORT || 3000);

/* the following is called a view engine! It gives us the possibility to template our html files,
 * i.e. we can but each single page of our site into the same main.hbs file. This allows us to write
 * out code only at ONE place! And not to write it in different places!
 */
app.set('view engine', 'hbs');

/*=================================ROUTES==================================
 * we set our routing, i.e the paths where the browser will find the pages
 * of the website. */
app.get('/', function(req, res) {
    res.status(404);
    res.render('home');
});


/*=================================SERVER-ERRROR HANDLING==================
 * this section contains error handlers that will catch errors like:
 * Route entered in the browswer was not specified before.
 */

//This function will be used when the page typed into the browser was not found! 
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

//This function will be used when there was an Javascript-Error on the server!
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

/*=================================SERVER==================================
 * in this section we start the server up! */

/*This method of the express app defines what PORT the server will be listening to*/
app.listen(
    /* FIRST ARGUMENT: Defines what port the server is listening to in the browser
     */
    app.get('port'),
    /* SECOND ARGUMENT: Defines what call-back to call when the server has been
     * started. Our callback will only tell us where the server can be found!*/
    function() {
        /* post a message to the console. */
        console.log('Express started on http://localhost:' +
            app.get('port') + '; press Ctrl-C to terminate the Server.');
    }
);
