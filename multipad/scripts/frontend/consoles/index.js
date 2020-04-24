import "./all.js";
import {onStart} from "../es_helpers/init.js";
import "../components/multiserver.js";
import {defer, saveResolve} from "../shared/utils.js";

let detectServer = () => {
    try {
        DomQuery.querySelectorAll(".terminal")
                .html("Detecing server");
        let sharedObject = remote.getGlobal("sharedObj");
        let receivers = saveResolve(() => sharedObject.receivers).value;
        if (saveResolve(() => Object.keys(receivers).length).value == 1) {
            DomQuery.querySelectorAll(".terminal").html("Server found");
            remote.getGlobal("sharedObj")["receiver"] = Stream.ofAssoc(receivers)
                .map(item => item[1])
                .first().value;

            location.href = "./" + sharedObject["initialSystem"] + ".html";
        } else if (!saveResolve(() => Object.keys(receivers).length).value) {
            DomQuery.querySelectorAll(".terminal").html("Searching for server");
            defer(detectServer);
        }
    } catch (e) {
        console.log(e.message);
        defer(detectServer);
    }

};

onStart(defer(detectServer));
