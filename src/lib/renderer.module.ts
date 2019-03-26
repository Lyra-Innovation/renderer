import {
  NgModule,
  ModuleWithProviders,
  InjectionToken,
  APP_INITIALIZER
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as _ from 'lodash';

import { FileHelpersModule } from 'ngx-file-helpers';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';

import {
  ComponentRelation,
  COMPONENT_RELATION,
  CUSTOM_COMPONENT_RELATION
} from './renderer.model';
import { defaultComponentRelation } from './default-component-relation';
import { ListLayoutComponent } from './components/layouts/list-layout/list-layout.component';
import { ChildHostDirective } from './directives/child-host.directive';
import { CustomTemplateComponent } from './components/custom/custom-template/custom-template.component';
import { InputComponent } from './components/single/forms/input/input.component';
import { ViewRendererComponent } from './components/view-renderer/view-renderer.component';
import { ToolbarComponent } from './components/layouts/toolbar/toolbar.component';
import { ListComponent } from './components/layouts/list/list.component';
import { GridListComponent } from './components/layouts/grid-list/grid-list.component';
import { FileUploaderComponent } from './components/single/forms/file-uploader/file-uploader.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SliderComponent } from './components/single/slider/slider.component';
import { ImageComponent } from './components/single/image/image.component';
import { DialogLauncherComponent } from './components/layouts/dialog-launcher/dialog-launcher.component';
import { CustomChildTemplateComponent } from './components/custom/custom-child-template/custom-child-template.component';
import { ProfileComponent } from './components/layouts/profile/profile.component';
import { StepperComponent } from './components/layouts/stepper/stepper.component';
import { TabsComponent } from './components/layouts/tabs/tabs.component';
import { MinigameComponent } from './components/layouts/games/minigame/minigame.component';
import { CardComponent } from './components/layouts/card/card.component';
import { BreadcrumbsComponent } from './components/single/breadcrumbs/breadcrumbs.component';
import { LoginComponent } from './components/layouts/login/login.component';
import { ButtonComponent } from './components/layouts/button/button.component';
import { ChipsListComponent } from './components/single/chips-list/chips-list.component';
import { FormGroupComponent } from './components/layouts/form-group/form-group.component';
import { TextareaComponent } from './components/single/forms/textarea/textarea.component';
import { SetupPageComponent } from './components/layouts/setup-page/setup-page.component';
import { TextComponent } from './components/single/text/text.component';
import { FeedbackPageComponent } from './components/layouts/feedback-page/feedback-page.component';
import { RadioGroupComponent } from './components/single/forms/radio-group/radio-group.component';
import { ErrorComponent } from './components/single/error/error.component';
import { ProgressComponent } from './components/single/progress/progress.component';
import { MenuLauncherComponent } from './components/layouts/menu-launcher/menu-launcher.component';
import { SidenavComponent } from './components/layouts/sidenav/sidenav.component';
import { MobileShellComponent } from './components/layouts/mobile-shell/mobile-shell.component';
import { FormStepsComponent } from './components/layouts/form-steps/form-steps.component';
import { RouteContainerComponent } from './components/layouts/route-container/route-container.component';
import { SelectionGridComponent } from './components/layouts/selection-grid/selection-grid.component';
import { HistoryItemComponent } from './components/single/history-item/history-item.component';
import { QuestionsGameComponent } from './components/layouts/games/questions-game/questions-game.component';
import { MemoryComponent } from './components/layouts/games/memory/memory.component';
import { ZopGameComponent } from './components/layouts/games/zop-game/zop-game.component';

@NgModule({
  declarations: [
    ListLayoutComponent,
    ChildHostDirective,
    CustomTemplateComponent,
    InputComponent,
    ViewRendererComponent,
    ToolbarComponent,
    ListComponent,
    GridListComponent,
    FileUploaderComponent,
    SliderComponent,
    ImageComponent,
    DialogLauncherComponent,
    CustomChildTemplateComponent,
    ProfileComponent,
    StepperComponent,
    TabsComponent,
    MinigameComponent,
    CardComponent,
    BreadcrumbsComponent,
    LoginComponent,
    ButtonComponent,
    ChipsListComponent,
    FormGroupComponent,
    TextareaComponent,
    SetupPageComponent,
    TextComponent,
    FeedbackPageComponent,
    RadioGroupComponent,
    ErrorComponent,
    ProgressComponent,
    MenuLauncherComponent,
    SidenavComponent,
    MobileShellComponent,
    FormStepsComponent,
    RouteContainerComponent,
    SelectionGridComponent,
    HistoryItemComponent,
    QuestionsGameComponent,
    MemoryComponent,
    ZopGameComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FileHelpersModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    ListLayoutComponent,
    ChildHostDirective,
    CustomTemplateComponent,
    InputComponent,
    ViewRendererComponent,
    ToolbarComponent,
    GridListComponent,
    FileUploaderComponent,
    CardComponent,
    ImageComponent,
    DialogLauncherComponent,
    CustomChildTemplateComponent,
    ProfileComponent,
    StepperComponent,
    TabsComponent,
    MinigameComponent,
    BreadcrumbsComponent,
    LoginComponent,
    ButtonComponent,
    ChipsListComponent,
    TextareaComponent,
    FormGroupComponent,
    SetupPageComponent,
    TextComponent,
    FeedbackPageComponent,
    RadioGroupComponent,
    ErrorComponent,
    ProgressComponent,
    MenuLauncherComponent,
    ListComponent,
    SidenavComponent,
    MobileShellComponent,
    FormStepsComponent,
    RouteContainerComponent,
    SelectionGridComponent,
    HistoryItemComponent,
    QuestionsGameComponent,
    MemoryComponent,
    ZopGameComponent
  ],
  entryComponents: [
    ErrorComponent,
    ViewRendererComponent,
    ListLayoutComponent,
    InputComponent,
    CustomTemplateComponent,
    ListComponent,
    ToolbarComponent,
    HistoryItemComponent,
    StepperComponent,
    MemoryComponent,
    GridListComponent,
    FileUploaderComponent,
    QuestionsGameComponent,
    ZopGameComponent,
    SliderComponent,
    FormGroupComponent,
    MinigameComponent,
    ImageComponent,
    DialogLauncherComponent,
    ProfileComponent,
    TextareaComponent,
    RouteContainerComponent,
    TabsComponent,
    TextComponent,
    CardComponent,
    BreadcrumbsComponent,
    LoginComponent,
    ButtonComponent,
    ChipsListComponent,
    SetupPageComponent,
    FeedbackPageComponent,
    RadioGroupComponent,
    ProgressComponent,
    MenuLauncherComponent,
    SidenavComponent,
    MobileShellComponent,
    FormStepsComponent,
    SelectionGridComponent
  ]
})
export class RendererModule {
  public static forRoot(config: {
    moduleComponentRelation?: ComponentRelation;
  }): ModuleWithProviders {
    return {
      ngModule: RendererModule,
      providers: [
        {
          provide: COMPONENT_RELATION,
          useValue: defaultComponentRelation
        },
        {
          provide: CUSTOM_COMPONENT_RELATION,
          useValue: config.moduleComponentRelation
        }
      ]
    };
  }
}
