# Deploying Medusa to Railway

This guide will help you deploy your Medusa backend to Railway.

## Prerequisites

- Railway account ([railway.app](https://railway.app))
- GitHub repository with your Medusa code
- Railway CLI (optional but recommended)

## Option 1: Deploy via Railway Dashboard (Recommended)

### Step 1: Create a New Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub account
5. Select your Medusa repository

### Step 2: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically create a PostgreSQL instance
4. Note: Railway will automatically set the `DATABASE_URL` environment variable

### Step 3: Add Redis

1. Click **"+ New"** again
2. Select **"Database"** → **"Add Redis"**
3. Railway will automatically create a Redis instance
4. Note: Railway will automatically set the `REDIS_URL` environment variable

### Step 4: Configure Environment Variables

In your Medusa service, go to **"Variables"** tab and add:

```bash
# Required
JWT_SECRET=your_super_secret_jwt_key_here
COOKIE_SECRET=your_super_secret_cookie_key_here

# CORS (Update with your actual domains)
STORE_CORS=https://your-storefront.com
ADMIN_CORS=https://your-admin.railway.app
AUTH_CORS=https://your-admin.railway.app

# Node Environment
NODE_ENV=production
PORT=9000
```

**Important:** Generate strong secrets for production:
```bash
# Generate secrets locally
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Configure Build Settings

Railway should auto-detect your Dockerfile. If not:

1. Go to **"Settings"** tab
2. Under **"Build"**, ensure:
   - **Builder**: Dockerfile
   - **Dockerfile Path**: `Dockerfile`

### Step 6: Deploy

1. Railway will automatically deploy when you push to your main branch
2. Wait for the build to complete (check the **"Deployments"** tab)
3. Once deployed, Railway will provide a public URL

### Step 7: Run Database Migrations & Seed (First Time Only)

After first deployment, you need to run migrations:

1. Go to your Medusa service
2. Click on **"Settings"** → **"Deploy"**
3. Add a **"Custom Start Command"** temporarily:
   ```bash
   npm run build && npx medusa db:migrate && npm run seed && npm run start
   ```
4. After successful deployment, change it back to:
   ```bash
   npm run start
   ```

Or use Railway CLI:
```bash
railway run npx medusa db:migrate
railway run npm run seed
```

---

## Option 2: Deploy via Railway CLI

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

### Step 3: Initialize Project

```bash
cd my-medusa-store
railway init
```

### Step 4: Add Services

```bash
# Add PostgreSQL
railway add --database postgres

# Add Redis
railway add --database redis
```

### Step 5: Set Environment Variables

```bash
railway variables set JWT_SECRET=your_jwt_secret
railway variables set COOKIE_SECRET=your_cookie_secret
railway variables set STORE_CORS=https://your-storefront.com
railway variables set ADMIN_CORS=https://your-admin.railway.app
railway variables set AUTH_CORS=https://your-admin.railway.app
railway variables set NODE_ENV=production
```

### Step 6: Deploy

```bash
railway up
```

### Step 7: Run Migrations

```bash
railway run npx medusa db:migrate
railway run npm run seed
```

---

## Post-Deployment

### Access Your Admin Panel

Your admin panel will be available at:
```
https://your-app.railway.app/app
```

### Create Admin User

If you haven't seeded data, create an admin user:

```bash
railway run npx medusa user -e admin@example.com -p supersecret
```

### Monitor Logs

```bash
railway logs
```

Or view logs in the Railway Dashboard under **"Deployments"** → **"View Logs"**

---

## Troubleshooting

### Build Fails

- Check the build logs in Railway Dashboard
- Ensure all dependencies are in `package.json`
- Verify Dockerfile is correct

### Database Connection Issues

- Ensure `DATABASE_URL` is set (Railway sets this automatically)
- Check PostgreSQL service is running
- Verify network connectivity between services

### Redis Connection Issues

- Ensure `REDIS_URL` is set (Railway sets this automatically)
- Check Redis service is running

### CORS Errors

- Update `STORE_CORS`, `ADMIN_CORS`, and `AUTH_CORS` with your actual domains
- Include both HTTP and HTTPS if needed
- Separate multiple domains with commas

### Port Issues

- Railway automatically assigns a port via `PORT` environment variable
- Ensure your app listens on `process.env.PORT || 9000`

---

## Environment Variables Reference

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
| `PORT` | Server port | `9000` (auto-set by Railway) |

---

## Continuous Deployment

Railway automatically deploys when you push to your connected GitHub branch:

1. Make changes to your code
2. Commit and push to GitHub
3. Railway automatically builds and deploys
4. Monitor deployment in Railway Dashboard

---

## Scaling

Railway offers:
- **Vertical Scaling**: Increase memory/CPU in service settings
- **Horizontal Scaling**: Available on Pro plan

---

## Costs

- Railway offers a free tier with limited resources
- Check [Railway Pricing](https://railway.app/pricing) for details
- Monitor usage in Railway Dashboard

---

## Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Medusa Documentation](https://docs.medusajs.com/)
- [Railway Discord](https://discord.gg/railway)

