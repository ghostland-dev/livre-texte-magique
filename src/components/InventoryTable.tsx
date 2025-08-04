import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  status: "ok" | "low" | "out";
}

// Mock data - will be replaced with Supabase data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 14\"",
    sku: "MBP-14-001",
    category: "Informatique",
    currentStock: 5,
    minStock: 3,
    maxStock: 20,
    price: 2499,
    status: "ok"
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    sku: "IP15P-001",
    category: "Téléphones",
    currentStock: 2,
    minStock: 5,
    maxStock: 30,
    price: 1229,
    status: "low"
  },
  {
    id: "3",
    name: "AirPods Pro",
    sku: "APP-001",
    category: "Audio",
    currentStock: 0,
    minStock: 10,
    maxStock: 50,
    price: 279,
    status: "out"
  },
  {
    id: "4",
    name: "iPad Air",
    sku: "IPA-001",
    category: "Tablettes",
    currentStock: 15,
    minStock: 5,
    maxStock: 25,
    price: 649,
    status: "ok"
  }
];

export const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState<Product[]>(mockProducts);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "ok":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Stock OK</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Stock Faible</Badge>;
      case "out":
        return <Badge variant="destructive">Rupture</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Rechercher des produits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{product.currentStock}</span>
                    <span className="text-xs text-muted-foreground">
                      Min: {product.minStock} | Max: {product.maxStock}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{product.price}€</TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};