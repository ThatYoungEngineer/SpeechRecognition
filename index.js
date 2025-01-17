/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { GlobalContextProvider } from './src/context/GlobalContext';

const Main = () => {
    return (
        <GlobalContextProvider>
            <App />
        </GlobalContextProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
