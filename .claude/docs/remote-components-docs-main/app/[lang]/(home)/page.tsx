import { SiTypescript } from "@icons-pack/react-simple-icons";
import DynamicLink from "fumadocs-core/dynamic-link";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/custom/copy-button";
import { Installer } from "@/components/geistdocs/installer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CenteredSection } from "./components/centered-section";
import { CTA } from "./components/cta";
import { Hero } from "./components/hero";
import { TextGridSection } from "./components/text-grid-section";

const title = "Render your components from anywhere";
const description =
  "Remote components enable you to build scalable applications by loading UI components from different sources dynamically. No build time dependency.";

export const metadata: Metadata = {
  title,
  description,
};

const textGridSection = [
  {
    id: "1",
    title: "Modular Architecture",
    description: "Build and deploy components independently.",
  },
  {
    id: "2",
    title: "Framework Agnostic",
    description:
      "Works seamlessly with different frameworks like Next.js App and Pages Router, React, and Vite + HTML.",
  },
  {
    id: "3",
    title: "Runtime Composition",
    description: "Avoid build-time coupling between applications.",
  },
];

const preClassNames = cn("[&_.shiki]:bg-transparent!");

const darkModeClassNames = cn(
  "dark:[&_.shiki]:text-[var(--shiki-dark)]!",
  "dark:[&_.shiki]:[font-style:var(--shiki-dark-font-style)]!",
  "dark:[&_.shiki]:[font-weight:var(--shiki-dark-font-weight)]!",
  "dark:[&_.shiki]:[text-decoration:var(--shiki-dark-text-decoration)]!",
  "dark:[&_.shiki_span]:text-[var(--shiki-dark)]!",
  "dark:[&_.shiki_span]:[font-style:var(--shiki-dark-font-style)]!",
  "dark:[&_.shiki_span]:[font-weight:var(--shiki-dark-font-weight)]!",
  "dark:[&_.shiki_span]:[text-decoration:var(--shiki-dark-text-decoration)]!"
);

const defineCode = `import { RemoteComponent } from 'remote-components/next';

export default function Header() {
  return (
    <RemoteComponent>
      <header>...</header>
    </RemoteComponent>
  );
}`;

const consumeCode = `import { RemoteComponent } from 'remote-components/next';

export default function Page() {
  return (
    <div>
      <RemoteComponent src="/components/header" />
      <main>Your content here</main>
    </div>
  );
}`;

const CodeBlock = ({
  filename,
  children,
  source,
}: {
  filename: string;
  children: string;
  source: string;
}) => (
  <div className="size-full divide-y overflow-hidden rounded-md border bg-background">
    <div className="flex items-center bg-sidebar p-4 text-muted-foreground text-sm">
      <SiTypescript className="mr-2 size-4 shrink-0" />
      <span className="flex-1">{filename}</span>
      <CopyButton code={source} />
    </div>
    <div
      className={cn(
        "size-full overflow-auto py-4 text-sm",
        preClassNames,
        darkModeClassNames
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: "this is needed."
      dangerouslySetInnerHTML={{ __html: children }}
    />
  </div>
);

const HomePage = async () => {
  const defineCodeHtml = await codeToHtml(defineCode, {
    lang: "javascript",
    themes: { light: "github-light", dark: "github-dark" },
  });

  const consumeCodeHtml = await codeToHtml(consumeCode, {
    lang: "javascript",
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <div className="container mx-auto max-w-5xl">
      <Hero description={description} title={title}>
        <div className="mx-auto inline-flex w-sm items-center gap-3">
          <Button asChild className="px-4" size="lg">
            <DynamicLink href="/[lang]/docs/getting-started">
              Get Started
            </DynamicLink>
          </Button>
          <Installer command="npm i remote-components" />
        </div>
      </Hero>
      <div className="grid divide-y border-y sm:border-x">
        <TextGridSection data={textGridSection} />
        <CenteredSection
          description="Get started with remote components in minutes."
          title="Simple setup"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex h-full flex-col gap-2">
              <CodeBlock
                filename="remote-application/components/header.tsx"
                source={defineCode}
              >
                {defineCodeHtml}
              </CodeBlock>
              <p className="text-muted-foreground text-sm">
                Defining a remote component
              </p>
            </div>
            <div className="flex h-full flex-col gap-2">
              <CodeBlock
                filename="host-application/app/page.tsx"
                source={consumeCode}
              >
                {consumeCodeHtml}
              </CodeBlock>
              <p className="text-muted-foreground text-sm">
                Consuming a remote component
              </p>
            </div>
          </div>
        </CenteredSection>
        <CTA cta="Get started" href="/docs" title="Explore remote components" />
      </div>
    </div>
  );
};

export default HomePage;
