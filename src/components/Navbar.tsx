import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  BarChart3,
  FileText,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  alertCount?: number;
}

export const Navbar = ({ activeSection, onSectionChange, alertCount = 3 }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Tableau de bord", icon: BarChart3 },
    { id: "inventory", label: "Inventaire", icon: Package },
    { id: "alerts", label: "Alertes", icon: Bell, badge: alertCount },
    { id: "reports", label: "Rapports", icon: FileText },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  const NavItems = ({ mobile = false }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-2' : 'space-x-1'}`}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <Button
            key={item.id}
            variant={isActive ? "default" : "ghost"}
            onClick={() => {
              onSectionChange(item.id);
              if (mobile) setIsMobileMenuOpen(false);
            }}
            className={`${mobile ? 'justify-start w-full' : ''} relative`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.label}
            {item.badge && item.badge > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {item.badge}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );

  return (
    <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-primary" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">StockManager Pro</h1>
                <p className="text-xs text-muted-foreground">Gestion d'inventaire</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavItems />
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="py-4">
                  <div className="flex items-center space-x-2 mb-6">
                    <Package className="w-6 h-6 text-primary" />
                    <span className="font-bold">StockManager Pro</span>
                  </div>
                  <NavItems mobile />
                </div>
              </SheetContent>
            </Sheet>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@company.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSectionChange('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSectionChange('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};