import { TemplateData } from './openSource';

export const generateEnterpriseTemplate = (data: TemplateData): string => {
  const techList = data.technologies.length > 0 
    ? data.technologies.map(tech => `- ${tech}`).join('\n')
    : '- React\n- TypeScript\n- Node.js\n- PostgreSQL';

  return `# ${data.projectName || 'Proyecto Empresarial'}

## 📊 Resumen Ejecutivo

${data.projectDescription || 'Descripción completa del proyecto empresarial, sus objetivos y valor de negocio.'}

## 🎯 Objetivos del Proyecto

- **Objetivo Principal**: Descripción del objetivo principal
- **Objetivos Secundarios**: 
  - Objetivo secundario 1
  - Objetivo secundario 2
  - Objetivo secundario 3

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

${techList}

### Componentes Principales

- **Frontend**: Interfaz de usuario responsiva
- **Backend**: API RESTful con autenticación
- **Base de Datos**: Sistema de gestión de datos
- **Infraestructura**: Despliegue en la nube

## 📈 Métricas y KPIs

- **Performance**: Tiempo de respuesta < 200ms
- **Disponibilidad**: 99.9% uptime
- **Escalabilidad**: Soporte para 10,000+ usuarios concurrentes
- **Seguridad**: Cumplimiento con estándares ISO 27001

## 🔧 Configuración del Entorno

### Requisitos del Sistema

- Node.js 18+ LTS
- Docker y Docker Compose
- PostgreSQL 14+
- Redis 6+

### Instalación

${data.installation || `1. Configurar variables de entorno
\`\`\`bash
cp .env.example .env
\`\`\`

2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

3. Configurar base de datos
\`\`\`bash
npm run db:setup
\`\`\`

4. Ejecutar migraciones
\`\`\`bash
npm run db:migrate
\`\`\``}

## 🚀 Despliegue

### Entorno de Desarrollo
\`\`\`bash
npm run dev
\`\`\`

### Entorno de Producción
\`\`\`bash
npm run build
npm run start
\`\`\`

### Docker
\`\`\`bash
docker-compose up -d
\`\`\`

## 📚 Documentación

- [Documentación de API](./docs/api.md)
- [Guía de Desarrollo](./docs/development.md)
- [Manual de Usuario](./docs/user-manual.md)
- [Guía de Despliegue](./docs/deployment.md)

## 🧪 Testing

### Ejecutar Tests
\`\`\`bash
# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Tests e2e
npm run test:e2e

# Cobertura de código
npm run test:coverage
\`\`\`

## 🔒 Seguridad

- Autenticación JWT con refresh tokens
- Validación de entrada en todos los endpoints
- Rate limiting y protección DDoS
- Logs de auditoría completos
- Encriptación de datos sensibles

## 📊 Monitoreo y Logging

- **Métricas**: Prometheus + Grafana
- **Logs**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **APM**: New Relic / Datadog
- **Alertas**: PagerDuty

## 🤝 Proceso de Desarrollo

### Flujo de Trabajo
1. Crear branch desde \`develop\`
2. Implementar feature con tests
3. Code review obligatorio
4. Tests automáticos deben pasar
5. Merge a \`develop\`
6. Deploy automático a staging
7. QA testing
8. Deploy a producción

### Estándares de Código
- ESLint + Prettier
- Conventional Commits
- SonarQube quality gates
- Cobertura mínima: 80%

## 📄 Licencia

${data.license === 'MIT' ? 'Licencia Propietaria' : data.license || 'Licencia Propietaria'} - Todos los derechos reservados.

## 👥 Equipo

**Product Owner**: ${data.author || 'Nombre del PO'}
**Tech Lead**: Nombre del Tech Lead
**Desarrolladores**: Lista del equipo

## 📞 Contacto y Soporte

- **Email**: support@empresa.com
- **Slack**: #proyecto-support
- **Jira**: [Board del Proyecto](https://empresa.atlassian.net)
- **Confluence**: [Documentación Técnica](https://empresa.atlassian.net)

---

*Este documento es confidencial y está destinado únicamente para uso interno de la organización.*
`;
};