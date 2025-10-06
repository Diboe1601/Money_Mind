import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Users, Eye, Edit } from "lucide-react";
import { useClients } from "@/hooks/use-clients";
import { ClientForm } from "@/components/forms/client-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Clients = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewClient, setViewClient] = useState<any>(null);
  const { clients, isLoading, createClient, updateClient } = useClients();

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
            <ClientForm onCreateClient={createClient} />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Loading clients...</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No clients yet. Create your first client to get started.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <Card key={client.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={client.avatar_url} />
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
                        <span className="truncate">{client.email}</span>
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
                          onClick={() => setViewClient(client)}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <ClientForm
                          client={client}
                          onUpdateClient={async (data) => {
                            await updateClient({ id: client.id, ...data });
                          }}
                          trigger={
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="mr-1 h-3 w-3" />
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
          
          <Dialog open={!!viewClient} onOpenChange={() => setViewClient(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Client Details</DialogTitle>
                <DialogDescription>Complete information for {viewClient?.name}</DialogDescription>
              </DialogHeader>
              {viewClient && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={viewClient.avatar_url} />
                      <AvatarFallback>
                        <Users className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{viewClient.name}</h3>
                      <p className="text-muted-foreground">{viewClient.company}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{viewClient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{viewClient.phone}</span>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Clients;