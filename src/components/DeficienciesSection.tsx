import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, X, CircleX } from 'lucide-react';
import { Deficiency } from '@/lib/report-data';
import ImageUpload from './ImageUpload';

interface DeficienciesSectionProps {
  deficiencies: Deficiency[];
  onChange: (updated: Deficiency[]) => void;
}

export default function DeficienciesSection({ deficiencies, onChange }: DeficienciesSectionProps) {
  const addDeficiency = () => {
    const newDeficiency: Deficiency = {
      id: Date.now().toString(),
      title: '',
      description: '',
      images: [],
    };
    onChange([...deficiencies, newDeficiency]);
  };

  const updateDeficiency = (id: string, updates: Partial<Deficiency>) => {
    onChange(
      deficiencies.map(d => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const removeDeficiency = (id: string) => {
    onChange(deficiencies.filter(d => d.id !== id));
  };

  return (
    <Card className="mb-8 rounded-2xl shadow-md bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <CircleX className="w-5 h-5 text-destructive" />
            <span>Noted deficiencies</span>
          </CardTitle>
          <Badge variant="secondary">
            {deficiencies.length} {deficiencies.length === 1 ? 'issue' : 'issues'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {deficiencies.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No deficiencies noted. Click "Add deficiency" to report an issue.
          </p>
        ) : (
          deficiencies.map((deficiency, index) => (
            <div key={deficiency.id} className="space-y-4 p-6 border-2 border-destructive/20 rounded-xl bg-destructive/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">{index + 1}</Badge>
                    <Input
                      placeholder="Deficiency title (e.g., Security Camera Offline)"
                      value={deficiency.title}
                      onChange={(e) => updateDeficiency(deficiency.id, { title: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe the issue in detail..."
                      value={deficiency.description}
                      onChange={(e) => updateDeficiency(deficiency.id, { description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <ImageUpload
                    images={deficiency.images}
                    onChange={(images) => updateDeficiency(deficiency.id, { images })}
                    label="Photos of this issue"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDeficiency(deficiency.id)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {index < deficiencies.length - 1 && <Separator className="mt-4" />}
            </div>
          ))
        )}

        <Button onClick={addDeficiency} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add deficiency
        </Button>
      </CardContent>
    </Card>
  );
}
