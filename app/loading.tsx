import Image from "next/image";
import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] gap-8">
      <Image
        src="/AccessibleMeLogo2.png"
        alt="AccessibleMe Logo"
        width={120}
        height={120}
        className="animate-pulse"
      />
      <Loader size={50} color="#7DD9C3" />
    </div>
  );
}
