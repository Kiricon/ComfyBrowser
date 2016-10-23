"use strict";
class Sorter {
    constructor(parent) {
        this.Parent = parent;
        this.Children = parent.childNodes;
        this.moveListener();
    }
    moveListener() {
        let self = this;
        let Children = document.getElementsByClassName("chrome-tab");
        for (let i = 0; i < Children.length; i++) {
            let child = Children[i];
            child.addEventListener('mousedown', (e) => {
                console.log(e.pageX);
            });
            child.addEventListener('mousemove', (e) => {
                if (e.which == 1) {
                    console.log(e.pageX);
                }
            });
        }
    }
}
exports.Sorter = Sorter;
