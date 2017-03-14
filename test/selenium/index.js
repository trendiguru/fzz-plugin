const testLibs = require('./test-libs'),
sessionWrapper = require('./session-wrapper'),
SESSION_CONFIG = require('./session-config');

sessionWrapper(testLibs.buttonShownTest, SESSION_CONFIG[0]);