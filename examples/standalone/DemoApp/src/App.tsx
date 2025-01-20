/**
 * Demo React Native application.
 */

import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { DarkTheme, LightTheme } from './core/theme';
import { Navigator } from './core/navigation';
import { AuthProvider } from './core/auth';

const App = (): React.JSX.Element => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? LightTheme : DarkTheme;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
