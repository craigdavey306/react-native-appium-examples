import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { WelcomeView } from '../../views';

const Stack = createNativeStackNavigator();

export const UnauthorizedNavigator = (): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
