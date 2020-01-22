import {createAppContainer} from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerBackTitleVisible: false,
            titleStyle: {
                textAlign: 'center',
            },
            headerStyle: {
              backgroundColor: '#7d40e7'
            },
            headerTintColor: '#ffffff'
        }
    })
);

export default Routes;