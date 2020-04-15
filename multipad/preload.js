const {DomQuery} = require("mona-dish");
const {execFileSync} = require('child_process');
const {Processes} = require("./scripts/processes");
const net = require('net');
const path = require('path');


window.DomQuery = DomQuery;
window.execFileSync = execFileSync;
window.Processes = Processes;
window.net = net;
window.path_ = path;
