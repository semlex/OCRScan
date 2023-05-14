import dynamic from 'next/dynamic'

const ImgToPdf = dynamic(() => import('../../components/screens/img-to-pdf'), {
  ssr: false,
})

export default function ImgToPdfPage() {
  return <ImgToPdf />
}
