import { Input } from './ui/input';
import { Label } from './ui/label';

export default function AutForm() {
  return (
    <form className='space-y-3'>
      <div className='space-y-2'>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div className='space-y-2'>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
    </form>
  );
}
