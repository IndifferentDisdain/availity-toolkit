const Ekko = require('availity-ekko');

const developerConfig = require('./project/config/developer-config');

const ekko = new Ekko();
ekko.start(developerConfig);


