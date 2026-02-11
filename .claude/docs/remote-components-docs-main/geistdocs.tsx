export const Logo = () => (
  <div className="flex items-center gap-2">
    <svg
      fill="none"
      height={20}
      viewBox="0 0 14 13"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Remote Components</title>
      <path
        clipRule="evenodd"
        d="M2.25 4.5C2.59736 4.5 2.92634 4.42129 3.22006 4.28073L7.00001 8.06067L10.7799 4.28073C11.0737 4.42129 11.4027 4.5 11.75 4.5C12.9927 4.5 14 3.49264 14 2.25C14 1.00736 12.9927 0 11.75 0C10.5074 0 9.50001 1.00736 9.50001 2.25C9.50001 2.59736 9.57872 2.92634 9.71929 3.22006L7.00001 5.93934L4.28073 3.22006C4.42129 2.92634 4.5 2.59736 4.5 2.25C4.5 1.00736 3.49264 0 2.25 0C1.00736 0 0 1.00736 0 2.25C0 3.49264 1.00736 4.5 2.25 4.5ZM3 2.25C3 2.66422 2.66422 3 2.25 3C1.83579 3 1.5 2.66422 1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5C2.66422 1.5 3 1.83579 3 2.25ZM11.75 3C12.1642 3 12.5 2.66422 12.5 2.25C12.5 1.83579 12.1642 1.5 11.75 1.5C11.3358 1.5 11 1.83579 11 2.25C11 2.66422 11.3358 3 11.75 3Z"
        fill="black"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M2.25 13C3.49264 13 4.5 11.9927 4.5 10.75C4.5 9.77034 3.8739 8.93691 3 8.62804V6H1.5V8.62804C0.626106 8.93691 0 9.77034 0 10.75C0 11.9927 1.00736 13 2.25 13ZM3 10.75C3 11.1642 2.66422 11.5 2.25 11.5C1.83579 11.5 1.5 11.1642 1.5 10.75C1.5 10.3358 1.83579 10 2.25 10C2.66422 10 3 10.3358 3 10.75Z"
        fill="black"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M11.75 13C12.9927 13 14 11.9927 14 10.75C14 9.77034 13.3739 8.93691 12.5 8.62804V6H11V8.62804C10.1261 8.93691 9.50001 9.77034 9.50001 10.75C9.50001 11.9927 10.5074 13 11.75 13ZM12.5 10.75C12.5 11.1642 12.1642 11.5 11.75 11.5C11.3358 11.5 11 11.1642 11 10.75C11 10.3358 11.3358 10 11.75 10C12.1642 10 12.5 10.3358 12.5 10.75Z"
        fill="black"
        fillRule="evenodd"
      />
    </svg>

    <p className="font-semibold text-xl tracking-tight">Remote Components</p>
  </div>
);

export const github = {
  owner: "vercel",
  repo: "remote-components",
};

export const nav = [
  {
    label: "Docs",
    href: "/docs",
  },
];

export const suggestions = [
  "What are Remote Components?",
  "How do I use Remote Components?",
  "How does CSS isolation work?",
  "How do I show fallback content?",
];

export const title = "Remote Components Documentation";

export const prompt =
  "You are a helpful assistant specializing in answering questions about Remote Components, a new way to compose components from separate microfrontends in a single application at runtime.";

export const translations = {
  en: {
    displayName: "English",
  },
};

export const basePath: string | undefined = undefined;
