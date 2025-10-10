import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { email, message },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });

      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:border-primary"
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Your message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:border-primary resize-none"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-primary hover:bg-primary-hover"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};
