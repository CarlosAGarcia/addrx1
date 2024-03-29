import dynamic from 'next/dynamic'

const ComingSoon = dynamic(() => import('../components/Landing/Landing'), {
  ssr: false
});

const Index = () => (
  <div className='main' style={{ padding: 0, margin: 0 }}>
    <ComingSoon/>
  </div>
)

export default Index
