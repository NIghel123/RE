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
        },
        createRoadtrip: {
            route: '/roadtripErstellen',
            content: {
                title: "Mache deinen eignen<br>Roadtrip",
                "textarea-label": "Beschreibe hier Deinen Traum-RoadTrip:",
                "textarea-placeholder": "Erlebe das leben in all seinen Farben.Freiheit und Einheit sei auch mit dabei! Lorem ipsilum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren. *Brigitte*................",
                date: {
                    day: {
                        placeholder: "Tag"
                    },
                    month: {
                        placeholder: "Monat",
                        names: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
                    },
                    year: {
                        placeholder: "Jahr"
                    },
                    label: "Abfahrtsdatum"
                },
                "duration-of-trip": {
                    label: "Beschreibe in einem kurzen Text wie lange du unterwegs sein willst",
                    placeholder: "Reisedauer",
                },
                "save-roadtrip": "Roadtrip Speichern",
            }
        }
    }
}

exports.setLanguage = function(lang) {
    return function(view) { // function to get the context of the page!
        return context[lang][view];
    }
}
