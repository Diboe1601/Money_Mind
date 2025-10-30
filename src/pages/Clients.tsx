import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Mail, Phone } from "lucide-react";
import { useClients } from "@/hooks/use-clients";
import { ClientForm } from "@/components/forms/client-form";
import { ClientDetailsDialog } from "@/components/client-details-dialog";
import type { Database } from "@/integrations/supabase/types";
import { useIsMobile } from "@/hooks/use-mobile";

type Client = Database["public"]["Tables"]["clients"]["Row"];

const Clients = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  const { clients, isLoading, createClient, updateClient } = useClients();

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setViewDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      <Sidebar open={isMobile ? sidebarOpen : true} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Clients</h1>
              <p className="text-muted-foreground">
                Manage your client relationships
              </p>
            </div>
            <ClientForm onSubmit={createClient} />
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 sm:py-12 text-muted-foreground">
              Loading clients...
            </div>
          ) : clients?.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-muted-foreground">
              No clients yet. Add your first client to get started.
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {clients?.map((client) => (
                <Card key={client.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={client.avatar_url || undefined} />
                        <AvatarFallback>
                          <Users className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg truncate max-w-[180px] sm:max-w-none">{client.name}</CardTitle>
                        <CardDescription className="truncate max-w-[180px] sm:max-w-none">{client.company}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate max-w-[200px] sm:max-w-none">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate max-w-[200px] sm:max-w-none">{client.phone}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="sm:flex-1"
                          onClick={() => handleViewClient(client)}
                        >
                          View
                        </Button>
                        <ClientForm
                          onSubmit={(data) => updateClient({ id: client.id, ...data })}
                          initialData={{
                            name: client.name,
                            company: client.company,
                            email: client.email,
                            phone: client.phone,
                            avatar_url: client.avatar_url || undefined,
                          }}
                          trigger={
                            <Button variant="outline" size="sm" className="sm:flex-1">
                              Edit
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <ClientDetailsDialog
            client={selectedClient}
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
          />
        </main>
      </div>
    </div>
  );
};

export default Clients;
