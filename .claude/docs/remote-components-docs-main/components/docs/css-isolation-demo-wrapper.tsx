import { enableRemoteComponentCssIsolationExampleFlag } from '@/lib/flags';
import { IsolateToggleDemo } from './css-isolation-demo';

export async function CSSIsolationDemoWrapper() {
  const enabled = await enableRemoteComponentCssIsolationExampleFlag();

  if (!enabled) {
    return null;
  }

  return <IsolateToggleDemo />;
}

