'use client'

import { useMemo, useState } from 'react'
import { Badge, Button, Card, Input, Table } from '@/components/ui'
import { records } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'

export default function FeaturePage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return records.filter(record => {
      const matchesQuery = !q || [record.name, record.owner, record.notes].join(' ').toLowerCase().includes(q)
      const matchesStatus = status === 'all' || record.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Workflow</p>
          <h1 className="mt-1 text-3xl font-black text-zinc-950">Operating Queue</h1>
        </div>
        <Button type="button" onClick={() => setStatus('active')}>Show active</Button>
      </div>
      <Card>
        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
          <Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search records, owners, notes..." />
          <select value={status} onChange={event => setStatus(event.target.value)} className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      </Card>
      <Card>
        <Table>
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-zinc-500">
              <th className="pb-3">Record</th>
              <th className="pb-3">Owner</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Value</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(record => (
              <tr key={record.id} className="border-t border-zinc-100">
                <td className="py-3">
                  <p className="font-medium text-zinc-950">{record.name}</p>
                  <p className="text-xs text-zinc-500">{record.notes}</p>
                </td>
                <td className="py-3 text-zinc-600">{record.owner}</td>
                <td className="py-3"><Badge>{record.status}</Badge></td>
                <td className="py-3 font-semibold text-zinc-950">{formatCurrency(record.value * 100)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}
