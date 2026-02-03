import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ReportData, loadReportData, saveReportData } from '@/lib/report-data';
import ChecklistSection from '@/components/ChecklistSection';
import DeficienciesSection from '@/components/DeficienciesSection';

export default function FormPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<ReportData>(loadReportData());

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    saveReportData(data);
  }, [data]);

  const updateField = (field: keyof ReportData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    saveReportData(data);
    navigate('/preview');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Monthly inspection report</h1>
          <p className="text-muted-foreground text-lg">
            Fill out the inspection checklist and generate a PDF report
          </p>
        </div>

        {/* Company Info */}
        <Card className="mb-8 rounded-2xl shadow-md bg-white">
          <CardHeader>
            <CardTitle>Report information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Property address</Label>
                <Input
                  id="propertyAddress"
                  value={data.propertyAddress}
                  onChange={(e) => updateField('propertyAddress', e.target.value)}
                  placeholder="435 Trunck Road"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={data.date}
                  onChange={(e) => updateField('date', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportedBy">Reported by</Label>
                <Input
                  id="reportedBy"
                  value={data.reportedBy}
                  onChange={(e) => updateField('reportedBy', e.target.value)}
                  placeholder="Michael Da Costa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={data.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  placeholder="Lemon Cleaners"
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportedTo">Reported to</Label>
                <Input
                  id="reportedTo"
                  value={data.reportedTo}
                  onChange={(e) => updateField('reportedTo', e.target.value)}
                  placeholder="Tanya Piekarski"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientCompany">Recipient company</Label>
                <Input
                  id="recipientCompany"
                  value={data.recipientCompany}
                  onChange={(e) => updateField('recipientCompany', e.target.value)}
                  placeholder="Richmond Property Group Ltd"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist Sections */}
        <ChecklistSection
          section={data.rooftop}
          onChange={(updated) => updateField('rooftop', updated)}
        />
        
        <ChecklistSection
          section={data.mechanicalRoom}
          onChange={(updated) => updateField('mechanicalRoom', updated)}
        />
        
        <ChecklistSection
          section={data.cameraRoom}
          onChange={(updated) => updateField('cameraRoom', updated)}
        />
        
        <ChecklistSection
          section={data.fireAlarm}
          onChange={(updated) => updateField('fireAlarm', updated)}
        />

        {/* Deficiencies */}
        <DeficienciesSection
          deficiencies={data.deficiencies}
          onChange={(updated) => updateField('deficiencies', updated)}
        />

        {/* Actions */}
        <div className="sticky bottom-0 mt-12">
          <Card className="rounded-t-2xl rounded-b-none shadow-lg bg-white">
            <CardContent className="py-6">
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => {
                  if (confirm('Clear all data and start fresh?')) {
                    setData(loadReportData());
                    localStorage.clear();
                  }
                }}>
                  Clear form
                </Button>
                <Button onClick={handlePreview}>
                  Preview report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
