/** Renders one `<script type="application/ld+json">` per schema object. */
export default function JsonLd({ data }: { data: object[] }) {
  return (
    <>
      {data.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
