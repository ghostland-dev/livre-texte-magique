import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Package, Mail, Lock } from "lucide-react";

interface LoginFormProps {
  onSuccess: () => void;
  onToggleMode: () => void;
}

export const LoginForm = ({ onSuccess, onToggleMode }: LoginFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation basique
    if (!formData.email || !formData.password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // TODO: Intégrer avec Supabase Auth
    try {
      // Simulation de connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans StockManager Pro!"
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Package className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">StockManager Pro</CardTitle>
          <CardDescription>
            Connectez-vous à votre compte pour gérer votre inventaire
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          
          <div className="mt-4">
            <Button 
              variant="link" 
              className="w-full text-sm text-muted-foreground"
              onClick={() => toast({ title: "À venir", description: "Fonctionnalité bientôt disponible" })}
            >
              Mot de passe oublié ?
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Button variant="link" className="p-0 h-auto" onClick={onToggleMode}>
                Créer un compte
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};