"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"

interface CaptionResult {
  caption: string
  confidence: number
}

export function ImageCaptionGenerator() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<CaptionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedImage(file)
      setImagePreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const generateCaption = async () => {
    if (!uploadedImage) return

    setIsGenerating(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", uploadedImage)

      const response = await fetch("/api/generate-caption", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to generate caption")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  const resetUpload = () => {
    setUploadedImage(null)
    setImagePreview(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!imagePreview ? (
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? "border-accent bg-accent/10" : "border-border hover:border-accent hover:bg-accent/5"}
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-muted">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium">
                    {isDragActive ? "Drop your image here" : "Drag & drop an image here"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse files (max 10MB)</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-muted">
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Uploaded image"
                  width={400}
                  height={300}
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={generateCaption} disabled={isGenerating} className="flex-1">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Caption...
                    </>
                  ) : (
                    "Generate Caption"
                  )}
                </Button>
                <Button variant="outline" onClick={resetUpload}>
                  Upload New Image
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Generated Caption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-lg leading-relaxed">{result.caption}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <Badge variant="secondary">{(result.confidence * 100).toFixed(1)}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
