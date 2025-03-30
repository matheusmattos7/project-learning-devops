import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.user_name.value = onEdit.user_name;
      user.email.value = onEdit.email;
      user.phone.value = onEdit.phone;
      user.birth_date.value = onEdit.birth_date;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;
    const fields = ["user_name", "email", "phone", "birth_date"];

    // Verifica se algum campo está vazio
    const isFormValid = fields.every(field => user[field].value);
    if (!isFormValid) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (onEdit) {
        const response = await axios.put(
          `http://localhost:3001/${onEdit.id}`,
          {
            user_name: user.user_name.value,
            email: user.email.value,
            phone: user.phone.value,
            birth_date: user.birth_date.value,
          }
        );
        toast.success(response.data);
      } else {
        const response = await axios.post("http://localhost:3001", {
          user_name: user.user_name.value,
          email: user.email.value,
          phone: user.phone.value,
          birth_date: user.birth_date.value,
        });
        toast.success(response.data);
      }

      // Limpa os campos do formulário
      fields.forEach(field => user[field].value = "");

      // Define o estado de edição como null
      setOnEdit(null);

      // Atualiza a lista de usuários
      getUsers();
    } catch (error) {
      toast.error(error.response?.data || "Erro ao salvar os dados!");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="user_name" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="phone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="birth_date" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
