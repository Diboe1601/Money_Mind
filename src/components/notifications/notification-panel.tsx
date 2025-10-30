import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- TYPES ---
export type Notification = {
  id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    href: string;
  };
};

// --- HOOK ---
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching notifications:", error);
    else {
      const mapped = (data ?? []).map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        type: (row.type as Notification["type"]) || "info",
        timestamp: row.created_at,
        read: row.read,
        action: row.action_label && row.action_href ? {
          label: row.action_label,
          href: row.action_href
        } : undefined
      }));
      setNotifications(mapped);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotifications();

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const row = payload.new as any;
            const mapped: Notification = {
              id: row.id,
              title: row.title,
              description: row.description,
              type: (row.type as Notification["type"]) || "info",
              timestamp: row.created_at,
              read: row.read,
              action: row.action_label && row.action_href ? {
                label: row.action_label,
                href: row.action_href
              } : undefined
            };
            setNotifications((prev) => [mapped, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            const row = payload.new as any;
            const mapped: Notification = {
              id: row.id,
              title: row.title,
              description: row.description,
              type: (row.type as Notification["type"]) || "info",
              timestamp: row.created_at,
              read: row.read,
              action: row.action_label && row.action_href ? {
                label: row.action_label,
                href: row.action_href
              } : undefined
            };
            setNotifications((prev) =>
              prev.map((n) => (n.id === mapped.id ? mapped : n))
            );
          } else if (payload.eventType === "DELETE") {
            setNotifications((prev) =>
              prev.filter((n) => n.id !== (payload.old as any).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = async () => {
    await supabase.from("notifications").update({ read: true });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}

// --- COMPONENT ---
export const NotificationPanel = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted transition">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <DropdownMenuItem className="text-center text-gray-500">
            No notifications
          </DropdownMenuItem>
        ) : (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className={`flex flex-col items-start ${
                n.read ? "opacity-70" : ""
              }`}
            >
              <div className="flex justify-between w-full">
                <p className="font-medium">{n.title}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(n.id);
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-muted-foreground">{n.description}</p>
              {!n.read && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-xs text-blue-500 hover:underline mt-1"
                >
                  Mark as read
                </button>
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
