import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, TrendingDown, Calendar, Mail } from "lucide-react";
import { InventoryTable } from "./InventoryTable";
import { AddProductDialog } from "./AddProductDialog";
import { AlertsPanel } from "./AlertsPanel";

export const Dashboard = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Mock data - will be replaced with real data from Supabase
  const stats = {
    totalProducts: 156,
    lowStock: 12,
    outOfStock: 3,
    totalValue: 45780
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">StockManager Pro</h1>
              <p className="text-muted-foreground">Gestion intelligente de votre inventaire</p>
            </div>
            <Button onClick={() => setIsAddProductOpen(true)}>
              <Package className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Produits</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{stats.lowStock}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rupture de Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.outOfStock}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valeur Totale</CardTitle>
              <span className="text-xs">€</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()}€</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Inventory Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Inventaire</CardTitle>
                <CardDescription>Gérez vos produits et surveillez les stocks</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryTable />
              </CardContent>
            </Card>
          </div>

          {/* Alerts Panel */}
          <div>
            <AlertsPanel />
          </div>
        </div>
      </main>

      <AddProductDialog 
        open={isAddProductOpen} 
        onOpenChange={setIsAddProductOpen}
      />
    </div>
  );
};