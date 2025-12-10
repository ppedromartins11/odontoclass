# 🔮 GUIA DE BOAS PRÁTICAS & PRÓXIMAS MELHORIAS

## 🎯 Por que estas mudanças foram feitas

### 1. **Sincronização Real-time (WhatsApp)**
**Problema:** Admin muda número, site antigo continua exibindo  
**Solução:** localStorage event listener  
**Benefício:** Sem necessidade de deploy para mudar contato

```jsx
// ✅ NOVO PADRÃO - Use em todos os componentes que mostram dados dinâmicos
useEffect(() => {
  const handleStorageChange = () => {
    const data = localStorage.getItem('dados');
    if (data) setDados(JSON.parse(data));
  };
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);
```

---

### 2. **Validação de Formulário**
**Problema:** Dados inválidos sendo enviados  
**Solução:** Validação regex + feedback visual  
**Benefício:** Melhor UX, menos spam, dados confiáveis

```jsx
// ✅ NOVO PADRÃO - Use em todos formulários
const errors = {};
if (!validateEmail(formData.email)) errors.email = 'Email inválido';

if (Object.keys(errors).length > 0) {
  setErrors(errors);
  return;  // Não enviar!
}

// Continuar com envio...
```

---

### 3. **CSS Variables**
**Problema:** Cores repetidas 40+ vezes  
**Solução:** Centralizar em :root  
**Benefício:** 1 mudança = site inteiro muda

```css
/* ✅ NOVO PADRÃO */
:root {
  --primary: #ff8da1;
  --text: #5A5755;
  --bg: #FDF8F4;
}

/* Mudar tema inteiro em uma linha! */
@media (prefers-color-scheme: dark) {
  :root {
    --text: #ffffff;
    --bg: #1a1a1a;
  }
}
```

---

## 🚀 Código Pronto para Copiar

### **A. Componente Reutilizável: Card**
```jsx
// components/Card.jsx
export default function Card({ 
  title, 
  children, 
  highlight = false, 
  error = false 
}) {
  return (
    <article 
      className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
        error ? 'border-red-500' : ''
      } ${
        highlight ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      {title && (
        <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-rosa)' }}>
          {title}
        </h3>
      )}
      {children}
    </article>
  );
}

// Uso:
<Card title="Contato" highlight>
  <p>Telefone: (67) 3212-7205</p>
</Card>
```

---

### **B. Hook Customizado: useLocalStorage**
```jsx
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Erro ao ler localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Erro ao salvar localStorage:', error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) setStoredValue(JSON.parse(item));
      } catch (error) {
        console.error('Erro ao sincronizar:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

// Uso (MUITO mais limpo!):
const [contato, setContato] = useLocalStorage('contato', {
  whatsapp: '556732127205',
});

// Em componentes:
export default function Componente() {
  const [data, setData] = useLocalStorage('dados', {});
  // ... pronto! Sincroniza automaticamente
}
```

---

### **C. Validação de Email Robusta**
```jsx
// utils/validation.js
export const validators = {
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: regex.test(value),
      message: 'Email inválido'
    };
  },

  phone: (value) => {
    const regex = /^[\d\-\(\)\s]{10,}$/;
    return {
      isValid: regex.test(value),
      message: 'Telefone deve ter pelo menos 10 dígitos'
    };
  },

  name: (value) => {
    return {
      isValid: value.trim().length >= 3,
      message: 'Nome deve ter pelo menos 3 caracteres'
    };
  },

  url: (value) => {
    try {
      new URL(value);
      return { isValid: true, message: '' };
    } catch {
      return { isValid: false, message: 'URL inválida' };
    }
  },

  file: (file, maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png']) => {
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      return { 
        isValid: false, 
        message: `Arquivo deve ter menos de ${maxSizeMB}MB` 
      };
    }
    if (!allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        message: `Tipo de arquivo não permitido` 
      };
    }
    return { isValid: true, message: '' };
  }
};

// Uso:
const result = validators.email('test@example.com');
console.log(result); // { isValid: true, message: '' }
```

---

### **D. Upload com Validação & Preview**
```jsx
// components/ImageUpload.jsx
import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { validators } from '../utils/validation';

export default function ImageUpload({ onUpload, maxSizeMB = 5 }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar
    const validation = validators.file(file, maxSizeMB);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result);
      setLoading(true);

      // Simular upload (em produção: API call)
      setTimeout(() => {
        onUpload(event.target?.result);
        setError('');
        setLoading(false);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          aria-label="Upload de imagem"
        />
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[var(--color-rosa)] transition">
          <Upload size={32} className="mx-auto mb-2" />
          <p>Clique para upload ou arraste aqui</p>
          <p className="text-xs text-gray-500">Máximo {maxSizeMB}MB</p>
        </div>
      </label>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded">
          <X size={16} /> {error}
        </div>
      )}

      {preview && (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full rounded-lg max-h-48 object-cover" />
          {loading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
              <div className="animate-spin">⏳</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 📋 Padrões Implementar

### **1. Divida AdminDashboard em Subcomponentes**

```
AdminDashboard.jsx (orquestrador principal)
├── AdminTabEspecializacoes.jsx
├── AdminTabServicos.jsx
├── AdminTabContato.jsx
├── AdminTabSobre.jsx
├── AdminTabBackup.jsx
└── AdminFormField.jsx (componente reutilizável)
```

**Benefícios:**
- ✅ Cada arquivo ~200 linhas (legível)
- ✅ Fácil de testar
- ✅ Fácil de manter
- ✅ Reutilizável

---

### **2. Criar Tipos (TypeScript - Opcional)**

```typescript
// types/index.ts
export interface Especializacao {
  id: number;
  nome: string;
  descricao: string;
  ano: number;
  imagem: string;
}

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

export interface Contato {
  telefone: string;
  whatsapp: string;
  email: string;
  endereco: string;
  horarios: string;
}

export interface Sobre {
  nome: string;
  foto: string;
  graduacao: string;
  especializacao_principal: string;
  descricao: string;
  compromisso: string;
  croms: string;
  epao: string;
  cnpj: string;
}
```

---

### **3. Adicione ErrorBoundary (React 16.8+)**

```jsx
// components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 rounded-lg text-red-600">
          <h2 className="text-2xl font-bold mb-4">⚠️ Erro!</h2>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Recarregar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Uso em App.jsx:
<ErrorBoundary>
  <Header />
  <Hero />
  {/* ... resto dos componentes */}
</ErrorBoundary>
```

---

## 🎨 Dark Mode (Pronto para Implementar)

```css
/* index.css - Já possui a estrutura base! */

/* Passo 1: Expandir CSS variables */
:root {
  --color-rosa: #ff8da1;
  --color-texto: #5A5755;
  --color-fundo: #FDF8F4;
  --color-whatsapp: #25D366;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-rosa: #ff6b8a;
    --color-texto: #e8ddd9;
    --color-fundo: #0f0f0f;
    --color-whatsapp: #20c240;
  }
}

/* Passo 2: Tudo automaticamente se adapta! */
body {
  background-color: var(--color-fundo);
  color: var(--color-texto);
  transition: background-color 0.3s, color 0.3s;
}
```

---

## 📊 Roadmap Sugerido

### **Sprint 1** (1 dia)
- ✅ Refactorizar AdminDashboard (separar em 5 componentes)
- ✅ Adicionar validação de upload (tamanho/tipo)

### **Sprint 2** (2 dias)
- ⭕ Migrar para TypeScript
- ⭕ Adicionar ErrorBoundary
- ⭕ Melhorar testes

### **Sprint 3** (3 dias)
- ⭕ Backend em Node.js
- ⭕ Banco de dados (PostgreSQL)
- ⭕ JWT authentication

### **Sprint 4** (2 dias)
- ⭕ Dark Mode
- ⭕ PWA (offline)
- ⭕ Analytics

---

## 🔗 Recursos Úteis

- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev
- **WCAG Guidelines:** https://www.w3.org/WAI/
- **MDN Web Docs:** https://developer.mozilla.org

---

**Conclusão:** O código está limpo, bem estruturado e pronto para evolução! 🚀
