'use server';
// 通過新增 use server，可以將檔中所有匯出函數標記為伺服器函數，將這些伺服器功能導入到用戶端漢伺服器袁建中，會比ˋ較通用

import { z } from 'zod'; // 導入 zod 並定義與表單物件格式匹配的架構，此架構將在將其保存到資料庫 formData 之前對其進行驗證

import { sql } from '@vercel/postgres';
//  react有個用戶端路由cache 機制，會保存瀏覽器的片段一段時間，除了作為 prefetch以外，也確保在路由切換時，能更快速導航，並減少對伺服器的負擔
// 但因為 invoice 要看的是最新的數據，所以需要清除此緩存，並觸發對伺服器的新請求
// revalidatePath 就是用來處理這個狀況
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), // coerce: 強制將資料轉換為數字，並驗證其類型
  status: z.enum(['pending', 'paid']),
  data: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, data: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  // 更新資料庫後，將重新驗證 /dashboard/invoices 路徑，並從伺服器獲取新數據。
  revalidatePath('/dashboard/invoices');
  // 更新資料庫後，導航到 /dashboard/invoices 路徑
  redirect('/dashboard/invoices');

  // console.log(rawFormData);
  // console.log('typeof rawFormData.amount', typeof rawFormData.amount);
}
