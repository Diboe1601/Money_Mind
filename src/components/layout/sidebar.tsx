import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  FileText, 
  Users, 
  Settings,
  CreditCard,
  PieChart,
  Calendar,
  Target,
  ChevronsRight,
  ChevronDown,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Transactions", icon: Receipt, href: "/dashboard/transactions" },
  { name: "Analytics", icon: TrendingUp, href: "/dashboard/analytics" },
  { name: "Reports", icon: FileText, href: "/dashboard/reports" },
  { name: "Budgets", icon: Target, href: "/dashboard/budgets" },
  { name: "Invoices", icon: CreditCard, href: "/dashboard/invoices" },
  { name: "Clients", icon: Users, href: "/dashboard/clients" },
  { name: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-border bg-gradient-dark shadow-elevated"
      style={{
        width: open ? "280px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1 px-2">
        {navigation.map((item) => (
          <Option
            key={item.name}
            Icon={item.icon}
            title={item.name}
            href={item.href}
            open={open}
            current={location.pathname === item.href}
            navigate={navigate}
          />
        ))}
      </div>

      <div className="absolute bottom-16 left-0 right-0 px-2">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-card rounded-lg p-4 shadow-card mx-2"
          >
            <div className="flex items-center">
              <PieChart className="h-6 w-6 text-primary mr-3" />
              <div>
                <p className="text-sm font-medium">Financial Health</p>
                <p className="text-xs text-muted-foreground">85% Good</p>
              </div>
            </div>
            <div className="mt-3 bg-muted rounded-full h-2">
              <div className="bg-gradient-success h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-12 left-0 right-0 px-2">
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {open && "Sign Out"}
        </Button>
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
}

const Option = ({ Icon, title, href, open, current, navigate }: any) => {
  return (
    <motion.button
      layout
      onClick={() => navigate(href)}
      className={cn(
        "relative flex h-11 w-full items-center rounded-md transition-colors",
        current
          ? "bg-gradient-primary text-primary-foreground shadow-glow"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      <motion.div
        layout
        className="grid h-full w-12 place-content-center text-lg"
      >
        <Icon className="h-4 w-4" />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-sm font-medium"
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-6 border-b border-border pb-4 px-2">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-accent">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-sm font-semibold text-foreground">MoneyMind</span>
              <span className="block text-xs text-muted-foreground">Financial Dashboard</span>
            </motion.div>
          )}
        </div>
        {open && <ChevronDown className="mr-2 h-4 w-4 text-muted-foreground" />}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-gradient-primary shadow-glow"
    >
      <PieChart className="h-5 w-5 text-primary-foreground" />
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-border transition-colors hover:bg-accent"
    >
      <div className="flex items-center p-3">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronsRight
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-sm font-medium text-muted-foreground"
          >
            Collapse
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};