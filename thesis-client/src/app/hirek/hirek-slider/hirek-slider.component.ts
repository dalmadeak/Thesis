import { Component } from '@angular/core';

@Component({
  selector: 'app-hirek-slider',
  templateUrl: './hirek-slider.component.html',
  styleUrls: ['./hirek-slider.component.css']
})
export class HirekSliderComponent {
  imageObject: Array<object> = [{
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Ismerd meg szervezetünket a Szervezet menüpont alatt!'
  }, {
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Érdekel tevékenységünk? Nézd át az Átláthatóság menüpontunkat!'
  }, {
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Elérhető szolgáltatási lehetőségeinket a Szolgáltatások menüpont alatt megtalálod!'
  },
  {
    image: '../../../assets/images/header-background.png',
    thumbImage: '../../assets/images/header-background.png',
    title: 'Kari és egyetemi ösztöndíjainkról minden tudnivalót megtalálsz az Ösztöndíjak oldalon!'
}];
}
