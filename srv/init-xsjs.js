function initXSJS() {

    const xsjs = require('@sap/xsjs');

    var options = {
        anonymous: true,
    };

    return xsjs(options);

}

module.exports = initXSJS;