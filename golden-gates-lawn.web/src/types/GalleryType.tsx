import { TagsType } from "@/pages/gallery"

import { ImageType } from "@/types/ImageType"

export type GalleryType = {
  id: number
  title: string
  date: string  
  tags: TagsType[]
  images: ImageType[]
}