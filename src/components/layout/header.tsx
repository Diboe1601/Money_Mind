import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, User, Menu } from "lucide-react";
import { AddTransactionForm } from "@/components/forms/add-transaction-form";
import { NotificationPanel } from "@/components/notifications/notification-panel";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/dashboard/settings");
  };

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <header className="bg-gradient-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 shadow-elevated">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}MoneyMind_Logo.png`} alt="MoneyMind" className="h-8 w-auto object-contain" />
            <h1 className="text-xl font-bold font-heading text-foreground">MoneyMind</h1>
          </div>
          
          <div className="relative hidden sm:block sm:ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search transactions, clients..." 
              className="pl-10 w-56 md:w-80 bg-background"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <NotificationPanel />
          
          <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleProfileClick}>
            <User className="h-4 w-4" />
          </Button>
          
          <AddTransactionForm />
        </div>
      </div>
    </header>
  );
}