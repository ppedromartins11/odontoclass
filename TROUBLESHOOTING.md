# 🐛 Guia de Troubleshooting - OdontoClass

## 🔍 Diagnosticar o Problema

### Pergunta 1: Você vê a imagem?
```
SIM ✅ → Vai para pergunta 2
NÃO ❌ → Vai para pergunta 3
```

### Pergunta 2: Outras pessoas veem a imagem?
```
SIM ✅ → ✓ TUDO PERFEITO! (Cloudinary funcionando)
NÃO ❌ → Vai para "Problema: Imagem visível só para você"
```

### Pergunta 3: Qual erro você vê?

───────────────────────────────────────────────────────────────

## ❌ PROBLEMA: "Erro ao fazer upload"

### Diagnóstico
```
O arquivo não sobe para o servidor
```

### Checklist
```
[ ] 1. Tamanho do arquivo é menor que 5MB?
      └─ Se não: comprimir imagem

[ ] 2. Tipo de arquivo é imagem? (JPG, PNG, WebP)
      └─ Se não: converter para JPG

[ ] 3. Cloudinary foi configurado?
      └─ Ver: QUICKSTART_IMAGENS.md

[ ] 4. Cloud Name está correto?
      └─ Abra: src/utils/cloudinary.js linha 7
      └─ Copie exato do Dashboard Cloudinary

[ ] 5. Preset "odontoclass" existe e é "Unsigned"?
      └─ Cloudinary > Settings > Upload > Upload presets
      └─ Procure por "odontoclass"
      └─ Signing Mode: DEVE ser "Unsigned"
```

### Solução
```
1. Verificar cada item acima
2. Recarregar página (Ctrl+F5)
3. Tentar novamente
4. Se ainda não funcionar:
   └─ Verificar Console (F12)
   └─ Procurar por erro específico
```

### Teste Rápido
```javascript
// Abra Console (F12) e digite:
console.log('Testando Cloudinary...')
fetch('https://api.cloudinary.com/v1_1/seu_cloud_name/image/upload')
  .catch(e => console.log('Erro:', e.message))
// Deve aparecer erro de autenticação (normal)
```

───────────────────────────────────────────────────────────────

## ❌ PROBLEMA: Imagem visível só para você

### Diagnóstico
```
Você vê a imagem, mas outras pessoas não
```

### Verificar Tipo de URL
```
F12 → Application → Local Storage → "especializacoes"

URL começa com:
  • "data:image/jpeg;base64,..." → ❌ Base64 (local)
  • "https://res.cloudinary.com/..." → ✅ Cloudinary (compartilhável)
```

### Se for Base64 (❌ Problema Encontrado)

**Solução 1: Rápida (Desenvolvimento)**
```
1. Abra: src/utils/cloudinary.js
2. Linha 7: Mude "your-cloud-name" → seu Cloud Name real
3. Salve (Ctrl+S)
4. Recarregue: Ctrl+F5
5. Adicione nova imagem (será Cloudinary)
```

**Solução 2: Profissional (Produção)**
```
1. Crie .env.local na raiz
2. Cole:
   REACT_APP_CLOUDINARY_CLOUD_NAME=seu_cloud_name_aqui
   REACT_APP_CLOUDINARY_PRESET=odontoclass
3. Salve
4. Reinicie: npm run dev
5. Recarregue: Ctrl+F5
6. Adicione nova imagem
```

**Solução 3: Migrar Imagens Antigas**
```
1. Edite cada especialização
2. Remova a imagem antiga (base64)
3. Coloque nova imagem
4. Salve
5. Agora está em Cloudinary
```

───────────────────────────────────────────────────────────────

## ❌ PROBLEMA: Imagem não aparece após upload

### Checklist
```
[ ] 1. Recarregar página (Ctrl+F5)

[ ] 2. Abrir DevTools (F12)
     └─ Ver se há erros vermelhos
     └─ Procurar por 403/404/500

[ ] 3. Verificar se URL é válida
     └─ Console: copie a URL
     └─ Abra em aba nova
     └─ Deve aparecer a imagem

[ ] 4. Verificar CORS
     └─ Provavelmente Cloudinary resolveu
     └─ Se erro: contatar suporte Cloudinary

[ ] 5. Cache do navegador
     └─ Ctrl+Shift+Delete
     └─ Limpar tudo
     └─ Recarregar
```

### Se Tudo Falhar
```
Abra o DevTools (F12):
1. Clique em Console
2. Cole:
   JSON.parse(localStorage.getItem('especializacoes'))
3. Procure por "error" ou "undefined"
4. Print e envie para suporte
```

───────────────────────────────────────────────────────────────

## ❌ PROBLEMA: Painel Admin não abre

### Checklist
```
[ ] 1. Botão ⚙️ aparece na tela?
     └─ Canto inferior direito
     └─ Se não: abra o console (F12) procure erros

[ ] 2. Senha está correta?
     └─ Senha: adrieli2024
     └─ Sem espaços antes/depois

[ ] 3. Console mostra erros?
     └─ F12 → Console
     └─ Há mensagens vermelhas?
```

### Solução
```
1. Recarregar página (Ctrl+F5)
2. Se ainda não funcionar:
   └─ Verificar se AdminPanel.jsx foi carregado
   └─ F12 → Sources → src/components → AdminPanel.jsx
   └─ Deve estar lá sem erros vermelhos
```

───────────────────────────────────────────────────────────────

## ❌ PROBLEMA: Dados não salvam

### Checklist
```
[ ] 1. localStorage está habilitado?
     └─ Chrome: Settings → Privacy
     └─ Firefox: Settings → Privacy
     └─ Deve permitir localStorage

[ ] 2. Há espaço em disco?
     └─ Cada imagem base64 = ~200KB
     └─ Limite típico: 5-10MB por site
     └─ Com Cloudinary não há limite

[ ] 3. Navegador é privado/incógnito?
     └─ Se sim: dados são apagados ao fechar
     └─ Use navegação normal
```

### Solução
```
1. Verificar se localStorage está habilitado
2. Se não: ativar nas configurações do navegador
3. Se sim: tentar em outro navegador
4. Se funcionar: problema é do navegador
```

───────────────────────────────────────────────────────────────

## ❌ PROBLEMA: Imagem aparece quebrada (X)

### Causas Possíveis
```
1. URL corrompida
2. Arquivo deletado
3. Problema de CORS
4. Servidor Cloudinary indisponível
```

### Checklist
```
[ ] 1. URL começa com "https://"?
     └─ Protocolo deve ser HTTPS

[ ] 2. URL é acessível?
     └─ Copie URL
     └─ Cole em aba nova
     └─ Deve aparecer imagem

[ ] 3. Cloudinary está online?
     └─ Abra https://www.cloudinarystatus.com/
     └─ Procure por incidents

[ ] 4. Arquivo foi deletado?
     └─ Cloudinary > Media Library
     └─ Procure pela imagem
     └─ Se não achar: foi deletada
```

### Solução
```
1. Se arquivo foi deletado:
   └─ Edite a especialização
   └─ Coloque nova imagem
   └─ Salve

2. Se URL está corrompida:
   └─ Limpe localStorage
   └─ Adicione novamente
```

───────────────────────────────────────────────────────────────

## 🧹 Limpeza de Cache

### LocalStorage
```
F12 → Application → Local Storage
Clique com botão direito → Clear
Recarregue página (Ctrl+F5)
```

### Cookies
```
F12 → Application → Cookies
Clique com botão direito → Clear
Recarregue página (Ctrl+F5)
```

### Cache do Site
```
Ctrl+Shift+Delete
Selecione "Todos os tempos"
Marque "Cookies" e "Cache"
Limpar dados
```

───────────────────────────────────────────────────────────────

## 🔧 Verificações Técnicas

### Verificar Cloudinary
```javascript
// Console (F12):
fetch('https://api.cloudinary.com/v1_1/dpzzzzz/image/upload', {
  method: 'POST'
}).then(r => console.log('Status:', r.status))
```

### Verificar localStorage
```javascript
// Console (F12):
console.log(localStorage.getItem('especializacoes'))
console.log(localStorage.getItem('sobre'))
```

### Verificar Tamanho localStorage
```javascript
// Console (F12):
let size = 0;
for(let key in localStorage) {
  size += localStorage[key].length;
}
console.log('localStorage:', (size/1024).toFixed(2), 'KB')
```

───────────────────────────────────────────────────────────────

## 📞 Quando Chamar Suporte

Se nenhuma solução acima funcionou:

1. Abra Console (F12)
2. Procure por erros vermelhos
3. Tire screenshot com erro visível
4. Anote:
   - Navegador usado
   - Versão do sistema
   - URL do site
   - O que estava tentando fazer
5. Envie para suporte técnico

### Informações Úteis para Suporte
```
✅ Screenshot do erro
✅ Console log (F12 → Console → copy all)
✅ localStorage data (F12 → Application → Local Storage)
✅ URL do site
✅ Navegador e versão
✅ Sistema operacional
✅ Passos para reproduzir o erro
```

───────────────────────────────────────────────────────────────

## ✅ Checklist Final

```
[ ] Cloudinary configurado
[ ] Cloud Name correto
[ ] Preset "odontoclass" existe (Unsigned)
[ ] .env.local criado (ou cloudinary.js editado)
[ ] npm run dev reiniciado
[ ] localStorage não está cheio
[ ] Navegador é normal (não privado)
[ ] Arquivo é menor que 5MB
[ ] Tipo de arquivo é imagem
[ ] Conexão com internet funciona
```

Se todos os itens estão marcados e ainda tem problema:
→ Abra uma issue com informações de suporte

═══════════════════════════════════════════════════════════════

🎯 RESUMO RÁPIDO:

1. Erro de upload? → Verificar Cloudinary
2. Só você vê? → Ativar Cloudinary (cloudinary.js)
3. Imagem quebrada? → Deletou a imagem no Cloudinary
4. Não salva? → localStorage está cheio ou desabilitado
5. Painel não abre? → Senha errada ou erro no console

═══════════════════════════════════════════════════════════════
