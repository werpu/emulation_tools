/**
 * whatever we need from node on the ui layer
 * must be exposed globally via preload.js
 * (this is a security barrier introduced in electron
 * a while ago)
 */
const {DomQuery, LazyStream, Stream, TagBuilder, Optional} = require("mona-dish");
const {execFileSync} = require('child_process');
const net = require('net');
const path = require('path');
const { ipcRenderer, remote } = require('electron');

window.DomQuery = DomQuery;
window.Stream = Stream;
window.LazyStream = LazyStream;
window.TagBuilder = TagBuilder;
window.Optional = Optional;
window.execFileSync = execFileSync;
window.net = net;
window.path_ = path;
window.remote = remote;
