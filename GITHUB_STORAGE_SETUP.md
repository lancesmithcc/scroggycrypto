# 🔧 GitHub Storage Setup for Netlify

Scroggy's Casino uses **GitHub as a database** by reading/writing JSON files directly in the repository. This allows the game to work on Netlify's serverless environment!

---

## 🎯 How It Works

1. **Player data** is stored in `data/players.json`
2. **Leaderboard** is stored in `data/leaderboard.json`
3. **GitHub API** reads and writes these files on every spin
4. **Automatic commits** update the files in real-time
5. **Everyone sees the same data** - synced via GitHub!

---

## 🔑 Setup GitHub Token (Required for Netlify)

### Step 1: Create a GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `Scroggy Casino - Netlify`
4. Set expiration: **No expiration** (or custom)
5. Select scopes:
   - ✅ **repo** (Full control of private repositories)
     - ✅ repo:status
     - ✅ repo_deployment
     - ✅ public_repo
     - ✅ repo:invite
     - ✅ security_events
6. Click **"Generate token"**
7. **Copy the token** (starts with `ghp_...`)

⚠️ **Important:** Save this token somewhere safe - you can't see it again!

---

### Step 2: Add Token to Netlify Environment Variables

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your **Scroggy Casino** site
3. Go to **Site configuration** → **Environment variables**
4. Click **"Add a variable"** → **"Add a single variable"**
5. Add:
   - **Key:** `GITHUB_TOKEN`
   - **Value:** `ghp_your_token_here` (paste your token)
   - **Scopes:** Same value for all deploy contexts
6. Click **"Create variable"**

---

### Step 3: Add Token to Local .env (Optional - for local testing)

Add to your `.env` file:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

**Note:** This is ONLY needed for local development. Production uses Netlify's environment variables.

---

## 🚀 Deploying

Once the GitHub token is set in Netlify:

1. **Commit & push your code** to GitHub
2. Netlify will **auto-deploy**
3. The game will now:
   - ✅ Read player data from GitHub
   - ✅ Write updates to GitHub on every spin
   - ✅ Update leaderboard automatically
   - ✅ Work across all users globally!

---

## 📊 Viewing Updates in GitHub

After players spin, you'll see commits in your repo:

```
🎰 Update player data - 2025-01-10T12:34:56.789Z
🏆 Update leaderboard - 2025-01-10T12:34:56.789Z
```

Check the **Commits** tab to see the history!

---

## 🔍 Testing Locally

To test GitHub integration locally:

1. Add `GITHUB_TOKEN` to `.env`
2. Run `npm run dev`
3. Play the game
4. Check `data/players.json` and `data/leaderboard.json` in your repo
5. You should see new commits!

---

## ⚠️ Important Notes

### Rate Limits
- GitHub API allows **5,000 requests/hour** with authentication
- Each spin makes **2-3 API calls** (read player, write player, update leaderboard)
- You can handle ~1,600 spins per hour
- For higher traffic, consider migrating to a database (Supabase, MongoDB, etc.)

### Commit History
- Every spin creates a commit
- Your repo will have many commits!
- This is normal and expected
- You can squash commits periodically if needed

### Security
- ✅ GitHub token is stored in Netlify (secure)
- ✅ Token is NOT exposed to client-side code
- ✅ Token is only used in API routes (server-side)
- ⚠️ Never commit `.env` file to GitHub

---

## 🔄 Migrating to a Database (Future)

If you get high traffic, you can migrate to:

1. **Supabase** (PostgreSQL - free tier)
2. **MongoDB Atlas** (NoSQL - free tier)
3. **Upstash** (Redis - serverless)
4. **PlanetScale** (MySQL - free tier)

The game logic stays the same - just swap the storage layer!

---

## 🎮 Environment Variables Summary

### Required for Production (Netlify):
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
GITHUB_TOKEN=ghp_...
SOLANA_ADDRESS=your_wallet_address
SOLANA_PRIVATE_KEY=[your_private_key_array]
```

### Optional (Local Development):
```bash
GITHUB_TOKEN=ghp_...  # Only needed for local testing
```

---

## ✅ Verification Checklist

- [ ] GitHub Personal Access Token created
- [ ] Token added to Netlify environment variables
- [ ] Code pushed to GitHub
- [ ] Netlify redeployed
- [ ] Game loads successfully
- [ ] Spins update player balance
- [ ] Leaderboard shows data
- [ ] GitHub repo shows new commits

---

**🎰 Your casino is now powered by GitHub! Every spin updates the repo in real-time!** ✨

