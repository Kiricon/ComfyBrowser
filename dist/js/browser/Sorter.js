"use strict";
class Sorter {
    constructor(parent) {
        this.Parent = parent;
        this.Children = parent.childNodes;
    }
    moveListener() {
        let self = this;
        for (let i = 0; i < this.Children.length; i++) {
            let child = this.Children[i];
            child.addEventListener('mousemove', (e) => {
                if (e.which == 1) {
                    console.log(e.pageX);
                }
            });
        }
    }
}
exports.Sorter = Sorter;
