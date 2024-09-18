import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'para-la-raza-ui';
  currentApp: string = 'translation-chat';
  listApps: any[] = [{name: 'translation-chat', icon: 'translate'},
                      // {name:'foreign-exchange', icon: 'currency_exchange'}
  ];


  constructor(private router: Router) {}

  ngOnInit(): void {
      this.currentApp='translation-chat';
  }

}
