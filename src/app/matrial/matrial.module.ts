import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [],
  imports: [
    MatTooltipModule,
    MatTableModule,
    CommonModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    MatCheckboxModule,
    MatCarouselModule
  ],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    MatCarouselModule,
    MatTooltipModule
  ]
})
export class MatrialModule { }
