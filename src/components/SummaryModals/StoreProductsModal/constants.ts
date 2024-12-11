import { Leaf, Zap, Coffee, Heart, Apple, Dumbbell } from 'lucide-react';

export const PRODUCT_COLUMNS = [
  {
    id: 'CV ENERGY BOOST Sales',
    name: 'CV ENERGY BOOST',
    icon: Zap,
    color: '#00FF9C'
  },
  {
    id: 'CV EXOTIC INDULGENCE Sales',
    name: 'CV EXOTIC INDULGENCE',
    icon: Apple,
    color: '#F59E0B'
  },
  {
    id: 'CV ACAI ENERGIZE PWR Sales',
    name: 'CV ACAI ENERGIZE PWR',
    icon: Coffee,
    color: '#3B82F6'
  },
  {
    id: 'CV PASSION BLISS Sales',
    name: 'CV PASSION BLISS',
    icon: Heart,
    color: '#EC4899'
  },
  {
    id: 'CV FIT & WELLNESS Sales',
    name: 'CV FIT & WELLNESS',
    icon: Dumbbell,
    color: '#8B5CF6'
  },
  {
    id: 'CV CHIA SUPREMACY Sales',
    name: 'CV CHIA SUPREMACY',
    icon: Leaf,
    color: '#10B981'
  }
] as const;