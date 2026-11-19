type SelectionImagesProps = {
  images: { off: string; on: string; offDisabled: string; onDisabled: string };
};

export default function SelectionImages({ images }: SelectionImagesProps) {
  return (
    <>
      {Object.entries(images).map(([state, src]) => (
        <img key={state} data-state={state} src={src} alt="" />
      ))}
    </>
  );
}
