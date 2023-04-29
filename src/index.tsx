import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { TheSpinner } from './components/admin';
import * as serviceWorker from './serviceWorker';

import store from './store/store';

import './scss/style.scss';

// main layout
const TheLayout = React.lazy(() => import('./components/admin/TheLayout'));

// Pages
const Page403 = React.lazy(() => import('./pods/pages/Page403'));
const Page404 = React.lazy(() => import('./pods/pages/Page404'));
const PageLanding = React.lazy(() => import('./pods/pages/PageLanding'));
const PageAuth = React.lazy(() => import('./pods/pages/PageAuth'));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <React.Suspense fallback={<TheSpinner />}>
                    <ToastContainer />
                    <Switch>
                        <Route exact path={'/'} render={(props: any) => <PageLanding {...props} />} />
                        <Route exact path={'/unauthorized'} render={(props: any) => <Page403 {...props} />} />
                        <Route exact path={'/login'} render={(props: any) => <PageAuth {...props} />} />
                        <Route path="/admin/*" render={(props: any) => <TheLayout {...props} />} />
                        <Route path={'*'} render={(props: any) => <Page404 {...props} />} />
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
