'use client';
import { useEffect, useState } from 'react';

type Kind = 'news' | 'events';

export default function AdminPage() {
  const [kind, setKind] = useState<Kind>('news');
  const [adminSecret, setAdminSecret] = useState('');
  const [payload, setPayload] = useState<any>({
    slug: '',
    title: '',
    excerpt: '',
    body: '',
    coverUrl: '',
    tags: '',
    startsAt: '',
    endsAt: '',
    location: '',
    isOnline: false,
  });
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const s = localStorage.getItem('adminSecret');
    if (s) setAdminSecret(s);
  }, []);

  function saveSecret(v: string) {
    setAdminSecret(v);
    localStorage.setItem('adminSecret', v);
  }

  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    const url = kind === 'news' ? '/api/news' : '/api/events';
    const body: any = {
      slug: payload.slug,
      title: payload.title,
      excerpt: payload.excerpt,
      body: payload.body,
      coverUrl: payload.coverUrl || undefined,
      tags: payload.tags ? String(payload.tags).split(',').map((s)=>s.trim()).filter(Boolean) : [],
    };
    if (kind === 'events') {
      body.startsAt = payload.startsAt;
      body.endsAt = payload.endsAt || undefined;
      body.location = payload.location || '';
      body.isOnline = !!payload.isOnline;
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': adminSecret,
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    setResult({ status: res.status, json });
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Admin</h1>

      <label className="block">
        <span className="text-sm">x-admin-secret</span>
        <input className="border p-2 w-full" value={adminSecret} onChange={(e)=>saveSecret(e.target.value)} />
      </label>

      <div className="flex gap-3">
        <button className={`px-3 py-1 border ${kind==='news'?'bg-black text-white':''}`} onClick={()=>setKind('news')}>News</button>
        <button className={`px-3 py-1 border ${kind==='events'?'bg-black text-white':''}`} onClick={()=>setKind('events')}>Events</button>
      </div>

      <form onSubmit={submitCreate} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="block col-span-1">
            <span className="text-sm">slug</span>
            <input className="border p-2 w-full" value={payload.slug} onChange={e=>setPayload({...payload, slug:e.target.value})}/>
          </label>
          <label className="block col-span-1">
            <span className="text-sm">title</span>
            <input className="border p-2 w-full" value={payload.title} onChange={e=>setPayload({...payload, title:e.target.value})}/>
          </label>
        </div>
        <label className="block">
          <span className="text-sm">excerpt</span>
          <input className="border p-2 w-full" value={payload.excerpt} onChange={e=>setPayload({...payload, excerpt:e.target.value})}/>
        </label>
        <label className="block">
          <span className="text-sm">body (MD/MDX)</span>
          <textarea className="border p-2 w-full h-40" value={payload.body} onChange={e=>setPayload({...payload, body:e.target.value})}/>
        </label>
        <label className="block">
          <span className="text-sm">coverUrl (/images/news/... или https://...)</span>
          <input className="border p-2 w-full" value={payload.coverUrl} onChange={e=>setPayload({...payload, coverUrl:e.target.value})}/>
        </label>
        <label className="block">
          <span className="text-sm">tags (через запятую)</span>
          <input className="border p-2 w-full" value={payload.tags} onChange={e=>setPayload({...payload, tags:e.target.value})}/>
        </label>

        {kind === 'events' && (
          <div className="grid grid-cols-2 gap-3">
            <label className="block col-span-1">
              <span className="text-sm">startsAt (ISO)</span>
              <input className="border p-2 w-full" placeholder="2025-09-30T18:00:00.000Z"
                     value={payload.startsAt} onChange={e=>setPayload({...payload, startsAt:e.target.value})}/>
            </label>
            <label className="block col-span-1">
              <span className="text-sm">endsAt (ISO, optional)</span>
              <input className="border p-2 w-full" value={payload.endsAt} onChange={e=>setPayload({...payload, endsAt:e.target.value})}/>
            </label>
            <label className="block col-span-1">
              <span className="text-sm">location</span>
              <input className="border p-2 w-full" value={payload.location} onChange={e=>setPayload({...payload, location:e.target.value})}/>
            </label>
            <label className="block col-span-1">
              <span className="text-sm">isOnline</span>
              <input type="checkbox" className="ml-2" checked={payload.isOnline} onChange={e=>setPayload({...payload, isOnline:e.target.checked})}/>
            </label>
          </div>
        )}

        <button className="px-4 py-2 border rounded" type="submit">Create</button>
      </form>

      {result && (
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
