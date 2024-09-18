import { CardContent } from "@/components/ui/card";
import Image from "next/image";

export function PostContent({ body, image }: { body: string; image?: string }) {
  return (
    <CardContent>
      <p>{body}</p>
      {image && (
        <div className="relative w-36 h-36 mt-4">
          <Image
            src={image}
            alt={body}
            className="object-contain"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
    </CardContent>
  );
}
