export interface DemoMetric {
  id: string
  label: string
  value: number
  change: number
}

export interface DemoRecord {
  id: string
  name: string
  status: 'active' | 'pending' | 'complete'
  owner: string
  value: number
  priority: 'low' | 'medium' | 'high'
  notes: string
  createdAt: string
}

export interface NavItem {
  label: string
  href: string
}
