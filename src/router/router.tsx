import { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { MainPage } from '../main/main.page'
import { GlobalStyle } from '../theme/theme'
import { VariantPage } from '../variant/variant.page'
import { WSPage } from '../ws/ws.page'
import { Routes } from './routes.enum'

export const RouterBase = (): ReactElement => (
  <Router>
    <GlobalStyle />
    <Switch>
      <Route path={Routes.Root} exact component={MainPage} />
      <Route path={Routes.WS} exact component={WSPage} />
      <Route path={Routes.Variant} exact component={VariantPage} />
    </Switch>
  </Router>
)
