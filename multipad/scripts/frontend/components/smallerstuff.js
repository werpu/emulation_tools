TagBuilder.withTagName("x-pacman")
    .withMarkup(`<div class="la-pacman animationholder">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>`)
    .register();

TagBuilder.withTagName("x-terminal")
    .withMarkup(`<pre class="terminal"></pre>`)
    .register();