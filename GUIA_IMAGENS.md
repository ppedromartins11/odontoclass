# 🖼️ Guia de Configuração de Imagens - OdontoClass

## Problema Identificado
As imagens não eram visíveis para outros usuários porque eram salvas em **base64 (localStorage)**, que só funciona localmente no navegador de cada pessoa.

## Solução Implementada

Agora o projeto suporta:
1. **Upload para Cloudinary** (recomendado - imagens visíveis para todos)
2. **Fallback para localStorage** (se Cloudinary não configurado)

---

## 🚀 Como Configurar (Recomendado)

### Passo 1: Criar Conta no Cloudinary
1. Acesse https://cloudinary.com
2. Clique em **"Sign up"** (é grátis)
3. Complete o registro

### Passo 2: Obter as Credenciais
1. Após login, vá para o **Dashboard**
2. Você verá seu **Cloud Name** no topo
3. Anote o valor (exemplo: `dus2qbxmq`)

### Passo 3: Criar Upload Preset
1. Vá para **Settings** (ícone de engrenagem no canto superior direito)
2. Abra a aba **Upload**
3. Role para baixo e encontre **Upload presets**
4. Clique em **Add upload preset**
5. Preencha:
   - **Preset name**: `odontoclass`
   - **Signing Mode**: Selecione `Unsigned` (importante!)
6. Clique em **Save**

### Passo 4: Configurar no Projeto

#### Opção A: Variáveis de Ambiente (Recomendado para Deploy)
1. Crie arquivo `.env.local` na raiz do projeto:
```
REACT_APP_CLOUDINARY_CLOUD_NAME=seu_cloud_name_aqui
REACT_APP_CLOUDINARY_PRESET=odontoclass
```

2. Reinicie o servidor de desenvolvimento

#### Opção B: Editar Arquivo (Para Desenvolvimento Local)
1. Abra: `src/utils/cloudinary.js`
2. Altere a linha 7:
```javascript
const CLOUD_NAME = 'seu_cloud_name_aqui'; // Cole aqui seu Cloud Name
```
3. Salve o arquivo

---

## ✅ Verificar Se Está Funcionando

### No Painel Admin
1. Clique no botão ⚙️ (canto inferior direito)
2. Digite a senha: `adrieli2024`
3. Adicione uma especialização COM imagem
4. Se a imagem for enviada rapidinho e aparecer um preview, está funcionando!

### Verificar URL da Imagem
1. Abra o painel de especialização
2. Clique na imagem para abrir
3. Copie a URL - se começar com `https://res.cloudinary.com/`, está vindo do Cloudinary ✅

---

## 🎯 Como Usar os Painéis Admin

### 1. **Painel de Especialização** (⚙️ - canto inferior direito)
- Adicione/edite especialidades da Dra
- **Importante**: Sempre coloque uma imagem!
- As imagens são sincronizadas em tempo real

### 2. **Painel de Perfil da Dra** (✏️ - próximo ao botão acima)
- Edite dados profissionais
- Atualize foto da Dra
- Valide CROMS e registros

---

## 📊 Verificação de Armazenamento

### Onde estão os dados:
- **LocalStorage**: Armazena IDs e URLs (não o arquivo)
- **Cloudinary**: Armazena o arquivo real da imagem

### Para verificar:
1. Abra DevTools (F12)
2. Vá para **Application** → **Local Storage**
3. Procure por `especializacoes` e `sobre`

---

## 🐛 Troubleshooting

### "Erro ao fazer upload"
- ✅ Verificar se o preset `odontoclass` foi criado em **Unsigned**
- ✅ Verificar se o CLOUD_NAME está correto
- ✅ Verificar se o arquivo é menor que 5MB

### "Imagem não aparece"
- ✅ Recarregar a página (Ctrl+F5)
- ✅ Verificar se a URL começa com `https://res.cloudinary.com/`
- ✅ Verificar Console (F12) para erros

### "Só funciona comigo"
- ❌ Significa que está usando base64 (localStorage)
- ✅ Configurar Cloudinary conforme instruções acima

---

## 📱 Compartilhar Site

Agora que as imagens estão no Cloudinary, o site é 100% compartilhável:
- ✅ Enviar link para amigos
- ✅ Google indexa corretamente
- ✅ Redes sociais mostram preview

---

## 💡 Dicas Importantes

1. **Tamanho de imagem**: Mantenha abaixo de 5MB
2. **Formato**: Use JPG, PNG ou WebP
3. **Dimensões**: 800x800px é ideal (redimensiona automaticamente)
4. **Delete**: Para deletar imagens, faça pelo dashboard do Cloudinary

---

## 🔄 Migrar Imagens Existentes

Se você já tem imagens em base64:
1. Elas continuam funcionando (no seu navegador)
2. Para compartilhar, edite e coloque a nova imagem do Cloudinary
3. Salve novamente

---

**Pronto! 🎉 Agora seu site tem imagens compartilháveis e profissionais!**
