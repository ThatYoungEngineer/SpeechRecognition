/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native'
import { GlobalContextProvider } from './src/context/GlobalContext';

const Main = () => {
    return (
        <NavigationContainer>
            <GlobalContextProvider>
                <App />
            </GlobalContextProvider>
        </NavigationContainer>
    );
}

AppRegistry.registerComponent(appName, () => Main);
