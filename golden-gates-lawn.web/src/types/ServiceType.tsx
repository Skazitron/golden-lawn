import { GalleryType } from "@/types/GalleryType"
import { ImageType } from "@/types/ImageType"

type ServiceType = {
  id: number
  title: string
  description: string
  displayImage: ImageType
  galleries: GalleryType[]
}

export default ServiceType