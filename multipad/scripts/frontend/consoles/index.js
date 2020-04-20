import "./all.js";
import {onStart} from "../es_helpers/init.js";
import "../components/multiserver.js";


let detectServer = () => {
    DomQuery.querySelectorAll(".terminal").html("Detecing server");
    let sharedObject = remote.getGlobal("sharedObj");
    let receivers = sharedObject.receivers;
    if(receivers && Object.keys(receivers).length == 1) {
        DomQuery.querySelectorAll(".terminal").html("Server found");
        remote.getGlobal("sharedObj")["receiver"] = Stream.ofAssoc(receivers)
            .map(item => item[1])
            .first().value;

        location.href = "./"+sharedObject["initialSystem"]+".html";
    } else if (!receivers ||  Object.keys(receivers).length > 1) {
        DomQuery.querySelectorAll(".terminal").html("Searching for server");
        setTimeout(() => detectServer(), 500);
    }
};
onStart(() => setTimeout(detectServer, 1000));