# My Awesome Store - Medusa Backend

A production-ready Medusa v2 e-commerce backend with Docker support, ready for deployment on Railway.

## 🚀 Features

- **Medusa v2.11.2** - Latest headless e-commerce platform
- **Docker & Docker Compose** - Containerized for easy deployment
- **PostgreSQL** - Production-grade database
- **Redis** - Caching and session management
- **Railway Ready** - Optimized for Railway deployment
- **Security First** - No hardcoded secrets, environment-based configuration

## 📋 Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Redis 7+ (optional for local development)
- Docker & Docker Compose (for containerized deployment)

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/otunchievnazar/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the template and configure your environment:

```bash
cp .env.template .env
```

Edit `.env` with your local database credentials:

```env
DATABASE_URL=postgres://medusa_user:your_password@localhost/medusa-my-medusa-store
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
COOKIE_SECRET=your_cookie_secret_here
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000,http://localhost:5173
AUTH_CORS=http://localhost:9000,http://localhost:5173
```

**⚠️ Security:** Generate strong secrets for production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run Database Migrations

```bash
npx medusa db:migrate
```

### 5. Seed Demo Data (Optional)

```bash
npm run seed
```

### 6. Start Development Server

```bash
npm run dev
```

The admin panel will be available at: **http://localhost:9000/app**

## 🐳 Docker Development

### Using Docker Compose

```bash
# Start all services (PostgreSQL + Redis + Medusa)
docker compose --env-file .env.docker up --build

# Run in detached mode
docker compose --env-file .env.docker up -d

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v
```

Access the admin at: **http://localhost:9000/app**

## 📦 Production Deployment

### Deploy to Railway

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Steps:**

1. Create a new project on [Railway](https://railway.app)
2. Add PostgreSQL and Redis databases
3. Deploy from GitHub
4. Set environment variables (see `.env.production` template)
5. Run migrations: `npx medusa db:migrate`
6. Create admin user or seed data

### Environment Variables for Production

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Auto-set by Railway |
| `REDIS_URL` | Redis connection string | Auto-set by Railway |
| `JWT_SECRET` | Secret for JWT tokens | Generate with crypto |
| `COOKIE_SECRET` | Secret for cookies | Generate with crypto |
| `STORE_CORS` | Allowed origins for storefront | `https://store.com` |
| `ADMIN_CORS` | Allowed origins for admin | `https://admin.com` |
| `AUTH_CORS` | Allowed origins for auth | `https://admin.com` |
| `NODE_ENV` | Node environment | `production` |

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed demo data
npm test:unit        # Run unit tests
npm test:integration:http    # Run HTTP integration tests
npm test:integration:modules # Run module integration tests
```

## 📁 Project Structure

```
my-medusa-store/
├── src/
│   ├── admin/          # Admin UI customizations
│   ├── api/            # Custom API routes
│   ├── jobs/           # Background jobs
│   ├── modules/        # Custom modules
│   ├── scripts/        # Utility scripts
│   ├── subscribers/    # Event subscribers
│   └── workflows/      # Custom workflows
├── Dockerfile          # Production Docker image
├── docker-compose.yml  # Local Docker setup
├── medusa-config.ts    # Medusa configuration
└── package.json        # Dependencies
```

## 🔐 Security

- ✅ No hardcoded secrets in code
- ✅ Environment-based configuration
- ✅ `.env` files excluded from git
- ✅ Secure Docker image with non-root user
- ✅ Production-ready CORS configuration

**Important:** Always use strong, randomly generated secrets in production!

## 📚 Documentation

- [Medusa Documentation](https://docs.medusajs.com/)
- [Medusa Admin Customization](https://docs.medusajs.com/admin-customization)
- [Railway Documentation](https://docs.railway.app/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT

## 🆘 Support

For issues and questions:
- [Medusa Discord](https://discord.gg/medusajs)
- [GitHub Issues](https://github.com/otunchievnazar/your-repo-name/issues)

---

**Built with ❤️ using [Medusa](https://medusajs.com)**

