'use server';
// 通過新增 use server，可以將檔中所有匯出函數標記為伺服器函數，將這些伺服器功能導入到用戶端漢伺服器袁建中，會比ˋ較通用

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };
  console.log(rawFormData);
  console.log('typeof rawFormData.amount', typeof rawFormData.amount);
}
