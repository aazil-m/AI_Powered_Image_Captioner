import { NextResponse, type NextRequest } from "next/server";

// Using a placeholder for the API key here. In a real-world scenario, you would
// configure this in your environment variables.
const API_KEY = "KEY"; // Replaced with a placeholder
const API_URL = `URL`;
const TIMEOUT_MS = 60_000;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    const prompt = formData.get("prompt") || "Describe the image concisely.";

    if (!(image instanceof File)) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    
    // The API key is provided by the canvas environment at runtime.
    // If you were deploying this yourself, you would need to configure it.
    if (!API_KEY) {
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
    }

    // Convert the image to a Base64-encoded string
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const base64Image = imageBuffer.toString("base64");

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: image.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Generative API error (${response.status}): ${errorText}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const caption = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!caption) {
      return NextResponse.json(
        { error: "Unexpected Generative API response", raw: data },
        { status: 502 }
      );
    }

    return NextResponse.json({ caption, raw: data });
  } catch (err: any) {
    const msg =
      err?.name === "TimeoutError" || err?.name === "AbortError"
        ? "Generative API request timed out"
        : err?.message || "Failed to generate caption";
    console.error("[generate-caption] ", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
