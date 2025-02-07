import React from 'react';
import { Button, Surface, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { useAuth } from '../../core/auth';

const WelcomeView = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { login } = useAuth();

  return (
    <Surface style={styles.container} elevation={0}>
      <Text variant="displayLarge" testID="welcome-text">
        {t('home.greeting')}
      </Text>
      <Button onPress={login} mode="contained" testID="welcome-start-btn">
        {t('home.start')}
      </Button>
    </Surface>
  );
};

export default WelcomeView;
