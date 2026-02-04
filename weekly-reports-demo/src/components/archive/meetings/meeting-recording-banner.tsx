import { Video, Play, Download } from "lucide-react";
import { Button } from "../../ui/button";

interface MeetingRecordingBannerProps {
  recordingUrl?: string;
  onWatch?: () => void;
  onDownload?: () => void;
}

/**
 * Banner showing recording availability with Watch and Download actions
 */
export function MeetingRecordingBanner({
  recordingUrl,
  onWatch,
  onDownload,
}: MeetingRecordingBannerProps) {
  const handleWatch = () => {
    if (onWatch) {
      onWatch();
    } else if (recordingUrl) {
      window.open(recordingUrl, "_blank");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/30">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
          <Video
            className="size-5 text-amber-600 dark:text-amber-400"
            strokeWidth={1.5}
          />
        </div>
        <div>
          <p className="text-ui font-medium text-foreground">
            Recording Available
          </p>
          <p className="text-caption text-muted-foreground">
            Video and transcript synced
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleWatch}>
          <Play className="size-3.5 mr-1.5" strokeWidth={1.5} />
          Watch
        </Button>
        <button
          type="button"
          onClick={onDownload}
          className="size-8 flex items-center justify-center rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
        >
          <Download
            className="size-4 text-muted-foreground"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </div>
  );
}
