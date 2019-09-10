import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {StarService} from './star.service';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent],
  providers: [StarService],
  bootstrap:    [ AppComponent ]
  
})
export class AppModule { }
