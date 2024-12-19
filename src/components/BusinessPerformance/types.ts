export interface ProductData {
  name: string;
  salesColumn: string;
  target: number;
}

export interface MetricData {
  label: string;
  value: string;
  icon: React.ComponentType;
  color: string;
}