import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  if (!token || token !== process.env.CACHE_CLEAR_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    if (tag) {
      revalidateTag(tag);
    }

    if (path) {
      revalidatePath(path);
    }
    
    if (!path && !tag) {
      revalidatePath("/");
    }

    return NextResponse.json({ message: "Cache cleared successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Invalid request", error: errorMessage },
      { status: 400 }
    );
  }
}
