import Image from 'next/image';
import petLogo from '../../public/logo.svg';

export default function Logo({ width }: { width?: number }) {
  return <Image src={petLogo} alt="PetSoft logo" width={width} />;
}
