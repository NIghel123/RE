//importing express
var express = require('express'),
    // we will need both the express-framework and the app
    // so we put them in different variables.
    app = express(),
    handlebars = require('express-handlebars');

/* define where out website will run locally.
 * the process.env is an object created by nodejs to mirror the enviroment
 * i.e. the computer or server, where it is beeing executed. 
 */
app.set('port', process.env.PORT || 3000);

/* next we define our view engine. It allows us to load a single 'surrounding' html page
 * as out 'layout' and to only put the content that changes into the different webpages
 * in a nutshell it saves us a lot of writing and the code is only defined once for all pages! 
 * So that gives us an advantage in maintainability!
 *
 *
 */
handlebars = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            //most of the time this._sections is undefined!
            if (!this._sections) this._sections = {};
            //options.fn(this) is the content between the {{#section 'name'}} content 
            //{{/section}} placeholders inside the layout file! 
            //The property '_sections.name' will be the one rendered inside the 
            //{{{_sections.name}}} placeholder in the main.hbs!
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

/* now before we define any routes we need to define where node normally looks to get
 * css and javascript and libraries that are on the server. We do that by defining a
 * standard route to look up sources:
 */
app.use(express.static(__dirname + '/public'));
/* the standard folder is the public folder now. So any path inside our scripts starts at this foler!
 * thus it is not a relative path anymore!
 */

/*=================================ROUTES==================================
 * we set our routing, i.e the paths where the browser will find the pages
 * of the website. */
app.get('/', function(req, res) {
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
    res.status(505);
    res.render('505');
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
