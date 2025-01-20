import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';

const Wrapper = ({ children }: React.PropsWithChildren): React.JSX.Element => {
  return <>{children}</>;
};

function customRenderer(ui: React.ReactElement, options?: RenderOptions) {
  return { ...render(ui, { wrapper: Wrapper, ...options }) };
}

// re-export everything
export * from '@testing-library/react-native';

// override the render method
export { customRenderer as render };
