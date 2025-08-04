import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  DollarSign,
  Package
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const ReportsSection = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const { toast } = useToast();

  const handleExportReport = (reportType: string) => {
    toast({
      title: "Export en cours",
      description: `Rapport ${reportType} en cours de génération`
    });
  };

  const reports = [
    {
      id: "stock-movement",
      title: "Mouvements de Stock",
      description: "Historique des entrées et sorties de stock",
      icon: BarChart3,
      lastGenerated: "Il y a 2 heures",
      type: "Automatique"
    },
    {
      id: "valuation",
      title: "Valorisation Inventaire",
      description: "Valeur totale du stock par catégorie",
      icon: DollarSign,
      lastGenerated: "Hier",
      type: "Quotidien"
    },
    {
      id: "low-stock",
      title: "Produits en Stock Faible",
      description: "Liste des produits nécessitant un réapprovisionnement",
      icon: TrendingDown,
      lastGenerated: "Il y a 1 heure",
      type: "Temps réel"
    },
    {
      id: "turnover",
      title: "Rotation des Stocks",
      description: "Analyse de la rotation par produit et catégorie",
      icon: TrendingUp,
      lastGenerated: "Il y a 1 semaine",
      type: "Hebdomadaire"
    }
  ];

  const kpis = [
    {
      title: "Valeur Totale Stock",
      value: "€245,780",
      change: "+8.2%",
      changeType: "increase" as const,
      description: "Par rapport au mois dernier"
    },
    {
      title: "Rotation Moyenne",
      value: "12.3x",
      change: "+2.1%",
      changeType: "increase" as const,
      description: "Tours de stock par an"
    },
    {
      title: "Taux de Rupture",
      value: "2.1%",
      change: "-0.5%",
      changeType: "decrease" as const,
      description: "Amélioration ce mois"
    },
    {
      title: "Coût de Stockage",
      value: "€12,340",
      change: "+3.2%",
      changeType: "increase" as const,
      description: "Coût mensuel"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rapports & Analytics</h1>
          <p className="text-muted-foreground">
            Analysez les performances de votre inventaire
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">3 derniers mois</SelectItem>
              <SelectItem value="1y">1 année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <div className={`flex items-center space-x-1 ${
                kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.changeType === 'increase' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {kpi.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Rapports Disponibles</CardTitle>
          <CardDescription>
            Générez et téléchargez vos rapports d'inventaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <Card key={report.id} className="border-2 hover:border-primary/20 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{report.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {report.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {report.lastGenerated}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExportReport(report.title)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rapport Personnalisé</CardTitle>
            <CardDescription>
              Créez un rapport sur mesure selon vos critères
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <BarChart3 className="w-4 h-4 mr-2" />
              Créer un rapport
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alertes Email</CardTitle>
            <CardDescription>
              Recevez des rapports automatiques par email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Configurer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export Global</CardTitle>
            <CardDescription>
              Exportez toutes vos données d'inventaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Exporter tout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};