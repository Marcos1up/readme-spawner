import { TemplateData } from './openSource';

export const generateTechnicalDocsTemplate = (data: TemplateData): string => {
  const techList = data.technologies.length > 0 
    ? data.technologies.map(tech => `- ${tech}`).join('\n')
    : '- JavaScript/TypeScript\n- Node.js\n- Express.js\n- MongoDB';

  return `# ${data.projectName || 'Documentación Técnica'}

## 📝 Descripción

${data.projectDescription || 'Documentación técnica completa para desarrolladores y arquitectos de software.'}

## 🏗️ Arquitectura

### Diagrama de Arquitectura

\`\`\`mermaid
graph TD
    A[Cliente] --> B[Load Balancer]
    B --> C[API Gateway]
    C --> D[Microservicio 1]
    C --> E[Microservicio 2]
    D --> F[Base de Datos]
    E --> F
\`\`\`

### Componentes del Sistema

${techList}

## 🔧 Configuración Técnica

### Requisitos Previos

- Node.js >= 18.0.0
- npm >= 8.0.0
- Docker >= 20.0.0
- Docker Compose >= 2.0.0

### Variables de Entorno

\`\`\`bash
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379

# Autenticación
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# APIs externas
API_KEY=your-api-key
API_URL=https://api.example.com

# Configuración del servidor
PORT=3000
NODE_ENV=development
\`\`\`

## 🚀 Instalación y Configuración

### Instalación Local

${data.installation || `1. Clonar el repositorio
\`\`\`bash
git clone ${data.githubUrl || 'https://github.com/usuario/proyecto.git'}
cd ${data.projectName?.toLowerCase().replace(/\s+/g, '-') || 'proyecto'}
\`\`\`

2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

3. Configurar base de datos
\`\`\`bash
npm run db:setup
npm run db:migrate
npm run db:seed
\`\`\`

4. Iniciar en modo desarrollo
\`\`\`bash
npm run dev
\`\`\``}

### Instalación con Docker

\`\`\`bash
# Construir y ejecutar contenedores
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
\`\`\`

## 📡 API Reference

### Autenticación

Todas las rutas protegidas requieren un token JWT en el header:

\`\`\`http
Authorization: Bearer <token>
\`\`\`

### Endpoints Principales

#### Usuarios

\`\`\`http
GET /api/users
POST /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
\`\`\`

#### Autenticación

\`\`\`http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
\`\`\`

### Ejemplos de Peticiones

#### Login
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
\`\`\`

#### Respuesta
\`\`\`json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
\`\`\`

## 🗄️ Base de Datos

### Esquema de Base de Datos

\`\`\`sql
-- Tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
\`\`\`

### Migraciones

\`\`\`bash
# Ejecutar migraciones
npm run db:migrate

# Rollback última migración
npm run db:rollback

# Crear nueva migración
npm run db:create-migration nombre_migracion
\`\`\`

## 🧪 Testing

### Estructura de Tests

\`\`\`
tests/
├── unit/
│   ├── models/
│   ├── services/
│   └── utils/
├── integration/
│   ├── api/
│   └── database/
└── e2e/
    └── scenarios/
\`\`\`

### Comandos de Testing

\`\`\`bash
# Todos los tests
npm test

# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:coverage

# Watch mode
npm run test:watch
\`\`\`

## 🔍 Debugging

### Logs

\`\`\`bash
# Ver logs en tiempo real
npm run logs

# Logs de error únicamente
npm run logs:error

# Logs con formato JSON
npm run logs:json
\`\`\`

### Debug Mode

\`\`\`bash
# Iniciar con debugger
npm run debug

# Con inspector de Chrome
npm run debug:chrome
\`\`\`

## 🚀 Despliegue

### Entornos

- **Development**: http://localhost:3000
- **Staging**: https://staging.ejemplo.com
- **Production**: https://ejemplo.com

### CI/CD Pipeline

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          npm ci
          npm run build
          npm run deploy
\`\`\`

## 📊 Monitoreo

### Métricas Clave

- **Latencia**: < 200ms p95
- **Throughput**: 1000 req/s
- **Error Rate**: < 0.1%
- **Uptime**: 99.9%

### Alertas

\`\`\`bash
# CPU > 80%
# Memory > 90%
# Error rate > 1%
# Response time > 500ms
\`\`\`

## 🛠️ Herramientas de Desarrollo

### Linting y Formateo

\`\`\`bash
# ESLint
npm run lint
npm run lint:fix

# Prettier
npm run format
npm run format:check
\`\`\`

### Análisis de Código

\`\`\`bash
# Análisis estático
npm run analyze

# Verificar dependencias
npm audit
npm run deps:check
\`\`\`

## 🤝 Contribuciones

${data.contributing || `### Proceso de Contribución

1. Fork el repositorio
2. Crear branch feature (\`git checkout -b feature/nueva-funcionalidad\`)
3. Commit cambios (\`git commit -am 'Agregar nueva funcionalidad'\`)
4. Push branch (\`git push origin feature/nueva-funcionalidad\`)
5. Crear Pull Request

### Estándares de Código

- Seguir convenciones de ESLint
- Cobertura de tests > 80%
- Documentar funciones públicas
- Usar Conventional Commits`}

## 📚 Recursos Adicionales

- [Documentación de API](./docs/api.md)
- [Guía de Contribución](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)
- [Roadmap](./ROADMAP.md)

## 📄 Licencia

${data.license || 'MIT'} - Ver [LICENSE](./LICENSE) para más detalles.

## 👥 Autores

**${data.author || 'Nombre del Autor'}** - *Desarrollador Principal* - [GitHub](${data.githubUrl || 'https://github.com/usuario'})

Ver también la lista de [contribuidores](https://github.com/usuario/proyecto/contributors) que participaron en este proyecto.

---

*Última actualización: ${new Date().toLocaleDateString('es-ES')}*
`;
};