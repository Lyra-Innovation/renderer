Folders:

- Components: child components than don't contain other components

Declaration: `export class {COMPONENT_NAME} extends {BASE_COMPONENT}`

E.g.: `export class TextComponent extends BaseComponent`

- Layouts: components than contain other children components

Declaration: `export class {COMPONENT_NAME} extends {BASE_LAYOUT}<{LIST OF VALUES}, {LIST OF CHILDREN}>`

E.g.: `export class CoreProfileLayout extends CoreLayoutComponent<'title' | 'subtitle', 'profile-content' | 'profile-sidebar'>`

Base components hierarchy:

- core-base.component: base for all components
  - core-layout.component: has children components
    - core-list-layout.component: don't care about keys or ordering, they display a list of components
  - core-component.component: doesn't have children

Notes:

- Always implement super() calls on lifecycle hooks, e.g. `ngOnInit() {super.ngOnInit()}`
