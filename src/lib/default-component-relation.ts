import { ComponentRelation } from './renderer.model';
import { ListLayoutComponent } from './components/layouts/list-layout/list-layout.component';
import { InputComponent } from './components/single/forms/input/input.component';
import { ListComponent } from './components/layouts/list/list.component';
import { ToolbarComponent } from './components/layouts/toolbar/toolbar.component';
import { GridListComponent } from './components/layouts/grid-list/grid-list.component';
import { FileUploaderComponent } from './components/single/forms/file-uploader/file-uploader.component';
import { SliderComponent } from './components/single/slider/slider.component';
import { StepperComponent } from './components/layouts/stepper/stepper.component';
import { ImageComponent } from './components/single/image/image.component';
import { DialogLauncherComponent } from './components/layouts/dialog-launcher/dialog-launcher.component';
import { ProfileComponent } from './components/layouts/profile/profile.component';
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
import { FeedbackPageComponent } from './components/layouts/feedback-page/feedback-page.component';
import { RadioGroupComponent } from './components/single/forms/radio-group/radio-group.component';
import { TextComponent } from './components/single/text/text.component';
import { ProgressComponent } from './components/single/progress/progress.component';
import { ErrorComponent } from './components/single/error/error.component';
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

export const defaultComponentRelation: ComponentRelation = {
  types: {
    'list-layout': {
      type: ListLayoutComponent
    },
    input: {
      type: InputComponent
    },
    text: {
      type: TextComponent
    },
    list: {
      type: ListComponent
    },
    toolbar: {
      type: ToolbarComponent
    },
    'grid-list': {
      type: GridListComponent
    },
    'file-uploader': {
      type: FileUploaderComponent
    },
    slider: {
      type: SliderComponent
    },
    stepper: {
      type: StepperComponent
    },
    image: {
      type: ImageComponent
    },
    'dialog-launcher': {
      type: DialogLauncherComponent
    },
    profile: {
      type: ProfileComponent
    },
    tabs: {
      type: TabsComponent
    },
    minigame: {
      type: MinigameComponent
    },
    card: {
      type: CardComponent
    },
    breadcrumbs: {
      type: BreadcrumbsComponent
    },
    login: {
      type: LoginComponent
    },
    button: {
      type: ButtonComponent
    },
    'chips-list': {
      type: ChipsListComponent
    },
    'form-group': {
      type: FormGroupComponent
    },
    textarea: {
      type: TextareaComponent
    },
    'setup-page': {
      type: SetupPageComponent
    },
    'feedback-page': {
      type: FeedbackPageComponent
    },
    'radio-group': {
      type: RadioGroupComponent
    },
    progress: {
      type: ProgressComponent
    },
    error: {
      type: ErrorComponent
    },
    'menu-launcher': {
      type: MenuLauncherComponent
    },
    sidenav: {
      type: SidenavComponent
    },
    'mobile-shell': {
      type: MobileShellComponent
    },
    'form-steps': {
      type: FormStepsComponent
    },
    'route-container': {
      type: RouteContainerComponent
    },
    'selection-grid': {
      type: SelectionGridComponent
    },
    'history-item': {
      type: HistoryItemComponent
    },
    'questions-game': {
      type: QuestionsGameComponent
    },
    memory: {
      type: MemoryComponent
    },
    'zop-game': {
      type: ZopGameComponent
    }
  },
  keys: {}
};
