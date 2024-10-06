import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  standalone: true,
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent {
  @Input() title: string = 'Default Title';
}
