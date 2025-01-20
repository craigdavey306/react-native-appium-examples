import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  height?: number;
}

const Spacer = ({ height = 5 }: SpacerProps): React.JSX.Element => {
  return <View style={{ height: height }} />;
};

Spacer.displayName = 'Spacer Component';

export default Spacer;
