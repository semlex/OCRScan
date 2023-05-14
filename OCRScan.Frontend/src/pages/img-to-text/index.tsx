import dynamic from 'next/dynamic'

const ImgToText = dynamic(
  () => import('../../components/screens/img-to-text'),
  {
    ssr: false,
  }
)

export default function ImgToPdfPage() {
  return <ImgToText />
}
