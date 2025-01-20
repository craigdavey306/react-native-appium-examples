import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Surface, Text } from 'react-native-paper';

const Loading = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <Surface elevation={0}>
      <Text variant="displaySmall" testID="loading">
        {t('home.loading')}
      </Text>
      <ActivityIndicator />
    </Surface>
  );
};

export default Loading;
