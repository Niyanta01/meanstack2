import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelBoxComponent } from '../panel/panel-box/panel-box.component';

@NgModule({
  declarations: [
    PanelBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PanelBoxComponent
  ]
})
export class SharedModule { }
