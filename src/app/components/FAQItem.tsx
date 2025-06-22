export interface Props {
  title: string;
  description: string;
}

export function FAQItem({ title, description }: Props) {
  return (
    <div className="w-[351px] h-min flex flex-col gap-3 p-5 rounded-2xl border border-border-primary">
      <p className="font-bold text-heading">{title}</p>
      <p className="text-body">{description}</p>
    </div>
  );
}
