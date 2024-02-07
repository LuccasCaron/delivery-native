import { Link, LinkProps } from "expo-router";

type LinkButtonProps = LinkProps<string> & {
  title: string;
};

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link {...rest} className="text-slate-300 text-center text-base font-body">
      {title}
    </Link>
  );
}
