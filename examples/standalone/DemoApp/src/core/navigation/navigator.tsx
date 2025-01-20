import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UnauthorizedNavigator } from './unauthorized-navigator';
import { useAuth } from '../auth';
import { AuthorizedNavigator } from './authorized-navigator';
import { Loading } from '../../components';

export const Navigator = (): React.JSX.Element => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <UnauthorizedNavigator />
      ) : (
        <Suspense fallback={<Loading />}>
          <AuthorizedNavigator />
        </Suspense>
      )}
    </NavigationContainer>
  );
};
