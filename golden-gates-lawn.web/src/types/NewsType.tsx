import { ImageType } from "@/types/ImageType"

export type NewsType = {
  title: string
  description: string
  content?: string
  slug: string
  displayImage: ImageType
  createdAt: string
  updatedAt: string
  author: string
}
