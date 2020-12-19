import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function DynamicRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          render={({ history, location, match })=>{
            const Page = React.lazy(()=>{
              return import('./pages'+location.pathname).catch((e) => {
                if (/not find module/.test(e.message)) {
                  return import("./pages/NotFound");
                }
                if (/Loading chunk \d+ failed/.test(e.message)) {
                  window.location.reload();
                  return;
                }
                throw e;
              })
            });
            return (
              <React.Suspense fallback ={<div>Loading...</div>}>
                <Page />
              </React.Suspense>
            )

          }}
        />
      </Switch>
    </BrowserRouter>
  )
}
export default DynamicRoutes;