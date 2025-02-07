import React from 'react';
import { Surface, Text, useTheme } from 'react-native-paper';
import { getAutomationID } from '../../utils';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps): React.JSX.Element => {
  const theme = useTheme();

  return (
    <Surface elevation={0}>
      <Text
        variant="labelMedium"
        // {...getAutomationID('error')}
        testID="error-text"
        style={{ color: theme.colors.error }}>
        {message}
      </Text>
    </Surface>
  );
};

export default Error;
