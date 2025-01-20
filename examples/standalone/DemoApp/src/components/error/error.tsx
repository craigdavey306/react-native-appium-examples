import React from 'react';
import { ActivityIndicator, Surface, Text, useTheme } from 'react-native-paper';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps): React.JSX.Element => {
  const theme = useTheme();

  return (
    <Surface elevation={0}>
      <Text
        variant="labelMedium"
        testID="error"
        style={{ color: theme.colors.error }}>
        {message}
      </Text>
    </Surface>
  );
};

export default Error;
