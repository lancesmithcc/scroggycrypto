# 💰 Solana Donation Setup

## 🔑 Required Environment Variable

To enable Solana donations, you need to add this to your **Netlify** environment variables:

### **CRITICAL:** Add this variable

```bash
NEXT_PUBLIC_SOLANA_ADDRESS=your_solana_wallet_address_here
```

---

## 📝 Where to Get Your Wallet Address

You already have this in your `.env` file as `SOLANA_ADDRESS`. 

**Copy the SAME value** and add it as `NEXT_PUBLIC_SOLANA_ADDRESS`.

### Example:

**Your .env currently has:**
```bash
SOLANA_ADDRESS=ABC123...xyz789
```

**Add to Netlify:**
```bash
NEXT_PUBLIC_SOLANA_ADDRESS=ABC123...xyz789
```

---

## ⚠️ Why NEXT_PUBLIC_ is Required

In Next.js:
- ❌ `SOLANA_ADDRESS` - Only works server-side (API routes)
- ✅ `NEXT_PUBLIC_SOLANA_ADDRESS` - Works in browser (donation button)

The donation button runs **in the browser** (client-side), so it needs the `NEXT_PUBLIC_` prefix.

**Note:** This is safe because wallet addresses are **public** information (they're on the blockchain).

---

## 🚀 Setup Steps

### 1. Get Your Wallet Address

From your existing `.env` file, copy the value of `SOLANA_ADDRESS`.

### 2. Add to Netlify

1. Go to your Netlify dashboard
2. Navigate to: **Site configuration** → **Environment variables**
3. Click **"Add a variable"**
4. Add:
   - **Key:** `NEXT_PUBLIC_SOLANA_ADDRESS`
   - **Value:** (paste your wallet address)
   - **Scopes:** Same value for all deploy contexts
5. Click **"Create variable"**

### 3. Redeploy

Netlify will automatically redeploy when you add the environment variable.

---

## ✅ Verification

After deployment, check the donation modal:
- Click the **"☀️ Support Casino"** button (bottom-left)
- You should see **"Casino Wallet:"** with your address
- If it says **"Not configured"**, the variable is missing

---

## 📋 All Required Environment Variables

Make sure these are ALL set in Netlify:

```bash
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# GitHub Storage
GITHUB_TOKEN=ghp_...

# Solana (for server-side - token minting)
SOLANA_PRIVATE_KEY=[...]
SOLANA_ADDRESS=your_wallet_address

# Solana (for client-side - donations) ← ADD THIS!
NEXT_PUBLIC_SOLANA_ADDRESS=your_wallet_address  # ← SAME as SOLANA_ADDRESS

# Kokoro TTS (for voice)
NEXT_PUBLIC_KOKORO_API_KEY=your_key_here
```

---

## 🎯 What Happens

Once configured:
1. Players click **"☀️ Support Casino"**
2. Choose donation amount (0.1, 0.5, 1.0 SOL or custom)
3. Click **"Donate with Phantom"**
4. Phantom wallet opens
5. Transaction sends SOL to **your wallet** (SOLANA_ADDRESS)
6. Success message shows transaction signature
7. 4-tone success sound plays! 🎵

---

## 🔍 Testing Locally

To test locally, add to your **local `.env`** file:

```bash
NEXT_PUBLIC_SOLANA_ADDRESS=your_wallet_address_here
```

Then restart your dev server: `npm run dev`

---

## 💡 Security Notes

- ✅ Wallet address is **public** (safe to expose)
- ✅ Private key (`SOLANA_PRIVATE_KEY`) is **NOT** exposed
- ✅ Transactions require user approval in Phantom
- ✅ You cannot be hacked by sharing your wallet address

---

**Your donations will go to the same wallet where ScroggyCoin is stored!** 🎰☀️

