//importing express
var express = require('express'),
    // we will need both the express-framework and the app
    // so we put them in different variables.
    app = express();

/* define where out website will run locally.
 * the process.env is an object created by nodejs to mirror the enviroment
 * i.e. the computer or server, where it is beeing executed. 
 *
 * TECHNICAL: The 'port' property is an accessor-property of the express-app object.
 * That is why we use app.set('port',...) to access that property! See David Flanagan
 * for reference on accessor-properties!
 */
app.set('port', process.env.PORT || 3000);


/*=================================ROUTES==================================
 * we set our routing, i.e the paths where the browser will find the pages
 * of the website. */
app.get('/', function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('coming home');
});


/*=================================SERVER-ERRROR HANDLING==================
 * this section contains error handlers that will catch errors like:
 * Route entered in the browswer was not specified before.
 */

//This function will be used when the page typed into the browser was not found! 
app.use(function(req, res, next) {
    res.status(404);
    res.send('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.send('500');
});

/*=================================SERVER==================================
 * in this section we start the server up! */

/*This method of the express app defines what PORT the server will be listening to*/
app.listen(
    /* FIRST ARGUMENT: Defines what port the server is listening to in the browser
     *
     * TECHNICAL: since 'port' is an accessor property of the 
     * express-object,we can retrieve it with the getter-method 
     * .get()!
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
