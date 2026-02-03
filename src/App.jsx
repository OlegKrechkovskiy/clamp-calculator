import Example from '@/components/Example/Example';
import ClampFunction from '@/components/ClampFunction/ClampFunction';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

function App() {
  return (
    <div>
      <LanguageSwitcher />
      <ClampFunction />
      <Example />
    </div>
  );
}

export default App;
