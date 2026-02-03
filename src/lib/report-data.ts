export interface ChecklistItem {
  label: string;
  checked: boolean;
  note?: string;
}

export interface ChecklistSection {
  title: string;
  icon: string;
  items: ChecklistItem[];
  otherNotes: string;
  images: string[];
}

export interface Deficiency {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export interface ReportData {
  // Header info
  propertyAddress: string;
  reportedBy: string;
  company: string;
  date: string;
  reportedTo: string;
  recipientCompany: string;
  
  // Checklists
  rooftop: ChecklistSection;
  mechanicalRoom: ChecklistSection;
  cameraRoom: ChecklistSection;
  fireAlarm: ChecklistSection;
  
  // Deficiencies
  deficiencies: Deficiency[];
}

export const defaultRooftopItems: ChecklistItem[] = [
  { label: 'No visible damage to roofing membrane observed', checked: true },
  { label: 'Roof surface clean and free of debris', checked: true },
  { label: 'No loose flashing observed', checked: true },
  { label: 'All roof drains unobstructed', checked: true },
  { label: 'All rooftop units (RTUs) operating normally', checked: true },
  { label: 'Roof access door closed and locking properly', checked: true },
];

export const defaultMechanicalRoomItems: ChecklistItem[] = [
  { label: 'Room clean and free of debris', checked: true },
  { label: 'No visible leaks or standing water observed', checked: true },
  { label: 'Pumps operating correctly', checked: true },
  { label: 'Boiler pressure within normal operating range', checked: true },
  { label: 'Glycol tank levels acceptable', checked: true },
  { label: 'All lighting operational', checked: true },
];

export const defaultCameraRoomItems: ChecklistItem[] = [
  { label: 'Room clean and free of debris', checked: true },
  { label: 'Door locks properly / access controlled', checked: true },
  { label: 'Security system powered and operational', checked: true },
  { label: 'Camera images clear (not blurry, obstructed, or misaligned)', checked: true },
  { label: 'All cameras online', checked: true },
  { label: 'All lighting operational', checked: true },
];

export const defaultFireAlarmItems: ChecklistItem[] = [
  { label: 'Fire alarm panel found in Normal mode', checked: true },
  { label: 'No active troubles present', checked: true },
  { label: 'Monitoring company notified and system placed into test mode', checked: true },
  { label: 'Pull station pulled for test', checked: true },
  { label: 'Fire alarm annunciator functioning correctly (alarm and normal operation)', checked: true },
  { label: 'All horns and speakers activated during pull station testing', checked: true },
  { label: 'Battery backup connected and functional', checked: true },
  { label: 'No physical damage or loose mounting observed', checked: true },
  { label: 'Monitoring company notified upon test completion', checked: true },
  { label: 'Panel reset and returned to Normal operation', checked: true },
];

export const getDefaultReportData = (): ReportData => ({
  propertyAddress: '',
  reportedBy: '',
  company: 'Lemon Cleaners',
  date: new Date().toISOString().split('T')[0],
  reportedTo: '',
  recipientCompany: '',
  
  rooftop: {
    title: 'Rooftop – Inspection Checklist',
    icon: '✅',
    items: defaultRooftopItems,
    otherNotes: '',
    images: [],
  },
  
  mechanicalRoom: {
    title: 'Mechanical Room – Inspection Checklist',
    icon: '✅',
    items: defaultMechanicalRoomItems,
    otherNotes: '',
    images: [],
  },
  
  cameraRoom: {
    title: 'Camera Room / Security System – Inspection Checklist',
    icon: '✅',
    items: defaultCameraRoomItems,
    otherNotes: '',
    images: [],
  },
  
  fireAlarm: {
    title: 'Fire Alarm System – Inspection Checklist',
    icon: '🚨',
    items: defaultFireAlarmItems,
    otherNotes: '',
    images: [],
  },
  
  deficiencies: [],
});

// LocalStorage helpers
const STORAGE_KEY = 'lemon-report-data';

export const saveReportData = (data: ReportData): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save report data:', e);
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Consider removing some images.');
    }
    return false;
  }
};

export const loadReportData = (): ReportData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored report data:', e);
    }
  }
  return getDefaultReportData();
};

export const clearReportData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
