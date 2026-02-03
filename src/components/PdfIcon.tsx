import { Svg, Path, Circle, Rect } from '@react-pdf/renderer';

// Icon definitions extracted from Lucide
interface IconElement {
  type: 'path' | 'circle' | 'rect';
  props: any;
}

const iconDefinitions: Record<string, IconElement[]> = {
  circleCheck: [
    { type: 'circle', props: { cx: '12', cy: '12', r: '10' } },
    { type: 'path', props: { d: 'm9 12 2 2 4-4' } },
  ],
  info: [
    { type: 'circle', props: { cx: '12', cy: '12', r: '10' } },
    { type: 'path', props: { d: 'M12 16v-4' } },
    { type: 'path', props: { d: 'M12 8h.01' } },
  ],
  circleX: [
    { type: 'circle', props: { cx: '12', cy: '12', r: '10' } },
    { type: 'path', props: { d: 'm15 9-6 6' } },
    { type: 'path', props: { d: 'm9 9 6 6' } },
  ],
  triangleAlert: [
    { type: 'path', props: { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' } },
    { type: 'path', props: { d: 'M12 9v4' } },
    { type: 'path', props: { d: 'M12 17h.01' } },
  ],
  squareCheck: [
    { type: 'rect', props: { width: '18', height: '18', x: '3', y: '3', rx: '2' } },
    { type: 'path', props: { d: 'm9 12 2 2 4-4' } },
  ],
  square: [
    { type: 'rect', props: { width: '18', height: '18', x: '3', y: '3', rx: '2' } },
  ],
  building2: [
    { type: 'path', props: { d: 'M10 12h4' } },
    { type: 'path', props: { d: 'M10 8h4' } },
    { type: 'path', props: { d: 'M14 21v-3a2 2 0 0 0-4 0v3' } },
    { type: 'path', props: { d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2' } },
    { type: 'path', props: { d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16' } },
  ],
  siren: [
    { type: 'path', props: { d: 'M7 18v-6a5 5 0 1 1 10 0v6' } },
    { type: 'path', props: { d: 'M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z' } },
    { type: 'path', props: { d: 'M21 12h1' } },
    { type: 'path', props: { d: 'M18.5 4.5 18 5' } },
    { type: 'path', props: { d: 'M2 12h1' } },
    { type: 'path', props: { d: 'M12 2v1' } },
    { type: 'path', props: { d: 'm4.929 4.929.707.707' } },
    { type: 'path', props: { d: 'M12 12v6' } },
  ],
};

interface PdfIconProps {
  name: keyof typeof iconDefinitions;
  size?: number;
  color?: string;
  style?: any;
}

export function PdfIcon({ name, size = 12, color = '#000', style }: PdfIconProps) {
  const elements = iconDefinitions[name];
  
  if (!elements) {
    console.warn(`PdfIcon: Unknown icon "${name}"`);
    return null;
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      {elements.map((element, i) => {
        const commonProps = {
          key: i,
          stroke: color,
          strokeWidth: 2,
          strokeLinecap: 'round' as const,
          strokeLinejoin: 'round' as const,
          fill: 'none',
        };

        switch (element.type) {
          case 'path':
            return <Path {...commonProps} d={element.props.d} />;
          case 'circle':
            return (
              <Circle
                {...commonProps}
                cx={element.props.cx}
                cy={element.props.cy}
                r={element.props.r}
              />
            );
          case 'rect':
            return (
              <Rect
                {...commonProps}
                width={element.props.width}
                height={element.props.height}
                x={element.props.x}
                y={element.props.y}
                rx={element.props.rx}
              />
            );
          default:
            return null;
        }
      })}
    </Svg>
  );
}
