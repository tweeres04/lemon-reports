import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { ReportData } from "@/lib/report-data";
import { PdfIcon } from "./PdfIcon";

// Register Poppins font
Font.register({
  family: 'Poppins',
  fonts: [
    { 
      src: 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJA.ttf',
      fontWeight: 400
    },
    { 
      src: 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_V1s.ttf',
      fontWeight: 600
    },
    { 
      src: 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1s.ttf',
      fontWeight: 700
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "Poppins",
    backgroundColor: "#FFFFFF",
    color: "#1A1A1A",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    letterSpacing: -0.5,
    lineHeight: 1.2,
  },
  emoji: {
    fontSize: 18,
    marginRight: 8,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
  },
  infoLabel: {
    width: 120,
    fontWeight: 600,
    color: "#1A1A1A",
  },
  infoValue: {
    flex: 1,
    fontWeight: 400,
  },
  section: {
    marginTop: 32,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    break: "avoid",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    paddingBottom: 12,
    marginBottom: 16,
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    letterSpacing: -0.2,
  },
  titleIcon: {
    marginRight: 4,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    paddingLeft: 10,
  },
  checkbox: {
    width: 14,
    height: 14,
    marginRight: 8,
    marginTop: -1,
  },
  checkboxChecked: {
    color: "#2E7D5A",
  },
  checkboxUnchecked: {
    color: "#C93724",
  },
  itemText: {
    flex: 1,
  },
  itemTextUnchecked: {
    color: "#C93724",
    fontWeight: 600,
  },
  note: {
    marginLeft: 20,
    marginTop: 4,
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#FFF9E6",
    fontSize: 9,
    borderLeft: "2px solid #D4A853",
    fontStyle: "italic",
  },
  otherNotes: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#F5F5F5",
    fontSize: 9,
    borderRadius: 6,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    objectFit: "cover",
  },
  deficiencyContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#FFFFFF",
    border: "1px solid #FCA5A5",
    borderRadius: 8,
    break: "avoid",
  },
  deficiencyTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 8,
  },
  deficiencyDescription: {
    fontSize: 9,
    marginBottom: 10,
    lineHeight: 1.4,
    color: "#1A1A1A",
  },
  disclaimer: {
    marginTop: 48,
    padding: 16,
    backgroundColor: "#FFFFFF",
    border: "1px solid #FCD34D",
    borderRadius: 8,
    break: "avoid",
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: 700,
  },
  disclaimerText: {
    fontSize: 8,
    lineHeight: 1.5,
  },
});

interface ReportPDFProps {
  data: ReportData;
}

export default function ReportPDF({ data }: ReportPDFProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderChecklist = (
    section: typeof data.rooftop,
  ) => {
    // Check if all items are passed
    const passedCount = section.items.filter(item => item.checked).length;
    const totalCount = section.items.length;
    const hasFailures = passedCount < totalCount;
    
    // Determine icon based on pass/fail status
    const iconData = hasFailures 
      ? { name: "info", color: "#1A1A1A" } // Info icon in normal text color
      : { name: "circleCheck", color: "#2E7D5A" }; // Green for all passed
    
    return (
      <View style={styles.section}>
        {/* Keep title and checklist items together */}
        <View wrap={false}>
          <View style={styles.sectionTitle}>
            <PdfIcon
              name={iconData.name as any}
              size={14}
              color={iconData.color}
              style={styles.titleIcon}
            />
            <Text>{section.title}</Text>
          </View>

          {section.items.map((item, index) => (
            <View key={index}>
              <View style={styles.checklistItem}>
                <View style={styles.checkbox}>
                  <PdfIcon
                    name={item.checked ? "squareCheck" : "square"}
                    size={14}
                    color={item.checked ? "#2E7D5A" : "#C93724"}
                  />
                </View>
                <Text
                  style={
                    !item.checked 
                      ? [styles.itemText, styles.itemTextUnchecked]
                      : styles.itemText
                  }
                >
                  {item.label}
                  {!item.checked && " (see deficiencies below)"}
                </Text>
              </View>
              {!item.checked && item.note && (
                <Text style={styles.note}>{item.note}</Text>
              )}
            </View>
          ))}

          {section.otherNotes && (
            <View style={styles.otherNotes}>
              <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Other:</Text>
              <Text>{section.otherNotes}</Text>
            </View>
          )}
        </View>

        {/* Images can break across pages */}
        {section.images.length > 0 && (
          <View style={styles.imageGrid}>
            {section.images.map((img, idx) => (
              <Image key={idx} src={img} style={styles.image} />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.title}>
            <PdfIcon name="building2" size={26} color="#1A1A1A" />
            <Text>
              {data.propertyAddress.toUpperCase()} MONTHLY REPORT
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reported by:</Text>
            <Text style={styles.infoValue}>
              {data.reportedBy} of {data.company}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{formatDate(data.date)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reported to:</Text>
            <Text style={styles.infoValue}>
              {data.reportedTo} of {data.recipientCompany}
            </Text>
          </View>
        </View>

        {/* Checklists */}
        {renderChecklist(data.rooftop)}
        {renderChecklist(data.mechanicalRoom)}
        {renderChecklist(data.cameraRoom)}
        {renderChecklist(data.fireAlarm)}

        {/* Deficiencies */}
        {data.deficiencies.length > 0 && (
          <View style={styles.section}>
            {/* Keep title with first deficiency */}
            <View wrap={false}>
              <View style={styles.sectionTitle}>
                <PdfIcon
                  name="circleX"
                  size={14}
                  color="#C93724"
                  style={styles.titleIcon}
                />
                <Text>Noted Deficiencies</Text>
              </View>
            </View>

            {data.deficiencies.map((deficiency, index) => (
              <View key={deficiency.id}>
                {/* Keep deficiency title and description together */}
                <View style={styles.deficiencyContainer} wrap={false}>
                  <Text style={styles.deficiencyTitle}>
                    {index + 1}. {deficiency.title}
                  </Text>
                  <Text style={styles.deficiencyDescription}>
                    {deficiency.description}
                  </Text>
                </View>
                {/* Images can break across pages */}
                {deficiency.images.length > 0 && (
                  <View style={[styles.deficiencyContainer, { paddingTop: 0, marginTop: -12 }]}>
                    <View style={styles.imageGrid}>
                      {deficiency.images.map((img, idx) => (
                        <Image key={idx} src={img} style={styles.image} />
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Disclaimer */}
        <View style={styles.disclaimer} wrap={false}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <PdfIcon
              name="triangleAlert"
              size={12}
              color="#D4A853"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.disclaimerTitle}>Disclaimer</Text>
          </View>
          <Text style={styles.disclaimerText}>
            {data.company} and its staff are not liable for any damages,
            malfunctions, or system deficiencies existing within the building's
            emergency lighting or life-safety systems. The work performed
            consisted solely of like-for-like battery replacement and
            visual/testing procedures. No alterations, modifications, or repairs
            were made to the building's electrical or life-safety systems.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
