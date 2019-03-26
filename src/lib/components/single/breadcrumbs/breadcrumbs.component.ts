import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from '@angular/router';

interface Breadcrumb {
  label: string;
  routeLink: string;
}

@Component({
  selector: 'ren-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => BreadcrumbsComponent)
    }
  ]
})
export class BreadcrumbsComponent extends BaseComponent implements OnInit {
  /** Required */
  @Input()
  breadcrumbs: Breadcrumb[];

  /** Optional */
  @Input()
  activeIndex: number;

  @Input()
  readRoutes: boolean = false;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (typeof this.activeIndex === 'string') {
      this.activeIndex = parseInt(this.activeIndex, 10);
    }

    if (typeof this.breadcrumbs === 'string') {
      this.breadcrumbs = (<string>this.breadcrumbs).split(',').map(b => ({
        label: b,
        routeLink: null
      }));
    }
    if (this.readRoutes) {
      this.breadcrumbs = this.buildBreadcrumbsFromRouteConfig();
    }
  }

  buildBreadcrumbsFromRouteConfig(): Breadcrumb[] {
    return this.route.snapshot.url.map(urlSegment => ({
      label: urlSegment.toString(),
      routeLink: '/' + urlSegment.path
    }));
  }
}
