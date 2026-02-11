export function Image({
  src,
  srcDark,
  alt = "",
  width,
  height,
}: {
  src: string;
  srcDark?: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  const sharedClasses = "w-full h-auto rounded-sm shadow-sm";

  return (
    <figure className="flex justify-center items-center my-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${sharedClasses} ${srcDark ? "dark:hidden" : ""}`}
        alt={alt}
        src={src}
        width={width}
        height={height}
      />

      {srcDark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`${sharedClasses} hidden dark:block`}
          alt={alt}
          src={srcDark}
          width={width}
          height={height}
        />
      ) : null}
    </figure>
  );
}
