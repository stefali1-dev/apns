// lib/subscriptionService.ts

export async function subscribeUser(email: string): Promise<{ success: boolean; message?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Mock saved email: ${email}`);
      resolve({ success: true });
    }, 1000); // Simulate API delay
  });
}
