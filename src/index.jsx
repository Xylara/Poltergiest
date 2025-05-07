/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router'

import Home from './routes/Home';
import Settings from './routes/Settings'
import layout from './layout'
import URoute from './routes/Route.jsx'

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}
const FuckOffRouterPlease = () => {
  return null;
};

render(
  () => (
    <Router root={layout}>
      <Route path="/" component={Home} />
      <Route path="/settings/" component={Settings} />
      <Route path="/route/" component={URoute} />

      {/**  FUCK OFF ROUTER PLEASE */}
      <Route path="/u3/*" component={FuckOffRouterPlease} />
    </Router>
  ),
  document.getElementById('root')
);