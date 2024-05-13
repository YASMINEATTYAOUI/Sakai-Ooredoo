import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
})
export class BrandDetailsComponent implements OnInit {
  brandId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.brandId = +params['id']; // Retrieve the role ID from the route parameter
      // Fetch role details based on the role ID
    });
  }
}
