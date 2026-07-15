/**
 * Blueprint-style corner brackets for drafting-sheet panels. Absolute-
 * positioned; the parent must be `relative`. Pass a border-color utility
 * to theme: fixed `border-brand-light` on ink surfaces (default), or a
 * flipping token like `border-main-blue/50` on themed surfaces.
 */
export default function Corners({ color = "border-brand-light" }: { color?: string }) {
    return (
        <>
            {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((pos) => (
                <span key={pos} aria-hidden="true" className={`absolute ${pos} z-10 h-5 w-5 ${color}`} />
            ))}
        </>
    );
}
