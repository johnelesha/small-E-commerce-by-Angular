import { Component } from '@angular/core';
import { LandingSectionComponent } from "../../components/landing-section/landing-section.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { SubscribeComponent } from "../../components/subscribe/subscribe.component";
import { ShopMainComponent } from "../../components/shop-main/shop-main.component";
import { FeaturedDesignersComponent } from "../../components/featured-designers/featured-designers.component";

@Component({
  selector: 'app-home',
  imports: [LandingSectionComponent, PaginationComponent, SubscribeComponent, ShopMainComponent, FeaturedDesignersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
