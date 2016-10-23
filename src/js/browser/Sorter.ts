

export class Sorter {

  Parent : HTMLElement;
  Children : NodeList;

  constructor(parent:HTMLElement){
    this.Parent = parent;
    this.Children = parent.childNodes;
    this.moveListener();
  }

  moveListener():void {
    let self = this;
    let Children = document.getElementsByClassName("chrome-tab");
    for(let i = 0; i < Children.length; i++){
      let child: HTMLElement = <HTMLElement> Children[i];
      child.addEventListener('mousedown', (e)=>{
        console.log(e.pageX);
      });
      child.addEventListener('mousemove', (e)=>{
        if (e.which == 1){
          console.log(e.pageX);
        }
      });
    }

  }

}
