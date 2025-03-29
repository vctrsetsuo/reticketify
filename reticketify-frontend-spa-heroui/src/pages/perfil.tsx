import { useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import React from "react";
import { title } from "@/components/primitives";
import { useNavigate } from "react-router";
import { EditIcon } from "@/components/icons";
import { addToast } from "@heroui/toast";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure
} from "@heroui/modal";

export default function PerfilPage() {

  const [user, setUser] = React.useState<string>();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formName, setFormName] = React.useState<string>();
  const [formCpf, setFormCpf] = React.useState<string>();
  const [formEmail, setFormEmail] = React.useState<string>();
  const [formPhone, setFormPhone] = React.useState<string>();
  const [formUsername, setFormUsername] = React.useState<string>();
  const [formPassword, setFormPassword] = React.useState<string>();

  const navigate = useNavigate();

  // synchronize initially
  useEffect(() => {
    const data = window.localStorage.getItem("user");
    if (data) {
      setUser(data)
      const userForm = JSON.parse(data)
      setFormName(userForm.name)
      setFormCpf(userForm.cpf)
      setFormEmail(userForm.email)
      setFormPhone(userForm.phone)
      setFormUsername(userForm.username)
      setFormPassword(userForm.password)
    } else {
      addToast({
        title: "Falha",
        description: "Falha ao recuperar os dados do perfil.",
        color: "danger",
      })
      navigate("/")
    }
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center">
        <div className="inline-block max-w-lg text-center justify-center pb-10">
          <span className={title()}>Seu&nbsp;</span>
          <span className={title({ color: "blue" })}>Perfil&nbsp;</span>
          <span className={title()}>no ReTicketify&nbsp;</span>
        </div>
        {/*<div className="text-small text-default-500">
          Action: <code>{user}</code>
        </div>*/}
        <div className="w-full max-w-2xl flex justify-end">
          <Button
            color="default"
            startContent={<EditIcon className="text-danger" />}
            onPress={() => { setIsDisabled(!isDisabled) }}
            type="submit"
          >
            Editar
          </Button>
        </div>
        <Form
          className="w-full max-w-2xl flex items-center gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const userJson = JSON.parse(user || "{}");
            let dataFormJson = Object.fromEntries(new FormData(e.currentTarget));

            try {
              const resposta = await fetch("http://localhost:8080/api/v1/user", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userJson, ...dataFormJson }),
              });

              if (resposta.ok) {
                const data = await resposta.json();
                console.log("Sucesso:", data);
                window.localStorage.setItem("user", JSON.stringify(data));
                addToast({
                  title: "Salvar",
                  description: "Seus dados foram atualizados com sucesso!",
                  color: "success",
                })
                setUser(JSON.stringify(data))
                setIsDisabled(true)
              } else {
                console.error("Erro ao criar chamado.");
              }
            } catch (erro) {
              console.error("Erro:", erro);
            }
          }}
        >
          <div className="flex w-full gap-4">

            <Input
              isRequired
              isDisabled={isDisabled}
              errorMessage="Por favor, digite seu nome completo"
              label="Nome"
              labelPlacement="outside"
              name="name"
              placeholder="Digite seu nome completo"
              value={formName}
              onChange={(e) => { setFormName(e.target.value) }}
              type="text"
            />

          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-4">

              <Input
                isRequired
                isDisabled={isDisabled}
                errorMessage="Por favor, digite seu CPF"
                label="CPF"
                labelPlacement="outside"
                name="cpf"
                placeholder="Digite seu CPF"
                value={formCpf}
                onChange={(e) => { setFormCpf(e.target.value) }}
                type="text"
              />

              <Input
                isRequired
                isDisabled={isDisabled}
                errorMessage="Por favor, digite seu e-mail"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Digite seu e-mail"
                value={formEmail}
                onChange={(e) => { setFormEmail(e.target.value) }}
                type="email"
              />

              <Input
                isRequired
                isDisabled={isDisabled}
                errorMessage="Por favor, digite seu número de telefone"
                label="Numero de telefone"
                labelPlacement="outside"
                name="phone"
                placeholder="Digite seu número de telefone"
                value={formPhone}
                onChange={(e) => { setFormPhone(e.target.value) }}
                type="text"
              />

            </div>
            <div className="flex flex-col w-full gap-4">

              <Input
                isRequired
                isDisabled={isDisabled}
                errorMessage="Por favor, digite seu nome de usuário"
                label="Nome de usuário"
                labelPlacement="outside"
                name="username"
                placeholder="Digite seu nome de usuário"
                value={formUsername}
                onChange={(e) => { setFormUsername(e.target.value) }}
                type="text"
              />

              <Input
                isRequired
                isDisabled={isDisabled}
                errorMessage="Por favor, digite sua senha"
                label="Senha"
                labelPlacement="outside"
                name="password"
                placeholder="Digite sua senha"
                value={formPassword}
                onChange={(e) => { setFormPassword(e.target.value) }}
                type="password"
              />

            </div>
          </div>

          <div className="w-full max-w-2xl flex justify-end gap-4 pt-5">
            {!isDisabled && (<Button color="primary" type="submit"> Salvar </Button>)}
            {!isDisabled && (<Button color="danger" type="button" onPress={() => { onOpen() }}> Deletar </Button>)}
          </div>
        </Form>
      </section>
      <Modal isOpen={isOpen} size="sm" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Tem certeza que deseja deletar o seu perfil no ReTicketify?</ModalHeader>
              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={async () => {
                  const userJson = JSON.parse(user || "{}");
                  try {
                    const resposta = await fetch(`http://localhost:8080/api/v1/user/${userJson.id}`, {
                      method: "DELETE"
                    });

                    if (resposta.ok) {
                      window.localStorage.removeItem("user");
                      addToast({
                        title: "Deletar",
                        description: "Seus perfil foi deletado com sucesso!",
                        color: "success",
                      })
                      navigate("/")
                    } else {
                      console.error("Erro ao criar chamado.");
                    }
                  } catch (erro) {
                    console.error("Erro:", erro);
                  }

                }}>
                  Deletar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DefaultLayout>
  )
}