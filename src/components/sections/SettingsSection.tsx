import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Mail, 
  Bell, 
  Shield, 
  Users, 
  Zap,
  Save,
  Globe,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SettingsSection = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    company: {
      name: "Mon Entreprise SARL",
      email: "contact@monentreprise.com",
      timezone: "Europe/Paris",
      currency: "EUR"
    },
    notifications: {
      lowStock: true,
      outOfStock: true,
      dailyReport: false,
      weeklyReport: true,
      emailAlerts: true,
      pushNotifications: false
    },
    inventory: {
      autoReorder: false,
      defaultMinStock: "5",
      defaultMaxStock: "100",
      lowStockThreshold: "20"
    }
  });

  const handleSave = (section: string) => {
    // TODO: Sauvegarder dans Supabase
    toast({
      title: "Paramètres sauvegardés",
      description: `Les paramètres ${section} ont été mis à jour`
    });
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Configurez votre application selon vos besoins
        </p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="inventory">Inventaire</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Informations de l'entreprise
              </CardTitle>
              <CardDescription>
                Gérez les informations de base de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input
                    id="companyName"
                    value={settings.company.name}
                    onChange={(e) => updateSetting("company", "name", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Email de contact</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={settings.company.email}
                    onChange={(e) => updateSetting("company", "email", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select 
                    value={settings.company.timezone} 
                    onValueChange={(value) => updateSetting("company", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select 
                    value={settings.company.currency} 
                    onValueChange={(value) => updateSetting("company", "currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar US ($)</SelectItem>
                      <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                      <SelectItem value="CHF">Franc Suisse (CHF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave("entreprise")}>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Préférences de notification
              </CardTitle>
              <CardDescription>
                Configurez comment et quand vous souhaitez être alerté
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Alertes de stock</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Stock faible</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir une alerte quand le stock est faible
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.lowStock}
                    onCheckedChange={(checked) => updateSetting("notifications", "lowStock", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Rupture de stock</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir une alerte en cas de rupture
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.outOfStock}
                    onCheckedChange={(checked) => updateSetting("notifications", "outOfStock", checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Rapports automatiques</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Rapport quotidien</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir un résumé quotidien par email
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.dailyReport}
                    onCheckedChange={(checked) => updateSetting("notifications", "dailyReport", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Rapport hebdomadaire</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir un résumé hebdomadaire détaillé
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReport}
                    onCheckedChange={(checked) => updateSetting("notifications", "weeklyReport", checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Canaux de notification</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Notifications email</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir les alertes par email
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.emailAlerts}
                    onCheckedChange={(checked) => updateSetting("notifications", "emailAlerts", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Notifications push</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir les alertes directement dans le navigateur
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateSetting("notifications", "pushNotifications", checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave("notifications")}>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Settings */}
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Configuration de l'inventaire
              </CardTitle>
              <CardDescription>
                Paramètres par défaut pour la gestion de votre stock
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Réapprovisionnement automatique</div>
                    <div className="text-sm text-muted-foreground">
                      Créer automatiquement des tâches de réapprovisionnement
                    </div>
                  </div>
                  <Switch
                    checked={settings.inventory.autoReorder}
                    onCheckedChange={(checked) => updateSetting("inventory", "autoReorder", checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultMinStock">Stock minimum par défaut</Label>
                  <Input
                    id="defaultMinStock"
                    type="number"
                    value={settings.inventory.defaultMinStock}
                    onChange={(e) => updateSetting("inventory", "defaultMinStock", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultMaxStock">Stock maximum par défaut</Label>
                  <Input
                    id="defaultMaxStock"
                    type="number"
                    value={settings.inventory.defaultMaxStock}
                    onChange={(e) => updateSetting("inventory", "defaultMaxStock", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">Seuil de stock faible (%)</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    value={settings.inventory.lowStockThreshold}
                    onChange={(e) => updateSetting("inventory", "lowStockThreshold", e.target.value)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave("inventaire")}>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Sécurité et accès
              </CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte et les accès utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Authentification</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Activer l'authentification à deux facteurs
                    <Badge variant="outline" className="ml-auto">Recommandé</Badge>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Gestion des utilisateurs</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Inviter des utilisateurs
                    <Badge variant="secondary" className="ml-auto">Prochainement</Badge>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Gérer les permissions
                    <Badge variant="secondary" className="ml-auto">Prochainement</Badge>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Données</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Exporter toutes les données
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Supprimer le compte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};