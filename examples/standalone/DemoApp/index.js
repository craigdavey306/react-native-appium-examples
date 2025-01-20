/**
 * @format
 */
import './gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/App';
import { store } from './src/core/store';
import { name as appName } from './app.json';
import './src/core/i18n/i18n';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
