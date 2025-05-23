import { Component } from '@angular/core';
import { LandingSectionComponent } from "../../components/landing-section/landing-section.component";
import { MainComponent } from "../../components/main/main.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { FeaturedguestsComponent } from "../../components/featuredguests/featuredguests.component";
import { SubscribeComponent } from "../../components/subscribe/subscribe.component";

@Component({
  selector: 'app-home',
  imports: [LandingSectionComponent, MainComponent, PaginationComponent, FeaturedguestsComponent, SubscribeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
