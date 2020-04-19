TagBuilder.withTagName("multiserver")
    .withMarkup(`
<div class='content-holder overlow-container hidden'></div>
`)
    .withConnectedCallback(function () {
        DomQuery.byId(this).addClass("hidden")
        let sharedObject = remote.getGlobal("sharedObj");
        let receivers = sharedObject.receivers;
        if (receivers && Object.keys(receivers).length && Object.keys(receivers).length > 1) {

            let contentHolder = DomQuery.byId(this).querySelectorAll(".content-holder");
            this.removeClass("hidden");
            Stream.ofAssoc(receivers).each(keyVal => {
                let key = keyVal[0];
                let value = keyVal[1];
                let ip = value.ip;
                let port = value.port;

                let item = `
                   <div class="line clickable" data-selected="${key}">
                        <span class="col ip">${ip}</span>
                        <span>:</span>
                        <span class="col port">${port}</span>
                   </div>
               `;
                contentHolder.innerHtml = contentHolder.innerHtml + item;

            });
        }

        contentHolder.querySelectorall(".clickable").addEventListener("click", (evt) => {
            sharedObject.receiver = receivers[evt.target.attr("data-selected").value];
            location.href = "./"+sharedObject["initialSystem"]+".html";
        });
    })
    .register();