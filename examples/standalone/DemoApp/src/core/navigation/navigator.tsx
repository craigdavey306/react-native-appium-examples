import { NavigationContainer } from '@react-navigation/native';
import { UnauthorizedNavigator } from './unauthorized-navigator';
import { useAuth } from '../auth';
import { AuthorizedNavigator } from './authorized-navigator';

export const Navigator = (): React.JSX.Element => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {!isLoggedIn ? <UnauthorizedNavigator /> : <AuthorizedNavigator />}
    </NavigationContainer>
  );
};
