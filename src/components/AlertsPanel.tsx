import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Mail, Calendar, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: "low_stock" | "out_of_stock" | "reorder" | "calendar";
  product: string;
  message: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
}

// Mock alerts data
const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "out_of_stock",
    product: "AirPods Pro",
    message: "Rupture de stock détectée",
    priority: "high",
    timestamp: "Il y a 5 min"
  },
  {
    id: "2",
    type: "low_stock",
    product: "iPhone 15 Pro",
    message: "Stock faible (2 restants)",
    priority: "medium",
    timestamp: "Il y a 30 min"
  },
  {
    id: "3",
    type: "reorder",
    product: "MacBook Pro 14\"",
    message: "Recommandation de réapprovisionnement",
    priority: "low",
    timestamp: "Il y a 2h"
  },
  {
    id: "4",
    type: "calendar",
    product: "iPad Air",
    message: "Livraison prévue demain",
    priority: "medium",
    timestamp: "Il y a 1h"
  }
];

export const AlertsPanel = () => {
  const { toast } = useToast();

  const getPriorityColor = (priority: Alert["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "out_of_stock":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "low_stock":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "reorder":
        return <Bell className="w-4 h-4 text-blue-500" />;
      case "calendar":
        return <Calendar className="w-4 h-4 text-green-500" />;
    }
  };

  const handleSendEmail = (alert: Alert) => {
    // TODO: Intégrer avec Supabase Edge Function pour envoyer l'email
    toast({
      title: "Email envoyé",
      description: `Alerte pour ${alert.product} envoyée par email`
    });
  };

  const handleAddToCalendar = (alert: Alert) => {
    // TODO: Intégrer avec l'API Google Calendar ou autres
    toast({
      title: "Tâche ajoutée",
      description: `Tâche pour ${alert.product} ajoutée au calendrier`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Alertes & Notifications
        </CardTitle>
        <CardDescription>
          Alertes automatiques de stock et recommandations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <div key={alert.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.product}</p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={getPriorityColor(alert.priority)}
                >
                  {alert.priority}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {alert.timestamp}
                </span>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleSendEmail(alert)}
                    className="h-6 px-2"
                  >
                    <Mail className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleAddToCalendar(alert)}
                    className="h-6 px-2"
                  >
                    <Calendar className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full" size="sm">
            Voir toutes les alertes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};