import { Component} from '@angular/core';

@Component({
  selector: 'app-hirek-slider',
  templateUrl: './hirek-slider.component.html',
  styleUrls: ['./hirek-slider.component.css']
})
export class HirekSliderComponent {
  imageObject: Array<object> = [{
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Gyere ELTE is!'
  }, {
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Gyere ELTE is 2!'
  }, {
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Gyere ELTE is 3!'
  }];
}
