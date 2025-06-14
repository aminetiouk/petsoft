import Image from "next/image";

export default function PetList() {
  return (
    <ul className="bg-white border-b border-black[.08]">
      <li>
        <button className="flex items-center h-[70px] px-5 text-base w-full gap-3 hover:bg-amber-50 focus:bg-amber-50 transition">
          <Image src='https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png' width={45} height={45} alt="pet placeholder" className="rounded-full object-cover" />
          <p className="font-semibold">benjamin</p>
        </button>
      </li>
    </ul>
  )
}
