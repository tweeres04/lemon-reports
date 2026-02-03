# Lemon Report Generator

A web-based tool for generating professional building inspection reports in PDF format.

## Features

- **Web form interface** - Fill out inspection checklists with an intuitive form
- **4 inspection sections**:
  - Rooftop inspection checklist
  - Mechanical room inspection checklist
  - Camera room / security system checklist
  - Fire alarm system checklist
- **Deficiencies tracking** - Add, edit, and remove noted deficiencies
- **Image support** - Upload images or paste from clipboard for each section
- **PDF generation** - Generate professional PDF reports matching the Lemon Cleaners template
- **Auto-save** - Form data automatically saved to localStorage
- **PDF preview** - Preview the report before downloading

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

1. **Fill out report information** - Enter property address, date, reporter details, and recipient
2. **Complete checklists** - Check off items in each inspection section
   - Uncheck items to mark them as issues
   - Add notes for unchecked items
   - Upload photos for each section
3. **Add deficiencies** - Document specific issues found during inspection
   - Each deficiency can have a title, description, and photos
4. **Preview report** - Click "Preview report" to see the generated PDF
5. **Download PDF** - Click "Download PDF" to save the report

## Image Upload

Images can be added in three ways:

1. **Drag and drop** - Drag image files onto the upload area
2. **File upload** - Click "Upload" to select files from your computer
3. **Paste from clipboard** - Copy an image (e.g., screenshot) and click "Paste"

## Data Persistence

Form data is automatically saved to your browser's localStorage as you type. You can safely close the browser and come back later to continue editing.

To clear all data and start fresh, click "Clear form" at the bottom of the page.

## Tech Stack

- **React Router v7** - Full-stack React framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **@react-pdf/renderer** - PDF generation for React
- **Vite** - Next-generation frontend tooling

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── ChecklistSection.tsx
│   ├── DeficienciesSection.tsx
│   ├── ImageUpload.tsx
│   └── ReportPDF.tsx    # PDF template
├── lib/
│   ├── utils.ts
│   └── report-data.ts   # Data types and localStorage helpers
├── pages/
│   ├── FormPage.tsx     # Main form
│   └── PreviewPage.tsx  # PDF preview and download
├── main.tsx
└── index.css
```
