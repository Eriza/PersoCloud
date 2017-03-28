var cozydb = require('cozydb');

const pc_options = cozydb.getModel('pc_options', {
    'birthdate': {
        default: null,
        type: Date
    },
    'gender': {
        default: null,
        type: String,
    },
    'country': {
        default: null,
        type: String,
    },
    'zip_code': {
        default: null,
        type: String,
    },
    'city': {
        default: null,
        type: String,
    },
    'location': {
		default: null,
        type: {
			latitude: String,
			longitude: String			
		}
    },    
    'sharing_permissions': {
        default: null,
        type: Array
    }
});

module.exports = pc_options;

