import { Component } from '@angular/core';
import { GuestsComponent } from "../guests/guests.component";

@Component({
  selector: 'app-featuredguests',
  imports: [GuestsComponent],
  templateUrl: './featuredguests.component.html',
  styleUrl: './featuredguests.component.css'
})
export class FeaturedguestsComponent {
  currentIndex = 0;
  maxIndex = 3;

  prevCard() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  nextCard() {
    if (this.currentIndex < this.maxIndex) this.currentIndex++;
  }
}
