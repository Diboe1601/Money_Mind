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

type Client = Database["public"]["Tables"]["clients"]["Row"];

const Clients = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  const { clients, isLoading, createClient, updateClient } = useClients();

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setViewDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
              <p className="text-muted-foreground">
                Manage your client relationships
              </p>
            </div>
            <ClientForm onSubmit={createClient} />
          </div>
          
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading clients...
            </div>
          ) : clients?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No clients yet. Add your first client to get started.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription>{client.company}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
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
                            <Button variant="outline" size="sm" className="flex-1">
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
