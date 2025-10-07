import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent } from "@/hooks/use-calendar-events";

interface EventDetailsDialogProps {
  event: CalendarEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export function EventDetailsDialog({
  event,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: EventDetailsDialogProps) {
  if (!event) return null;

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "task":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "reminder":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "conference_room":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatEventType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{event.title}</DialogTitle>
              <Badge className={getEventColor(event.event_type)}>
                {formatEventType(event.event_type)}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(event.start_time), "PPPP")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(event.start_time), "p")}
                {event.end_time && ` - ${format(new Date(event.end_time), "p")}`}
              </p>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>
          )}

          {event.description && (
            <div className="pt-2 border-t">
              <p className="font-medium mb-2">Description</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onDelete(event.id);
              onOpenChange(false);
            }}
            className="flex-1 sm:flex-none"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button
            onClick={() => {
              onEdit(event);
              onOpenChange(false);
            }}
            className="flex-1 sm:flex-none"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
