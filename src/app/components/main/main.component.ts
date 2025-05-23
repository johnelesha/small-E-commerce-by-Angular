import { Component } from '@angular/core';
import { PodcasterComponent } from "../podcaster/podcaster.component";
import { EpisodesComponent } from "../episodes/episodes.component";

@Component({
  selector: 'app-main',
  imports: [PodcasterComponent, EpisodesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
