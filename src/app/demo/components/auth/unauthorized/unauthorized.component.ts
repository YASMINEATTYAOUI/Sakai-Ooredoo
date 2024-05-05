import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
})
export class UnauthorizedComponent {

  constructor(public layoutService: LayoutService) { }
}
