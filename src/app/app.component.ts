import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private defaultTitle: string = 'Mastery Zone';
  private altTitles: {} = {
    results: 'Test Results',
    session: 'Active Session'
  }
  
  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter((events: RouterEvent) => events instanceof NavigationEnd)
    ).subscribe(navigation => {
      const url = navigation.url;
      const tabTitle = document.documentElement.querySelector('title');

      for (let key in this.altTitles) {
        if (url.match(key)) {
          tabTitle.innerHTML = this.altTitles[key];
          break;
        } else {
          tabTitle.innerHTML = this.defaultTitle;
        }
      }
    });
  }
}
