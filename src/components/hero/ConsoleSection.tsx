type ConsoleSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export function ConsoleSection({ imageSrc, imageAlt }: ConsoleSectionProps) {
  return (
    <div id="console" className="console-section">
      <div className="console-section__container">
        <img
          className="console-section__image"
          src={imageSrc || "/images/dashboard/image.png"}
          alt={imageAlt || "MeshDefend Data Protection Overview dashboard"}
          width={1605}
          height={855}
        />
      </div>
    </div>
  );
}
