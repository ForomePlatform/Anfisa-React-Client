import { hg38Folder } from '../igv.page'
import { IListBucket } from '../types/list-bucket.interface'

export const convertToListObject = (listBucket: IListBucket): string[] => {
  const contents = listBucket.ListBucketResult.Contents

  const listObject: string[] = []

  contents.forEach(element => {
    const name: string = element.Key._text

    if (name.startsWith(hg38Folder)) listObject.push(name)
  })

  return listObject
}
