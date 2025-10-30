import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  event_type: string;
  start_time: string;
  end_time?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setEvents([]);
        return;
      }

      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .order("start_time", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData: Omit<CalendarEvent, "id" | "user_id" | "created_at" | "updated_at">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase
        .from("calendar_events")
        .insert([{ ...eventData, user_id: user.id }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event created successfully",
      });

      // Add notification entry
      try {
        await supabase.from('notifications').insert([{ 
          user_id: user.id,
          title: 'Event created',
          description: `${eventData.title}`,
          type: 'success',
          read: false,
          action_label: 'View Calendar',
          action_href: '/dashboard/calendar'
        }]);
      } catch (e) {
        console.error('Error adding notification:', e);
      }

      await fetchEvents();
    } catch (error: any) {
      console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    }
  };

  const updateEvent = async (id: string, eventData: Partial<CalendarEvent>) => {
    try {
      const { error } = await supabase
        .from("calendar_events")
        .update(eventData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event updated successfully",
      });

      // Add notification entry
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('notifications').insert([{ 
            user_id: user.id,
            title: 'Event updated',
            description: `Event ${eventData.title ?? ''} updated`,
            type: 'info',
            read: false,
            action_label: 'View Calendar',
            action_href: '/dashboard/calendar'
          }]);
        }
      } catch (e) {
        console.error('Error adding notification:', e);
      }

      await fetchEvents();
    } catch (error: any) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from("calendar_events")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event deleted successfully",
      });

      // Add notification entry
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('notifications').insert([{ 
            user_id: user.id,
            title: 'Event deleted',
            description: `An event was deleted`,
            type: 'warning',
            read: false,
            action_label: 'View Calendar',
            action_href: '/dashboard/calendar'
          }]);
        }
      } catch (e) {
        console.error('Error adding notification:', e);
      }

      await fetchEvents();
    } catch (error: any) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEvents();

    const channel = supabase
      .channel("calendar_events_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "calendar_events" },
        () => {
          fetchEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents,
  };
};
