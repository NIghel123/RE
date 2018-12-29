//importing express
var express = require('express'),
    // we will need both the express-framework and the app
    // so we put them in different variables.
    app = express(),
    handlebars = require('express-handlebars'),
    languages = require('./lib/languages.js');
var getPage = languages.setLanguage('de');
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
        /* the function 'section' is obviously invoked inside the views e.g. in home.hbs with 
         * {{#section 'sidebar'}} . I.e. it is passed the argument 'sidebar' which is below referred to
         * as 'name'*/
        section: function(name, options) {
            //most of the time this._sections is undefined!
            if (!this._sections) this._sections = {};
            //options.fn(this) is the content between the {{#section 'name'}} content 
            //{{/section}} placeholders inside the layout file! 
            //The property '_sections.name' will be the one rendered inside the 
            //{{{_sections.name}}} placeholder in the main.hbs!
            /* Now I know what options.fn(this) does! It fills in the context (=this) into the 
             * markup between the {{section 'name'}} ... markup ... {{/section}} tags! */
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
app.get('/start', function(req, res) {
    res.render('start',
        /* what we are doing now is switching of the sidebar in the layout file via the {{#if fullscreen}}
         * handlebar tags in the main.hbs file!
         */
        {
            fullscreen: true //also the value false would switch this mode on due to the behaviour of the #if
        }
    );
});
app.get(getPage('home').route, function(req, res) {
    res.render('home',
        /*the content of the buttons of the sidebar (from top to bottom)*/
        {
            context: getPage('home').content
        }
    );
});

app.get('/login', function(req, res) {
    res.render('login', {
        fullscreen: true
    });
});

app.get('/createRoadtrip', function(req, res) {
    res.render('createRoadtrip');
});

app.get('/viewRoadtrips', function(req, res) {
    res.render('viewRoadtrips');
});

app.get('/whatSiteIsThis', function(req, res) {
    res.render('whatSiteIsThis');
});

app.get('/chat', function(req, res) {
    res.render('chat');
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
