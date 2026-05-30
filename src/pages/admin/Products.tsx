import { useState } from 'react'
import { menuItems, categories } from '@/data/menu'
import { Search, Plus, Pencil, Trash2, X, Check, IceCream } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface EditingProduct { id: string; name: string; description: string; price: string; calories: string; category: string; badge: string }

export default function AdminProducts() {
  const [products, setProducts] = useState(menuItems)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [editing, setEditing] = useState<EditingProduct | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000) }

  const filtered = products.filter((p) => { const matchCat = catFilter === 'All' || p.category === catFilter; const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()); return matchCat && matchSearch })

  const handleSave = () => { if (!editing) return; setProducts((prev) => prev.map((p) => p.id === editing.id ? { ...p, name: editing.name, description: editing.description, price: parseFloat(editing.price) || 0, calories: parseInt(editing.calories) || 0, category: editing.category, badge: editing.badge || undefined } : p)); setEditing(null); showToast('Product updated successfully') }
  const handleDelete = (id: string) => { setProducts((prev) => prev.filter((p) => p.id !== id)); showToast('Product deleted') }
  const handleAdd = (newProduct: EditingProduct) => { const product = { id: `ds-${Date.now()}`, name: newProduct.name, description: newProduct.description, price: parseFloat(newProduct.price) || 0, calories: parseInt(newProduct.calories) || 0, category: newProduct.category, badge: newProduct.badge || undefined, image: '/images/strawberry-scoop.jpg', modifiers: [] }; setProducts((prev) => [...prev, product]); setShowAdd(false); showToast('Product added successfully') }
  const getBadgeColor = (b?: string) => { if (b === 'Bestseller') return 'bg-ds-rose text-white'; if (b === 'New') return 'bg-ds-mint text-ds-chocolate'; if (b === 'Popular') return 'bg-ds-caramel text-white'; if (b === 'Signature') return 'bg-ds-chocolate text-white'; if (b === 'Vegan') return 'bg-green-500 text-white'; return 'bg-ds-caramel/20 text-ds-caramel' }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div><h1 className="font-display text-2xl font-bold text-ds-chocolate">Products</h1><p className="text-ds-caramel text-sm mt-1">{products.length} products in your menu</p></div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 bg-ds-rose text-white rounded-full font-medium text-sm active:scale-95 transition-transform shadow-lg shadow-ds-rose/20"><Plus size={16} /> Add Product</button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-caramel" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-ds-caramel/20 rounded-xl text-sm text-ds-chocolate outline-none focus:border-ds-rose" />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="px-4 py-2.5 bg-white border border-ds-caramel/20 rounded-xl text-sm text-ds-chocolate outline-none focus:border-ds-rose">
          <option value="All">All Categories</option>
          {categories.filter((c) => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl overflow-hidden border border-ds-caramel/10 shadow-sm group">
            <div className="aspect-[16/10] relative overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              {p.badge && <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${getBadgeColor(p.badge)}`}>{p.badge}</span>}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditing({ id: p.id, name: p.name, description: p.description, price: p.price.toString(), calories: p.calories.toString(), category: p.category, badge: p.badge || '' })} className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center shadow-sm"><Pencil size={14} className="text-ds-chocolate" /></button>
                <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center shadow-sm hover:bg-red-50"><Trash2 size={14} className="text-red-500" /></button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display font-semibold text-ds-chocolate text-sm">{p.name}</h3>
              <p className="text-ds-caramel text-xs mt-1 line-clamp-1">{p.description}</p>
              <div className="flex items-center justify-between mt-3"><span className="text-ds-rose font-display font-bold">${p.price.toFixed(2)}</span><span className="text-ds-caramel text-xs">{p.calories} cal</span></div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between mb-4"><h2 className="font-display text-xl font-bold text-ds-chocolate">Edit Product</h2><button onClick={() => setEditing(null)} className="w-8 h-8 rounded-full bg-ds-cream flex items-center justify-center"><X size={16} className="text-ds-caramel" /></button></div>
              <div className="space-y-3">
                <div><label className="text-ds-chocolate text-sm font-medium">Name</label><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose" /></div>
                <div><label className="text-ds-chocolate text-sm font-medium">Description</label><textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose resize-none" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-ds-chocolate text-sm font-medium">Price</label><input type="number" step="0.01" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose" /></div>
                  <div><label className="text-ds-chocolate text-sm font-medium">Calories</label><input type="number" value={editing.calories} onChange={(e) => setEditing({ ...editing, calories: e.target.value })} className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose" /></div>
                </div>
                <div><label className="text-ds-chocolate text-sm font-medium">Category</label><select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose">{categories.filter((c) => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="text-ds-chocolate text-sm font-medium">Badge</label><select value={editing.badge} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose"><option value="">None</option><option value="Bestseller">Bestseller</option><option value="New">New</option><option value="Popular">Popular</option><option value="Signature">Signature</option><option value="Vegan">Vegan</option></select></div>
                <button onClick={handleSave} className="w-full h-12 rounded-full bg-ds-rose text-white font-display font-semibold active:scale-[0.97] transition-transform mt-2">Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4"><h2 className="font-display text-xl font-bold text-ds-chocolate">Add Product</h2><button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full bg-ds-cream flex items-center justify-center"><X size={16} className="text-ds-caramel" /></button></div>
              <AddProductForm onAdd={handleAdd} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-ds-chocolate text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg flex items-center gap-2"><Check size={16} className="text-ds-rose" /> {toast}</motion.div>}
      </AnimatePresence>
    </div>
  )
}

function AddProductForm({ onAdd }: { onAdd: (p: EditingProduct) => void }) {
  const [form, setForm] = useState<EditingProduct>({ id: '', name: '', description: '', price: '', calories: '', category: 'Artisan Scoops', badge: '' })
  return (
    <div className="space-y-3">
      <div><label className="text-ds-chocolate text-sm font-medium">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Honey Lavender" className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose" /></div>
      <div><label className="text-ds-chocolate text-sm font-medium">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ingredients and details..." rows={3} className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose resize-none" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-ds-chocolate text-sm font-medium">Price</label><input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="5.49" className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose" /></div>
        <div><label className="text-ds-chocolate text-sm font-medium">Calories</label><input type="number" value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} placeholder="280" className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose" /></div>
      </div>
      <div><label className="text-ds-chocolate text-sm font-medium">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full mt-1 px-3 py-2 border border-ds-caramel/20 rounded-lg text-sm outline-none focus:border-ds-rose">{categories.filter((c) => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
      <button onClick={() => { if (!form.name || !form.price) return; onAdd(form) }} className="w-full h-12 rounded-full bg-ds-rose text-white font-display font-semibold active:scale-[0.97] transition-transform mt-2 flex items-center justify-center gap-2"><IceCream size={16} /> Add Product</button>
    </div>
  )
}