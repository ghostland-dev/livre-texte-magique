import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Plus, Filter, Download, Upload } from "lucide-react";
import { InventoryTable } from "@/components/InventoryTable";
import { AddProductDialog } from "@/components/AddProductDialog";
import { useToast } from "@/hooks/use-toast";

export const InventorySection = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const handleExport = () => {
    // TODO: Implémenter l'export vers Excel/CSV
    toast({
      title: "Export en cours",
      description: "Votre fichier sera téléchargé sous peu"
    });
  };

  const handleImport = () => {
    // TODO: Implémenter l'import depuis Excel/CSV
    toast({
      title: "Import",
      description: "Fonctionnalité d'import bientôt disponible"
    });
  };

  const stats = {
    totalProducts: 156,
    categories: 8,
    lowStock: 12,
    outOfStock: 3
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventaire</h1>
          <p className="text-muted-foreground">
            Gérez vos produits et surveillez les niveaux de stock
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={() => setIsAddProductOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un produit
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catégories</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
            <p className="text-xs text-muted-foreground">
              Différentes catégories actives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              {stats.lowStock}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.lowStock}</div>
            <p className="text-xs text-muted-foreground">
              Produits nécessitant un réapprovisionnement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rupture de Stock</CardTitle>
            <Badge variant="destructive">{stats.outOfStock}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
            <p className="text-xs text-muted-foreground">
              Produits en rupture totale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
          <CardDescription>
            Filtrez et recherchez vos produits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par nom, SKU ou catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="informatique">Informatique</SelectItem>
                <SelectItem value="telephones">Téléphones</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="tablettes">Tablettes</SelectItem>
                <SelectItem value="accessoires">Accessoires</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tous statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                <SelectItem value="ok">Stock OK</SelectItem>
                <SelectItem value="low">Stock Faible</SelectItem>
                <SelectItem value="out">Rupture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Produits</CardTitle>
          <CardDescription>
            Liste complète de vos produits en stock
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InventoryTable />
        </CardContent>
      </Card>

      <AddProductDialog 
        open={isAddProductOpen} 
        onOpenChange={setIsAddProductOpen}
      />
    </div>
  );
};