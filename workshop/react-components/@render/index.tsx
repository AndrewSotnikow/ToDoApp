import { createRoot } from 'react-dom/client';
import { Checkbox } from '../atoms/CheckBox';

const CheckedIcon = () => <span>checkedIcon</span>;
const UncheckedIcon = () => <span>uncheckedIcon</span>;

createRoot(
  document.getElementById('root') as HTMLDivElement,
).render(<>
    <h1>Some text</h1>
    <Checkbox
      native={{
        checked: false,
      }}
      checkedIcon={<CheckedIcon />}
      uncheckedIcon={<UncheckedIcon />}
     />
</>);
