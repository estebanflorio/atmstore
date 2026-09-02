import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../lib/firebase'
import { Button } from '../../components/ui/Button'

function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const inputClass =
  'w-full px-3 py-2.5 border border-line bg-surface text-paper text-sm placeholder:text-violet focus:outline-none focus:border-lime'

export function ProductForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', price: '', category: '', tags: '', specs: '', description: '' })
  const [productId, setProductId] = useState('')
  const [existingImages, setExistingImages] = useState([])
  const [newImageFiles, setNewImageFiles] = useState([])
  const [finalFile, setFinalFile] = useState(null)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    getDoc(doc(db, 'products', id)).then((snap) => {
      if (snap.exists()) {
        const data = snap.data()
        setForm({
          name: data.name || '',
          price: data.price ?? '',
          category: data.category || '',
          tags: (data.tags || []).join(', '),
          specs: (data.specs || []).join('\n'),
          description: data.description || ''
        })
        setExistingImages(data.images || [])
        setProductId(id)
      }
      setLoading(false)
    })
  }, [id, isEdit])

  function handleNameChange(name) {
    setForm((f) => ({ ...f, name }))
    if (!isEdit) setProductId(slugify(name))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!productId) {
      setError('Falta el nombre — de ahí sale el ID del producto.')
      return
    }
    setSaving(true)
    try {
      const uploadedUrls = []
      for (const [i, file] of newImageFiles.entries()) {
        const ext = file.name.split('.').pop()
        const destPath = `previews/${productId}/${existingImages.length + i}.${ext}`
        const fileRef = ref(storage, destPath)
        await uploadBytes(fileRef, file)
        uploadedUrls.push(await getDownloadURL(fileRef))
      }

      if (finalFile) {
        await uploadBytes(ref(storage, `final/${productId}.zip`), finalFile)
      }

      await setDoc(doc(db, 'products', productId), {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        specs: form.specs.split('\n').map((s) => s.trim()).filter(Boolean),
        description: form.description,
        images: [...existingImages, ...uploadedUrls]
      })

      navigate('/admin/productos')
    } catch (err) {
      setError('Algo falló al guardar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-paper/40 text-sm">Cargando…</p>

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-xl mb-6">{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-paper/70 mb-1.5">Nombre</label>
          <input required value={form.name} onChange={(e) => handleNameChange(e.target.value)} className={inputClass} />
          {productId && (
            <p className="text-paper/40 text-xs mt-1">
              ID: {productId}{!isEdit && ' (no se puede cambiar después de guardar)'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-paper/70 mb-1.5">Precio (ARS)</label>
            <input
              required
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-paper/70 mb-1.5">Categoría</label>
            <input
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
              placeholder="frases, patrones, kits…"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-paper/70 mb-1.5">Tags (separados por coma)</label>
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className={inputClass}
            placeholder="mate, cumpleaños, kit"
          />
        </div>

        <div>
          <label className="block text-sm text-paper/70 mb-1.5">Specs (una por línea)</label>
          <textarea
            rows={4}
            value={form.specs}
            onChange={(e) => setForm({ ...form, specs: e.target.value })}
            className={inputClass}
            placeholder={'12 diseños\nFormato PNG'}
          />
        </div>

        <div>
          <label className="block text-sm text-paper/70 mb-1.5">Descripción</label>
          <textarea
            rows={4}
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-paper/70 mb-1.5">
            Imágenes {existingImages.length > 0 && `(ya tiene ${existingImages.length} cargadas)`}
          </label>
          {existingImages.length > 0 && (
            <div className="flex gap-2 mb-2">
              {existingImages.map((url) => (
                <img key={url} src={url} alt="" className="w-14 h-14 object-cover border border-line" />
              ))}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setNewImageFiles(Array.from(e.target.files))}
            className="text-sm text-paper/70"
          />
        </div>

        <div>
          <label className="block text-sm text-paper/70 mb-1.5">
            Archivo final (.zip) {isEdit && '— dejalo vacío para no reemplazarlo'}
          </label>
          <input type="file" accept=".zip" onChange={(e) => setFinalFile(e.target.files[0])} className="text-sm text-paper/70" />
        </div>

        {error && <p className="text-lime text-sm">{error}</p>}

        <Button type="submit" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar'}
        </Button>
      </form>
    </div>
  )
}
