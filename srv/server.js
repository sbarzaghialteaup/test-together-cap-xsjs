const cds = require('@sap/cds');
const initXSJS = require("./init-xsjs")

// We use the "served" event instead of "bootstrap" event because @sap/fibrous (used by @sap/xsjs) broke 
// the async cds.load 
cds.on('served', () => {
    console.log("served");

    // Create XSJS compatibility layer
    const xsjs = initXSJS()

    // Bind XSJS to root
    cds.app.use(xsjs)
})

module.exports = cds.server