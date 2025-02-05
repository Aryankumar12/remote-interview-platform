import StreamClientProvider from '../../components/providers/StreamClientProvider'

const Layout = ({children}: {children:React.ReactNode}) => {
  return (
    <StreamClientProvider> {children} </StreamClientProvider>
  )
}

export default Layout

// centeral page where everhyting children will get there provider i.e streamClientProvider
