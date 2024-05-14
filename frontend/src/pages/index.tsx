import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Image
        src="/images/avatar/profil_yeti.png"
        alt="test"
        width={100}
        height={100}
      />
    </main>
  );
}
