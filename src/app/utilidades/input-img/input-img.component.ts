import { Component, OnInit } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit{
  constructor(){}

  imagenBase64: string;

  ngOnInit(): void {

  }
  change(event){
    if (event.target.file.length > 0){
      const file: File = event.target.files[0];
      toBase64(file).then((value: string) => this.imagenBase64 = value)
      .catch(error => console.log(error));
  }
}
}