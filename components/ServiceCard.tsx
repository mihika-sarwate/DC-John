export default function ServiceCard({ service }: any) {
  return (
    <article>
      {service.icon && (
        <img src={service.icon.url} alt={service.title} />
      )}
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <p><strong>Target Audience:</strong> {service.targetAudience}</p>
    </article>
  )
}
