"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { adminSupabase } from "@/lib/supabase/admin";

export async function saveServiceRates(formData: FormData) {
  await requireSession();
  const entries = Array.from(formData.entries());
  const updates = entries
    .filter(([key]) => key.startsWith("rate_"))
    .map(([key, value]) => ({
      id: key.replace("rate_", ""),
      price: parseInt(value as string, 10),
    }))
    .filter(({ price }) => !isNaN(price) && price > 0);

  for (const { id, price } of updates) {
    await adminSupabase
      .from("ltc_service_rates")
      .update({ price, updated_at: new Date().toISOString() })
      .eq("id", id);
  }

  revalidatePath("/admin/calculator");
  revalidateTag("calculator-data", {});
}

export async function saveGradeLimits(formData: FormData) {
  await requireSession();
  const entries = Array.from(formData.entries());
  const updates = entries
    .filter(([key]) => key.startsWith("limit_"))
    .map(([key, value]) => ({
      id: key.replace("limit_", ""),
      monthly_limit: parseInt(value as string, 10),
    }))
    .filter(({ monthly_limit }) => !isNaN(monthly_limit) && monthly_limit > 0);

  for (const { id, monthly_limit } of updates) {
    await adminSupabase
      .from("ltc_grade_limits")
      .update({ monthly_limit, updated_at: new Date().toISOString() })
      .eq("id", id);
  }

  revalidatePath("/admin/calculator");
  revalidateTag("calculator-data", {});
}
