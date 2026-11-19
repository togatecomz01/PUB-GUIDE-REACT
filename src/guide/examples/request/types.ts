export type RequestValues = {
  name: string;
  email: string;
  service: string;
  note: string;
};
export type ChangeField = (field: keyof RequestValues, value: string) => void;
export const serviceOptions = [
  { value: 'consultation', label: '서비스 상담' },
  { value: 'estimate', label: '견적 문의' },
  { value: 'other', label: '기타 문의' },
];
