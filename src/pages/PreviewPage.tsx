import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download } from 'lucide-react';
import { loadReportData } from '@/lib/report-data';
import ReportPDF from '@/components/ReportPDF';

export default function PreviewPage() {
  const navigate = useNavigate();
  const [data] = useState(loadReportData());
  const [showViewer, setShowViewer] = useState(true);

  const filename = `${data.propertyAddress || 'Building'}-Report-${data.date}.pdf`
    .replace(/[^a-z0-9.-]/gi, '-')
    .replace(/-+/g, '-');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to form
            </Button>
            <div>
              <h1 className="text-xl font-bold">Report preview</h1>
              <p className="text-sm text-muted-foreground">
                {data.propertyAddress || 'Building'} - {data.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowViewer(!showViewer)}
            >
              {showViewer ? 'Hide' : 'Show'} preview
            </Button>
            
            <PDFDownloadLink
              document={<ReportPDF data={data} />}
              fileName={filename}
            >
              {({ loading }) => (
                <Button disabled={loading}>
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? 'Generating PDF...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {showViewer ? (
          <Card className="overflow-hidden">
            <PDFViewer
              style={{
                width: '100%',
                height: '80vh',
                border: 'none',
              }}
            >
              <ReportPDF data={data} />
            </PDFViewer>
          </Card>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              Preview hidden. Click "Show preview" to view the report.
            </p>
            <PDFDownloadLink
              document={<ReportPDF data={data} />}
              fileName={filename}
            >
              {({ loading }) => (
                <Button disabled={loading}>
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? 'Generating PDF...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
}
