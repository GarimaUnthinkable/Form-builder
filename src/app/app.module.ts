import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import {RouterModule, Routes} from '@angular/router';
import { NewFormComponent } from './new-form/new-form.component';
import { SaveComponent } from './save/save.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';

let routes: Routes = [
  {path:'', component:NewFormComponent},
  {path:'new-form', component: NewFormComponent},
  {path:'preview', component: PreviewComponent},
  {path:'save', component: SaveComponent}
]
@NgModule({
  declarations: [AppComponent, DialogComponent, PreviewComponent, NewFormComponent, SaveComponent, FormComponent, DeleteComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
