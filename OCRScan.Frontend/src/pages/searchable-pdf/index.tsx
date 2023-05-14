import dynamic from 'next/dynamic'

const SearchablePdf = dynamic(
  () => import('../../components/screens/searchable-pdf'),
  {
    ssr: false,
  }
)

export default function SearchablePdfPage() {
  return <SearchablePdf />
}
