/**
 * Window processor which should detect the keyboard window and focus it upon open
 * can only work on linux because it uses wmctl hence we fail silently for now
 */
export class ProcessWindow {
    constructor(id, screen, program, descriptr) {
        this.id = id;
        this.screen = screen;
        this.program = program;
        this.descriptr = descriptr;
    }

    focus() {
        try {
            execFileSync("wmctrl", ["-ia", this.id]);
        } catch(e) {}
    }

    moveHere() {
        try {
            execFileSync("wmctrl", ["-iR", this.id]);
        } catch(e) {}
    }

    close() {
        try {
            execFileSync("wmctrl", ["-ic", this.id]);
        } catch(e) {}
    }

     changeState(starg) {
        try {
            execFileSync("wmctrl", ["-ir", this.id, "-b", starg]);
        } catch(e) {}
    }
}

/**
 * Generic process handler class sitting on wmTool
 */
export class Processes {


    constructor() {
        let exec;
        try {
            exec = execFileSync("wmctrl", ["-lx"]);
        } catch (e) {
            this.processes = [];
            console.log("wmctl not found, not a linux system, turning off linux specific handlers");
            return;
        }

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

