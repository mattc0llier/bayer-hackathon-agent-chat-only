"use client";

import { useState } from "react";
import { RemoteComponent } from "remote-components/next";
import { ErrorBoundary } from "@/components/custom/error-boundary";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const REMOTE_COMPONENT_SRC =
  "https://remote-component-nextjs-app-css-iso.vercel.app/nextjs-app-remote/components/css-leak";

export function IsolateToggleDemo() {
  const [isolated, setIsolated] = useState(true);

  return (
    <div className="my-6 overflow-hidden rounded-md border bg-background text-foreground">
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
        <span className="text-muted-foreground text-sm">
          {isolated ? "Isolated (Shadow DOM)" : "Non-Isolated (No Shadow DOM)"}
        </span>
        <div className="flex items-center gap-2">
          <Label
            className="text-muted-foreground text-sm"
            htmlFor="isolate-switch"
          >
            Isolate
          </Label>
          <Switch
            checked={isolated}
            id="isolate-switch"
            onCheckedChange={setIsolated}
          />
        </div>
      </div>
      <div className="p-4">
        <ErrorBoundary fallback={<div>Failed to load CSS isolation demo</div>}>
          <RemoteComponent
            isolate={isolated}
            name="isolate-css-demo"
            src={REMOTE_COMPONENT_SRC}
          >
            <div>&nbsp;</div>
          </RemoteComponent>
        </ErrorBoundary>
      </div>
    </div>
  );
}
