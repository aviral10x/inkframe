import { drivePreview, driveThumbnail, driveView } from '../content/inkframe';

interface DriveEmbedProps {
  title: string;
  driveId: string;
  className?: string;
}

export default function DriveEmbed({ title, driveId, className }: DriveEmbedProps) {
  return (
    <div className={`drive-frame ${className ?? ''}`}>
      <div
        className="drive-poster"
        style={{ backgroundImage: `url(${driveThumbnail(driveId)})` }}
        aria-hidden="true"
      >
        <div className="drive-play-mark" />
      </div>
      <iframe
        src={drivePreview(driveId)}
        title={title}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
      <a className="drive-frame-link metadata" href={driveView(driveId)} target="_blank" rel="noopener noreferrer">
        Open source asset
      </a>
    </div>
  );
}
