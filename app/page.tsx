import { ImageCaptionGenerator } from "@/components/image-caption-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">AI Image Caption Generator</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Upload an image and get AI-generated captions instantly. Perfect for accessibility, content creation, and
              image analysis.
            </p>
          </div>
          <ImageCaptionGenerator />
        </div>
      </div>
    </main>
  )
}
