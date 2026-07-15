/**
 * Renders JSON-LD structured data as a plain server-side <script> so it lands
 * in the initial HTML — where non-JS search and AI crawlers can read it.
 * Do NOT swap this for next/script (afterInteractive injects it client-side).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
