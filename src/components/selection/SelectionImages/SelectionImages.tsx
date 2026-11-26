type SelectionImagesProps = {
  images: { off: string; on: string; offDisabled: string; onDisabled: string };
};

/* 선택·비활성 상태에 쓰는 아이콘 출력 */
export default function SelectionImages({ images }: SelectionImagesProps) {
  return (
    <>
      {Object.entries(images).map(([state, src]) => (
        <img key={state} data-state={state} src={src} alt="" />
      ))}
    </>
  );
}
