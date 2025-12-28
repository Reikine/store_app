import Guard from "@/components/Guard";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
    return (
        <Guard>
            <section>{children}</section>
        </Guard>
    );
}