import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, Info } from 'lucide-react';
import { ChecklistSection as ChecklistSectionType } from '@/lib/report-data';
import ImageUpload from './ImageUpload';

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  onChange: (updated: ChecklistSectionType) => void;
}

export default function ChecklistSection({ section, onChange }: ChecklistSectionProps) {
  const toggleItem = (index: number) => {
    const newItems = [...section.items];
    newItems[index] = {
      ...newItems[index],
      checked: !newItems[index].checked,
    };
    onChange({ ...section, items: newItems });
  };

  const updateItemNote = (index: number, note: string) => {
    const newItems = [...section.items];
    newItems[index] = {
      ...newItems[index],
      note,
    };
    onChange({ ...section, items: newItems });
  };

  const checkedCount = section.items.filter(item => item.checked).length;
  const totalCount = section.items.length;
  const hasUncheckedItems = checkedCount < totalCount;
  
  const getSectionIcon = () => {
    if (hasUncheckedItems) {
      return <Info className="w-5 h-5 text-foreground" />;
    }
    return <CircleCheck className="w-5 h-5 text-[hsl(var(--success))]" />;
  };

  return (
    <Card className={`mb-8 rounded-2xl shadow-md bg-white ${checkedCount === totalCount ? 'border-l-4 border-l-[hsl(var(--success))]' : 'border-l-4 border-l-gray-300'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            {getSectionIcon()}
            <span>{section.title}</span>
          </CardTitle>
          <Badge variant={checkedCount === totalCount ? 'default' : 'secondary'}>
            {checkedCount}/{totalCount} passed
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {section.items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id={`${section.title}-${index}`}
                checked={item.checked}
                onCheckedChange={() => toggleItem(index)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor={`${section.title}-${index}`}
                  className={`cursor-pointer ${!item.checked ? 'text-destructive font-medium' : ''}`}
                >
                  {item.label}
                  {!item.checked && item.note && (
                    <span className="ml-2 text-sm italic text-muted-foreground">
                      (see deficiencies below)
                    </span>
                  )}
                </Label>
                {!item.checked && (
                  <Textarea
                    placeholder="Add note about this issue..."
                    value={item.note || ''}
                    onChange={(e) => updateItemNote(index, e.target.value)}
                    className="mt-2"
                    rows={2}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 space-y-2">
          <Label htmlFor={`${section.title}-other`}>Other notes</Label>
          <Textarea
            id={`${section.title}-other`}
            placeholder="Any additional observations..."
            value={section.otherNotes}
            onChange={(e) => onChange({ ...section, otherNotes: e.target.value })}
            rows={3}
          />
        </div>

        <div className="pt-4">
          <ImageUpload
            images={section.images}
            onChange={(images) => onChange({ ...section, images })}
            label="Section photos"
          />
        </div>
      </CardContent>
    </Card>
  );
}
