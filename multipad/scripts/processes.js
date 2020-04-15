
class ProcessWindow {
    constructor(id, screen, program, descriptr) {
        this.id = id;
        this.screen = screen;
        this.program = program;
        this.descriptr = descriptr;
    }

    focus() {
        execFileSync("wmctrl", ["-ia", this.id]);
    }

    moveHere() {
        execFileSync("wmctrl", ["-iR", this.id]);
    }

    close() {
        execFileSync("wmctrl", ["-ic", this.id]);
    }

     changeState(starg) {
        execFileSync("wmctrl", ["-ir", this.id, "-b", starg]);
    }
}

/**
 * Generic process handler class sitting on wmTool
 */
class Processes {


    constructor() {

        const exec = execFileSync("wmctrl", ["-lx"]);
        let str = exec.toString();
        let lines = str.split(/\n+/gi);

        this.processes = [];

        lines.forEach((line) => {
            if(line == "") {
                return;
            }
            let cols = line.split(/\s+/gi);

            this.processes.push(new ProcessWindow(cols[0], cols[1], cols[2], line));
        });
    }

    forEach(func) {
        return this.processes.forEach(func);
    }

    filter(filter) {
        return this.processes.filter(filter);
    }
}


module.exports = {Processes: Processes};