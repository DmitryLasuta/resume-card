import { AdminEditor } from '@/components/admin/AdminEditor';
import { readContent, storageMode } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const content = await readContent();
  return <AdminEditor initial={content} storage={storageMode()} />;
}
