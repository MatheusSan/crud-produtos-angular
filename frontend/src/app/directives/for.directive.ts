import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {

  @Input("myForEm") numbers: number[] = [];
  // @Input('myForUsando') texto: string //Segundo argumento

  //A chamada dessa diretiva está no footer

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) { }

  ngOnInit(): void {
    for(let number of this.numbers){
      this.container.createEmbeddedView(this.template, {$implicit: number})
    }
  }

}
