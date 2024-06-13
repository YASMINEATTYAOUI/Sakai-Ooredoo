import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private translate: TranslateService,

    ) {
        translate.addLangs(['en', 'fr']);
        // Set default language
        translate.setDefaultLang('en');
        // Use a specific language
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }


}
