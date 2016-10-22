

export class Sorter {

  Parent : HTMLElement;
  Children : NodeList;

  constructor(parent:HTMLElement){
    this.Parent = parent;
    this.Children = parent.childNodes;
  }

  moveListener():void {
    let self = this;
    for(let i = 0; i < this.Children.length; i++){
      let child: HTMLElement = <HTMLElement> this.Children[i];

      child.addEventListener('mousemove', (e)=>{
        if (e.which == 1){
          console.log(e.pageX);
        }
      });
    }

  }

}
