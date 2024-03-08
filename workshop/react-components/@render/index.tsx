import { createRoot } from 'react-dom/client';
import { Input } from '../atoms/Input';

createRoot(
  document.getElementById('root') as HTMLDivElement,
).render(<>
  <Input />,<Input native={{ disabled: true }}/>,<Input />
</>);
