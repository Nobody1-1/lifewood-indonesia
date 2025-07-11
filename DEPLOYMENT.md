# Deployment Guide - Lifewood Indonesia

## Prerequisites

1. **MongoDB Atlas Account**
   - Buat cluster baru di MongoDB Atlas
   - Dapatkan connection string
   - Buat database user dengan password

2. **Supabase Account**
   - Buat project baru di Supabase
   - Dapatkan URL dan API keys
   - Setup storage bucket untuk images

3. **Vercel Account**
   - Sign up di vercel.com
   - Connect dengan GitHub repository

## Environment Variables

Set environment variables berikut di Vercel dashboard:

### MongoDB Atlas
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifewood?retryWrites=true&w=majority
```

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### JWT Secret
```
JWT_SECRET=your-super-secret-jwt-key-here
```

## Deployment Steps

### 1. Push ke GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy ke Vercel
1. Login ke Vercel dashboard
2. Klik "New Project"
3. Import repository dari GitHub
4. Set environment variables
5. Deploy

### 3. Setup MongoDB Atlas
1. Buat cluster baru
2. Buat database user
3. Whitelist IP addresses (0.0.0.0/0 untuk production)
4. Dapatkan connection string

### 4. Setup Supabase
1. Buat project baru
2. Setup storage bucket untuk images
3. Set storage policies
4. Dapatkan URL dan API keys

## Post-Deployment

1. Test semua fitur:
   - User registration/login
   - Admin panel
   - Image uploads
   - Product management
   - Store management

2. Setup custom domain (optional)
3. Configure analytics (optional)

## Troubleshooting

### Build Errors
- Pastikan semua dependencies terinstall
- Check TypeScript errors
- Verify environment variables

### Database Connection
- Check MongoDB connection string
- Verify network access
- Test connection locally

### Image Upload Issues
- Check Supabase storage policies
- Verify bucket permissions
- Test upload functionality 