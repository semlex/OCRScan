import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as cv from '@u4/opencv4nodejs'
import * as sharp from 'sharp'

@Injectable()
export class ImageService {
  private async cleanImage(imgBuffer: Buffer): Promise<Buffer> {
    const img = sharp(imgBuffer)

    return await img.grayscale().normalize().rotate().threshold(127).toBuffer()
  }

  // private detectSkewAngle(mat: cv.Mat): number {
  //   const edges = mat.canny(50, 200)
  //   // const lines = edges.houghLines(1, Math.PI / 180, 100, 30, 10)
  //   // let totalAngle = 0
  //   // lines.forEach((line) => {
  //   //   const rho = line.x * Math.cos(line.y)
  //   //   const theta = line.y - Math.PI / 2
  //   //   totalAngle += theta
  //   // })
  //   //
  //   // const averageAngle = totalAngle / lines.length
  //   //
  //   // console.log(averageAngle)
  //   //
  //   // return averageAngle * 180
  //   const linesP = edges.houghLinesP(
  //     1,
  //     Math.PI / 180,
  //     100,
  //     100,
  //     10,
  //   )
  //   const angleP =
  //     linesP.reduce((total, line) => {
  //       console.log(line)
  //       return total + Math.atan2(line.x - line.z, line.w - line.y)
  //     }, 0) / linesP.length
  //
  //   console.log(angleP)
  //
  //   return (angleP * 180) / Math.PI
  // }

  private detectSkewAngle2(mat: cv.Mat): cv.Mat {
    const gray = mat.cvtColor(cv.COLOR_BGR2GRAY)
    const blur = gray.gaussianBlur(new cv.Size(5, 5), 1)
    const edges = blur.canny(50, 200)
    const lines = edges.houghLines(1, Math.PI / 180, 150)
    // lines[0].
    const thresh = edges.threshold(0, 255, cv.THRESH_OTSU)
    const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(30, 5))
    const dilate = thresh.dilate(kernel)

    // const contours = dilate.findContours(cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
    const contours = edges.findContours(
      cv.RETR_EXTERNAL,
      cv.CHAIN_APPROX_SIMPLE,
    )

    const sorted = contours.sort((a, b) => b.area - a.area)

    const minAreaRect = sorted[0].minAreaRect()
    const boundRect = minAreaRect.boundingRect()

    console.log(boundRect)

    const pts1 = [
      new cv.Point2(boundRect.x, boundRect.y),
      new cv.Point2(boundRect.x + boundRect.width, boundRect.y),
      new cv.Point2(boundRect.x, boundRect.y + boundRect.height),
      new cv.Point2(
        boundRect.x + boundRect.width,
        boundRect.y + boundRect.height,
      ),
    ]

    const pts2 = [
      new cv.Point2(0, 0),
      new cv.Point2(mat.cols, 0),
      new cv.Point2(0, mat.rows),
      new cv.Point2(mat.cols, mat.rows),
    ]

    console.log(sorted[0].getPoints())

    return cv.getPerspectiveTransform(pts1, pts2)

    return edges

    // let angle = minAreaRect.angle
    //
    // if (angle < -45) {
    //   angle = 90 + angle
    // }
    // return angle
  }

  private async correctSkew(
    imgBuffer: Buffer,
    skewAngle: number,
  ): Promise<Buffer> {
    const img = sharp(imgBuffer)

    return await img.rotate(skewAngle).toBuffer()
  }

  private rotateImage(mat: cv.Mat, angle: number): cv.Mat {
    const h = mat.rows
    const w = mat.cols
    const center = new cv.Point2(Math.floor(w / 2), Math.floor(h / 2))
    const size = new cv.Size(w, h)
    const M = cv.getRotationMatrix2D(center, angle, 1.0)
    return mat.warpAffine(M, size, cv.INTER_CUBIC, cv.BORDER_REPLICATE)
  }
  async preprocessImage(imgBuffer: Buffer): Promise<Buffer> {
    const cleanedImgBuff = await this.cleanImage(imgBuffer)

    return cleanedImgBuff

    // const mat = await cv.imdecodeAsync(imgBuffer)
    // const cleanMat = await cv.imdecodeAsync(cleanedImgBuff)

    // const skewAngle = this.detectSkewAngle(mat)
    // const skewAngle = this.detectSkewAngle2(mat)
    // const rotatedImage = mat.warpPerspective(skewAngle)
    // const rotatedImage = this.rotateImage(cleanMat, -skewAngle)
    //
    // return await this.correctSkew(cleanedImgBuff, skewAngle)
    // return cv.imencode('.jpg', rotatedImage)
  }
}
