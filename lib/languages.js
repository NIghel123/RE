var context = {
    de: {
        home: {
            route: '/',
            content: [{
                    text: 'Mache deinen<br>Traumroadtrip',
                    link: '/createRoadtrip'
                },
                {
                    text: 'Mitfahrer für<br>Roadtrips gesucht',
                    link: '/viewRoadtrips'
                },
                {
                    text: 'Was ist das<br>für eine Seite?',
                    link: '/whatSiteIsThis'
                },
                {
                    text: 'Einloggen',
                    link: '/login'
                },
            ]
        }
        createRoadtrip: {
            route: '/roadtripErstellen',
            content:
        }
    }
}

exports.setLanguage = function(lang) {
    return function(view) { // function to get the context of the page!
        return context[lang][view];
    }
}
