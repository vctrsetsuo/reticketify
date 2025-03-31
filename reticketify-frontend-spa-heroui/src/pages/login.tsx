import DefaultLayout from "@/layouts/default";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { button as buttonStyles } from "@heroui/theme";
import { addToast } from "@heroui/toast";
import { Link } from "@heroui/link";

export default function LoginPage() {
    const [awaitCadastro, setAwaitCadastro] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const data = window.localStorage.getItem("user");
        if (data) {
            navigate("/perfil")
        }
    }, []);

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center">
                <div className="inline-block max-w-lg text-center justify-center pb-10">
                    <span className={title({ color: "blue" })}>Acesso&nbsp;</span>
                    <span className={title()}>no ReTicketify&nbsp;</span>
                    <div className={subtitle({ class: "mt-4" })}>
                        Por favor, informe os seguintes dados:
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
                <div className="inline-block max-w-lg text-center justify-center pb-10 m-20">
                    <Link
                        className={buttonStyles({
                            color: "default",
                            radius: "full",
                            variant: "shadow",
                        })}
                        href="/singin"
                    >
                        Cadastre-se
                    </Link>
                </div>
            </section>
        </DefaultLayout>
    )
}
