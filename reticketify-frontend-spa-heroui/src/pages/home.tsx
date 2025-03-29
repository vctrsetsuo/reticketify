import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import { Image } from "@heroui/image";
import DefaultLayout from "@/layouts/default";

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="inline-block w-full text-center justify-center relative">
        <Image
          alt="HeroUI hero Image"
          src="home-background.jpg"
          width="100%"
          className="object-fill z-[-1] absolute brightness-[0.45] justify-center"
        />
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
        <div className="inline-block max-w-lg text-center justify-center relative">
          <span className={title({ color: "cyan" })}>Revolucionando&nbsp;</span>
          <span className={title()}>&nbsp;</span>
          <br />
          <span className={title()}>
          a Compra e Revenda de Ingressos
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Seu ingresso, seu dinheiro, sua segurança!
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/singin"
          >
            Cadastre-se
          </Link>
          <Link
            className={buttonStyles({
              color: "default",
              radius: "full",
              variant: "shadow",
            })}
            href="/login"
          >
            Entrar
          </Link>
        </div>

        {/*<div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>*/}
      </section>
    </DefaultLayout>
  );
}
