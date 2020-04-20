import "./all.js";
import {onStart} from "../es_helpers/init.js";
import "../components/multiserver.js";


let detectServer = () => {
    try {
        DomQuery.querySelectorAll(".terminal").html("Detecing server");
        let sharedObject = remote.getGlobal("sharedObj");
        let receivers = sharedObject && sharedObject.receivers;
        if (receivers && Object.keys(receivers).length == 1) {
            DomQuery.querySelectorAll(".terminal").html("Server found");
            remote.getGlobal("sharedObj")["receiver"] = Stream.ofAssoc(receivers)
                .map(item => item[1])
                .first().value;

            location.href = "./" + sharedObject["initialSystem"] + ".html";
        } else if (!receivers || !Object.keys(receivers).length) {
            DomQuery.querySelectorAll(".terminal").html("Searching for server");
            setTimeout(detectServer, 1000);
        }
    } catch (e) {
        console.log(e.message);
        setTimeout(detectServer, 1000);
    }

};
onStart(() => setTimeout(detectServer, 1000));
