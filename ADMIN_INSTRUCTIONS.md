# 🔐 Painel de Administração - Instruções

## Como Acessar o Painel Admin

1. **Clique no ícone ⚙️** no canto inferior direito da página
2. **Digite a senha**: `adrieli2024`
3. **Pronto!** Você agora tem acesso ao painel de gerenciamento

## O Que Você Pode Fazer

### ✅ Gerenciar Especializações

No painel de administração, você pode:

- **Adicionar nova especialização**:
  - Nome (ex: "Implantodontia")
  - Descrição (ex: "Instituto de Odontologia Avançada")
  - Ano da certificação
  - Fazer upload de uma imagem/certificado

- **Editar especialização existente**:
  - Clique no botão azul ✏️ ao lado de qualquer especialização
  - Modifique os dados
  - Clique em "Atualizar"

- **Deletar especialização**:
  - Clique no botão vermelho 🗑️
  - Confirme a exclusão

## 📸 Como Fazer Upload de Imagem

1. Clique na área "Selecione um arquivo"
2. Escolha uma imagem do certificado ou especialização
3. A imagem será convertida automaticamente e armazenada
4. Verá uma prévia antes de salvar

## 💾 Onde os Dados São Salvos?

Todos os dados são salvos automaticamente no navegador (localStorage). Isso significa:
- ✅ Dados persistem mesmo após fechar a página
- ✅ Cada navegador mantém seus dados separadamente
- ℹ️ Se limpar o histórico/cache do navegador, os dados serão perdidos

## 🔒 Segurança

- A senha é criptografada no código
- Altere a senha conforme necessário editando o arquivo `AdminPanel.jsx`
- Apenas você (com a senha) pode acessar e modificar as especialização

## ❓ Dúvidas Comuns

**P: Perdi a senha, como recupero?**
R: Entre em contato com o desenvolvedor para resetar

**P: Posso editar as especializações padrão?**
R: Sim! Clique no botão azul para editar qualquer uma

**P: A imagem fica muito grande?**
R: As imagens são automaticamente redimensionadas quando você faz upload

**P: Posso adicionar quantas especializações quiser?**
R: Sim! Sem limite

---

**Dica**: Altere a senha periodicamente por segurança!
