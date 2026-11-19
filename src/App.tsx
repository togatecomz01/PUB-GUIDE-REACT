import GuideHome from './guide/GuideHome.tsx';
import RequestPage from './guide/examples/request/RequestPage.tsx';

export default function App() {
  const example = new URLSearchParams(window.location.search).get('example');
  return example === 'request' ? <RequestPage /> : <GuideHome />;
}
