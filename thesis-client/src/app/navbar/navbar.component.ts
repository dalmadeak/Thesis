import { Component } from "@angular/core";
import { faBars, faEllipsisH, faUser} from "@fortawesome/free-solid-svg-icons";


@Component ({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faBars = faBars;
  faDots = faEllipsisH;
  faUser = faUser;
}
