import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';




/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import { SplashScreen } from '@capacitor/splash-screen';
import * as Sentry from '@sentry/capacitor';
// The example is using Angular, Import '@sentry/vue' or '@sentry/react' when using a Sibling different than Angular.
import * as SentrySibling from '@sentry/react';
// For automatic instrumentation (highly recommended)
import { BrowserTracing } from '@sentry/tracing';
import './index.css';


Sentry.init(
  {
    dsn: 'https://0b8de7a9ff3a4cae8304928678983549@o1327710.ingest.sentry.io/6591060',
    // To set your release and dist versions
    release: 'my-project-name@' + process.env.npm_package_version,
    dist: '1',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    integrations: [
      new BrowserTracing({
        tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      }),
    ]
  },
  // Forward the init method to the sibling Framework.
  SentrySibling.init
);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
SplashScreen.hide();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
