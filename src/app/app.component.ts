import { Component, OnInit } from '@angular/core'
import {Router, NavigationEnd} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // FIXME such a dirty trick to stop tc compiler complaints -> window['']
        window['ga']('set', 'page', event.urlAfterRedirects)
        window['ga']('send', 'pageview')
      }
    })
  }
  ngOnInit() { }
}
