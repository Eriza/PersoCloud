var cozydb = require('cozydb');

module.exports = {
    bill: {
        all: cozydb.defaultRequests.all,
        byDate: cozydb.defaultRequests.by('date')
    }
};