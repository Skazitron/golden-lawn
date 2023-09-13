
// eslint-disable-next-line unused-imports/no-unused-vars
const defaultImageVariant = {
  name: "loading",
  url: "loading",
  height: 200,
  width: 200

}

export type ImageType = {
  id: number
  alt: string
  caption: string
  formats: {
    thumbnail: ImageVariantType | typeof defaultImageVariant
    small: ImageVariantType | typeof defaultImageVariant
    medium: ImageVariantType | typeof defaultImageVariant
    large: ImageVariantType | typeof defaultImageVariant
  }
  url: string
  width: number
  height: number
}



type ImageVariantType = {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}