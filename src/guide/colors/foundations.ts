import primitiveSource from '../../styles/tokens/_primitives.scss?raw';
import semanticSource from '../../styles/tokens/_semantic-colors.scss?raw';

export type ColorToken = {
  variable: string;
  value: string;
  color?: string;
  name: string;
  label: string;
  group: string;
  alias?: string;
};

function declarations(source: string) {
  return Array.from(
    source.matchAll(/^(\$[a-z0-9-]+)\s*:\s*([^\r\n;]+);/gm),
    ([, variable, value]) => ({ variable, value: value.trim() }),
  );
}

function titleCase(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('-');
}

const displayOrder: Record<string, string[]> = {
  Other: ['White', 'Black', 'Error', 'Success', 'Warning', 'Info', 'Black 20'],
  Fill: [
    'Brand',
    'Brand-Hover',
    'Brand-Pressed',
    'Brand-Weak',
    'Brand-Weak-Pressed',
    'Neutral',
    'Neutral-Pressed',
    'Secondary',
    'Secondary-Hover',
    'Disabled',
    'Overlay',
    'Error',
    'Success',
    'Warning',
    'Info',
  ],
  Border: [
    'Subtle',
    'Default',
    'Strong',
    'Disabled',
    'Focus',
    'Selected',
    'Brand-Pressed',
    'Error',
  ],
};

function figmaOrder(a: ColorToken, b: ColorToken) {
  if (a.group !== b.group || !displayOrder[a.group]) return 0;
  return displayOrder[a.group].indexOf(a.label) - displayOrder[b.group].indexOf(b.label);
}

export const baseColors: ColorToken[] = declarations(primitiveSource)
  .filter(({ value }) => value.startsWith('#') || value.startsWith('rgba('))
  .map(({ variable, value }) => {
    const shortName = variable.slice(1);
    const group = shortName.startsWith('brand-')
      ? 'Brand'
      : shortName.startsWith('gray-')
        ? 'Gray'
        : 'Other';
    const label =
      group === 'Other'
        ? titleCase(shortName).replace('Black-20', 'Black 20')
        : shortName.split('-')[1];
    const suffix =
      shortName === 'black-20' ? 'Black/20' : group === 'Other' ? titleCase(shortName) : label;
    return { variable, value, color: value, group, label, name: `Base/${group}/${suffix}` };
  })
  .sort(figmaOrder);

const baseByVariable = new Map(baseColors.map((token) => [token.variable, token]));
const groupNames: Record<string, string> = {
  bg: 'Background',
  text: 'Text',
  icon: 'Icon',
  fill: 'Fill',
  border: 'Border',
};

export const semanticColors: ColorToken[] = declarations(semanticSource)
  .map(({ variable, value }) => {
    const [prefix, ...parts] = variable.slice(1).split('-');
    const group = groupNames[prefix];
    const label = titleCase(parts.join('-'));
    const base = baseByVariable.get(value.replace(/^primitives\./, ''));
    return {
      variable,
      value,
      group,
      label,
      name: `Semantic/${group}/${label}`,
      color: base?.color,
      alias: base?.name,
    };
  })
  .sort(figmaOrder);

export const semanticGroups = ['Background', 'Text', 'Icon', 'Fill', 'Border'] as const;
export const figmaFile = 'https://www.figma.com/design/4duxPFBOdVoMNiL9fNldle/TDS';
export const figmaLink = (node: string) => `${figmaFile}?node-id=${node.replace(':', '-')}&m=dev`;
