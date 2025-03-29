import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { useNavigate } from "react-router";
import { useState } from "react";
import { addToast } from "@heroui/toast";

export default function SingInPage() {
  const [awaitCadastro, setAwaitCadastro] = useState(false);
  const [showFormCadastro, setShowFormCadastro] = useState(true);
  const [showSectionCadastroOK, setShowSectionCadastroOK] = useState(false);

  const navigate = useNavigate();

  return (
    <DefaultLayout>
      {showFormCadastro && (
        <section className="flex flex-col items-center justify-center">
          <div className="inline-block max-w-lg text-center justify-center pb-10">
            <span className={title({ color: "blue" })}>Cadastre-se&nbsp;</span>
            <span className={title()}>no ReTicketify&nbsp;</span>
            <div className={subtitle({ class: "mt-4" })}>
              Por favor, informe os seguintes dados:
            </div>
          </div>
          <Form
            className="w-full max-w-2xl flex items-center gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setAwaitCadastro(true)

              let data = Object.fromEntries(new FormData(e.currentTarget));

              try {
                const resposta = await fetch("http://localhost:8080/api/v1/user", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });

                if (resposta.ok) {
                  const data = resposta.body;
                  console.log("Sucesso:", data);

                  setShowFormCadastro(false)
                  setShowSectionCadastroOK(true)

                  addToast({
                    title: "Cadastro",
                    description: "Seu cadastro no ReTicketify foi realizado com sucesso!",
                    color: "success",
                  })
                } else {
                  console.error("Erro ao criar chamado.");
                  addToast({
                    title: "Falha",
                    description: "Falha ao tentar realizar o seu cadastro, tente novamente.",
                    color: "danger",
                  })
                }
              } catch (erro) {
                console.error("Erro:", erro);
                addToast({
                  title: "Falha",
                  description: "Falha ao tentar realizar o seu cadastro, tente novamente.",
                  color: "danger",
                })
              }

              setAwaitCadastro(false)
            }}
          >
            <div className="flex w-full gap-4">

              <Input
                isRequired
                errorMessage="Por favor, digite seu nome completo"
                label="Nome"
                labelPlacement="outside"
                name="name"
                placeholder="Digite seu nome completo"
                type="text"
              />

            </div>

            <div className="flex w-full gap-4">
              <div className="flex flex-col w-full gap-4">

                <Input
                  isRequired
                  errorMessage="Por favor, digite seu CPF"
                  label="CPF"
                  labelPlacement="outside"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  type="text"
                />

                <Input
                  isRequired
                  errorMessage="Por favor, digite seu e-mail"
                  label="Email"
                  labelPlacement="outside"
                  name="email"
                  placeholder="Digite seu e-mail"
                  type="email"
                />

                <Input
                  isRequired
                  errorMessage="Por favor, digite seu número de telefone"
                  label="Numero de telefone"
                  labelPlacement="outside"
                  name="phone"
                  placeholder="Digite seu número de telefone"
                  type="text"
                />

              </div>
              <div className="flex flex-col w-full gap-4">

                <Input
                  isRequired
                  errorMessage="Por favor, digite seu nome de usuário"
                  label="Nome de usuário"
                  labelPlacement="outside"
                  name="username"
                  placeholder="Digite seu nome de usuário"
                  type="text"
                />

                <Input
                  isRequired
                  errorMessage="Por favor, digite sua senha"
                  label="Senha"
                  labelPlacement="outside"
                  name="password"
                  placeholder="Digite sua senha"
                  type="password"
                />

              </div>
            </div>

            <div className="flex gap-4 pt-5">
              <Button isLoading={awaitCadastro} color="primary" type="submit">
                Cadastrar
              </Button>
            </div>
            {/*action && (
              <div className="text-small text-default-500">
                Action: <code>{action}</code>
              </div>
            )*/}
          </Form>
        </section>
      )}
      {showSectionCadastroOK && (
        <section className="flex flex-col items-center justify-center">
          <div className="inline-block max-w-lg text-center justify-center pb-10">
            <span className={title({ color: "green" })}>Cadastro realizado com sucesso&nbsp;</span>
            <span className={title()}>no ReTicketify&nbsp;</span>
            <div className={subtitle({ class: "mt-4" })}>
              Para acessar, informe os seguintes dados:
            </div>
          </div>
          <Form
            className="w-full max-w-sm flex items-center gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setAwaitCadastro(true)

              let data = Object.fromEntries(new FormData(e.currentTarget));

              try {
                const resposta = await fetch("http://localhost:8080/api/v1/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });

                if (resposta.ok) {
                  const json = await resposta.json();
                  console.log(json);
                  console.log("Sucesso:", json);

                  addToast({
                    title: "Login",
                    description: "Login realizado com sucesso!",
                    color: "success",
                  })

                  window.localStorage.setItem("user", JSON.stringify(json));
                  navigate("/perfil")
                } else {
                  console.error("Erro ao criar chamado.");
                  addToast({
                    title: "Login - Dados inválidos",
                    description: "Por favor, revise e tente novamente.",
                    color: "danger",
                  })
                }
              } catch (erro) {
                console.error("Erro:", erro);
                addToast({
                  title: "Login - Falha",
                  description: "Por favor, tente novamente mais tarde.",
                  color: "danger",
                })
              }

              setAwaitCadastro(false)
            }}
          >

            <div className="flex w-full gap-4">
              <div className="flex flex-col w-full gap-4">

                <Input
                  isRequired
                  errorMessage="Por favor, digite seu nome de usuário"
                  label="Nome de usuário"
                  labelPlacement="outside"
                  name="username"
                  placeholder="Digite seu nome de usuário"
                  type="text"
                />

                <Input
                  isRequired
                  errorMessage="Por favor, digite sua senha"
                  label="Senha"
                  labelPlacement="outside"
                  name="password"
                  placeholder="Digite sua senha"
                  type="password"
                />

              </div>
            </div>

            <div className="flex gap-4 pt-5">
              <Button isLoading={awaitCadastro} color="primary" type="submit">
                Entrar
              </Button>
            </div>
          </Form>
        </section>
      )}
    </DefaultLayout>
  );
}
